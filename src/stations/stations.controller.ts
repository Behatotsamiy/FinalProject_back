import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { StationsService } from './stations.service';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { HasRole } from 'src/auth/role.guard';
import { SetRoles } from 'src/auth/set-roles.decarator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('/stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Post()
  @UseGuards(AuthGuard,HasRole)
  @SetRoles('admin')
  create(@Body() createStationDto: CreateStationDto) {
    return this.stationsService.create(createStationDto);
  }

  @Get()
  findAll(@Query() q  : any) {
    return this.stationsService.findAll(q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stationsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard,HasRole)
  @SetRoles('admin')
  update(@Param('id') id: string, @Body() updateStationDto: UpdateStationDto) {
    return this.stationsService.update(id, updateStationDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard,HasRole)
  @SetRoles('admin')
  remove(@Param('id') id: string) {
    return this.stationsService.remove(id);
  }
}
