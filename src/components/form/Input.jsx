import styles from './Input.module.css'

function Input({type, disabled, onHandleSetValue, value}) {
    return (
        <input type={type} className={`${styles.input_form} form-control`} value={value} onChange={(e) => onHandleSetValue(e.target.value)} disabled={disabled} />
    )
}

export default Input;