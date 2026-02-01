import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import PublicLayout from "./PublicLayout"
import '../styles/header.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen])
 
  return (
    <PublicLayout>
        <header className="header">
            <img src="../logo.svg" alt="logo" />
            <nav className={`header__content ${isMenuOpen ? 'active' : ''}`}>
              <li><Link>Главная</Link></li>
              <li><Link>Каталог</Link></li>
              <li><Link>Новости</Link></li>
            </nav>
            <button className="header-connection">Обратная связь</button>
            <button className="burger-btn" onClick={toggleMenu}>
              <img src="../burger.svg" alt="burger" />
            </button>
            <div className={`overlay ${isMenuOpen ? 'active' : ''}`}></div>
        </header>
    </PublicLayout>
  )
}
