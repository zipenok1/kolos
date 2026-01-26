import { useNavigate } from 'react-router-dom';

export default function AdminMenu() {
  const navigate = useNavigate()

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
    <div>AdminMenu</div>
  )
}
