import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSimpleForm } from '../../hooks/useSimpleForm'
import { createFormData } from '../../utils/formHelpers'
import Header from '../../components/Header'
import Slider from '../../components/Slider'
import PublicLayout from '../../components/PublicLayout'
import Card from '../../components/Card'
import Footer from '../../components/Footer'
import * as Api from '../../api/index'
import '../../styles/home.css'

export default function Home() {
  const [news, setNews] = useState([])
  
  const { 
    formValue: newsletterForm, 
    handleChange: handleNewsletterChange, 
    resetForm: resetNewsletterForm 
  } = useSimpleForm({
    email: ''
  })

  const { 
    formValue: feedbackForm, 
    handleChange: handleFeedbackChange, 
    resetForm: resetFeedbackForm 
  } = useSimpleForm({
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  const newsletterSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = createFormData(newsletterForm)
      await Api.newsletter.post(data)
      resetNewsletterForm()
    } catch(e) {
      console.log('ошибка: ' + (e.message))
    }
  }  

  const feedbackSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = createFormData(feedbackForm)
      await Api.feedback.post(data)
      resetFeedbackForm()
    } catch(e) {
      console.log('ошибка: ' + (e.message))
    }
  }

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
      <main>
        <section className='hero'>
          <img src="../hero.jpg" alt="hero" />
          <div className='hero__content'>
            <h1>сельскохоз предприятие ООО «Колос»</h1>
            <p>
              современный агрохолдинг, где вековые традиции земледелия встречаются 
              с точными цифровыми технологиями. Мы выращиваем 
              высококачественное зерно на плодородных землях России, вкладывая 
              в каждый гектар наш опыт, заботу о земле и стремление к прогрессу.
            </p>
            <Link to={'/catalog'}>Каталог</Link>
          </div>
        </section>
        <Slider/>
        <section className='about'>
          <PublicLayout>
            <div className='about__content'>
              <div className='about-card'>
                <h3>Традиции & Технологии</h3>
                <p> 
                  Мы бережно храним вековые традиции российского земледелия, 
                  сочетая их с самыми современными агротехнологиями
                </p>
                <span>01</span>
              </div>
              <div className='about-card'>
                <h3>Наша миссия</h3>
                <p>
                  Наша цель — обеспечивать рынок высококачественной сельхозпродукцией, 
                  выращенной с ответственностью перед землей и потребителем.
                </p>
                <span>02</span>
              </div>
              <div className='about-card'>
                <h3>Сила региона</h3>
                <p>
                  ООО «Колос» — значимый игрок агропромышленного
                  комплекса одного из ключевых аграрных регионов России.
                </p>
                <span>03</span>
              </div>
              <div className='about-card'>
                <h3>Наша философия</h3>
                <p> Мы рассматриваем землю не как ресурс, а как наследие.</p>
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
                  value={newsletterForm.email}
                  onChange={handleNewsletterChange}
                />      
                <button type="submit">отправить</button>    
              </form>
            </div>
          </PublicLayout>
        </section>
        <section className='chips'>
          <PublicLayout>
            <div className='chips__container'>
              <h2>Наши Фишки</h2>
              <p className='chips__container-desc'>
                мы не просто "ферма". крупное, технологичное 
                агрохолдинговое предприятие с замкнутым циклом
              </p>
              <div className='chips__content'>
                <div className='chips__content-cards'>
                  <div>
                    <span>01</span>
                    <h3>Прозрачность на всех этапах</h3>
                    <p>
                      Мы внедряем систему прослеживаемости. Наши партнеры могут быть уверены в 
                      происхождении и качестве зерна.
                    </p>
                  </div>
                  <div>
                    <span>02</span>
                    <h3>Решения, а не предположения</h3>
                    <p>Мы заменяем традиционный подход точными цифрами.</p>
                  </div>
                  <div>
                    <span>03</span>
                    <h3>Прямой диалог с партнером</h3>
                    <p>
                      Мы ценим время и ясность. Как производитель, 
                      мы предлагаем прямые контракты без лишних посредников.
                    </p>
                  </div>
                  <div>
                    <span>04</span>
                    <h3>Ферма как лаборатория</h3>
                    <p>
                      Наши поля — это не только производственные площади, 
                      но и площадка для апробации новых технологий и сортов.
                    </p>
                  </div>
                </div>
                <img src="/chips.jpg" alt="chips"/>
              </div>
            </div>
          </PublicLayout>
        </section>
        <section className='news'>
          <PublicLayout>
            <div className='news_content'>
              <h2>Новости</h2>
              <p>
                Будьте в курсе жизни «Колоса»: отчеты с полей, внедрение новых технологий, ключевые 
                события и планы на будущее. Наша новостная лента — это честный рассказ о 
                том, как мы создаем качественный продукт, заботясь о земле и строя надежный бизнес.
              </p>
              <div className='news_cards'>
                {news.slice(0, 3).map((el) => ( 
                  <Card key={el.id_news} id={el.id_news} data={el} type='news'/>
                ))}
              </div>
            </div>
          </PublicLayout>
        </section>
        <section className='feedback' id='feedback'>
          <PublicLayout>
            <div className='feedback__content'>
              <div className='feedback__form'>
                <h2>Мы на связи</h2>
                <form onSubmit={feedbackSubmit}>
                  <input 
                    type='text'
                    name='name'
                    placeholder='Имя'
                    value={feedbackForm.name}
                    onChange={handleFeedbackChange}
                    required
                  />
                  <input 
                    type='tel'
                    name='phone'
                    placeholder='Телефон'
                    value={feedbackForm.phone}
                    onChange={handleFeedbackChange}
                    required
                  />
                  <input 
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={feedbackForm.email}
                    onChange={handleFeedbackChange}
                    required
                  />
                  <input 
                    type='text'
                    name='message'
                    placeholder='Сообщение'
                    value={feedbackForm.message}
                    onChange={handleFeedbackChange}
                    required
                  />  
                  <Link 
                    to={'/politick'}
                    target="_blank" rel="noopener noreferrer"   
                  >
                    Нажимая на кнопку "Отправить", я подтверждаю, что ознакомился  
                    с Политикой обработки персональных данных и даю согласие на обработку  
                    всех моих персональных данных указанных в форме
                  </Link>
                  <button type='submit'>Отправить</button>
                </form>
              </div>
              <img src="/feedback.jpg" alt="feedback" />
            </div>
          </PublicLayout>
        </section>
      </main>
      <Footer/>
    </div>
  )
}