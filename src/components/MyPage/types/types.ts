// types/types.ts

export interface DonationItemType {
  orderId: number;

  // 리스트용
  initial: string;
  status: string;
  date: string;
  title: string;
  amount: string;

  // 상세용 (모달에서 사용)
  opening?: string;
  locationDetail?: string;
  optionTitle?: string;
  optionDescription?: string;
  quantity?: number;
  paidAt?: string;
  paymentProvider?: string;
}
