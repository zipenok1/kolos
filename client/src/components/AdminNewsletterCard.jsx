import * as Api from '../api/index'
import AdminCard from './AdminCard'

export default function AdminNewsletterCard({ el, get }) {
    const newsApi = {
        delete: (id) => Api.newsletter.delet(id)
    }

    const newsFields = [
        { name: 'email', label: 'Почта', placeholder: 'Почта', type: 'email' }
    ]

    const renderContent = (item) => (
        <>
            <p>{item.email}</p>
        </>
    )

    return (
        <AdminCard
            el={el}
            get={get}
            fields={newsFields}
            api={newsApi}
            id={el.id_newsletter}
            renderContent={renderContent}
            envImgUrl={import.meta.env.VITE_IMG_URL}
        />
    )
}
