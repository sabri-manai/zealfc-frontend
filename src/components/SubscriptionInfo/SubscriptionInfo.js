import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import './SubscriptionInfo.css';
import Button from '../Button/Button3';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
const API_URL = process.env.REACT_APP_API_URL;

const SubscriptionInfo = ({ user }) => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [pendingPlan, setPendingPlan] = useState(null); // Plan user selected after "Change"

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

  const handleCancelSubscription = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/subscription/cancel-subscription`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);
      // Set subscription to canceled
      setSubscription(prev => prev ? { ...prev, status: 'canceled', current_period_end: null } : null);
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      alert('Failed to cancel subscription. Please try again.');
    }
  };

  const createCheckoutSession = async (plan) => {
    const stripe = await stripePromise;
    try {
      const response = await axios.post(
        `${API_URL}/subscription/create-checkout-session`,
        { plan },
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
      console.error('Error during subscription creation:', error);
      alert('An error occurred during the subscription process. Please try again.');
    }
  };

  const handleSelectPlan = async (plan) => {
    // If user has an active subscription and is choosing a new plan:
    // We'll ask for confirmation, cancel current, then subscribe to new plan.
    if (subscription && subscription.status === 'active') {
      const confirmChange = window.confirm(`This will cancel your current subscription and subscribe you to the ${plan} plan. Continue?`);
      if (!confirmChange) return;

      await handleCancelSubscription();
      // After cancel, create new subscription
      await createCheckoutSession(plan);
    } else {
      // No active subscription, just create new subscription
      await createCheckoutSession(plan);
    }
  };

  const handleRenewNow = async () => {
    if (!subscription || subscription.status !== 'active' || !subscription.type) return;
    const currentPlan = subscription.type;

    const confirmRenew = window.confirm(`This will cancel your current subscription and renew ${currentPlan} now. Continue?`);
    if (!confirmRenew) return;

    await handleCancelSubscription();
    await createCheckoutSession(currentPlan);
  };

  const handleChangeSubscription = () => {
    setShowOptions(true);
  };

  if (!token) {
    return <div>Please log in to view subscription information.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const isSubscribed = subscription && subscription.status === 'active';

  if (!isSubscribed) {
    // Not subscribed or inactive or canceled or null: Show subscription options
    return (
      <div className="subscription-info-container">
        <h2>CHOOSE WHAT SUITS YOU BEST</h2>
        <div className="subscription-options">
          <div className="option" onClick={() => handleSelectPlan('Basic')}>
            <h3>BASIC</h3>
            <p>5 credits</p>
            <p>86zł / month</p>
          </div>
          <div className="option" onClick={() => handleSelectPlan('Premium')}>
            <h3>PREMIUM</h3>
            <p>10 credits</p>
            <p>164zł / month</p>
          </div>
          <div className="option" onClick={() => handleSelectPlan('Mate')}>
            <h3>MATE</h3>
            <p>20 credits</p>
            <p>280zł / month</p>
          </div>
        </div>
      </div>
    );
  }
  
  // If we reach here, subscription is active
  const { type, status } = subscription;
  
  let credits = 0;
  let price = '';
  switch (type) {
    case 'Basic':
      credits = 5;
      price = '86zł';
      break;
    case 'Premium':
      credits = 10;
      price = '164zł';
      break;
    case 'Mate':
      credits = 20;
      price = '280zł';
      break;
    default:
      credits = 0;
      price = '';
  }
  
  return (
    <div className="subscription-info-container">
      <h2>{type ? type.toUpperCase() : 'SUBSCRIPTION'}</h2>
      <p>{credits} credits per month</p>
      <div className="price-container">
        {price && <p className="price">{price}</p>}
        <p className="status">{status ? status.toUpperCase() : 'NO SUBSCRIPTION'}</p>
      </div>
  
      <div className="subscription-actions">
        <Button variant="small" primaryText="CANCEL" onClick={handleCancelSubscription} styleType="default" />
        <Button variant="small" primaryText="RENEW NOW" onClick={handleRenewNow} styleType="default" />
        <Button variant="small" primaryText="CHANGE" onClick={handleChangeSubscription} styleType="default" />
      </div>
  
      {showOptions && (
        <div className="subscription-options">
          <div className="option" onClick={() => handleSelectPlan('Basic')}>
            <h3>BASIC</h3>
            <p>5 credits</p>
            <p>86zł / month</p>
          </div>
          <div className="option" onClick={() => handleSelectPlan('Premium')}>
            <h3>PREMIUM</h3>
            <p>10 credits</p>
            <p>164zł / month</p>
          </div>
          <div className="option" onClick={() => handleSelectPlan('Mate')}>
            <h3>MATE</h3>
            <p>20 credits</p>
            <p>280zł / month</p>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default SubscriptionInfo;
