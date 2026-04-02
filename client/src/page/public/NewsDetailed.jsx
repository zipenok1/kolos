import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import Header from '../../components/Header'
import PublicLayout from '../../components/PublicLayout'
import Footer from '../../components/Footer'
import * as Api from '../../api/index' 

export default function NewsDetailed() {
  const {id} = useParams()

  const { 
    data: news, 
  } = useQuery({
    queryKey: ["news_detailed", id],
    queryFn: () => Api.news.getById(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 20   
  })

  return (
    <div>
      <Header/>
        <PublicLayout>
          <div className='newsDetailed'>
            <Link to={'/news'}>
              🠔 Назад
            </Link>
            {!news ? (
              <div className="content-none">
                <p>Пусто...</p>
              </div>
              ) : 
              <div className='newsDetailed__content'>
                <img src={`${import.meta.env.VITE_IMG_URL}/${news.img}`} alt={news.name} />
                <div>
                  <h2>{news.name}</h2>
                  <p>{news.description}</p>
                  <p>{new Date(news.date).toLocaleDateString('ru-RU')}</p>
                </div>
              </div>
            }
          </div>
        </PublicLayout>
      <Footer/>
    </div>
  )
}
