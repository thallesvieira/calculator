function SelectPagination({onHandlePageSize, pageSize}) {
    return (
        <select className="form-control" value={pageSize} onChange={(e) => onHandlePageSize(Number(e.target.value))}>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
        </select>
    )
}

export default SelectPagination;