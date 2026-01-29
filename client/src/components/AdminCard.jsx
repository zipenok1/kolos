import { useState } from 'react'
import AdminModal from './AdminModal' 
import { useSimpleForm } from '../hooks/useSimpleForm'
import { createFormData } from '../utils/formHelpers'

export default function AdminCard({ 
  el, 
  get,
  fields,
  api,
  id, 
  renderContent, 
  envImgUrl = import.meta.env.VITE_IMG_URL
}) {
    
    const [isOpen, setIsOpen] = useState(false)
    const [action, setAction] = useState('update') 

    const initialValues = fields.reduce((acc, field) => {
      acc[field.name] = el[field.name] || ''
      return acc
    }, {})

    const { formValue, handleChange, resetForm } = useSimpleForm(initialValues)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (action === 'update') {
                const data = createFormData(formValue)
                await api.update(id, data)
            } else {
                await api.delete(id)
            }
            setIsOpen(false)
            get()
            resetForm()
        } catch(e) {
            console.log('ошибка: ' + (e.message))
            setIsOpen(false)
        }
    }

    const handleModalClose = () => {
        setIsOpen(false)
        resetForm()
        setAction('update')
    }

    return (
       <div className='adminContent__card' style={{
           backgroundImage: el.img ? `url(${envImgUrl}${el.img})` : 'none'
       }}>
            <div className='adminContent__card-content'>
                {renderContent(el)}
                <div>
                    <button onClick={() => setIsOpen(true)}>
                        Управление
                    </button>
                </div> 
            </div>
            
            <AdminModal isOpen={isOpen} onClose={handleModalClose}>
                <h3>{action === 'update' ? 'Редактировать' : 'Удалить'}</h3>
                
                {action === 'update' ? (
                    <form onSubmit={handleSubmit}>
                        {fields.map(field => (
                            field.type === 'file' ? (
                                <input 
                                    key={field.name}
                                    type="file"
                                    name={field.name}
                                    onChange={handleChange}
                                    accept={field.accept}
                                />
                            ) : (
                                <input 
                                    key={field.name}
                                    type={field.type || 'text'}
                                    name={field.name}
                                    placeholder={field.placeholder || field.label}
                                    value={formValue[field.name]}
                                    onChange={handleChange}
                                />
                            )
                        ))}

                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            {api.update ?    
                                <button type="submit">
                                    Сохранить
                                </button> : null
                            }
                            <button 
                                type="button"
                                onClick={() => setAction('delete')}
                                style={{ background: '#ff4444' }}
                            >
                                Удалить
                            </button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <p>Вы уверены, что хотите удалить этот элемент?</p>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            <button 
                                type="button"
                                onClick={handleSubmit}
                                style={{ background: '#ff4444' }}
                            >
                                Да, удалить
                            </button>
                            <button 
                                type="button"
                                onClick={() => setAction('update')}
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                )}
            </AdminModal>
        </div>
    )
}