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
                            <li><Link>Главная</Link></li>
                            <li><Link>Каталог</Link></li>
                            <li><Link>Новости</Link></li>
                        </ul>
                    </nav>
                </div>
            </PublicLayout>
        </footer>
  )
}
