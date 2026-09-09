import { City } from '../types/index.js';

export type CityCoordinates = {
  name: City;
  latitude: number;
  longitude: number;
};

export const CITIES: CityCoordinates[] = [
  { name: City.Paris, latitude: 48.85661, longitude: 2.351499 },
  { name: City.Cologne, latitude: 50.938361, longitude: 6.959974 },
  { name: City.Brussels, latitude: 50.846557, longitude: 4.351697 },
  { name: City.Amsterdam, latitude: 52.370216, longitude: 4.895168 },
  { name: City.Hamburg, latitude: 53.550341, longitude: 10.000654 },
  { name: City.Dusseldorf, latitude: 51.225402, longitude: 6.776314 }
];
