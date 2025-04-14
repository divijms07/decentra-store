import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `your key`,
            pinata_secret_api_key: `your secret key`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        contract.add(account, ImgHash);
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image");
      }
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    setFile(data);
    setFileName(data.name);
  };

  return (
    <div className="card">
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <label className="choose">
          Choose File
          <input type="file" onChange={retrieveFile} />
        </label>
        <p>{fileName}</p>
        <button type="submit" className="button" disabled={!file}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
