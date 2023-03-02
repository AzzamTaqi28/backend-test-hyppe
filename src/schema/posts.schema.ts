import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Scm } from 'mongoose';

export type PostsDocument = Posts & Document;

@Schema({ collection: 'posts' })
export class Posts {
  @Prop({ type: Scm.Types.ObjectId, required: true })
  _id: string;

  @Prop({ type: String, required: true })
  contentEventID: string;

  @Prop({ type: String, required: true })
  eventType: string;

  @Prop({ type: Boolean, required: true })
  active: Boolean;

  @Prop({ type: String, required: true })
  event: string;

  @Prop({ type: String, default: Date.now() })
  createdAt: Date;

  @Prop({ type: String, default: Date.now() })
  updatedAt: Date;

  @Prop({ type: Number, required: true })
  sequenceNumber: Number;

  @Prop({ type: Boolean, required: true })
  flowIsDone: Boolean;

  @Prop({ type: String, required: true })
  _class: string;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
