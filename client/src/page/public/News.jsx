import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import PublicLayout from '../../components/PublicLayout'
import Footer from '../../components/Footer'
import Card from '../../components/Card'
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
        console.error('ошибка загрузки:', (e.message))
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
            {news.length === 0 ? (
              <div className="content-none">
                <p>Пусто...</p>
              </div>
            ) :
            news.map(el => (
              <Card key={el.id_news} id={el.id_news} data={el} type='news'/>
            ))}
          </div>
        </PublicLayout>
      </div>
      <Footer/>
    </div>
  )
}
