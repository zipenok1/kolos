import { Link } from 'react-router-dom'
import '../styles/newsCard.css'

export default function NewsCard({data}) {
        
  return (
    <Link 
      to={`/news/${data.id_news}`}
      className='news-cards-el'
    >
        <img src={`${import.meta.env.VITE_IMG_URL}/${data.img}`} alt={data.name} />
        <div>
            <h3>{data.name}</h3>
            <p>{data.description}</p>
            <p>{new Date(data.date).toLocaleDateString('ru-RU')}</p>
        </div>
    </Link>
  )
}
