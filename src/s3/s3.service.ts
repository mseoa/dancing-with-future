import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  DeleteObjectCommandOutput,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private region: string;
  private s3: S3Client;
  private logger = new Logger(S3Service.name);

  constructor(private configService: ConfigService) {
    this.region = this.configService.get<string>('S3_REGION');
    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_S3_SECRET_KEY'),
      },
    });
  }

  extractKeyFromUrl(url: string): string {
    const key = url.split('.com/')[1];
    return key;
  }

  async uploadFile(file: Express.Multer.File, key: string) {
    const bucket = this.configService.get<string>('S3_BUCKET');
    const input: PutObjectCommandInput = {
      Body: file.buffer,
      Bucket: bucket,
      Key: key,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    try {
      const response: PutObjectCommandOutput = await this.s3.send(
        new PutObjectCommand(input),
      );

      if (response.$metadata.httpStatusCode === 200) {
        return `https://${bucket}.s3.${this.region}.amazonaws.com/${key}`;
      }
      throw new Error('Image not saved');
    } catch (error) {
      this.logger.error('cannot save file in s3', error);
      throw error;
    }
  }

  async deleteFile(key: string) {
    const bucket = this.configService.get<string>('S3_BUCKET');
    const input: DeleteObjectCommandInput = {
      Bucket: bucket,
      Key: key,
    };

    try {
      const response: DeleteObjectCommandOutput = await this.s3.send(
        new DeleteObjectCommand(input),
      );

      if (response.$metadata.httpStatusCode === 204) {
        return true;
      }
      throw new Error('File deletion failed');
    } catch (error) {
      this.logger.error('cannot delete file from s3', error);
      throw error;
    }
  }

  async deleteFiles(urls: string[]) {
    const bucket = this.configService.get<string>('S3_BUCKET');
    const keys = urls.map((url) => this.extractKeyFromUrl(url));
    const deleteObjects: DeleteObjectCommandInput[] = keys.map((key) => ({
      Bucket: bucket,
      Key: key,
    }));

    try {
      const responses: DeleteObjectCommandOutput[] = await Promise.all(
        deleteObjects.map((input) =>
          this.s3.send(new DeleteObjectCommand(input)),
        ),
      );

      const successfulDeletes = responses.filter(
        (response) => response.$metadata.httpStatusCode === 204,
      );

      return successfulDeletes.length === keys.length;
    } catch (error) {
      this.logger.error('cannot delete files from s3', error);
      throw error;
    }
  }
}
