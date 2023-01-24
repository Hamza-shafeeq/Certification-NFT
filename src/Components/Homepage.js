import { useState } from "react";
import CreateNft from "./CreateNFT";
import Form from "./Form";
import Header from "./Header";
import './homepage.css';


export default function Homepage() {
const [currentPage, setCurrentPage]= useState(true);

  return (
    <>
      <div class="container">
        <Header />
      
        {currentPage && <Form setCurrentPage={setCurrentPage}/>}
       { !currentPage && <CreateNft />}
      </div>
    </>
  );
}
