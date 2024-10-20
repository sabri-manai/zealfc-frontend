// SubscriptionInfo.js

import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import './SubscriptionInfo.css';
import Button from '../Button/Button';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const SubscriptionInfo = ({ user }) => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user._id) {
      const fetchSubscription = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/subscription/${user._id}`);
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
  }, [user]);

  const handleSubscribe = async () => {
    const stripe = await stripePromise;

    try {
      const response = await axios.post('http://localhost:5000/subscription/create-checkout-session', {
        userId: user._id,
        email: user.email,
      });

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
    if (!subscription || !subscription.id) {
      alert('No active subscription to cancel.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/subscription/cancel-subscription', {
        subscriptionId: subscription.id,
        userId: user._id,
      });
      alert(response.data.message);
      setSubscription(null); // Update the subscription state
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      alert('Failed to cancel subscription. Please try again.');
    }
  };

  const handleChangeSubscription = () => {
    alert('Change Subscription Plan!');
    // Implement change plan logic
  };

  if (!user) {
    console.error('User is undefined in SubscriptionInfo component.');
    return <div>Please log in to view subscription information.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // Determine if the user has an active subscription
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

      {!isSubscribed && <Button text="PAY NOW" onClick={handleSubscribe} />}

      {isSubscribed && (
        <div className="subscription-actions">
          <Button text="CANCEL" onClick={handleCancelSubscription} />
          <Button text="CHANGE" onClick={handleChangeSubscription} />
        </div>
      )}
    </div>
  );
};

export default SubscriptionInfo;
