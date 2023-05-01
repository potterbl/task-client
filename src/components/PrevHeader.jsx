import React, {useState} from 'react';
import '../styles/PrevHeader.css'
const PrevHeader = () => {
    // const [isChangeShown, setIsChangeShown] = useState(false)
    // function handleChangeShow() {
    //     setIsChangeShown(true)
    // }
    // function handleChangeHide() {
    //     setIsChangeShown(false)
    // }
    const gif = 'https://i.pinimg.com/originals/5e/c0/bb/5ec0bbf93d147bf1db6c211f14f39471.gif'
    return (
        <div style={{position: 'relative'}}>
                <div
                    className="prevHeader"
                    style={{backgroundImage: `url(${gif})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                    // onMouseEnter={handleChangeShow}
                    // onMouseLeave={handleChangeHide}
                >
                    {/*<div className={["change__bg", isChangeShown ? 'change__active' : ''].join(' ')}>*/}
                    {/*    <p>Change Background</p>*/}
                    {/*</div>*/}
                </div>
        </div>
    );
};

export default PrevHeader;