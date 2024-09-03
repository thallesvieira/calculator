
import styles from './Home.module.css'
import image from '../../img/Numbers.png'
import LinkButton from '../layout/LinkButton';

function Home() {
  
  return (
    <section className={styles.home_container}>
        <h1>Welcome to the <span>Calculator</span> project!</h1>
        <p>Start performing operations right now!</p>
        <LinkButton to="/operation" text="New Operation" /> 
        <img src={image} alt='Calculator'/>
    </section>
  )
}

export default Home;