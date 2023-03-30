import * as React from "react"

const svgAdd = (props) => (
  <svg
    width={18}
    height={18}
    fill="none"
    stroke="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#a)"
      stroke="#fff"
      fill="none"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13.5 3h-9A1.5 1.5 0 0 0 3 4.5v9A1.5 1.5 0 0 0 4.5 15h9a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 13.5 3ZM6.75 9h4.5M9 6.75v4.5" />
    </g>
  </svg>
)

export default svgAdd
