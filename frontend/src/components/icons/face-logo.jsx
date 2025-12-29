import faceLogo from "../../assets/logos/face-logo.svg";

const FaceLogo = ({ color }) => {
    return (
        <img src={faceLogo} alt="Face Logo" style={{ color }} />
    )
}

export default FaceLogo;
