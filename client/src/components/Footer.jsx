import { Link } from 'react-router-dom'
import PublicLayout from './PublicLayout'
import '../styles/footer.css'

export default function Footer() {
  return (
    <footer className='footer'>
        <PublicLayout>
            <div className='foonter__content'>
                <nav>
                    <ul className='footer__nav'>
                        <li><Link to={'/'}>Главная</Link></li>
                        <li><Link to={'/catalog'}>Каталог</Link></li>
                        <li><Link to={'/news'}>Новости</Link></li>
                    </ul>
                </nav>
                <Link 
                    to={'/politick'}
                    className='foonter__content-politick' 
                    target="_blank" rel="noopener noreferrer"   
                >
                    Политика обработки персональных данных
                </Link>
            </div>
        </PublicLayout>
    </footer>
  )
}
