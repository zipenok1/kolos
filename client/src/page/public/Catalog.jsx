import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import PublicLayout from "../../components/PublicLayout"
import * as Api from '../../api/index'
import '../../styles/catalog.css'

export default function Catalog() {
  const [catalog, setCatalog] = useState([])

  useEffect(() => {
    (async() => {
      try{
        const data = await Api.catalog.get()
        setCatalog(data)
      } catch(e){
        console.error('ошибка:', (e.message))
      }
    })()
  }, [])

  return (
    <div>
      <Header/>
      <div className="catalog">
        <PublicLayout>
          <h2>Каталог</h2>
          <div className="catalog__content">
            {catalog.length === 0 ? (
              <div className="content-none">
                <p>Пусто...</p>
              </div>
            ) : 
            catalog.map(el => (
              <Link 
                key={el.id_catalog}
                to={`/catalog/product/${el.id_catalog}`}
                className="catalog-card"
              >
                <img src={`${import.meta.env.VITE_IMG_URL}/${el.img}`} alt={el.name}/>
                <h3>{el.name}</h3>
              </Link>
            ))}
          </div>
        </PublicLayout>
      </div>
      <Footer/>
    </div>
  )
}
