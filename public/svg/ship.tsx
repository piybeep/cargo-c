import * as React from "react"
const Ship = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
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
            clipPath="url(#clip0_548_3428)"
        >
            <path d="M3.333 33.333A4 4 0 0 0 6.668 35 4 4 0 0 0 10 33.333a3.998 3.998 0 0 1 3.334-1.666 4 4 0 0 1 3.333 1.666A4 4 0 0 0 20 35a4.001 4.001 0 0 0 3.334-1.667 3.998 3.998 0 0 1 3.333-1.666A4.001 4.001 0 0 1 30 33.333 4 4 0 0 0 33.334 35a4 4 0 0 0 3.333-1.667M6.667 30 5 21.667h30l-3.333 6.666M8.333 21.667v-10h13.334l6.666 10M11.667 11.667V5H10" />
        </g>
    </svg>
)
export default Ship
