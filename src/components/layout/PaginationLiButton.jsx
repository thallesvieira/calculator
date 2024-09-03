function PaginationLiButton({text, disabled, onHandleChangePage, nextValue}) {
    
    return (
        <li className={`page-item ${disabled}`} >
            <a className="page-link" href="#" onClick={()=> onHandleChangePage(nextValue)}>{text}</a>
        </li>
    )
}

export default PaginationLiButton;