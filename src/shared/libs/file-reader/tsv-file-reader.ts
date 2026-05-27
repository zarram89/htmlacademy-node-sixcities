import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';

import {
  Offer,
  User,
  City,
  HousingType,
  Convenience,
  UserType
} from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, {
      encoding: 'utf-8'
    });
  }

  public toArray(): Offer[] {
    this.validateRawData();

    return this.parseRawDataToOffers();
  }

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const parts = line.split('\t');

    if (parts.length !== 22) {
      throw new Error(`Invalid TSV row: ${line}`);
    }

    const [
      title,
      description,
      publishDate,
      city,
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
      latitude,
      longitude
    ] = parts;

    return {
      title,
      description,
      publishDate: new Date(publishDate),
      city: city as City,
      previewImage,
      images: this.parseImages(images),
      isPremium: this.parseBoolean(isPremium),
      isFavorite: this.parseBoolean(isFavorite),
      rating: this.parseNumber(rating),
      housingType: housingType as HousingType,
      roomsCount: this.parseNumber(roomsCount),
      guestsCount: this.parseNumber(guestsCount),
      price: this.parseNumber(price),
      conveniences: this.parseConveniences(conveniences),
      author: this.parseUser(
        userName,
        email,
        avatar,
        password,
        userType
      ),
      commentsCount: this.parseNumber(commentsCount),
      latitude: this.parseNumber(latitude),
      longitude: this.parseNumber(longitude)
    };
  }

  private parseImages(imagesString: string): string[] {
    return imagesString.split(';');
  }

  private parseConveniences(
    conveniencesString: string
  ): Convenience[] {
    return conveniencesString
      .split(';')
      .map((item) => item as Convenience);
  }

  private parseBoolean(value: string): boolean {
    switch (value) {
      case 'true':
        return true;

      case 'false':
        return false;

      default:
        throw new Error(`Invalid boolean value: ${value}`);
    }
  }

  private parseNumber(value: string): number {
    const parsedValue = Number.parseFloat(value);

    if (Number.isNaN(parsedValue)) {
      throw new Error(`Cannot parse number: ${value}`);
    }

    return parsedValue;
  }

  private parseUser(
    name: string,
    email: string,
    avatar: string,
    password: string,
    type: string
  ): User {
    return {
      name,
      email,
      avatar,
      password,
      type: type as UserType
    };
  }
}
