import styles from './PaginationLiButton.module.css'

function PaginationLiButton({text, disabled, onHandleChangePage, nextValue}) {
    
    return (
        <li className={`${styles.page_item} page-item ${disabled}`} >
            <a className="page-link" href="#" onClick={()=> onHandleChangePage(nextValue)}>{text}</a>
        </li>
    )
}

export default PaginationLiButton;