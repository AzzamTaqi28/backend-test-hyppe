import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Scm } from 'mongoose';

export type MediaPictsDocument = MediaVideos & Document;

@Schema({ collection: 'mediavideos' })
export class MediaVideos {
  @Prop({ type: Scm.Types.ObjectId, required: true })
  _id: string;

  @Prop({ type: String, required: true })
  mediaID: string;

  @Prop({ type: String, required: true })
  postID: string;

  @Prop({ type: Boolean, required: true })
  active: Boolean;

  @Prop({ type: String, default: Date.now() })
  createdAt: Date;

  @Prop({ type: String, default: Date.now() })
  updatedAt: Date;

  @Prop({ type: String, required: true })
  mediaType: string;

  @Prop({ type: String, required: true })
  mediaBasePath: string;

  @Prop({ type: String, required: true })
  mediaUri: string;

  @Prop({ type: String, required: true })
  mediaThumb: string;

  @Prop({ type: String, required: true })
  fsSourceUri: string;

  @Prop({ type: String, required: true })
  fsSourceName: string;

  @Prop({ type: String, required: true })
  fsTargetUri: string;

  @Prop({ type: String, required: true })
  fsTargetThumbUri: string;

  @Prop({ type: String, required: true })
  mediaMime: string;

  @Prop({ type: Number, required: true })
  rotate: Number;

  @Prop({ type: String, required: true })
  _class: string;
}

export const MediaVideosSchema = SchemaFactory.createForClass(MediaVideos);
