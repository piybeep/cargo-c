import { useState } from 'react'

export const useDebounce = <T extends unknown[], R>(
  f: (this: void, ...args: T) => R,
  ms: number
) => {
  const [isCooldown, setIsCooldown] = useState(false)

  return function (this: void, ...args: T) {
    if (isCooldown) return

    f.apply(this, args)

    setIsCooldown(true)

    setTimeout(() => setIsCooldown(false), ms)
  }
}
