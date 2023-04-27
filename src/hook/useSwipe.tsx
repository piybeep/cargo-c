import { useState } from 'react'

export const useSwipe = (style: any, right: number = -128) => {
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const [saveCurrentIndex, setSaveCurrentIndex] = useState(undefined)


    function handleTouchStart(e: any, id: any) {
        const current = id
        let firstTouch = e.touches[0].clientX
        if (touchEnd != 0 && current === saveCurrentIndex) {
            firstTouch = e.touches[0].clientX - touchEnd
        }

        setTouchStart(firstTouch)

        if (current !== saveCurrentIndex && saveCurrentIndex != undefined) {
            const allCard = Array.from(
                document.querySelectorAll<HTMLElement>('.' + style)
            )

            allCard.map((current: any, currentIndex: number) => {
                if (id != currentIndex) {
                    current.style.transform = `translateX(0px)`
                    current.style.transition = '.3s'
                    setTimeout(() => {
                        current.style.transition = '0s'
                    }, 300)
                }
            })
        }

        setSaveCurrentIndex(id)
    }

    function handleTouchMove(e: any, id: any) {
        const current = document.getElementById(id)
        if (current) {
            let clientX = e.targetTouches[0].clientX - touchStart
            setTouchEnd(clientX)
            current.style.transform = `translateX(${Math.round(clientX)}px)`
        }
    }

    function handleTouchEnd(id: any) {
        const current = document.getElementById(id)
        if (touchEnd <= right && current) {
            current.style.transform = `translateX(${right}px)`
            current.style.transition = '.3s'
            setTimeout(() => {
                current.style.transition = '0s'
            }, 300)
            setTouchEnd(right)
        } else if (current) {
            current.style.transform = `translateX(0px)`
            current.style.transition = '.3s'
            setTimeout(() => {
                current.style.transition = '0s'
            }, 300)
            setTouchEnd(0)
        }
    }

    function handleClick() {
        const allCard = Array.from(
            document.querySelectorAll<HTMLElement>('.' + style)
        )

        allCard.map((current: any) => {
            current.style.transform = `translateX(0px)`
            current.style.transition = '.3s'
            setTimeout(() => {
                current.style.transition = '0s'
            }, 300)
        })
    }

    return {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        setSaveCurrentIndex,
        handleClick
    }
}
