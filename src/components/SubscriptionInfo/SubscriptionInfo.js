// src/components/SubscriptionInfo/SubscriptionInfo.js

import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import './SubscriptionInfo.css';
import Button from '../Button/Button3'; // Updated import
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
const API_URL = process.env.REACT_APP_API_URL;

const SubscriptionInfo = ({ user }) => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false); 

  const token = localStorage.getItem('idToken');

  useEffect(() => {
    if (token) {
      const fetchSubscription = async () => {
        try {
          const response = await axios.get(`${API_URL}/subscription`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200 && response.data.subscription) {
            setSubscription(response.data.subscription);
          } else {
            setSubscription(null);
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setSubscription(null);
          } else {
            console.error('Error fetching subscription:', error);
          }
        } finally {
          setLoading(false);
        }
      };

      fetchSubscription();
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleSubscribe = async () => {
    const stripe = await stripePromise;

    try {
      const response = await axios.post(
        `${API_URL}/subscription/create-checkout-session`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { id: sessionId } = response.data;
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.error('Stripe error:', result.error.message);
        alert(result.error.message);
      }
    } catch (error) {
      console.error('Error during subscription:', error);
      alert('An error occurred during the subscription process. Please try again.');
    }
  };

  const handleCancelSubscription = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/subscription/cancel-subscription`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);
      setSubscription({
        ...subscription,
        status: 'canceled',
        current_period_end: null,
      });
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      alert('Failed to cancel subscription. Please try again.');
    }
  };

  const handleChangeSubscription = () => {
    setShowOptions(true); 
  };

  const handleSelectPlan = (plan) => {
    alert(`You selected the ${plan} plan!`);
    setShowOptions(false);
  };

  if (!token) {
    return <div>Please log in to view subscription information.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const isSubscribed =
    subscription && subscription.status && subscription.status !== 'canceled';

  return (
    <div className="subscription-info-container">
      <h2>PREMIUM</h2>
      <p>10 credits per month</p>
      <div className="price-container">
        <p className="price">25€</p>
        <p className="status">
          {subscription && subscription.status
            ? subscription.status.toUpperCase()
            : 'NO SUBSCRIPTION'}
        </p>
      </div>

      {!isSubscribed && (
        <div className="subscription-actions">
          <Button
            variant="small"
            primaryText="PAY NOW"
            onClick={handleSubscribe}
            styleType="default"
          />
        </div>
      )}
      {isSubscribed && (
        <div className="subscription-actions">
          <Button variant="small" primaryText="CANCEL" onClick={handleCancelSubscription} styleType="default" />
          <Button variant="small" primaryText="RENEW NOW" onClick={handleSubscribe} styleType="default" />
          <Button variant="small" primaryText="CHANGE" onClick={handleChangeSubscription} styleType="default" />
        </div>
      )}

      {showOptions && (
        <div className="subscription-options">
          <div className="option" onClick={() => handleSelectPlan('Basic')}>
            <h3>BASIC</h3>
            <p>5 credits</p>
            <p>15€ / month</p>
          </div>
          
          <div className="option" onClick={() => handleSelectPlan('Premium')}>
            <h3>PREMIUM</h3>
            <p>10 credits</p>
            <p>25€ / month</p>
          </div>
          <div className="option" onClick={() => handleSelectPlan('Mate')}>
            <h3>MATE</h3>
            <p>20 credits</p>
            <p>40€ / month</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionInfo;
