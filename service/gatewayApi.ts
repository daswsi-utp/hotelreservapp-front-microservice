import axios from 'axios';
const GATEWAY_URL = process.env.NEXT_PUBLIC_HOTEL_URL || "http://localhost:8080";

export interface Promotion{
  promotionId: number;
  name: string;
  description: string;
  discountValue: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  isActive: boolean;
  minStay: number;
}
export interface Room{
  roomId: number;
  name: string;
}

export const getAllPromotions = async(): Promise<Promotion[]> =>{
  const res  = await axios.get<Promotion[]>(`${GATEWAY_URL}/api/promotions/all`);
  return res.data;
}
export const searchPromotionsByName = async(string name): Promise<Promotion[]> =>{
  const res  = await axios.get<Promotion[]>(`${GATEWAY_URL}/api/promotions/name/${name}`);
  return res.data;
}
