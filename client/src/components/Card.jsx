import { Link } from 'react-router-dom'
import '../styles/newsCard.css'

export default function Card({data, id, type}) {
  const Wrapper = type === 'news' ? Link : 'div'
  const props = type === 'news' ? { to: `/news/${id}` } : null

  return (
    <Wrapper {...props} className='news-cards-el'>
        <img src={`${import.meta.env.VITE_IMG_URL}/${data.img}`} alt={data.name} />
        <div>
            <h3>{data.name}</h3>
            <p>{data.description}</p>
            {data.date && <p>{new Date(data.date).toLocaleDateString('ru-RU')}</p>}
        </div>
    </Wrapper>
  )
}
