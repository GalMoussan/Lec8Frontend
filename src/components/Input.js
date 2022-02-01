const Input = (props) => {
    let inputClassName = 'form-control'

    if (props.hasError !== undefined) {
        inputClassName += props.hasError ? ' is-invalid' : ' is-valid'
    }


    return (
        <div>
            {props.label && <label>{props.label}</label>}
            <input
                className={inputClassName}
                onChange={props.onChange}
                placeholder={props.placeholder}
                value={props.value}
                type={props.type ?? 'text'}
            />
            {
                props.hasError &&
                <div className="invalid-feedback">
                    {props.error}
                </div>
            }
        </div>
    )
}

export default Input