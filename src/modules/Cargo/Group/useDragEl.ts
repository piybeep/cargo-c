import { useState } from 'react'
import s from './GroupEl/GroupEl.module.scss'

export const useDragEl = () => {
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [saveCurrentIndex, setSaveCurrentIndex] = useState<undefined|number>(undefined)

  function handleTouchStart(e: any, index: number) {
    const current = index
    let firstTouch = e.touches[0].clientX
    if (touchEnd != 0 && current === saveCurrentIndex) {
      firstTouch = e.touches[0].clientX - touchEnd
    }

    setTouchStart(firstTouch)
    if (current !== saveCurrentIndex && saveCurrentIndex != undefined) {
      const allCard = Array.from(
        document.querySelectorAll<HTMLElement>('.' + s.cont)
      )

      console.log(allCard)

      allCard.map((current: any, currentIndex: number) => {
        if (index != currentIndex) {
          current.style.transform = `translateX(0px)`
          current.style.transition = '.3s'
          setTimeout(() => {
            current.style.transition = '0s'
          }, 300)
        }
      })
    }

    setSaveCurrentIndex(index)
  }

  function handleTouchMove(e: any, index: number) {
    const current = document.querySelectorAll<HTMLElement>('.' + s.cont)[index]
    let clientX = e.targetTouches[0].clientX - touchStart
    setTouchEnd(clientX)
    current.style.transform = `translateX(${Math.round(clientX)}px)`
  }

  function handleTouchEnd(index: number) {
    const current = document.querySelectorAll<HTMLElement>('.' + s.cont)[index]
    if (touchEnd <= -128) {
      current.style.transform = `translateX(-128px)`
      current.style.transition = '.3s'
      setTimeout(() => {
        current.style.transition = '0s'
      }, 300)
      setTouchEnd(-128)
    } else {
      current.style.transform = `translateX(0px)`
      current.style.transition = '.3s'
      setTimeout(() => {
        current.style.transition = '0s'
      }, 300)
      setTouchEnd(0)
    }
  }

  return {handleTouchStart,handleTouchMove,handleTouchEnd}
}
