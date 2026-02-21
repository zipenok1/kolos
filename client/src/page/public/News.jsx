import { useQuery } from "@tanstack/react-query"
import Header from '../../components/Header'
import PublicLayout from '../../components/PublicLayout'
import Footer from '../../components/Footer'
import Card from '../../components/Card'
import * as Api from '../../api/index'
import '../../styles/news.css'

export default function News() {
  const {
    data: news = [],
    isLoading, 
    error, 
    isError   
  } = useQuery({
    queryKey: ["news"],
    queryFn: Api.news.get,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 20    
  })

  const renderContent = () => {
    if (isLoading) return <div className="content-none">Загрузка новостей...</div>
    if (isError) return <div className="content-none">Ошибка: {error.message}</div>
    if (news && news.length === 0) return <div className="content-none">Пусто...</div>
    
    return news?.map(el => (
      <Card key={el.id_news} id={el.id_news} data={el} type='news'/>
    ))
  }

  return (
    <div>
      <Header/>
      <div className='news'>
        <PublicLayout>
          <h2>Новости</h2>
          <div className='news__content'>
            {renderContent()}
          </div>
        </PublicLayout>
      </div>
      <Footer/>
    </div>
  )
}
