import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SystemModule } from './system/system.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Details } from './system/details.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ModeratorModule } from './moderator/moderator.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load .env automatically everywhere
    SystemModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10), // <-- fixed line
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Details, User],
      synchronize: true, // ONLY use in dev! Use migrations for prod!
    }),
    UserModule,
    AuthModule,
    ModeratorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
