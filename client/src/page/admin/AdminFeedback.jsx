import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import * as Api from '../../api/index'
import AdminFeedbackCard from "../../components/AdminFeedbackCard"

export default function AdminFeedback() {
  const [feedback, setFeedback] = useState([])

  const getfeedback = async () => {
    const data = await Api.feedback.get()
    setFeedback(data)
  }
  
  useEffect(()=>{
    getfeedback()
  }, [])

  return (
    <div className='adminContent'>
      <Link to={'/admin'}>
        🠔 Назад
      </Link>
      <h2>Подписки</h2>
      <div className='adminContent__content'>
        {feedback.map(el => (
          <AdminFeedbackCard key={el.id_feedback} el={el} get={getfeedback}/>
        ))}
      </div>
    </div>
  )
}
