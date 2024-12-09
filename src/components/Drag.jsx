import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import './Drag.css';

function Drag({ label, buttonlabel, buttonCls, bgcls, onFileDrop }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      onFileDrop(acceptedFiles); // Pass the files to the parent handler
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`drag_content ${bgcls}`}
    >
      <input {...getInputProps()} />
      <div className="drag_content_label">{label}</div>
      <br />
      <Button variant="contained" className={buttonCls}>
        {buttonlabel}
      </Button>
    </div>
  );
}

// Define prop types
Drag.propTypes = {
  label: PropTypes.string.isRequired, // Ensure `label` is a string and required
  buttonlabel: PropTypes.string.isRequired, // Ensure `buttonlabel` is a string and required
  buttonCls: PropTypes.string.isRequired, // Ensure `buttonCls` is a string and required
  bgcls: PropTypes.string.isRequired, // Ensure `bgcls` is a string and required
  onFileDrop: PropTypes.func.isRequired, // Ensure `onFileDrop` is a function and required
};

export default Drag;

