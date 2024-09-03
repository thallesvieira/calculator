import Label from './Label'
import Input from './Input'

function FormGroup({text, type, disabled, onHandleSetValue, value}) {
    return (
        <div className="form-group">
            <Label text={text} />
            <Input type={type} value={value} onHandleSetValue={onHandleSetValue} disabled={disabled} />
        </div>
    )
}

export default FormGroup;