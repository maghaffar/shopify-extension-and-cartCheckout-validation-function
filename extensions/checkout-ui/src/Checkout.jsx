import {
  Banner,
  reactExtension,
  useCartLines,
} from "@shopify/ui-extensions-react/checkout";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

// const cartLineItemRender = reactExtension(
//   "purchase.checkout.cart-line-item.render-after",
//   () => <App />
// );
// export { cartLineItemRender };

// function App() {
//   const items = useCartLines();
//   console.log("Cart Line=====>>>>>", items);
//   const sub = items[0].attributes[0];
//   if (sub) {
//     console.log("Sub======>>>>>>>>", sub);
//     return <Text appearance="decorative">Thanks for your subscription</Text>;
//   } else {
//     return null;
//   }
// }

function Extension() {
  const items = useCartLines();
  console.log("Items:", items);
  let sub = false;
  items.map((item) => {
    item.attributes.map((attr) => {
      if (attr.key == "Subscription interval") {
        sub = true;
      }
    });
  });

  if (sub) {
    return <Banner title="Thanks for your subscription" />;
  } else {
    return null;
  }
}
