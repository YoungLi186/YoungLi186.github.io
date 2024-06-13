import clsx from "clsx"
import styles from "./FancyButton.module.scss"

export default function FancyButton({
    children,
    active,
    onClick,
    ...props
}: any) {
    // MIT LICENSE
    // https://uiverse.io/alexmaracinaru/brown-bobcat-65
    return (
        <button
            {...props}
            className={clsx(
                styles.cta,
                active && styles.active,
                props.className,
            )}
            onClick={onClick}
        >
            <span>{children}</span>
        </button>
    )
}
