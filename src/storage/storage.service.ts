import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Express from 'express';

@Injectable()
export class StorageService implements OnModuleInit {
  private readonly bucketName: string;
  private readonly publicUrl: string;
  private readonly internalUrl: string;

  constructor(private readonly config: ConfigService) {
    this.bucketName = this.config.getOrThrow<string>('MINIO_BUCKET');
    this.publicUrl = this.config.getOrThrow<string>('MINIO_PUBLIC_URL');
    this.internalUrl = this.config.getOrThrow<string>('MINIO_INTERNAL_URL');
  }

  async onModuleInit() {
    await this.ensureBucketReachable();
  }

  private async ensureBucketReachable() {
    const response = await fetch(`${this.internalUrl}/${this.bucketName}/`, { method: 'GET' });
    if (![200, 403, 404].includes(response.status)) {
      throw new InternalServerErrorException('MinIO no disponible');
    }
  }

  async uploadProductImage(file: Express.Multer.File) {
    const extension = file.originalname.includes('.')
      ? file.originalname.split('.').pop()
      : 'jpg';
    const objectName = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

    const uploadResponse = await fetch(`${this.internalUrl}/${this.bucketName}/${objectName}`, {
      method: 'PUT',
      body: file.buffer.buffer, // ✅ ArrayBuffer para fetch
      headers: {
        'Content-Type': file.mimetype,
      },
    });

    if (!uploadResponse.ok) {
      throw new InternalServerErrorException('No se pudo subir la imagen');
    }

    return `${this.publicUrl}/${this.bucketName}/${objectName}`;
  }
}
