import { Link } from "react-router-dom";

import styles from './Navbar.module.css';
import Container from '../layout/Container';
import SignOut from '../layout/SignOut';

function Navbar({ onLogout, balance }) {
    return (
      <nav className={styles.navbar} >
        <p className={`${styles.balance}`}>{balance}</p>
        <Container>
          <ul className={styles.list}>
            <li className={styles.item}><Link to="/">Home</Link></li>
            <li className={styles.item}><Link to="/Operation">Operation</Link></li>
            <li className={styles.item}><Link to="/records">Records</Link></li>
            <li className={styles.item}><Link to="/deleted-records">Deleted Records</Link></li>
          </ul>
          <SignOut onLogout={onLogout}/>
        </Container>
      </nav>
    )
}

export default Navbar;