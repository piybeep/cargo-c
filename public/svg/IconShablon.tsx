import * as React from "react"
const IconShablon = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        fill="none"
        stroke="none"
        {...props}
    >
        <g
            stroke="#fff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.2}
            clipPath="url(#clip0_156_11654)"
        >
            <path d="M4.5 3H12l3 3v7.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3Z" />
            <path d="M9 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM10.5 3v3H6V3" />
        </g>
    </svg>
)
export default IconShablon
