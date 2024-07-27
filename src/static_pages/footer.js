import React from 'react';

export function Footer(){
    const footerStyle = {
        bottom: '0px',
        width: '100%',
        backgroundColor: '#f8f9fa', // Background color
        boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)' // Optional: add a shadow for better separation
    };

    const footerContentStyle = {
        textAlign: 'right',
        fontSize: '14px', // Adjust font size if needed
        color: '#333' // Text color
    };

    return (
        <footer style={footerStyle}>
            <div style={footerContentStyle}>
                Built by Abhinandan Srinivas
            </div>
        </footer>
    );
}