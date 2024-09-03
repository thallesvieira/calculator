function Error({message}) {
    return (
        <div className="error-container mt-3">
            <h4>Error:</h4>
            <p className="text-danger">{message}</p>
          </div>
    )
}

export default Error;