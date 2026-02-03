import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { useSimpleForm } from "../hooks/useSimpleForm"
import { createFormData } from "../utils/formHelpers"
import PublicLayout from "./PublicLayout"
import Modal from './Modal'
import * as Api from '../api/index'
import '../styles/header.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { formValue, handleChange, resetForm } = useSimpleForm({
    name: '',
    phone: '',
    email: '',
    message: ''
  })  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    if (isMenuOpen || isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen, isModalOpen])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const data = createFormData(formValue)
      await Api.feedback.post(data)
      setIsModalOpen(false)
      resetForm()
    } catch(e){
      console.log('ошибка: ' + (e.message))
      setIsModalOpen(false)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    resetForm()
  }

  return (
    <PublicLayout>
      <header className="header">
          <img src="/logo.svg" alt="logo" />
          <nav className={`header__content ${isMenuOpen ? 'active' : ''}`}>
            <li><Link to={'/'}>Главная</Link></li>
            <li><Link to={'/catalog'}>Каталог</Link></li>
            <li><Link to={'/news'}>Новости</Link></li>
          </nav>
          <button 
            className="header-connection"
            onClick={() => setIsModalOpen(true)}
          >
            Обратная связь
          </button>
          <button className="burger-btn" onClick={toggleMenu}>
            <img src="/burger.svg" alt="burger" />
          </button>
          <div className={`overlay ${isMenuOpen ? 'active' : ''}`}></div>
          <Modal
            isOpen={isModalOpen} 
            onClose={handleModalClose}
          >
            <h3>Мы на связи</h3>
            <form onSubmit={handleSubmit}>
              <input 
                type='text'
                name='name'
                placeholder='Имя'
                value={formValue.name}
                onChange={handleChange}
                required
              />
              <input 
                type='tel'
                name='phone'
                placeholder='Телефон'
                value={formValue.phone}
                onChange={handleChange}
                required
              />
              <input 
                type='email'
                name='email'
                placeholder='Email'
                value={formValue.email}
                onChange={handleChange}
                required
              />
              <input 
                type='text'
                name='message'
                placeholder='Сообщение'
                value={formValue.message}
                onChange={handleChange}
                required
              />  
              <button type='submit'>Отправить</button>
            </form>            
          </Modal>
      </header>
    </PublicLayout>
  )
}
