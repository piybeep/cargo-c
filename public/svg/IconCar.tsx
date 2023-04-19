import * as React from "react"
const IconCar = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <g
      stroke="#1890FF"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      clipPath="url(#clip0_548_3451)"
    >
      <path d="M11.667 31.666a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666ZM28.333 31.666a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666Z" />
      <path d="M8.333 28.333H5V10a1.667 1.667 0 0 1 1.667-1.667h15v20m-6.667 0h10m6.667 0H35v-10m0 0H21.667m13.333 0L30 10h-8.333" />
    </g>
  </svg>
)
export default IconCar