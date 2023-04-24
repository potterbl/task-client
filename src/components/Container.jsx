import React from 'react';
import '../styles/Container.css'

const Container = ({children, style}) => {
    return (
        <div style={style} className={'container'}>
            {children}
        </div>
    );
};

export default Container;