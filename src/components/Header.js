import logo from '../images/header-logo.svg';

function Header(props) {
    return (
        <header className={props.class}>
          <img className="header__logo" alt="Логотип мест" src={logo} />
        </header>
    );
}
  
export default Header;