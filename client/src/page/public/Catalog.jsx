import { useState } from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import PublicLayout from "../../components/PublicLayout"
import * as Api from '../../api/index'
import '../../styles/catalog.css'

export default function Catalog() {
  const [catalog, setCatalog] = useState([])

  return (
    <div>
      <Header/>
      <div className="catalog">
        <PublicLayout>
          <h2>Каталог</h2>
          <div className="catalog__content">
            { catalog.length === 0 ? (
              <div className="content-none">
                <p>Пусто...</p>
              </div>
            ) : 
            catalog.map(el => (
              <div className="catalog-card">
                <img src={`${import.meta.env.VITE_IMG_URL}/${el.img}`} alt={el.name}/>
                <h3>{el.name}</h3>
              </div>
            ))}
          </div>
        </PublicLayout>
      </div>
      <Footer/>
    </div>
  )
}
