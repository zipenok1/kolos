import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import * as Api from '../../api/index'
import AdminModal from '../../components/AdminModal'
import AdminNewsCard from "../../components/AdminNewsCard"

export default function AdminNews() {
  const [news, setNews] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [formValue, setFormValue] = useState({ 
    name: '',
    description: '',
    date: '',
    img: ''
  })
  
  const getNews = async () => {
    const data = await Api.news.getNews()
    setNews(data)
  }
  
  useEffect(()=>{
    getNews()
  }, [])

  const handleFileChange = (e) => {
      const file = e.target.files[0]
      if (file) {
          setFormValue(prev => ({
              ...prev,
              img: file
          }))
      }
  }  

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const data = new FormData()
      data.append('name', formValue.name)
      data.append('description', formValue.description)
      data.append('date', formValue.date)
      if (formValue.img instanceof File) {
        data.append('img', formValue.img)
      }
      await Api.news.postNews(data)
      setIsOpen(false)
      getNews()
    } catch(e) {
      console.log('ошибка: ' + (e.message))
      setIsOpen(false)
    }
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
          <AdminNewsCard el={el} key={el.id_news} get={getNews}/>
        ))}
      </div>
      <AdminModal
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
      >
        <h3>Добавление</h3>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name='name'
              placeholder="заголовок"
              value={formValue.name}
              onChange={(e) => setFormValue(prev => ({
                  ...prev,
                  [e.target.name]: e.target.value
              }))}
            />
            <input 
              type="text" 
              name='description'
              placeholder="описание"
              value={formValue.description}
              onChange={(e) => setFormValue(prev => ({
                  ...prev,
                  [e.target.name]: e.target.value
              }))}
            />
            <input 
              type="date" 
              name='date'
              placeholder="описание"
              value={formValue.date}
              onChange={(e) => setFormValue(prev => ({
                  ...prev,
                  [e.target.name]: e.target.value
              }))}
            />
            <input 
              type="file"
              name='img' 
              onChange={handleFileChange}
            />
            <button type="submit">
                Добавить
            </button>
          </form>    
      </AdminModal>      
    </div>
  )
}
