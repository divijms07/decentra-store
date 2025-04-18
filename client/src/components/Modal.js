import { useEffect, useState } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const [address, setAddress] = useState("");
  const [accessList, setAccessList] = useState([]);
  const [loading, setLoading] = useState(false);

  const sharing = async () => {
    if (!address) {
      alert("Please enter an address");
      return;
    }

    try {
      setLoading(true);
      await contract.allow(address);
      alert(`Access granted to ${address}`);
      setModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Failed to grant access");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAccessList = async () => {
      try {
        const list = await contract.shareAccess();
        setAccessList(list);
      } catch (error) {
        console.error("Failed to fetch access list:", error);
      }
    };

    if (contract) {
      fetchAccessList();
    }
  }, [contract]);

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Share Access</h3>
          <button className="close-button" onClick={() => setModalOpen(false)}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="input-group">
            <label htmlFor="share-address">Enter wallet address</label>
            <input
              type="text"
              id="share-address"
              className="address-input"
              placeholder="0x..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {accessList.length > 0 && (
            <div className="access-list">
              <h4>People with access</h4>
              <div className="access-list-container">
                {accessList.map((item, index) => (
                  <div className="access-item" key={index}>
                    <div className="access-address">
                      {item.user.substring(0, 6)}...
                      {item.user.substring(item.user.length - 4)}
                    </div>
                    <div
                      className={`access-status ${
                        item.access ? "granted" : "revoked"
                      }`}
                    >
                      {item.access ? "Access Granted" : "Access Revoked"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="cancel-button" onClick={() => setModalOpen(false)}>
            Cancel
          </button>
          <button
            className={`share-button ${loading ? "loading" : ""}`}
            onClick={sharing}
            disabled={loading || !address}
          >
            {loading ? "Processing..." : "Grant Access"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
