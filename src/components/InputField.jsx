import PropTypes from 'prop-types'
import './Input.css';
function InputField({placeholder, inputref, type, onChange, onKeyDown, maxLength, classNames}) {
  return (
    <input type={type} ref={inputref} placeholder={placeholder} onChange={onChange} className={`input_field ${classNames}`} onKeyDown={onKeyDown} maxLength={maxLength} required />
  )
}


InputField.propTypes = {
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onKeyDown:PropTypes.func,
    inputref: PropTypes.any,
    maxLength:PropTypes.number,
    classNames: PropTypes.string
}
export default InputField;
