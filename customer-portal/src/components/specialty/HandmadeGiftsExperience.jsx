import React from 'react';
import HandmadeGiftsPage from '../handmade-gifts/HandmadeGiftsPage';

export default function HandmadeGiftsExperience({
  tailors = [],
  currentUser,
  onLoginRequired,
  onAddToCart,
  onDirectCheckout,
  serviceMode = 'buying',
  onSelectServiceMode,
  theme = 'light'
}) {
  return (
    <HandmadeGiftsPage
      currentUser={currentUser}
      theme={theme}
      onAddToCart={onAddToCart}
      onDirectCheckout={onDirectCheckout}
      onLoginRequired={onLoginRequired}
    />
  );
}
