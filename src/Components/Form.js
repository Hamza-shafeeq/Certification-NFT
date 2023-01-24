import CreateNft from "./CreateNFT";
import "./form.css";
import { useState } from "react";


export default function Form({setCurrentPage}) {

  

  return (
    <div class="form-page">
      <form class="form-container">
        <div class="form-box">
          <label class="Label-text">First Name:</label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-box">
          <label class="Label-text">Last Name:</label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-box">
          <label class="Label-text">Certification Name:</label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-box">
          <label class="Label-text">Completion Month:</label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-btn">
          <button type="submit" class="btn" onClick={()=> setCurrentPage(false) }>
            Generate Certificate
          </button>
        </div>
      </form>
    </div>
  );
}
