import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { Model } from 'mongoose';
import { Station } from './entities/station.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StationsService {
  constructor(
    @InjectModel(Station.name) private stationModel: Model<Station>,
  ) {}
  async create(createStationDto: CreateStationDto) {
    try {
      const newStation = await this.stationModel.create(createStationDto);
      return newStation || [];
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(q : any) {
    const { s } = q || {};
    const where : any = {};
  console.log(s);
  
    if (s) {
      where.services = s; // Фильтр по массиву services
    }
  
    const stations = await this.stationModel.find(where);
    return stations;
  }
  

  async findOne(id: string) {
    const station = await this.stationModel.findById(id);
    if (!station) {
      throw new NotFoundException(`Station with id ${id} not found`);
    }
    return station;
  }

  async update(id: string, updateStationDto: UpdateStationDto) {
    const updStation = await this.stationModel.findByIdAndUpdate(
      id,
      updateStationDto,
    );
    return updStation;
  }

  async remove(id: string) {
    const deletedStation = await this.stationModel.findByIdAndDelete(id);
    return deletedStation;
  }
}
