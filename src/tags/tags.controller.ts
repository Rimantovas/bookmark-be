import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
@ApiBearerAuth()
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new tag',
    operationId: 'createTag',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Tag,
  })
  @HttpCode(HttpStatus.CREATED)
  async createTag(
    @GetUser() user: User,
    @Body() createTagDto: CreateTagDto,
  ): Promise<Tag> {
    return this.tagsService.createTag(user.id, createTagDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tags for a user',
    operationId: 'getTags',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Tag,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  async getTags(@GetUser() user: User): Promise<Tag[]> {
    return this.tagsService.getTags(user.id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific tag',
    operationId: 'getTag',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Tag,
  })
  @HttpCode(HttpStatus.OK)
  async getTag(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<Tag> {
    return this.tagsService.getTag(id, user.id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a tag',
    operationId: 'updateTag',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Tag,
  })
  @HttpCode(HttpStatus.OK)
  async updateTag(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTagDto: UpdateTagDto,
    @GetUser() user: User,
  ): Promise<Tag> {
    return this.tagsService.updateTag(id, user.id, updateTagDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a tag',
    operationId: 'deleteTag',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTag(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.tagsService.deleteTag(id, user.id);
  }
}
