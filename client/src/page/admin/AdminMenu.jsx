import { Link } from "react-router-dom"
import '../../styles/AdminMenu.css'

export default function AdminMenu() {

  const navigation = [
    {
      label: 'Каталог',
      path: '/admin/catalog',
      description: 'Управление catalog',
    },  
    {
      label: 'Продукты',
      path: '/admin/product',
      description: 'Управление product',
    }, 
    {
      label: 'Новости',
      path: '/admin/news',
      description: 'Управление news',
    }, 
    {
      label: 'Подписка',
      path: '/admin/newsletter',
      description: 'Управление newsletter',
    }, 
    {
      label: 'Обратная связь',
      path: '/admin/feedback',
      description: 'Управление feedback',
    }      
  ]

  return (
    <div className="adminMenu">
      <h2>Меню навигации</h2>
      <div>
        {navigation.map((el, index) => (
          <Link className="adminMenu__card" to={el.path} key={index} >
            <h3>{el.label}</h3>
            <p>{el.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
