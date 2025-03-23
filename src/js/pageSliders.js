document.addEventListener("DOMContentLoaded", function () {
   
    // FANCY POPUP
    Fancybox.bind("[data-fancybox]", {});
    let promoSlider = new Swiper('.header-swiper',{
      slidesPerView: 1,
      effect: "fade",
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });
    
    //NEWS SLIDER
    let newsSlider = new Swiper('.news-slider', {
      slidesPerView: 3,
      spaceBetween: 30,
      speed:1000,
      navigation: {
        nextEl: ".news-slider__nav .swiper-button-next",
        prevEl: ".news-slider__nav .swiper-button-prev",
      },
      breakpoints: {
          320: {
            slidesPerView: 'auto',
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1365: {
            slidesPerView: 3,
            spaceBetween: 30,
          }
        },
    });

    //reccomend slider
    let reccomendSlider = new Swiper('.reccomend-slider', {
      slidesPerView: 4,
      spaceBetween: 30,
      speed:1000,
      navigation: {
        nextEl: ".reccomend-slider__nav .swiper-button-next",
        prevEl: ".reccomend-slider__nav .swiper-button-prev",
      },
      breakpoints: {
          320: {
            slidesPerView: 'auto',
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1365: {
            slidesPerView: 4,
            spaceBetween: 30,
          }
        },
    });
    let popUpSlider = new Swiper('.popup-swiper', {
      slidesPerView: 'auto',
      spaceBetween: 10,
      speed:700,
    });

   // fotorama
    var swiperNews = new Swiper(".mySwiper", {
      spaceBetween: 20,
      slidesPerView: 5,
      freeMode: true,
      speed:1000,
      watchSlidesProgress: true,
     navigation: {
        nextEl: ".mySwiper-thumb__nav .swiper-button-next",
        prevEl: ".mySwiper-thumb__nav .swiper-button-prev",
      },
      
      
    });
    var swiper2 = new Swiper(".mySwiper-news", {
      spaceBetween: 10,
      speed:1000,
      navigation: {
        nextEl: ".mySwiper__nav .swiper-button-next",
        prevEl: ".mySwiper__nav .swiper-button-prev",
      },
      thumbs: {
        swiper: swiperNews,
      },
      
    });

    /** */
    
    var newsTeamSlider = new Swiper(".news-team-slider", {
      spaceBetween: 30,
      slidesPerView: 3,
      navigation: {
        nextEl: ".news-slider__nav .swiper-button-next",
        prevEl: ".news-slider__nav .swiper-button-prev",
      },
      breakpoints: {
        320: {
          slidesPerView: 'auto',
          spaceBetween: 10,
        },
        768:{
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1200:{
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1365:{
          slidesPerView: 3,
          spaceBetween: 30,
        }
      }
    });
});
