import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as Api from '../../api/index'
import AdminCatalogCard from '../../components/AdminCatalogCard' 
import AdminModal from '../../components/AdminModal'

export default function adminContent() {
  const [catalog, setCatalog] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [formValue, setFormValue] = useState({ 
    name: '',
    img: ''
  })

  const getCatalog = async () => {
    const data = await Api.catalog.getCatalog()
    setCatalog(data)
  }
  
  useEffect(()=>{
    getCatalog()
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
      if (formValue.img instanceof File) {
        data.append('img', formValue.img)
      }
      await Api.catalog.postCatalog(data)
      setIsOpen(false)
      getCatalog()
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
      <h2>Каталог</h2>
      <button 
        className='adminContent-post'
        onClick={() => setIsOpen(true)}
      >
        Добавить
      </button>
      <div className='adminContent__content'>
        {catalog.map(el => (
          <AdminCatalogCard el={el} key={el.id_catalog} get={getCatalog}/>
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
