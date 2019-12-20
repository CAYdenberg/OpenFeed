import React from 'react';

export const Alert = () => {
  if (!props.message) return null;

  return (
    <div className="message-wrapper">
      <div className="message is-warning" aria-live="polite">
        <div className="message-header">
          {props.message}
          <button
            className="delete"
            aria-label="delete"
            onClick={props.dismiss}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
