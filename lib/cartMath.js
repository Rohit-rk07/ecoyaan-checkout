export function formatPrice(value) {
  return `Rs. ${Number(value).toLocaleString("en-IN")}`;
}

export function getCartTotals(cart) {
  const items = cart?.cartItems || [];
  const shipping = Number(cart?.shipping_fee || 0);
  const discount = Number(cart?.discount_applied || 0);
  const subtotal = items.reduce((runningTotal, item) => {
    return runningTotal + item.product_price * item.quantity;
  }, 0);

  return {
    itemCount: items.reduce((count, item) => count + item.quantity, 0),
    subtotal,
    shipping,
    discount,
    total: subtotal + shipping - discount,
  };
}
