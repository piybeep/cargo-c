import React from 'react'

const IconReplace = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g clipPath='url(#clip0_146_16946)'>
        <path
          d='M3.33331 10V7.5C3.33331 6.83696 3.59671 6.20107 4.06555 5.73223C4.53439 5.26339 5.17027 5 5.83331 5H16.6666M16.6666 5L14.1666 2.5M16.6666 5L14.1666 7.5'
          stroke='#8C8C8C'
          strokeWidth='1.5625'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M16.6666 10V12.5C16.6666 13.163 16.4033 13.7989 15.9344 14.2678C15.4656 14.7366 14.8297 15 14.1666 15H3.33331M3.33331 15L5.83331 17.5M3.33331 15L5.83331 12.5'
          stroke='#8C8C8C'
          strokeWidth='1.5625'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_146_16946'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}

export default IconReplace
