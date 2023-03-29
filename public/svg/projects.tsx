import * as React from "react"

const svgProjects = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
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
      <path d="M10.5 2.25v3a.75.75 0 0 0 .75.75h3" />
      <path d="M12.75 15.75h-7.5a1.5 1.5 0 0 1-1.5-1.5V3.75a1.5 1.5 0 0 1 1.5-1.5h5.25L14.25 6v8.25a1.5 1.5 0 0 1-1.5 1.5Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default svgProjects
