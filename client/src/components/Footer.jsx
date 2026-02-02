import { Link } from 'react-router-dom'
import PublicLayout from './PublicLayout'
import '../styles/footer.css'

export default function Footer() {
  return (
    <footer className='footer'>
        <PublicLayout>
            <div className='foonter__content'>
                <nav>
                    <ul>
                        <li><Link to={'/'}>Главная</Link></li>
                        <li><Link to={'/catalog'}>Каталог</Link></li>
                        <li><Link to={'/news'}>Новости</Link></li>
                    </ul>
                </nav>
            </div>
        </PublicLayout>
    </footer>
  )
}
