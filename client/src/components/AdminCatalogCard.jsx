import * as Api from '../api/index'
import AdminCard from './AdminCard'

export default function AdminCatalogCard({ el, get }) {
    const newsApi = {
        update: (id, data) => Api.catalog.put(id, data),
        delete: (id) => Api.catalog.delet(id)
    }

    const newsFields = [
        { name: 'name', label: 'Название', placeholder: 'Заголовок' },
        { name: 'img', label: 'Изображение', type: 'file', accept: 'image/*' }
    ]

    const renderContent = (item) => (
        <>
            <p>{item.name}</p>
        </>
    )    

    return (
        <AdminCard
            el={el}
            get={get}
            fields={newsFields}
            api={newsApi}
            id={el.id_catalog}
            renderContent={renderContent}
            envImgUrl={import.meta.env.VITE_IMG_URL}
        />    
    )
}
