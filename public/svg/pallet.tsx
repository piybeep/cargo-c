import * as React from "react"
const Pallet = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
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
      clipPath="url(#clip0_548_4696)"
    >
      <path d="M33.333 15.408v7.917c.01.185-.02.37-.092.541a1.173 1.173 0 0 1-.58.61l-9.103 4.3a8.33 8.33 0 0 1-7.117 0l-9.103-4.3a1.175 1.175 0 0 1-.669-1.151l-.003-7.917" />
      <path d="m7.385 14.927 9.39-3.886a8.441 8.441 0 0 1 6.45 0l9.39 3.886a1.153 1.153 0 0 1 .046 2.115l-9.103 4.238a8.441 8.441 0 0 1-7.116 0l-9.104-4.238a1.152 1.152 0 0 1 .047-2.115Z" />
    </g>
  </svg>
)
export default Pallet