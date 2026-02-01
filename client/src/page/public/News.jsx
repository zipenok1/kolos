import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import PublicLayout from '../../components/PublicLayout'
import NewsCard from '../../components/NewsCard'
import * as Api from '../../api/index'
import '../../styles/news.css'

export default function News() {
  const [news, setNews] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const data = await Api.news.get()
        setNews(data)
      } catch(e) {
        console.error('ошибка загрузки:', e)
      }
    })()
  }, [])

  return (
    <div>
      <Header/>
      <div className='news'>
        <PublicLayout>
          <h2>Новости</h2>
          <div className='news__content'>
          {
            news.map(el => (
              <NewsCard key={el.id_news} data={el}/>
            ))
          }
          </div>
        </PublicLayout>
      </div>
    </div>
  )
}
