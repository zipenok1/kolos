import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from 'react-router-dom'
import Header from '../../components/Header'
import PublicLayout from '../../components/PublicLayout'
import Footer from '../../components/Footer'
import Card from '../../components/Card'
import * as Api from '../../api/index' 
import '../../styles/product.css'

export default function Product() {
  const {id} = useParams()

  const {
    data: product = [],
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => Api.product.getByCatalog(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 20    
  })

  return (
    <div>
      <Header/>
      <PublicLayout>
        <div className='product'> 
          <h2>Продукты</h2>
          <Link to={'/catalog'}>
            🠔 Назад
          </Link>
          <div className='product__content'>
            {product.map(el => (
              <Card key={el.id_product} id={el.id_product} data={el} type='product'/>
            ))}
          </div>
        </div>
      </PublicLayout>
      <Footer/>
    </div>
  )
}
