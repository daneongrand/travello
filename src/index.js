import '@sass/main'
import carousel from './js/carousel'

window.addEventListener('load', () => {


    carousel({
        countItemsMove: 1,
        carouselTrackSelector: '.offer-section-carousel-container-content',
        carouselItemsSelector: '.offer-section-carousel-container-content-item',
        moveTransition: '.4s',
        buttons: {
            prev: 'prev-button',
            next: 'next-button'
        }
    })


    carousel({
        countItemsMove: 1,
        carouselTrackSelector: '.flash-deals-section-wrapper-container-track',
        carouselItemsSelector: '.flash-deals-section-wrapper-container-track-item',
        moveTransition: '.4s'
    })

})


