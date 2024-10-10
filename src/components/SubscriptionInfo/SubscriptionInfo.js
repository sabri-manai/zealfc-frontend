import React from 'react';
import './SubscriptionInfo.css';
import Button from '../Button/Button'; // Assuming you're using the Button component

const SubscriptionInfo = () => {
  return (
    <div className="subscription-info-container">
      <h2>PREMIUM</h2>
      <p>10 credits per month</p>
      <div className="price-container">
        <p className="price">25€</p>
        <p className="status">PENDING</p>
      </div>

      <Button text="PAY NOW" onClick={() => alert('Payment initiated!')} />

      <div className="subscription-actions">
        <Button text="CANCEL" onClick={() => alert('Subscription Cancelled!')} />
        <Button text="CHANGE" onClick={() => alert('Change Subscription Plan!')} />
      </div>
    </div>
  );
};

export default SubscriptionInfo;
