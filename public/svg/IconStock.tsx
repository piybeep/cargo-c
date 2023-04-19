import * as React from "react"
const IconStock = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
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
      strokeWidth={2.5}
      clipPath="url(#clip0_548_4121)"
    >
      <path d="M5 35V13.333l15-6.666 15 6.666V35" />
      <path d="M21.667 21.667h6.666V35H11.667V25h10" />
      <path d="M21.667 35V20A1.667 1.667 0 0 0 20 18.333h-3.333A1.666 1.666 0 0 0 15 20v5" />
    </g>
  </svg>
)
export default IconStock
