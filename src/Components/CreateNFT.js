import React, { useState, useContext } from "react";
import Context from "../context/contractContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ContractState } from "../context/contractState";
import { mintNFT } from "../scripts/mintNFT";
// https://gateway.pinata.cloud/ipfs/QmYXEZGtq2pSS7ESzSxHvzqWBokqAmwSB6UiEJAzx8CM2u

//https://ipfs.io/ipfs/QmYXEZGtq2pSS7ESzSxHvzqWBokqAmwSB6UiEJAzx8CM2u

export default function CreateNft() {
  //  const context = useContext(Context);
  // const BASE_URI = process.env.REACT_APP_BASE_URI;

  //  const contractFunction = context.contractFunction;
  const [File, setFile] = useState(null);
  const [FileHash, setFileHash] = useState(null);
  const [MetaDataHash, setMetaDataHash] = useState(null);
    //   "https://gateway.pinata.cloud/ipfs/{QmXbszbdtEh6xDYgSaubwG2UESN7mRVpWSLakuWwbv2i4i}"
    // );
  const [IsDisabled, setIsDisabled] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFileUpload = async (e) => {
    console.log("handling file upload");
    setFile(e.target.files[0]);
  };

  const sendFileToIPFS = async (data, fileName) => {
    try {
      const formData = new FormData();
      formData.append("file", data, fileName);

      console.log("sending file to IPFS..........");
      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS", //pinJSONToIPFS
        data: formData,
        headers: {
          pinata_api_key: `441ee39c1cb480525046`, //${process.env.REACT_APP_PINATA_API_KEY}
          pinata_secret_api_key: `36740f1e0bd423e6c0efdc032d0ead316fd625e6ff888b141047c08012995142`, //${process.env.REACT_APP_PINATA_API_SECRET}
          "Content-Type": "multipart/form-data",
        },
      });

      if (resFile) {
        // const ImgHash = `https://ipfs.io/ipfs/${resFile.data.IpfsHash}`;
        setFileHash(resFile.data.IpfsHash);
        return resFile.data.IpfsHash;
        // console.log("File successfully sent to IPFS", ImgHash);
      }
    } catch (error) {
      alert("Error sending File to IPFS: ");
      console.log("Error sending File to IPFS: ");
      console.log(error);
    }
  };

  const sendMetaDataToIPFS = async (filehash) => {
    try {
      if (filehash) {
        const metaData = JSON.stringify({
          name: document.getElementById("name").value,
          description: document.getElementById("desc").value,
          image: `https://ipfs.io/ipfs/${filehash}`,
        });

        console.log("sending json to IPFS..........");
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinJSONToIPFS", //pinFileToIPFS
          data: metaData,
          headers: {
            pinata_api_key: `441ee39c1cb480525046`, //${process.env.REACT_APP_PINATA_API_KEY}
            pinata_secret_api_key: `36740f1e0bd423e6c0efdc032d0ead316fd625e6ff888b141047c08012995142`, //${process.env.REACT_APP_PINATA_API_SECRET}
            "Content-Type": "application/json",
          },
        });

        if (resFile) {
          setMetaDataHash(resFile.data.IpfsHash);
          return resFile.data.IpfsHash;
        }
      } else {
        alert("Error. null file hash ");
        console.log("Error. null file hash");
      }
    } catch (error) {
      alert("Error sending json to IPFS: ");
      console.log("Error sending json to IPFS: ");
      console.log(error);
    }
  };

  async function uploadDataToIPFS() {
    const responseFuncOne = await sendFileToIPFS(File, File.name);
    if (responseFuncOne) {
      setFileHash(responseFuncOne);
      const responseFuncTwo = await sendMetaDataToIPFS(responseFuncOne);
      if (responseFuncTwo) {
        setMetaDataHash(responseFuncTwo);
        return responseFuncTwo;
      }
    }
  }

  const onSubmit = () => {
    try {
      mintNft();
    } catch (error) {
      alert("Error while parsing the inputs");
      console.log(error);
    }
  };

  const mintNft = async () => {
    try {
      if (File) {
        setIsDisabled(true);
        let metaHash = await uploadDataToIPFS();

        if (metaHash) {
          mintNFT(BASE_URI+metaHash);
          console.log(metaHash)
        
    //       const to = document.getElementById("to").value;
    // //       // const tknId = document.getElementById("tknId").value;
    //       ContractState.contractFunction.mint( to, metaHash)
        
    //     } else {
    //       alert("Error while uploading the files");
    //       console.log("Error while uploading the files");
    //     }
    //   } else {
    //     alert("Cant mint Nft. invalid copy or null file");
    //     console.log("Cant mint Nft. invalid copy or null file");
    //     console.log(File);
        }
     }
    }
        
     catch (error) {
      alert("Exception thrown while calling mint nft function");
      console.log(error);
     }
  

  
    }

  return (
    <>
      {/* <h2 style={{ textAlign: "center" }}> */}
      {/* logged in address: - {context.account.address} */}
      {/* </h2> */}
      <h4 style={{ textAlign: "center" }}>File Hash: {FileHash}</h4>
      <h4 style={{ textAlign: "center" }}>Metadata Hash: {MetaDataHash}</h4>

      {/* <div className="container mt-5"> */}
      {/* <div className="row justify-content-center"> */}
      <div className="form-page ">
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-box">
            <label htmlFor="name" class="Label-text">
              <b>To</b>
            </label>
            <input
              type="text"
              class="input-field"
              id="to"
              placeholder="To"
              {...register("to", { required: true })}
            />
            {errors.name && <p style={{ color: "red" }}>Required</p>}
          </div>

          <div className="form-box">
            <label htmlFor="name" class="Label-text">
              <b>Token Id</b>
            </label>
            <input
              type="text"
              class="input-field"
              id="tknId"
              placeholder="Token Id"
              {...register("tknId", { required: true })}
            />
            {errors.name && <p style={{ color: "red" }}>Required</p>}
          </div>

          <div className="form-box">
            <label htmlFor="name" class="Label-text">
              <b>NFT Name</b>
            </label>
            <input
              type="text"
              class="input-field"
              id="name"
              placeholder="name"
              {...register("name", { required: true })}
            />
            {errors.name && <p style={{ color: "red" }}>Required</p>}
          </div>

          <div className="form-box">
            <label htmlFor="desc" class="Label-text">
              <b>Description</b>
            </label>
            <input
              type="text"
              class="input-field"
              id="desc"
              placeholder="details"
              {...register("desc", { required: true })}
            />
            {errors.desc && <p style={{ color: "red" }}>Required</p>}
          </div>

          <div className="form-box">
            <label htmlFor="file" class="Label-text">
              <b>Asset</b>
            </label>
            <input
              type="file"
              className="form-control form-control-file mt-2"
              id="file"
              onChange={handleFileUpload}
              required
            />
          </div>
          <div class="form-btn">
            <button className="btn" type="submit" disabled={IsDisabled}>
              <b>Mint</b>
            </button>
          </div>
        </form>
      </div>
      {/* </div> */}
      {/* </div> */}
    
      {/* <img src="https://ipfs.io/ipfs/QmYXEZGtq2pSS7ESzSxHvzqWBokqAmwSB6UiEJAzx8CM2u" alt="" /> */}
    </>
  );

    
};