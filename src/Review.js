import React, { useState } from 'react';
import { Button } from '@mui/material';

const Review = () => {
  const [deleteReviewSection, setDeleteReviewSection] = useState(false);
  const [displayReview, setDisplayReview] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

  const floatingStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: '1000',
    padding: '10px',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    transition: '0.3s ease-in-out',
    ...(showCloseButton && { paddingRight: '40px' }), // Adjust padding for close button
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    cursor: 'pointer',
  };

  const handleRemoveFloatingDiv = () => {
    setDeleteReviewSection(true);
  };

  return (
    <>
    {deleteReviewSection ? <></> : (
    <>
      {displayReview && (
        <div
          style={floatingStyle}
        >
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdNucdJgg0M6Zz8lLOHxMduVANcYROWhNYXyXCoUYmcOTa_qA/viewform?embedded=true"
            width="640"
            height="649"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
          >
            Loading…review
          </iframe>
          <br />
          <Button variant="contained" onClick={() => setDisplayReview(false)}>
            Collapse
          </Button>
        </div>
      )}
      {!displayReview && (
        <div style={floatingStyle} onMouseEnter={() => setShowCloseButton(true)} onMouseLeave={() => setShowCloseButton(false)}>
        <Button variant="contained" onClick={() => setDisplayReview(true)}>
          Feedback
        </Button>
        {showCloseButton && (
            <span style={closeButtonStyle} onClick={handleRemoveFloatingDiv}>
              x
            </span>
          )}
        </div>
      )}
    </>
    )}
        </>
  );
};

export default Review;
