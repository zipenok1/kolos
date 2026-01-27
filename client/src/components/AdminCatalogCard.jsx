import { useState } from 'react'
import AdminModal from './AdminModal';
import * as Api from '../api/index'

export default function AdminCatalogCard({el, get}) {
    const [isOpen, setIsOpen] = useState({ isModal: false, isApi: true })
    const [formValue, setFormValue] = useState({ 
        name: el.name || '',
        img: el.img || ''
    })

    const update = () => {
        setIsOpen({ isModal: true, isApi: true });
    }  

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormValue(prev => ({
                ...prev,
                img: file
            }))
        }
    }

    const putCatalog = async () => {
        try {
            const data = new FormData()
            data.append('name', formValue.name)
            if (formValue.img instanceof File) {
                data.append('img', formValue.img)
            }
            await Api.catalog.putCatalog(el.id_catalog, data)
            setIsOpen({ ...isOpen, isModal: false })
            get()
            console.log('данные успешно обновлены')
        } catch(e) {
            console.log('ошибка: ' + (e.message))
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        putCatalog();
    }

    return (
    <div className='adminCatalog__card' style={{backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${el.img})`}}>
        <div>
            <p>{el.name}</p>
            <button onClick={update}>Обновить</button>
        </div>
        <AdminModal
         isOpen={isOpen} 
         onClose={() => setIsOpen({...isOpen, isModal: false})}
        >
            <h3>{isOpen.isApi ? 'редактировать' : 'удалить'}</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name='name'
                    placeholder="заголовок"
                    value={formValue.name}
                    onChange={(e) => setFormValue(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value
                    }))}
                />
                <input 
                    type="file"
                    name='img' 
                    onChange={handleFileChange}
                />

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button type="submit">
                        Сохранить изменения
                    </button>
                    <button 
                        type="button"
                        onClick={() => setIsOpen({...isOpen, isModal: false})}
                        style={{ background: '#ccc' }}
                    >
                        Отмена
                    </button>
                </div>
            </form>
        </AdminModal>
    </div>
    )
}
