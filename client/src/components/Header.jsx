import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
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
  const [isChecked, setIsChecked] = useState(false)
  
  const submitMutation = useMutation({
    mutationFn: (data) => Api.feedback.post(createFormData(data)),
    onSuccess: () => {
      setIsModalOpen(false)
      resetForm()
      setIsChecked(false)
    },
    onError: (error) => {
      console.log('ошибка: ' + (error.message))
      setIsModalOpen(false)
      setIsChecked(false)
    }
  })

  const { formValue, handleChange, resetForm } = useSimpleForm({
    name: '',
    phone: '',
    email: '',
    message: ''
  })  

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    resetForm()
    setIsChecked(false) 
  }

  return (
    <PublicLayout>
      <header className="header">
          <div className="logo-border">
            <img src="/logo.svg" alt="logo" />
          </div>
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
            <form onSubmit={(e) => {
              e.preventDefault()
              submitMutation.mutate(formValue)
            }}>
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
              <div className="checkbox__content">
                <input
                  className="checkbox"
                  type='checkbox'
                  name='checkbox'
                  onChange={() => setIsChecked(!isChecked)}
                  checked={isChecked}
                  required
                />
                <Link 
                  to={'/politick'}
                  target="_blank" rel="noopener noreferrer"   
                >
                  Политика обработки персональных данных
                </Link>
              </div>
              <button type='submit'>Отправить</button>
            </form>            
          </Modal>
      </header>
    </PublicLayout>
  )
}
