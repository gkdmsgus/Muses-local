// types/order.ts

export interface OrderItem {
  orderId: number;
  title: string;
  status: string;
  paymentStatus: string;
  amount: string;
  date: string;
}

export interface OrderDetail {
  orderId: number;
  projectTitle: string;
  opening: string;
  locationDetail: string;
  optionTitle: string;
  optionDescription: string;
  quantity: number;
  paidAt: string;
  paymentProvider: string;
  amount: number;
  orderStatus: number;
  paymentStatus: string;
}

export interface OrderListResponse {
  success: boolean;
  data: {
    items: OrderItem[];
  };
}

export interface OrderDetailResponse {
  success: boolean;
  data: OrderDetail;
}
