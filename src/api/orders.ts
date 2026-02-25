import axiosInstance from './axiosInstance';
import ENDPOINTS from './endpoints';
import type { OrderItem, OrderDetail } from '../components/MyPage/types/order';

export const fetchMyOrders = async (): Promise<OrderItem[]> => {
  const res = await axiosInstance.get(ENDPOINTS.MY_ORDER);
  const items = res.data.data.items;
    return items.map((item: any) => ({
    orderId: item.orderId,
    initial: item.projectTitle[0],
    status: item.orderStatus,
    date: item.displayDate.split('T')[0],
    title: item.projectTitle,
    paymentStatus: item.paymentStatus,
    amount: item.amount,
  }));
};

export const fetchOrderDetail = async (
  orderId: number
): Promise<OrderDetail> => {
  const res = await axiosInstance.get(
    ENDPOINTS.MY_DETAIL_ORDER,
    { params: { orderId } }
  );

  const d = res.data.data;
  
return {
  orderId: d.orderId,
  projectTitle: d.projectTitle,
  opening: d.opening,
  locationDetail: d.locationDetail,
  optionTitle: d.optionTitle,
  optionDescription: d.optionDescription,
  quantity: d.quantity,
  paidAt: d.paidAt,
  paymentProvider: d.paymentProvider,
  amount: d.amount,
  orderStatus: d.orderStatus,
  paymentStatus: d.paymentStatus,
};

};
