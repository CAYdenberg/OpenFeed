import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMostImportantMessage } from '../store/selectors';
import { notificationActions } from '../store/actions';

export const Alert = () => {
  const { index, message } = useSelector(getMostImportantMessage);
  const dispatch = useDispatch();

  const handleDismiss = useCallback(() => {
    dispatch(notificationActions.dismiss(index));
  }, [index]);

  useEffect(() => {
    if (message && message.timeout) {
      setTimeout(() => {
        dispatch(notificationActions.dismiss(index));
      }, message.timeout);
    }
  }, [index]);

  if (!message) return null;

  return (
    <div className="message-wrapper">
      <div className={`message is-${message.level}`} aria-live="polite">
        <div className="message-header">
          {message.text}
          {message.isDismissable && (
            <button
              className="delete"
              aria-label="delete"
              onClick={handleDismiss}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
