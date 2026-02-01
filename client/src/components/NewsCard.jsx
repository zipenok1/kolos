import '../styles/newsCard.css'

export default function NewsCard({data}) {
        
  return (
    <div className='news-cards-el'>
        <img src={`${import.meta.env.VITE_IMG_URL}/${data.img}`} alt={data.name} />
        <div>
            <h3>{data.name}</h3>
            <p>{data.description}</p>
            <p>{new Date(data.date).toLocaleDateString('ru-RU')}</p>
        </div>
    </div>
  )
}
