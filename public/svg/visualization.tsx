import * as React from "react"

const svgVisualization = (props: any) => (
  <svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#a)"
      stroke="#000"
      fill="none"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 13.2 3 12.375V10.5M3 7.5V5.625L4.5 4.8M7.5 3.075 9 2.25l1.5.825M13.5 4.8l1.5.825V7.5M15 10.5v1.875l-1.5.84M10.5 14.925 9 15.75l-1.5-.825M9 9l1.5-.825M13.5 6.45l1.5-.825M9 9v1.875M9 13.875v1.875M9 9l-1.5-.84M4.5 6.45 3 5.625" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default svgVisualization
