import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import {
  configureCloudinary,
  getCloudinaryConfig,
} from '../configs/cloudinary.config';
import {
  CloudinaryUploadOptions,
  isCloudinaryInstance,
  type CloudinaryDestroyResult,
  type CloudinaryInstance,
} from '../types/cloudinary.type';

@Injectable()
export class CloudinaryService {
  private readonly sdk: CloudinaryInstance;
  private readonly folderName?: string;

  constructor(private configService: ConfigService) {
    configureCloudinary(this.configService);

    const instance: unknown = cloudinary;
    if (!isCloudinaryInstance(instance)) {
      throw new Error('Cloudinary SDK is not properly configured');
    }
    this.sdk = instance;
    const { folderName } = getCloudinaryConfig();
    this.folderName = folderName;
  }

  async uploadImage(file: string): Promise<{ url: string; publicId: string }> {
    const options: CloudinaryUploadOptions = {};

    if (this.folderName) {
      options.folder = this.folderName;
    }

    const result = await this.sdk.uploader.upload(file, options);

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  async updateImage(
    publicId: string,
    file: string,
  ): Promise<{ url: string; publicId: string }> {
    const options: CloudinaryUploadOptions = {
      public_id: publicId,
      overwrite: true,
    };

    if (this.folderName) {
      options.folder = this.folderName;
    }

    const result = await this.sdk.uploader.upload(file, options);

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  async deleteImage(publicId: string): Promise<CloudinaryDestroyResult> {
    const result = await this.sdk.uploader.destroy(publicId);
    return result;
  }
}
