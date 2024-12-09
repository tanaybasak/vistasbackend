import PropTypes from 'prop-types';
import './ChipItem.css';
import { Chip } from '@mui/material';
function ChipItem({selected, label}) {
  return (
    <Chip  label={label} className={`chip ${selected ? 'selected' : '' }`} variant={'outlined'}  />
  )
}

ChipItem.propTypes = {
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool,
};


export default ChipItem;
