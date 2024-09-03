import styles from './Button.module.css'

function Button({type, text, btnClass}) {
    return (
        <button type={type} className={`${styles.button_form} ${btnClass}`}>{text}</button>
    )
}

export default Button;