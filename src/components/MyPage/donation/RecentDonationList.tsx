import { useEffect, useState } from 'react';
import DonationItem from './DonationItem';
import DetailDonationItem from './DetailDonationItem';
import type { OrderItem, OrderDetail } from '../types/order';
import { fetchMyOrders, fetchOrderDetail } from '../../../api/orders';

const RecentDonations = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [detail, setDetail] = useState<OrderDetail | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchMyOrders();
      setOrders(data);
    };

    load();
  }, []);

  useEffect(() => {
    if (!selectedId) return;

    const loadDetail = async () => {
      const data = await fetchOrderDetail(selectedId);
      setDetail(data);
    };

    loadDetail();
  }, [selectedId]);

  return (
    <>
      <div className="flex flex-col gap-4">
        {orders.map((item) => (
          <DonationItem
            key={item.orderId}
            item={item}
            onSelect={setSelectedId}
          />
        ))}
      </div>

      {selectedId && detail && (
        <DetailDonationItem
          item={detail}
          onClose={() => {
            setSelectedId(null);
            setDetail(null);
          }}
        />
      )}
    </>
  );
};

export default RecentDonations;
