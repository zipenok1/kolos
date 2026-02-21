import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import PublicLayout from "../../components/PublicLayout"
import * as Api from '../../api/index'
import '../../styles/catalog.css'

export default function Catalog() {
  const { 
    data: catalog = [], 
    isLoading, 
    error, 
    isError 
  } = useQuery({
    queryKey: ["catalog"],
    queryFn: Api.catalog.get,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15
  })

  const renderContent = () => {
    if (isLoading) return <div className="content-none">Загрузка каталога...</div>
    if (isError) return <div className="content-none">Ошибка: {error.message}</div>
    if (catalog && catalog.length === 0) return <div className="content-none">Пусто...</div>
    
    return catalog?.map(el => (
      <Link 
        key={el.id_catalog}
        to={`/catalog/product/${el.id_catalog}`}
        className="catalog-card"
      >
        <img src={`${import.meta.env.VITE_IMG_URL}/${el.img}`} alt={el.name}/>
        <h3>{el.name}</h3>
      </Link>
    ))
  }

  return (
    <div>
      <Header/>
      <div className="catalog">
        <PublicLayout>
          <h2>Каталог</h2>
          <div className="catalog__content">
            {renderContent()}
          </div>
        </PublicLayout>
      </div>
      <Footer/>
    </div>
  )
}