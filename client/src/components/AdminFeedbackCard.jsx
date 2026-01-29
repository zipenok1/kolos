import * as Api from '../api/index'
import AdminCard from './AdminCard'

export default function AdminFeedbackCard({ el, get }) {
    const newsApi = {
        delete: (id) => Api.feedback.delet(id)
    }

    const newsFields = [
        { name: 'name', label: 'Имя', placeholder: 'Имя'},
        { name: 'phone', label: 'Телефон', placeholder: 'Телефон', type: 'phone' },
        { name: 'email', label: 'Почта', placeholder: 'Почта', type: 'email' },
        { name: 'message', label: 'Сообщение', placeholder: 'Сообщение'}
    ]

    const renderContent = (item) => (
        <>
            <p>{item.name}</p>
            <p>{item.phone}</p>
            <p>{item.email}</p>
            <p>{item.message}</p>
        </>
    )

    return (
        <AdminCard
            el={el}
            get={get}
            fields={newsFields}
            api={newsApi}
            id={el.id_feedback}
            renderContent={renderContent}
            envImgUrl={import.meta.env.VITE_IMG_URL}
        />
    )
}
