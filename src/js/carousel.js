export default function carousel(options) {
    const listItem = document.querySelectorAll(options.carouselItemsSelector)
    const listWidthItem = []
    const listMarginLeftItem = []
    const listMarginRightItem = []
    if(listItem) {
        for(let item of listItem) {
            listWidthItem.push(+window.getComputedStyle(item).width.slice(0, window.getComputedStyle(item).width.indexOf('px')))
        }
        for(let item of listItem) {
            listMarginLeftItem.push(+window.getComputedStyle(item).marginLeft.slice(0, window.getComputedStyle(item).marginLeft.indexOf('px')))
        }
        for(let item of listItem) {
            listMarginRightItem.push(+window.getComputedStyle(item).marginRight.slice(0, window.getComputedStyle(item).marginRight.indexOf('px')))
        }
        setTransition(listItem, options.moveTransition)
    }
    const track = document.querySelector(options.carouselTrackSelector)
    const widthTracker = window.getComputedStyle(document.querySelector(options.carouselTrackSelector)).width.slice(0,window.getComputedStyle(document.querySelector(options.carouselTrackSelector)).width.indexOf('px'))
    const widthListItem = listWidthItem.reduce((acc, sum) => acc += sum, 0) + listMarginLeftItem.reduce((acc, sum) => acc += sum, 0) + listMarginRightItem.reduce((acc, sum) => acc += sum, 0)
    const countItemsMove = options.countItemsMove
    const movePosition = countItemsMove * (listWidthItem[0] + listMarginLeftItem[0] + listMarginRightItem[0])
    let position = 0


    if (options.buttons?.prev && options.buttons?.next) {
        const btnPrev = document.getElementById(options.buttons.prev) 
        const btnNext = document.getElementById(options.buttons.next) 
        btnPrev.addEventListener('click', () => {
            console.log(position)
            position += checkPositionLeft() 
            for (let item of listItem) {
                item.style.transform = `translate(${position}px)`
            } 
        })
        btnNext.addEventListener('click', () => {
            console.log(position)
            position -= checkPositionRigth()
            for (let item of listItem) {
                item.style.transform = `translate(${position}px)`
            }       
            
        })
    }
    

    track.addEventListener('mousedown', (e) => {
        e.preventDefault()

        setTransition(listItem, '')

        let x = e.pageX

        document.addEventListener('mousemove', moveItems)

        document.addEventListener('mouseup', () => {
            x = 0
            document.removeEventListener('mousemove', moveItems)
            position = +listItem[0].style.transform.slice(listItem[0].style.transform.indexOf('(') + 1, listItem[0].style.transform.indexOf('px'))
            setTransition(listItem, options.moveTransition)
        })
        
        function moveItems(e) {
            e.preventDefault()
            if (position-(x-e.pageX) > 0) return
            if (position-(x-e.pageX) < -(widthListItem - widthTracker)) return
            for(let item of listItem) {
                item.style.transform = `translate(${position-(x-e.pageX)}px)`
            }
        }
    })
    
    
    // track.addEventListener('touchstart', (e) => {
    //     e.preventDefault()

    //     setTransition(listItem, '')

    //     let x = e.changedTouches[0].clientX

    //     document.addEventListener('touchmove', moveItems)

    //     track.addEventListener('touchend', () => {
    //         x = 0
    //         document.removeEventListener('mousemove', moveItems)
    //         position = +listItem[0].style.transform.slice(listItem[0].style.transform.indexOf('(') + 1, listItem[0].style.transform.indexOf('px'))
    //         setTransition(listItem, options.moveTransition)
    //     })
        
    //     function moveItems(e) {
    //         e.preventDefault()
    //         console.log(position)
    //         if (position-(x-e.changedTouches[0].clientX) > 0) return
    //         if (position-(x-e.changedTouches[0].clientX) < -(widthListItem - widthTracker)) return
    //         for(let item of listItem) {
    //             item.style.transform = `translate(${position-(x-e.changedTouches[0].clientX)}px)`
    //         }
    //     }
    // })


    function setTransition(listItem, transition) {
        for(let item of listItem) {
            item.style.transition = transition
        }
    }
    
    function checkPositionRigth() {
        if (position - movePosition < -(widthListItem - widthTracker)) {
            return position + (widthListItem - widthTracker)
        } else return movePosition
    }


    function checkPositionLeft() {
        if (position + movePosition > 0) {
            return -position
        } else return movePosition
    }

}

