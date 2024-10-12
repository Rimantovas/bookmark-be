import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Auth0JwtGuard } from '../auth/auth0-jwt.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/user.entity';
import { Collection } from './collection.entity';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post()
  @UseGuards(Auth0JwtGuard)
  async createCollection(
    @GetUser() user: User,
    @Body() createCollectionDto: CreateCollectionDto,
  ): Promise<Collection> {
    return this.collectionsService.createCollection(
      user.id,
      createCollectionDto,
    );
  }

  @Get()
  @UseGuards(Auth0JwtGuard)
  async getCollections(@GetUser() user: User): Promise<Collection[]> {
    return this.collectionsService.getCollections(user.id);
  }

  @Get(':id')
  async getCollection(@Param('id') id: string): Promise<Collection> {
    return this.collectionsService.getCollection(id);
  }

  @Put(':id')
  @UseGuards(Auth0JwtGuard)
  async updateCollection(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ): Promise<Collection> {
    return this.collectionsService.updateCollection(id, updateCollectionDto);
  }

  @Delete(':id')
  @UseGuards(Auth0JwtGuard)
  async deleteCollection(@Param('id') id: string): Promise<void> {
    return this.collectionsService.deleteCollection(id);
  }
}
