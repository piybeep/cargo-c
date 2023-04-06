import { useSpring } from 'react-spring'

interface useCardAnimationProps {
  isSwapped: { id: number | null }
  ref: any
  ind: number
}

export const useCardAnimation = ({
  isSwapped,
  ref,
  ind
}: useCardAnimationProps) => {
  const getOffsetTop = (myref: any) => {
    if (myref?.current) {
      const { top } = myref.current.getBoundingClientRect()
      return top
    }
    return 0
  }

  const getTransition = () => {
    if (isSwapped?.id && isSwapped.id === ind) {
      return getOffsetTop(ref[ind - 1]) - getOffsetTop(ref[ind])
    } else if (isSwapped?.id && isSwapped.id - 1 === ind) {
      return getOffsetTop(ref[ind + 1]) - getOffsetTop(ref[ind])
    } else {
      return 0
    }
  }

  return useSpring({
    transform: `translate3d(0,${getTransition()}px, 0)`
  })
}
