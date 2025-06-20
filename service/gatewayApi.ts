import axios from 'axios';
const GATEWAY_URL = process.env.NEXT_PUBLIC_HOTEL_URL || "http://localhost:8080";

export type PromotionType = 'percentage' | 'fixed' | 'added_value';
export type RoomApplicability = 'all' | 'selected';

//Promotions fetched from the DB
export interface Promotion{
  promotionId: number;
  name: string;
  description: string;
  discountValue: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  type: PromotionType;
  isActive: boolean;
  minStay: number;
  roomApplicability: RoomApplicability;
  rooms: Room[];
}

//Promotion to be registered or updated
export interface PromotionRequest{
  name: string;
  description: string;
  discountValue: number;
  startDate: string;
  endDate: string;
  type: PromotionType;
  isActive: boolean;
  minStay: number;
  roomApplicability: RoomApplicability;
  roomsIds: number[];
}

export interface Room{
  roomId: number;
  name: string;
}

export const getAllPromotions = async(): Promise<Promotion[]> =>{
  const res  = await axios.get<Promotion[]>(`${GATEWAY_URL}/api/promotions/all`);
  return res.data;
}
export const searchPromotionsByName = async(name: string): Promise<Promotion[]> =>{
  const res  = await axios.get<Promotion[]>(`${GATEWAY_URL}/api/promotions/name/${name}`);
  return res.data;
}
<<<<<<< HEAD
export const searchPromotionByNameAndOrStatus = async(name?: string, isActive?: boolean): Promise<Promotion[]> =>{
  const params: any = {};
  if(name) params.name = name;
  if(isActive !== undefined) params.isActive = isActive;
  const res = await axios.get<Promotion[]>(`${GATEWAY_URL}/api/promotions/name`, {params});
  return res.data;
}
