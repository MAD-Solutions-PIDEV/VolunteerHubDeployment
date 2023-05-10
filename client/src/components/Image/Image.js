import React, { useState } from "react";

const ImageUpload = ({ name, placeholder }) => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div>
      <label htmlFor={name}>{placeholder}</label>
      <input type="file" name={name} onChange={handleFileUpload} />
      {file && <p>File selected: {file.name}</p>}
    </div>
  );
};

export default ImageUpload;
