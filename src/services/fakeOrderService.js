const orders = [
  {
    order_id: 1,
    customer_id: 1,
    employee_id: 1,
    date: "2021-09-30",
  },
];

const cart = [
  {
    order_id: 1,
    product_id: 1,
    quantity: 1,
  },
  {
    order_id: 1,
    product_id: 2,
    quantity: 2,
  },
  {
    order_id: 1,
    product_id: 3,
    quantity: 3,
  },
];

export function saveOrder(employee, customer, cart) {
  const order_id = orders.length + 1;
  const order = {
    order_id,
    customer_id: customer.id,
    employee_id: employee.id,
    date: new Date().toISOString().slice(0, 10),
  };
  const orderDetails = cart.map((item) => {
    return {
      order_id,
      product_id: item.product_id,
      quantity: item.quantity,
    };
  });

  orders.push(order);
  orderDetails.forEach((item) => cart.push(item));
}
