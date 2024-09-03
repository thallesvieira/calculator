import { FaLinkedin, FaInstagram, FaGithub, FaBlogger } from "react-icons/fa";
import styles from './Footer.module.css'

function Footer() {
    return (
    <footer className={styles.footer}>
        <ul className={styles.social_list}>
            <li>
                <a className={styles.icon} href="https://www.instagram.com/thalles.jacobs/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                </a>
            </li>
            <li>
                <a className={styles.icon} href="https://www.linkedin.com/in/thalles-vieira/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin /> 
                </a>
            </li>
            <li>
                <a className={styles.icon} href="https://github.com/thallesvieira" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                </a>
            </li>
            <li>
                <a className={styles.icon} href="https://www.thallesvieira.com" target="_blank" rel="noopener noreferrer">
                    <FaBlogger />
                </a>
            </li>
        </ul>
        <p className={styles.copy}>
            <span>Calculator</span> &copy;2024
        </p>
    </footer>
    )
}

export default Footer;