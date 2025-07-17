function formatOrder(result) {
  const products = result.orderDetails.productsResults;
  const orderCurrency = result.orderDetails.payments.orderCurrency;

  const sumOrderCosts =
    (orderCurrency.orderProductsCost || 0) +
    (orderCurrency.orderDeliveryCost || 0) +
    (orderCurrency.orderPayformCost || 0) +
    (orderCurrency.orderInsuranceCost || 0);

  const orderInfo = {
    orderID: result.orderId,
    products: products.map((product) => ({
      productID: product.productId,
      quantity: product.productQuantity,
    })),
    orderWorth: sumOrderCosts,
  };

  return orderInfo;
}

function formatOrderToCSVRow(order, headers) {
  return headers
    .map((header) => {
      let value = order[header];

      if (header === "products" && Array.isArray(value)) {
        return `[${value
          .map(
            (product) =>
              `productID:${product.productID},quantity:${product.quantity}`
          )
          .join(";")}]`;
      }

      if (typeof value === "string" && value.includes(",")) {
        return `"${value}"`;
      }

      return value;
    })
    .join(",");
}

module.exports = { formatOrder, formatOrderToCSVRow };
