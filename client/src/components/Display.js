import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState([]);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const getdata = async () => {
    let dataArray;
    setLoading(true);

    try {
      if (address) {
        dataArray = await contract.display(address);
      } else {
        dataArray = await contract.display(account);
      }

      const isEmpty = Object.keys(dataArray).length === 0;

      if (!isEmpty) {
        const str = dataArray.toString();
        const str_array = str.split(",");

        const images = str_array.map((item, i) => {
          const ipfsHash = item.substring(6);
          return {
            url: `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
            id: i,
          };
        });

        setData(images);
      } else {
        setData([]);
        alert("No images to display");
      }
    } catch (e) {
      console.error(e);
      setData([]);
      alert("You don't have access to view these images");
    }

    setLoading(false);
  };

  return (
    <div className="display-container">
      <div className="access-controls">
        <input
          type="text"
          placeholder="Enter wallet address"
          className="address-input"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          className={`fetch-button ${loading ? "loading" : ""}`}
          onClick={getdata}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Images"}
        </button>
      </div>

      {data.length > 0 ? (
        <div className="image-grid">
          {data.map((image) => (
            <div className="image-card" key={image.id}>
              <a href={image.url} target="_blank" rel="noreferrer">
                <img src={image.url} alt={`User content ${image.id}`} />
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-images">
          <p>
            {loading
              ? "Fetching images..."
              : "No images to display. Use the button above to fetch images."}
          </p>
        </div>
      )}
    </div>
  );
};

export default Display;
