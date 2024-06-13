"use client"
import styles from "./BackToTop.module.scss"

/**
 * Pure CSS implementation of back to top
 */
export default function BackToTop() {
    return (
        <div
            className={styles.BackToTop}
            onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" })
            }}
        >
            ▲
        </div>
    )
}
