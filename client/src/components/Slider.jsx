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
    content: 'Выращиваем высококачественные зерновые и масличные культуры с применением технологий точного земледелия.',
    img: '/slader1.png'
  },
  {
    id: 2,
    title: 'ЖИВОТНОВОДСТВО',
    content: 'Производство комбикормов и кормовых добавок из собственного зерна. Сбалансированные рационы для КРС и птицы от собственного сырья.',
    img: '/slader2.png'
  },
  {
    id: 3,
    title: 'ПЕРЕРАБОТКА',
    content: 'Современная глубокая переработка зерна в готовую продукцию: крупы, муку, корма. Гарантия сохранения питательных веществ и натуральности.',
    img: '/slader3.png'
  },
  {
    id: 4,
    title: 'ЭКСПОРТ',
    content: 'Экспортная деятельность. Поставки продукции в различные страны мира.',
    img: '/slader4.png'
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
