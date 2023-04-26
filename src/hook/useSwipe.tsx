import { useState } from "react";

export const useSwipe = (style: any, right: number = -128) => {
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [saveCurrentIndex, setSaveCurrentIndex] = useState(undefined);

    function handleTouchStart(e: any, index: any) {
        const current = index
        let firstTouch = e.touches[0].clientX;
        if (touchEnd != 0 && current === saveCurrentIndex) {
            firstTouch = e.touches[0].clientX - touchEnd
        }

        setTouchStart(firstTouch)

        if (current !== saveCurrentIndex && saveCurrentIndex != undefined) {
            const allCard = Array.from(document.querySelectorAll<HTMLElement>('.' + style))

            allCard.map((current: any, currentIndex: number) => {
                if (index != currentIndex) {
                    current.style.transform = `translateX(0px)`
                    current.style.transition = '.3s'
                    setTimeout(() => {
                        current.style.transition = '0s'
                    }, 300);
                }
            })
        }

        setSaveCurrentIndex(index)
    }

    function handleTouchMove(e: any, index: number) {
        const current = document.querySelectorAll<HTMLElement>('.' + style)[index]
        let clientX = e.targetTouches[0].clientX - touchStart
        setTouchEnd(clientX)
        current.style.transform = `translateX(${Math.round(clientX)}px)`
    }

    function handleTouchEnd(index: any) {
        const current = document.querySelectorAll<HTMLElement>('.' + style)[index]
        if (touchEnd <= right) {
            current.style.transform = `translateX(${right}px)`
            current.style.transition = '.3s'
            setTimeout(() => {
                current.style.transition = '0s'
            }, 300);
            setTouchEnd(right)
        } else {
            current.style.transform = `translateX(0px)`
            current.style.transition = '.3s'
            setTimeout(() => {
                current.style.transition = '0s'
            }, 300);
            setTouchEnd(0)
        }
    }

    function handleClick() {
        const allCard = Array.from(document.querySelectorAll<HTMLElement>('.' + style))

        allCard.map((current: any) => {
            current.style.transform = `translateX(0px)`
            current.style.transition = '.3s'
            setTimeout(() => {
                current.style.transition = '0s'
            }, 300);
        })
    }

    return { handleTouchStart, handleTouchMove, handleTouchEnd, setSaveCurrentIndex, handleClick }
}