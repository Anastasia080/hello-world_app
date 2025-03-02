import React from 'react';

const Container = ({ children }) => {
    return (
        <div style={{ padding: '20px', border: '1px solid #ccc' }}>
            {children}
        </div>
    );
};

export default Container;