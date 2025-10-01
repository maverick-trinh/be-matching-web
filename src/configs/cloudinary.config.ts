import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export interface CloudinaryConfigValues {
  cloudName?: string;
  apiKey?: string;
  apiSecret?: string;
  folderName?: string;
}

const resolveConfigValue = (
  configService: ConfigService | undefined,
  key: string,
): string | undefined => configService?.get<string>(key) ?? process.env[key];

export const getCloudinaryConfig = (
  configService?: ConfigService,
): CloudinaryConfigValues => ({
  cloudName: resolveConfigValue(
    configService,
    'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
  ),
  apiKey: resolveConfigValue(configService, 'NEXT_PUBLIC_CLOUDINARY_API_KEY'),
  apiSecret: resolveConfigValue(configService, 'CLOUDINARY_API_SECRET'),
  folderName: resolveConfigValue(configService, 'CLOUDINARY_FOLDER_NAME'),
});

export const configureCloudinary = (configService?: ConfigService) => {
  const { cloudName, apiKey, apiSecret, folderName } =
    getCloudinaryConfig(configService);

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    folder_name: folderName,
  });
};
