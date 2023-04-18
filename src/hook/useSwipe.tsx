import { useState } from "react";

export const useSwipe = (s: any) => {
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
            const allCard = Array.from(document.querySelectorAll<HTMLElement>('.' + s.item))

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
        const current = document.querySelectorAll<HTMLElement>('.' + s.item)[index]
        let clientX = e.targetTouches[0].clientX - touchStart
        setTouchEnd(clientX)
        current.style.transform = `translateX(${Math.round(clientX)}px)`
    }

    function handleTouchEnd(index: any) {
        const current = document.querySelectorAll<HTMLElement>('.' + s.item)[index]
        if (touchEnd <= -128) {
            current.style.transform = `translateX(-128px)`
            current.style.transition = '.3s'
            setTimeout(() => {
                current.style.transition = '0s'
            }, 300);
            setTouchEnd(-128)
        } else {
            current.style.transform = `translateX(0px)`
            current.style.transition = '.3s'
            setTimeout(() => {
                current.style.transition = '0s'
            }, 300);
            setTouchEnd(0)
        }
    }

    const handleClick = (e: any, index: any) => {
        const allCard = Array.from(document.querySelectorAll<HTMLElement>('.' + s.item))
        allCard.map((current: any, currentIndex: number) => {
            if (index != currentIndex) {
                current.style.transform = `translateX(0px)`
                current.style.transition = '.3s'
                setTimeout(() => {
                    current.style.transition = '0s'
                }, 300);
            }
            else {
                current.style.transform = `translateX(-128px)`
                current.style.transition = '.3s'
                setTimeout(() => {
                    current.style.transition = '0s'
                }, 300);
            }
        })

        const current = document.querySelectorAll<HTMLElement>('.' + s.item)[index]
        current.style.transform = `translateX(-128px)`

        setTouchEnd(-128)
    }

    return { handleTouchStart, handleTouchMove, handleTouchEnd, setSaveCurrentIndex, handleClick }
}