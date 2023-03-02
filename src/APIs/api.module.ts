import { ApiService } from './api.service';
import { ApiController } from './api.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserBasics, UserBasicsSchema } from 'src/schema/userbasics.schema';
import { UserAuth, UserAuthSchema } from 'src/schema/userauth.schema';
import {
  MediaProfilePict,
  MediaProfilePictSchema,
} from 'src/schema/mediaprofilepict.schema';
import { Posts, PostsSchema } from 'src/schema/posts.schema';
import {
  MediaDiaries,
  MediaDiariesSchema,
} from 'src/schema/mediadiaries.schema';
import { MediaPicts, MediaPictsSchema } from 'src/schema/mediapicts.schema';
import { MediaVideos, MediaVideosSchema } from 'src/schema/mediavideos.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserBasics.name, schema: UserBasicsSchema },
      {
        name: UserAuth.name,
        schema: UserAuthSchema,
      },
      {
        name: MediaProfilePict.name,
        schema: MediaProfilePictSchema,
      },
      {
        name: Posts.name,
        schema: PostsSchema,
      },
      { name: MediaDiaries.name, schema: MediaDiariesSchema },
      { name: MediaVideos.name, schema: MediaVideosSchema },
      { name: MediaPicts.name, schema: MediaPictsSchema },
    ]),
  ],

  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
