import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Scm } from 'mongoose';
import { UserAuth } from './userauth.schema';
import { MediaProfilePict } from './mediaprofilepict.schema';

export type UserBasicsDocument = UserBasics & Document;

@Schema({ collection: 'userbasics' })
export class UserBasics {
  @Prop({ type: Scm.Types.ObjectId, required: true })
  _id: string;

  @Prop({ type: String })
  profileID: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  fullName: string;

  @Prop({ type: String, required: true })
  dob: Date;

  @Prop({ type: String, required: true })
  gender: string;

  @Prop({ type: String, required: true })
  mobileNumber: string;

  @Prop({ type: String, required: true })
  status: string;

  @Prop({ type: String, required: true })
  event: string;

  @Prop({ type: String, required: true })
  idProofName: string;

  @Prop({ type: String, required: true })
  idProofNumber: string;

  @Prop({ type: String, required: true })
  idProofStatus: string;

  @Prop({ type: Boolean, default: false })
  isComplete: boolean;

  @Prop({ type: Boolean, default: false })
  isCelebrity: boolean;

  @Prop({ type: Boolean, default: false })
  isIdPrivate: boolean;

  @Prop({ type: Boolean, default: false })
  isFollowPrivate: boolean;

  @Prop({ type: Boolean, default: false })
  isPostPrivate: boolean;

  @Prop({ type: String, default: Date.now() })
  createdAt: Date;

  @Prop({ type: String, default: Date.now() })
  updatedAt: Date;

  @Prop({ type: String, required: true })
  bio: string;

  @Prop({
    type: Scm.Types.Array,
    required: true,
  })
  profilePict: [];

  @Prop({ type: Scm.Types.Array, required: true })
  proofPict: [];

  @Prop({ type: Scm.Types.Array, required: true })
  insight: [];

  @Prop({ type: Scm.Types.Array, required: true })
  userInterest: [];

  //relation
  @Prop({ type: Scm.Types.ObjectId, ref: 'userauths', refPath: 'userAuth' })
  userAuth: UserAuth;
}

export const UserBasicsSchema = SchemaFactory.createForClass(UserBasics);
