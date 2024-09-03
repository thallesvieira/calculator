import React from 'react';
import SelectPagination from './SelectPagination';
import PaginationLiButton from './PaginationLiButton';

function Pagination({ totalPages, pageSize, currentPage, onHandlePageSize, onHandleChangePage}) {
    const disabledPrevious = (currentPage <= 1 ? "disabled" : "");
    const disabledNext = (currentPage >= totalPages ? "disabled" : "");
    return (
        <div>
            <ul className="pagination">
                <PaginationLiButton text={"Previous"} disabled={disabledPrevious} nextValue={parseInt(currentPage)-1} onHandleChangePage={onHandleChangePage} />
                {Array.from({ length: totalPages }).map((_, i) => (
                    <li key={i} className={`page-item ${currentPage == parseInt(i)+1 ? "disabled" : ""}`}>
                        <a className="page-link " onClick={()=> onHandleChangePage(i+1)} href="#">
                        {parseInt(i) + 1}
                        </a>
                    </li>
                ))}
                <PaginationLiButton text={"Next"} disabled={disabledNext} nextValue={parseInt(currentPage)+1} onHandleChangePage={onHandleChangePage} />
                <li>
                    <SelectPagination pageSize={pageSize} onHandlePageSize={onHandlePageSize} />
                </li>
            </ul>
            
        </div>
  );
}

export default Pagination;