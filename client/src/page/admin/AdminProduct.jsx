import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { useSimpleForm } from "../../hooks/useSimpleForm"
import { createFormData } from "../../utils/formHelpers"
import AdminProductCard from "../../components/AdminProductCard"
import Modal from '../../components/Modal'
import * as Api from '../../api/index'

export default function AdminProduct() { 
  const [product, setProduct] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const { formValue, handleChange, resetForm } = useSimpleForm({
    name: '',
    description: '',
    id_catalog: '',
    img: ''
  })

  const getProduct = async () => {
    const data = await Api.product.get()
    setProduct(data)
  }
  
  useEffect(()=>{
    getProduct()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const data = createFormData(formValue)
      await Api.product.post(data)
      setIsOpen(false)
      getProduct()
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
      <h2>Продукты</h2>
      <button 
        className='adminContent-post'
        onClick={() => setIsOpen(true)}
      >
        Добавить
      </button>    
      <div className='adminContent__content'>
        {product.map(el => (
          <AdminProductCard key={el.id_product} el={el} get={getProduct}/>
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
              type="text" 
              name='description'
              placeholder="описание"
              value={formValue.description}
              required
              onChange={handleChange}
            />
            <input 
              type="number" 
              name='id_catalog'
              placeholder="каталог"
              value={formValue.id_catalog}
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
