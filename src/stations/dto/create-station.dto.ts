import { IsString, IsNumber, IsBoolean, IsArray, IsObject, isNumber } from 'class-validator';

export class CreateStationDto {
  @IsString()
  name: string;

    @IsObject()
  location: {
    lat: number;
    lng: number;
  };

  @IsString()
  city: string;

  @IsArray()
  @IsString({ each: true }) 

  @IsObject()
  prices: Record<string, number>; 
  
  @IsBoolean()
  status: boolean;
}
