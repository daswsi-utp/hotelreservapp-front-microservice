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
  roomApplicability: string;
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
export const searchPromotionsByNameAndIsActive = async(string name, boolean isActive) : Promise<Promotion[]> =>{
  const res = await axios.get<Promotion[]>(`${GATEWAY_URL}/api/promotions/find?name=${name}&isActive=${isActive}`);
  return res.data;
}
