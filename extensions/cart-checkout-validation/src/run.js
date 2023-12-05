// @ts-check

// Use JSDoc annotations for type safety
/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

// The configured entrypoint for the 'purchase.validation.run' extension target
/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const snowboard = input.cart.buyerIdentity?.customer?.snowboard;
  const skiwax = input.cart.buyerIdentity?.customer?.tag;
  const numberOfOrders = input.cart.buyerIdentity?.customer?.numberOfOrders;
  const obj = JSON.stringify(input.cart.lines);
  const merch = JSON.parse(obj);
  let title = [];
  merch.map((mer) => {
    title.push(mer.merchandise.product.handle);
  });
  const error = {
    localizedMessage: `You already purchased a product which you can only buy for once.`,
    target: "cart",
  };

  const errors = [];
  title.map((t) => {
    if (t == "sample-the-archived-snowboard" && snowboard) {
      errors.push(error);
    } else if (t == "selling-plans-ski-wax" && skiwax) {
      errors.push(error);
    }
  });

  return { errors };
}
