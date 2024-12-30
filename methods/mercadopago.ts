import { MercadoPagoConfig, Payment } from "mercadopago";

type MercadoPagoOptions = {
  timeout?: number;
  idempotencyKey?: string;
};

type PaymentRequestBody = {
  transaction_amount: number;
  description: string;
  payment_method_id: string;
  payer: {
    email: string;
  };
};

type PaymentRequestOptions = {
  idempotencyKey?: string;
};

export class MercadoPago {
  private client: MercadoPagoConfig;
  private payment: Payment;

  constructor(accessToken: string, options?: MercadoPagoOptions) {
    try {
      this.client = new MercadoPagoConfig({
        accessToken,
        options,
      });
      this.payment = new Payment(this.client);
    } catch (error) {
      throw new Error(`Failed to initialize MercadoPago: ${error}`);
    }
  }

  async createPayment(
    body: PaymentRequestBody,
    requestOptions?: PaymentRequestOptions
  ): Promise<any> {
    try {
      const response = await this.payment.create({ body, requestOptions });
      return response;
    } catch (error) {
      console.error("Payment creation failed:", error);
      throw new Error(`Payment creation failed: ${error}`);
    }
  }
}
