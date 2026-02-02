import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../../components/Header'
import PublicLayout from '../../components/PublicLayout'
import Footer from '../../components/Footer'
import * as Api from '../../api/index' 

export default function NewsDetailed() {
  const [news, setNews] = useState(null)

  const {id} = useParams()

  useEffect(() => {
  (async () => {
    try{
      const data = await Api.news.getById(id)
      setNews(data)
    } catch(e){
      console.error('ошибка загрузки:', (e.message))
    }
  })()
  }, [id])

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
