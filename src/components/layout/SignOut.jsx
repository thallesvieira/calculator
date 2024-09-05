import styles from './SignOut.module.css'

function SignOut({onLogout}) {
    
    return <button className={`${styles.signout_button} btn btn-outline-light`} onClick={onLogout}>Sign out</button>
}

export default SignOut;