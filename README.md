# Decentralized File Upload and Sharing

## Features

- **Decentralized Storage:** Files are uploaded to IPFS, ensuring decentralized and immutable storage.
- **Smart Contract:** Utilizes Solidity smart contracts on the Ethereum blockchain for access control and ownership management.
- **Access Control:** Users can grant or revoke access to their uploaded Files to specific individuals through the smart contract.

## Technologies Used

- **Solidity:** Smart contract development for ownership and access control.
- **React:** Front-end interface for uploading Files and managing access.
- **IPFS:** Decentralized storage protocol for hosting uploaded Files.

## Usage

### Installation

1. Clone the repository:

2. Install dependencies for the hardhat:

   ```bash
   # Navigate to the root directory
   cd <Repo Name>
   # Install hardhat dependencies
   npm install
   ```

3. Compile the smart contract for artifacts:

   ```bash
   # Compile Smart Contract
   npx hardhat compile
   ```

4. Deploy the Solidity smart contract to an Ethereum testnet or local development environment.
   ```bash
   # Deploy Smart Contract
   npx hardhat run scripts/deploy.js --network <network-name>
   ```
5. Install dependencies for the React front end:
   ```bash
   # Navigate to the React client directory
   cd client
   # Install React dependencies
   npm install
   ```
6. Run the react application:
   ```bash
   # Start React Application
   npm start
   ```

### Configuration

1. Set up environment variables:

   - Obtain API keys for Pinata to interact with IPFS.
   - Update the React component (FileUpload.js) with your Pinata API keys.

### Usage

Once the setup and configuration are complete, follow these steps to utilize the decentralized File upload and sharing system:

1. **Install Metamask:**

   - Ensure Metamask is installed and configured in your browser for Ethereum interactions.

2. **Update Contract Address:**

   - After smart contract deployment, make sure to update the contract address in `App.js` within the React application.

3. **Upload File before "Get Data":**

   - Click "Get Data" only after uploading an File on Pinata. Otherwise, it will throw an error stating "You don't have access".

4. **Accessing Other User Files:**
   - Use the "Get Data" button to access other users' Files. Input the user's address in the designated box, but remember, you can only access their Files if they've granted you access through the smart contract. Otherwise, it will throw an error saying "You don't have access".

These steps will ensure smooth navigation and utilization of the system while maintaining access control and avoiding potential errors.
