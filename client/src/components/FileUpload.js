import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No File selected");
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `97fd7cfdb44bcf4d2fb9`,
            pinata_secret_api_key: `30174d825857930c123554f506a551d657bbd79ee2fef66c05146e69f21ccf8b`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        await contract.add(account, ImgHash);

        setUploading(false);
        alert("Successfully uploaded File");
        setFileName("No File selected");
        setFile(null);
      } catch (e) {
        setUploading(false);
        alert("Unable to upload File to Pinata");
        console.error(e);
      }
    } else {
      alert("Please select an File first");
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    if (!data) return;

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <div className="file-upload-container">
      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="file-input-container">
          <input
            disabled={!account}
            type="file"
            id="file-upload"
            name="data"
            onChange={retrieveFile}
            className="file-input"
          />
          <label htmlFor="file-upload" className="file-label">
            <span className="file-icon">📁</span>
            <span className="file-text">Choose File</span>
          </label>
        </div>

        <div className="file-name-display">
          <span>{fileName}</span>
        </div>

        <button
          type="submit"
          className={`upload-button ${uploading ? "uploading" : ""} ${
            !file ? "disabled" : ""
          }`}
          disabled={!file || uploading}
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
