import { useEffect, useState } from 'react'
import * as Api from '../../api/index'
import AdminCatalogCard from '../../components/AdminCatalogCard'

// тут должна быть только выгрущка и добовление а обновление и удаление нужно реализовать в компоненте карточки 
export default function AdminCatalog() {
  const [catalog, setCatalog] = useState([])

  const getCatalog = async () => {
    const data = await Api.catalog.getCatalog()
    setCatalog(data)
  }
  
  useEffect(()=>{
    getCatalog()
  }, [])

  return (

    <div className='adminCatalog'>
      <h2>Каталог</h2>
      <button className='adminCatalog-post'>Добавить</button>
      <div className='adminCatalog__content'>
        {catalog.map(el => (
          <AdminCatalogCard el={el} key={el.id_catalog} get={getCatalog}/>
        ))}
      </div>
    </div>
    
  )
}
