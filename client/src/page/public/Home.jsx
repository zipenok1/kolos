import Header from '../../components/Header'
import PublicLayout from '../../components/PublicLayout'
import Slider from '../../components/Slider'
import '../../styles/home.css'

export default function Home() {

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
        
      </main>
    </div>
  )
}
