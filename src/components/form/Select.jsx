import Label from "./Label";

function Select({text, options, selectedOption, onHandleOnChange}) {
    return (
        <div className="form-group">
            <Label text={text}/>
            <select className="form-control" value={selectedOption} onChange={(e) => onHandleOnChange(e.target.value)}>
                {options.map((op) => (
                <option key={op.type} value={op.name}>
                    {op.name} ({op.cost})
                </option>
                ))}
            </select>
        </div>
    )
}

export default Select;