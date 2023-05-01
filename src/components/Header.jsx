import React, {useState} from 'react';
import '../styles/Header.css'
// import hamburgerMenuWhite from '../images/menuWhite.svg'
// import hamburgerMenuBlack from '../images/menuBlack.svg'
const Header = (props) => {
    const [showMenu, setShowMenu] = useState(false)

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    };
    return (
        <div className={['header', props.isDarkMode ? 'white__font' : ''].join(' ')}>
            {/*<div className="left">*/}
            {/*    {props.isDarkMode ? (*/}
            {/*            <img src={hamburgerMenuWhite} alt="Menu" onClick={handleMenuClick}/>*/}
            {/*        ) : (*/}
            {/*            <img src={hamburgerMenuBlack} alt="Menu" onClick={handleMenuClick}/>*/}
            {/*        )}*/}
            {/*    <div className={["menu", showMenu ? 'menu__active' : ''].join(' ')}>*/}

            {/*    </div>*/}
            {/*</div>*/}
            <div className="right">
                {props.isLoggedIn ? (
                    <p onClick={() => {props.setIsloggedIn(false); props.setToken(''); localStorage.removeItem('token')}}>Log out</p>
                ) : (
                    <p>Log in</p>
                )}
            </div>
        </div>
    );
};

export default Header;
