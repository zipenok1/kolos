import { useEffect, useState } from 'react'
import { useSimpleForm } from '../../hooks/useSimpleForm'
import { createFormData } from '../../utils/formHelpers'
import Header from '../../components/Header'
import PublicLayout from '../../components/PublicLayout'
import Slider from '../../components/Slider'
import * as Api from '../../api/index'
import '../../styles/home.css'

export default function Home() {
  const [news, setNews] = useState([])
  const { formValue, handleChange, resetForm } = useSimpleForm({
    email: ''
  })

  const envImgUrl = import.meta.env.VITE_IMG_URL

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

  useEffect(() => {
    (async () => {
      const data = await Api.news.get()
      setNews(data)
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
                    <h3>Собственное производство</h3>
                    <p>Полный цикл контроля — для безупречного результата</p>
                  </div>
                  <div>
                    <span>02</span>
                    <h3>Собственное производство</h3>
                    <p>Полный цикл контроля — для безупречного результата</p>
                  </div>
                  <div>
                    <span>03</span>
                    <h3>Собственное производство</h3>
                    <p>Полный цикл контроля — для безупречного результата</p>
                  </div>
                  <div>
                    <span>04</span>
                    <h3>Собственное производство</h3>
                    <p>Полный цикл контроля — для безупречного результата</p>
                  </div>
                </div>
                <img src="../chips.jpg" alt="chips"/>
              </div>
            </div>
          </PublicLayout>
        </section>
        <section className='news'>
          <PublicLayout>
            <div className='news_content'>
              <h2>Новости</h2>
              <p>
                Навесная конструкция бороны позволяет легко и быстро подключать 
                её к трактору, что делает процесс обработки полей более 
                удобным и эффективным. Благодаря своей маневренности и компактным размерам, 
                дисковая борона может использоваться на участках с ограниченным 
                пространством, а также в условиях сложного рельефа.
              </p>
              <div className='news_cards'>
                {news.slice(0, 3).map((el) => ( 
                  <div key={el.id} className='news-cards-el'>
                    <img src={`${envImgUrl}/${el.img}`} alt={el.name} />
                    <div>
                      <h3>{el.name}</h3>
                      <p>{el.description}</p>
                      <p>{new Date(el.date).toLocaleDateString('ru-RU')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </PublicLayout>
        </section>

      </main>
    </div>
  )
}
