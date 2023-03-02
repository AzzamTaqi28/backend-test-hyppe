import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Scm } from 'mongoose';

export type MediaProfilePictDocument = MediaProfilePict & Document;

@Schema({ collection: 'mediaprofilepict' })
export class MediaProfilePict {
  @Prop({ type: Scm.Types.ObjectId, required: true })
  _id: string;

  @Prop({ type: String, required: true })
  mediaID: string;

  @Prop({ type: Boolean, required: true })
  active: Boolean;

  @Prop({ type: String, default: Date.now() })
  createdAt: Date;

  @Prop({ type: String, default: Date.now() })
  updatedAt: Date;

  @Prop({ type: String, required: true })
  postType: string;

  @Prop({ type: String, required: true })
  mediaType: string;

  @Prop({ type: String, required: true })
  mediaBasePath: string;

  @Prop({ type: String, required: true })
  mediaUri: string;

  @Prop({ type: String, required: true })
  originalName: string;

  @Prop({ type: String, required: true })
  fsSourceUri: string;

  @Prop({ type: String, required: true })
  fsTargetUri: string;

  @Prop({ type: Scm.Types.Number, required: true })
  otpNextAttemptAllow: Number;

  @Prop({ type: String, required: true })
  mediaMime: string;

  @Prop({ type: String, required: true, name: '_class' })
  class: string;

  
}

export const MediaProfilePictSchema = SchemaFactory.createForClass(MediaProfilePict);
