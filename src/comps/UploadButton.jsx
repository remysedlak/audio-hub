import React from 'react';

const UploadButton = ({ onFileChange }) => {
  const handleClick = () => {
    document.getElementById('audioInput').click();
  };

  return (
    <div>
      <button onClick={handleClick}>Upload Audio</button>
      <input
        type="file"
        id="audioInput"
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
    </div>
  );
};

export default UploadButton;