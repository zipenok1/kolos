import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import * as Api from '../../api/index'
import AdminNewsletterCard from "../../components/AdminNewsletterCard" 

export default function AdminNewsletter() {
  const [newsletter, setNewsletter] = useState([])

  const getNewsletter = async () => {
    const data = await Api.newsletter.get()
    setNewsletter(data)
  }
  
  useEffect(()=>{
    getNewsletter()
  }, [])

  return (
    <div className='adminContent'>
      <Link to={'/admin'}>
        🠔 Назад
      </Link>
      <h2>Подписки</h2>
      <div className='adminContent__content'>
        {newsletter.map(el => (
          <AdminNewsletterCard key={el.id_newsletter} el={el} get={getNewsletter}/>
        ))}
      </div>
    </div>
  )
}
