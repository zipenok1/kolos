import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import * as Api from '../../api/index'
import AdminModal from '../../components/AdminModal'
import AdminNewsCard from "../../components/AdminNewsCard"
import { useSimpleForm } from "../../hooks/useSimpleForm"
import { createFormData } from "../../utils/formHelpers"

export default function AdminNews() {
  const [news, setNews] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const { formValue, handleChange, resetForm } = useSimpleForm({
    name: '',
    description: '',
    date: '',
    img: ''
  })
  
  const getNews = async () => {
    const data = await Api.news.get()
    setNews(data)
  }
  
  useEffect(()=>{
    getNews()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const data = createFormData(formValue)
      await Api.news.post(data)
      setIsOpen(false)
      getNews()
    } catch(e) {
      console.log('ошибка: ' + (e.message))
      setIsOpen(false)
    }
  }

  const handleModalClose = () => {
    setIsOpen(false)
    resetForm()
  }

  return (
    <div className='adminContent'>
      <Link to={'/admin'}>
        🠔 Назад
      </Link>
      <h2>Новости</h2>
      <button 
        className='adminContent-post'
        onClick={() => setIsOpen(true)}
      >
        Добавить
      </button>
      <div className='adminContent__content'>
        {news.map(el => (
          <AdminNewsCard key={el.id_news} el={el} get={getNews}/>
        ))}
      </div>
      <AdminModal
        isOpen={isOpen} 
        onClose={handleModalClose}
      >
        <h3>Добавление</h3>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name='name'
              placeholder="заголовок"
              value={formValue.name}
              onChange={handleChange}
            />
            <input 
              type="text" 
              name='description'
              placeholder="описание"
              value={formValue.description}
              onChange={handleChange}
            />
            <input 
              type="date" 
              name='date'
              value={formValue.date}
              onChange={handleChange}
            />
            <input 
              type="file"
              name='img' 
              onChange={handleChange}
            />
            <button type="submit">
                Добавить
            </button>
          </form>    
      </AdminModal>   
    </div>
  )
}
