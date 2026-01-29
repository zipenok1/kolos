import * as Api from '../api/index'
import AdminCard from './AdminCard'

export default function AdminProductCard({ el, get }) {
    const newsApi = {
        update: (id, data) => Api.product.put(id, data),
        delete: (id) => Api.product.delet(id)
    }

    const newsFields = [
        { name: 'name', label: 'Название', placeholder: 'Заголовок' },
        { name: 'description', label: 'Описание', placeholder: 'Описание' },
        { name: 'id_catalog', label: 'Каталог', type: 'number' },
        { name: 'img', label: 'Изображение', type: 'file', accept: 'image/*' }
    ]

    const renderContent = (item) => (
        <>
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>{item.id_catalog}</p>
        </>
    )

    return (
        <AdminCard
            el={el}
            get={get}
            fields={newsFields}
            api={newsApi}
            id={el.id_product}
            renderContent={renderContent}
            envImgUrl={import.meta.env.VITE_IMG_URL}
        />
    )
}
