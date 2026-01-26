import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import {observer} from 'mobx-react-lite'
import { Context } from "../../main"
import * as Api from '../../api' 
import '../../styles/Authorization.css'

const Authorization = observer(() => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const {user} = useContext(Context)

  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const data = await Api.auth.login({ name, password })
      localStorage.setItem('token', data.token)
      user.setIsAuth(true)
      navigate('/admin')
    } catch (e) {
      console.log('ошибка: ' + (e.message))
    }
  }

  return (
    <div className="authorization">
        <form onSubmit={submit}>
          <h3>Авторизация</h3>
            <input 
              type="text"
              name="name"
              placeholder="Введите имя"
              value={name}
              autoComplete="off"
              onChange={(e)=>setName(e.target.value)}
              required
            />
            <input 
              type="password"
              name="password"
              placeholder="Введите пароль"
              value={password}
              autoComplete="off"
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
            <button type="submit">
              Войти
            </button>  
        </form>         
    </div>
  )
})

export default Authorization
