import { ApiModule } from './APIs/api.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ApiModule,
    MongooseModule.forRoot('mongodb://localhost:27017/hyppedb'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
