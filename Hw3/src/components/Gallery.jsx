import { useState, useEffect } from 'react'

function Gallery() {
  const images = [
    'https://tastesbetterfromscratch.com/wp-content/uploads/2023/03/Chicken-Parmesan-1.jpg',
    'https://www.thecookierookie.com/wp-content/uploads/2023/05/featured-grilled-salmon-recipe.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9a/Reel_and_Brand_-_September_2021_-_Sarah_Stierch_05.jpg',
    'https://bakerbynature.com/wp-content/uploads/2015/02/Sweet-and-Spicy-Sriracha-Chicken-Wings-0-6.jpg',
    'https://static01.nyt.com/images/2017/04/05/dining/05COOKING-TIRAMISU1/05COOKING-TIRAMISU1-googleFourByThree-v2.jpg',
    'https://static01.nyt.com/images/2025/08/12/multimedia/12FD-ICE-CREAMREX1-SL-Easy-Homemade-Ice-Cream-bzhv/12FD-ICE-CREAMREX1-SL-Easy-Homemade-Ice-Cream-bzhv-mediumSquareAt3X.jpg'
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center mb-4">Gallery</h2>
        <div className="position-relative mx-auto" style={{ maxWidth: '800px' }}>
          <div className="overflow-hidden rounded">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Food ${index + 1}`}
                className={`w-100 ${index === currentIndex ? 'd-block' : 'd-none'}`}
                style={{
                  animation: index === currentIndex ? 'fade 1s ease-in-out' : 'none',
                  height: '400px',
                  objectFit: 'cover'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  )
}

export default Gallery