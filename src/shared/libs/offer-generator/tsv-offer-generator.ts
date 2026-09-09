import {
  MockServerData,
  HousingType,
  Convenience,
  UserType
} from '../../types/index.js';
import {
  generateRandomValue,
  getRandomBoolean,
  getRandomDate,
  getRandomItem,
  getRandomItems
} from '../../helpers/index.js';
import { CITIES } from '../../constants/index.js';
import { OfferGenerator } from './offer-generator.interface.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;
const MIN_RATING = 1;
const MAX_RATING = 5;
const MIN_ROOMS = 1;
const MAX_ROOMS = 8;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const DAYS_IN_YEAR = 365;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const publishDate = this.getRandomPublishDate();
    const city = getRandomItem(CITIES);
    const previewImage = getRandomItem(this.mockData.previewImages);
    const images = this.getNonEmpty(this.mockData.images);
    const isPremium = getRandomBoolean();
    const isFavorite = getRandomBoolean();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1);
    const housingType = getRandomItem(Object.values(HousingType));
    const roomsCount = generateRandomValue(MIN_ROOMS, MAX_ROOMS);
    const guestsCount = generateRandomValue(MIN_GUESTS, MAX_GUESTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const conveniences = this.getNonEmpty(Object.values(Convenience));
    const userName = getRandomItem(this.mockData.users);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatars);
    const password = `secret-${generateRandomValue(1000, 9999)}`;
    const userType = getRandomItem(Object.values(UserType));
    const commentsCount = generateRandomValue(0, 10);

    return [
      title,
      description,
      publishDate,
      city.name,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      housingType,
      roomsCount,
      guestsCount,
      price,
      conveniences,
      userName,
      email,
      avatar,
      password,
      userType,
      commentsCount,
      city.latitude,
      city.longitude
    ].join('\t');
  }

  private getRandomPublishDate(): string {
    const end = Date.now();
    const start = end - DAYS_IN_YEAR * 24 * 60 * 60 * 1000;

    return getRandomDate(new Date(start), new Date(end));
  }

  private getNonEmpty<T>(items: T[]): T[] {
    const result = getRandomItems(items);

    return result.length > 0
      ? result
      : [getRandomItem(items)];
  }
}
