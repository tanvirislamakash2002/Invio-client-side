export const calculateOrderTotal = (items: any[]) => {
  return items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
};