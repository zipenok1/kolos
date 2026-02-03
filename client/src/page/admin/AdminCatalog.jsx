import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSimpleForm } from "../../hooks/useSimpleForm"
import { createFormData } from "../../utils/formHelpers"
import Modal from '../../components/Modal'
import AdminCatalogCard from '../../components/AdminCatalogCard' 
import * as Api from '../../api/index'

export default function adminContent() {
  const [catalog, setCatalog] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const { formValue, handleChange, resetForm } = useSimpleForm({
    name: '',
    img: ''
  })

  const getCatalog = async () => {
    const data = await Api.catalog.get()
    setCatalog(data)
  }
  
  useEffect(()=>{
    getCatalog()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const data = createFormData(formValue)
      await Api.catalog.post(data)
      setIsOpen(false)
      getCatalog()
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
      <h2>Каталог</h2>
      <button 
        className='adminContent-post'
        onClick={() => setIsOpen(true)}
      >
        Добавить
      </button>
      <div className='adminContent__content'>
        {catalog.map(el => (
          <AdminCatalogCard key={el.id_catalog}  el={el} get={getCatalog}/>
        ))}
      </div>
      <Modal
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
              required
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
      </Modal>
    </div>
  )
}
