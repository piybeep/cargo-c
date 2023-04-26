import * as React from "react"

const IconTransport = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
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
      <path d="M5.25 14.25a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM12.75 14.25a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      <path d="M3.75 12.75h-1.5V4.5A.75.75 0 0 1 3 3.75h6.75v9m-3 0h4.5m3 0h1.5v-4.5m0 0h-6m6 0L13.5 4.5H9.75" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default IconTransport