import { SVGProps } from "react"
/**
 * https://icones.js.org/collection/gg
 */

export function GgTag(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M2 8v8a1 1 0 0 0 1 1h13.62a1 1 0 0 0 .76-.35l3.428-4a1 1 0 0 0 0-1.3l-3.428-4a1 1 0 0 0-.76-.35H3a1 1 0 0 0-1 1ZM0 8v8a3 3 0 0 0 3 3h13.62a3 3 0 0 0 2.278-1.048l3.428-4a3 3 0 0 0 0-3.904l-3.428-4A3 3 0 0 0 16.62 5H3a3 3 0 0 0-3 3Z"></path>
                <path d="M15 13a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm0 2a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z"></path>
            </g>
        </svg>
    )
}

export function GgTime(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            {...props}
        >
            <g fill="currentColor">
                <path d="M9 7h2v5h5v2H9V7Z"></path>
                <path
                    fillRule="evenodd"
                    d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10Zm-2 0a8 8 0 1 1-16 0a8 8 0 0 1 16 0Z"
                    clipRule="evenodd"
                ></path>
            </g>
        </svg>
    )
}

export function GgEye(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M16 12a4 4 0 1 1-8 0a4 4 0 0 1 8 0Zm-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z"></path>
                <path d="M12 3c5.591 0 10.29 3.824 11.622 9c-1.332 5.176-6.03 9-11.622 9S1.71 17.176.378 12C1.71 6.824 6.408 3 12 3Zm0 16c-4.476 0-8.269-2.942-9.543-7C3.731 7.942 7.524 5 12 5c4.476 0 8.269 2.942 9.543 7c-1.274 4.058-5.067 7-9.543 7Z"></path>
            </g>
        </svg>
    )
}

export function SvgSpinners180RingWithBg(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fill="currentColor"
                d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                opacity=".25"
            ></path>
            <path
                fill="currentColor"
                d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
            >
                <animateTransform
                    attributeName="transform"
                    dur="0.75s"
                    repeatCount="indefinite"
                    type="rotate"
                    values="0 12 12;360 12 12"
                ></animateTransform>
            </path>
        </svg>
    )
}
