// types/midtrans-client.d.ts
declare module 'midtrans-client' {
  // Configuration interfaces
  export interface SnapConfig {
    isProduction: boolean;
    serverKey: string;
    clientKey: string;
  }

  export interface CoreApiConfig {
    isProduction: boolean;
    serverKey: string;
    clientKey: string;
  }

  // Transaction parameter interfaces
  export interface TransactionDetails {
    order_id: string;
    gross_amount: number;
  }

  export interface CustomerDetails {
    first_name: string;
    last_name?: string;
    email: string;
    phone: string;
  }

  export interface ItemDetails {
    id: string;
    price: number;
    quantity: number;
    name: string;
  }

  export interface CreditCardOptions {
    secure?: boolean;
    bank?: string;
    installment?: {
      required: boolean;
      terms: {
        [bank: string]: number[];
      };
    };
  }

  export interface CallbackUrls {
    finish?: string;
    error?: string;
    pending?: string;
  }

  export interface Expiry {
    unit: 'minutes' | 'hour' | 'day';
    duration: number;
  }

  export interface SnapTransactionParameter {
    transaction_details: TransactionDetails;
    customer_details?: CustomerDetails;
    item_details?: ItemDetails[];
    credit_card?: CreditCardOptions;
    callbacks?: CallbackUrls;
    expiry?: Expiry;
    enabled_payments?: string[];
    custom_field1?: string;
    custom_field2?: string;
    custom_field3?: string;
  }

  // Response interfaces
  export interface SnapTransactionResponse {
    token: string;
    redirect_url: string;
  }

  export interface TransactionStatusResponse {
    transaction_id: string;
    order_id: string;
    gross_amount: string;
    payment_type: string;
    transaction_time: string;
    transaction_status: 'capture' | 'settlement' | 'pending' | 'deny' | 'cancel' | 'expire' | 'failure';
    fraud_status?: 'accept' | 'challenge' | 'deny';
    status_code: string;
    signature_key: string;
    bank?: string;
    va_numbers?: Array<{
      va_number: string;
      bank: string;
    }>;
    bill_key?: string;
    biller_code?: string;
    pdf_url?: string;
    finish_redirect_url?: string;
  }

  export interface CancelTransactionResponse {
    status_code: string;
    status_message: string;
    transaction_id: string;
    order_id: string;
    gross_amount: string;
    payment_type: string;
    transaction_time: string;
    transaction_status: string;
    fraud_status: string;
  }

  // Snap class
  export class Snap {
    constructor(config: SnapConfig);
    createTransaction(parameter: SnapTransactionParameter): Promise<SnapTransactionResponse>;
  }

  // CoreApi class
  export class CoreApi {
    constructor(config: CoreApiConfig);
    transaction: {
      status(orderId: string): Promise<TransactionStatusResponse>;
      cancel(orderId: string): Promise<CancelTransactionResponse>;
      approve(orderId: string): Promise<any>;
      deny(orderId: string): Promise<any>;
      expire(orderId: string): Promise<any>;
      refund(orderId: string, parameter?: any): Promise<any>;
    };
    charge(parameter: any): Promise<any>;
  }

  // Iris class (for disbursement)
  export class Iris {
    constructor(config: any);
  }

  // Main export
  const midtransClient: {
    Snap: typeof Snap;
    CoreApi: typeof CoreApi;
    Iris: typeof Iris;
  };

  export default midtransClient;
}