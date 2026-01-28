import { useState } from 'react'
import AdminModal from './AdminModal'
import * as Api from '../api/index'

export default function AdminCatalogCard({el, get}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isApi, setIsApi] = useState(false)
    const [formValue, setFormValue] = useState({ 
        name: el.name || '',
        img: el.img || ''
    })

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormValue(prev => ({
                ...prev,
                img: file
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(isApi){
                const data = new FormData()
                data.append('name', formValue.name)
                if (formValue.img instanceof File) {
                    data.append('img', formValue.img)
                }
                await Api.catalog.putCatalog(el.id_catalog, data)
            } else {
                await Api.catalog.deleteCatalog(el.id_catalog)
            }
            setIsOpen(false)
            get()
        } catch(e) {
            console.log('ошибка: ' + (e.message))
            setIsOpen(false)
        }
    }

    return (
    <div className='adminContent__card' style={{backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${el.img})`}}>
        <div className='adminContent__card-content'>
            <p>{el.name}</p>
            <div>
                <button onClick={() => setIsOpen(true)}>Открыть</button>
            </div> 
        </div>
        <AdminModal
         isOpen={isOpen} 
         onClose={() => setIsOpen(false)}
        >
            <h3>Управление</h3>
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
                    <button type="submit" onClick={() => setIsApi(true)}>
                        Обновить
                    </button>
                    <button type="submit" onClick={() => setIsApi(false)} style={{ background: '#ff4444' }}>
                        Удалить
                    </button>
                </div>
            </form>
        </AdminModal>
    </div>
    )
}
