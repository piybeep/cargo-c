import * as React from "react"

const svgCargo = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
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
      <path d="M13.5 3h-9A1.5 1.5 0 0 0 3 4.5V6a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 15 6V4.5A1.5 1.5 0 0 0 13.5 3ZM13.5 10.5h-9A1.5 1.5 0 0 0 3 12v1.5A1.5 1.5 0 0 0 4.5 15h9a1.5 1.5 0 0 0 1.5-1.5V12a1.5 1.5 0 0 0-1.5-1.5Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default svgCargo