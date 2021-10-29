export default function carousel( configuration ) {
    // console.log(configuration.itemWidth)
    const nextBtn = document.getElementById(configuration.nextBtnId)
    const prevBtn = document.getElementById(configuration.prevBtnId)
    const items = document.querySelectorAll(configuration.itemsSelector)
    const movePosition = configuration.itemsToScroll * configuration.itemWidth
    let position = 0
    const itemToShow = Math.floor(configuration.widthContainer / configuration.itemWidth)
    const margin = ( configuration.widthContainer - configuration.itemWidth * itemToShow ) / ( itemToShow * 2 )
    const rigthLimit = ( configuration.itemWidth + 2 * margin ) * +items.length - ( configuration.itemWidth + 2 * margin ) * itemToShow
    
    
    console.log('rigthLimit' + rigthLimit)


    for(let i = 0; i < items.length; i++) {
        items[i].style.marginLeft = margin + 'px'
        items[i].style.marginRight = margin + 'px'
    }



    const setPosition = () => {
        for(let i of items) {
            i.style.transform = `translateX(${position}px)`
        }
    }

    const checkPositonRight = (p, mp) => {
        console.log(Math.abs(p - mp))
        if (Math.abs(p - mp) > rigthLimit) {
            return rigthLimit + p
        }
        
        return mp
    }

    const checkPositonLeft = (p, mp) => {
        if ((p + mp) > 0) {
            return 0 - p
        }
        return mp
    }

    // console.log('res' + checkPositon(-2630, 200))

    nextBtn.addEventListener('click', () => {
        position -= checkPositonRight(position, movePosition)
        // console.log(Math.abs(position - movePosition))
        setPosition()
    })

    prevBtn.addEventListener('click', () => {
        position += checkPositonLeft(position, movePosition)
        setPosition()
    })

    for (let i of items) {
        i.addEventListener('mousedown', (event) => {
            console.log(event.clientX)
        })
    }


}