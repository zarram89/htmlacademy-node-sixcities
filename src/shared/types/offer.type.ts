import { City } from './city.enum.js';
import { HousingType } from './housing-type.enum.js';
import { Convenience } from './convenience.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  publishDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  roomsCount: number;
  guestsCount: number;
  price: number;
  conveniences: Convenience[];
  author: User;
  commentsCount: number;
  latitude: number;
  longitude: number;
};
