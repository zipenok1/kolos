import Header from '../../components/Header'
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

      </main>
    </div>
  )
}
