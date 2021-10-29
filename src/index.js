import '@sass/main'
import carousel from './js/carousel'

window.addEventListener('load', () => {

    const itemWidth = window.getComputedStyle(document.querySelector('.offer-section-carousel-container-content-item')).minWidth.slice(0, window.getComputedStyle(document.querySelector('.offer-section-carousel-container-content-item')).minWidth.indexOf('px'))
    const widthContainer = window.getComputedStyle(document.querySelector('.offer-section-carousel-container-content')).width.slice(0, window.getComputedStyle(document.querySelector('.offer-section-carousel-container-content')).width.indexOf('px'))
    
    carousel({
        widthContainer: widthContainer,
        nextBtnId: 'next-button',
        prevBtnId: 'prev-button',
        itemsSelector: '.offer-section-carousel-container-content-item',
        itemWidth: +itemWidth,
        itemsToScroll: 1,
        itemsToShow: 3,
        margin: 20
    })


})


