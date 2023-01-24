import logo from "../Images/logo.png";
import "./header.css";
import MetamaskButton from "./MetamaskButton";

export default function Header() {
  return (
    <>
      <div class="header-container">
        <div class="logo">
          <img src={logo} class="logo-image"></img>
        </div>

        <h1 class="heading-title">CERTIFICATIONS</h1>
        <MetamaskButton />
      </div>
    </>
  );
}
