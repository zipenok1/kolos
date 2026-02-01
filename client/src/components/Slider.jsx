import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import PublicLayout from './PublicLayout'
import 'swiper/css'
import 'swiper/css/navigation'
import '../styles/slader.css'

const slidesData = [
  {
    id: 1,
    title: 'РАСТЕНИЕВОДСТВО',
    content: 'Выращивает четыре ключевые сельскохозяйственные культуры.',
    img: '../slader1.png'
  },
  {
    id: 2,
    title: 'ЖИВОТНОВОДСТВО',
    content: 'Профессиональное разведение сельскохозяйственных животных.',
    img: '../slader1.png'
  },
  {
    id: 3,
    title: 'ПЕРЕРАБОТКА',
    content: 'Современная переработка сельскохозяйственной продукции. Высокое качество и стандарты.',
    img: '../slader1.png'
  },
  {
    id: 4,
    title: 'ЭКСПОРТ',
    content: 'Экспортная деятельность. Поставки продукции в различные страны мира.',
    img: '../slader1.png'
  }
]

export default function Slider() {
  const [swiperInstance, setSwiperInstance] = useState(null)
  const [activeSlide, setActiveSlide] = useState(0)
  
  const handleTabClick = (index) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index)
    }
  } 

  return (
    <PublicLayout>
        <section className="tabs-slider-section">
            <div className="container">
              <div className="slider-tabs">
                {slidesData.map((slide, index) => (
                  <button
                    key={slide.id}
                    className={`tab-button ${activeSlide === index ? 'active' : ''}`}
                    onClick={() => handleTabClick(index)}
                  >
                    {slide.title}
                  </button>
                ))}
              </div>
              <div className="swiper-container">
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  onSwiper={setSwiperInstance}
                  onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                >
                  {slidesData.map((slide) => (
                    <SwiperSlide key={slide.id}>
                      <div className="slide-content">
                        <div className="slide-img">
                          <img src={slide.img} alt={slide.title} />
                        </div>
                        <div className="slide-text">
                          <h3>{slide.title}</h3>
                          <p>{slide.content}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </section>
    </PublicLayout>
  )
}
