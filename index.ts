import { MercadoPago } from "./methods/mercadopago";

const mercadoPago = new MercadoPago("ACCESS_TOKEN", {
  idempotencyKey: "ImpotencyKey",
});

const paymentBody = {
  transaction_amount: 1,
  description: "Test payment",
  payment_method_id: "mastercard",
  payer: {
    email: "abc@abc.com",
  },
};

mercadoPago.createPayment(paymentBody).then((response) => {
  console.log("Payment created:", response);
});
