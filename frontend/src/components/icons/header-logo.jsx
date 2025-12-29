import headerLogo from "../../assets/logos/header-logo.svg";

const HeaderLogo = ({ color }) => {
    return (
        <img src={headerLogo} alt="Header Logo" style={{ color }} />
    )
}

export default HeaderLogo;
