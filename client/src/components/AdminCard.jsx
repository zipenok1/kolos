import { useState } from 'react'
import { useSimpleForm } from '../hooks/useSimpleForm'
import { createFormData } from '../utils/formHelpers'
import Modal from './Modal' 

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
        <div className='adminContent__card'>
            {el.img ? <div className='adminContent__card-img' style={{backgroundImage: `url(${envImgUrl}${el.img})`}}></div> : null}
            <div className='adminContent__card-content'>
                {renderContent(el)}
                <button onClick={() => setIsOpen(true)}>
                    Управление
                </button>
            </div>
            <Modal isOpen={isOpen} onClose={handleModalClose}>
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
                        <div className='modal__button'>
                            {api.update ?    
                                <button type="submit">
                                    Сохранить
                                </button> : null
                            }
                            <button 
                                type="button"
                                onClick={() => setAction('delete')}
                                className='modal__button-del'
                            >
                                Удалить
                            </button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <p>Вы уверены, что хотите удалить этот элемент?</p>
                        <div className='modal__button'>
                            <button 
                                type="button"
                                onClick={handleSubmit}
                                className='modal__button-del'
                            >
                                Да, удалить
                            </button>
                            <button 
                                className='modal__button-cancel'
                                type="button"
                                onClick={() => setAction('update')}
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}