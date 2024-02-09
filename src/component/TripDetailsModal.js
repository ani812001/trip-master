import React, { useState } from 'react';
function TripDetailsModal({ tripId, heading, additionalDetails, text, closeModal }) {
    return (
        <div className="modal">
            <div className="modal-content">
                
                <h2>{tripId} {heading}</h2>
                <p>{text}</p>
                this is me
                <h3>Additional Details: </h3>
                <ul>
                    {additionalDetails.map((additionalDetails , index)=>(
                        <li key={index}>{additionalDetails}</li>    
                    ))}
                </ul>
                <button onClick={closeModal}>Close</button>
            </div>
    
        </div>
    );
}

export default TripDetailsModal;