import Header from '../../components/Header'
import PublicLayout from '../../components/PublicLayout'
import Slider from '../../components/Slider'
import * as Api from '../../api/index'
import { useSimpleForm } from '../../hooks/useSimpleForm'
import { createFormData } from '../../utils/formHelpers'
import '../../styles/home.css'

export default function Home() {
  const { formValue, handleChange, resetForm } = useSimpleForm({
    email: ''
  })

  const newsletterSubmit = async (e) => {
    e.preventDefault()
    try{
      const data = createFormData(formValue)
      await Api.newsletter.post(data)
      resetForm()
    } catch(e) {
      console.log('ошибка: ' + (e.message))
    }
  }  

  return (
    <div>
      <Header/>
      <main>
        <section className='hero'>
          <img src="../hero.jpg" alt="hero" />
          <div className='hero__content'>
            <h1>сельскохоз предприятие ООО «Колос»</h1>
            <p>
              Мы производим почвообрабатывающие
              агрегаты – от проектирования до сборки.
              Наша техника работает в самых сложных условиях.
            </p>
            <button>Каталог</button>
          </div>
        </section>
        <Slider/>
        <section className='about'>
          <PublicLayout>
            <div className='about__content'>
              <div className='about-card'>
                <h3>АО Росагролизинг</h3>
                <p>Подробности уточняйте в отделе продаж</p>
                <span>01</span>
              </div>
              <div className='about-card'>
                <h3>АО Росагролизинг</h3>
                <p>Подробности уточняйте в отделе продаж</p>
                <span>03</span>
              </div>
              <div className='about-card'>
                <h3>АО Росагролизинг</h3>
                <p>Подробности уточняйте в отделе продаж</p>
                <span>02</span>
              </div>
              <div className='about-card'>
                <h3>АО Росагролизинг</h3>
                <p>Подробности уточняйте в отделе продаж</p>
                <span>04</span>
              </div>
            </div>
          </PublicLayout>
        </section>
        <section className='banner'>
          <PublicLayout>
            <div className='banner__content'>
              <h2>Мы на связи</h2>
              <form onSubmit={newsletterSubmit}>
                <input 
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={formValue.email}
                  onChange={handleChange}
                />      
                <button type="submit">отправить</button>    
              </form>
            </div>
          </PublicLayout>
        </section>
        
      </main>
    </div>
  )
}
