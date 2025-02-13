import { Controller, Post, Body, UploadedFile, UseInterceptors, Req, UseGuards } from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateMediaDto } from './dto/create-media.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Media')
@Controller('media')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class MediaController {
  constructor(private readonly mediaService: MediaService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  @ApiOperation({ summary: 'Upload media' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        associated_entity_type: {
          type: 'string',
          enum: ['store', 'product', 'category'],
          description: 'Associated entity type'
        },
      },
    },
  })
  @Post('upload')
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMediaDto: CreateMediaDto,
    @Req() req: any,
  ) {
    const userId = req.user?.userId;
    if (!userId) {
      return 'user ID not found in token';
    }
    const { associated_entity_type } = createMediaDto;
    const media = await this.mediaService.saveMedia(file, associated_entity_type, userId);
    return { 'File uploaded successfully': media };
  }
}