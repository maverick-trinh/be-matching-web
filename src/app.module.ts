import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { MembersModule } from './members/members.module';
import { PhotosModule } from './photos/photos.module';
import { LikesModule } from './likes/likes.module';
import { MessagesModule } from './messages/messages.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { RequestLoggerMiddleware } from './shared/middleware/request-logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    MembersModule,
    PhotosModule,
    LikesModule,
    MessagesModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
