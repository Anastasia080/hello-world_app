import React from 'react';

const Container = ({ children }) => {
    return (
        <div style={{padding: '20px', border: '', marginLeft: '550px', width: '40%', marginBottom: '100px' }}>
            {children}
        </div>
    );
};

export default Container;