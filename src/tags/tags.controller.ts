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
import { ApiTags } from '@nestjs/swagger';
import { Auth0JwtGuard } from '../auth/auth0-jwt.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/user.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './tag.entity';
import { TagsService } from './tags.service';

@ApiTags('tags')
@Controller('tags')
@UseGuards(Auth0JwtGuard)
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async createTag(
    @GetUser() user: User,
    @Body() createTagDto: CreateTagDto,
  ): Promise<Tag> {
    return this.tagsService.createTag(user.id, createTagDto);
  }

  @Get()
  async getTags(@GetUser() user: User): Promise<Tag[]> {
    return this.tagsService.getTags(user.id);
  }

  @Get(':id')
  async getTag(@Param('id') id: string): Promise<Tag> {
    return this.tagsService.getTag(id);
  }

  @Put(':id')
  async updateTag(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<Tag> {
    return this.tagsService.updateTag(id, updateTagDto);
  }

  @Delete(':id')
  async deleteTag(@Param('id') id: string): Promise<void> {
    return this.tagsService.deleteTag(id);
  }
}
