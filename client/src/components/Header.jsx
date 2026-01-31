import PublicLayout from "./PublicLayout"
import { Link } from 'react-router-dom'
import '../styles/header.css'

export default function Header() {
  return (
    <PublicLayout>
        <header className="header">
            <img src="" alt="logo" />
            <nav className="header__content">
                <li>
                    <Link>Главная</Link>
                </li>
                <li>
                    <Link>Каталог</Link>
                </li>
                <li>
                    <Link>Новости</Link>
                </li>
            </nav>
            <button>Обратная связь</button>
        </header>
    </PublicLayout>
  )
}
