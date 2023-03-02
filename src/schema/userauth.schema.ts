import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Scm } from 'mongoose';
import { UserBasics } from './userbasics.schema';

export type UserAuthDocument = UserAuth & Document;

@Schema({ collection: 'userauths' })
export class UserAuth {
  @Prop({ type: Scm.Types.ObjectId, required: true })
  _id: string;

  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  userID: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  regScr: string;

  @Prop({ type: String, default: Date.now() })
  createdAt: Date;

  @Prop({ type: String, default: Date.now() })
  updatedAt: Date;

  @Prop({ type: Boolean, required: true })
  isExpiryPass: Boolean;

  @Prop({ type: Boolean, required: true })
  isEmailVerified: Boolean;

  @Prop({ type: Scm.Types.Number, required: true })
  otpRequestTime: Number;

  @Prop({ type: Scm.Types.Number, required: true })
  otpAttempt: Number;

  @Prop({ type: Scm.Types.Number, required: true })
  otpNextAttemptAllow: Number;

  @Prop({ type: Boolean, required: true })
  isEnabled: Boolean;

  @Prop({ type: Boolean, required: true })
  isAccountNonExpired: Boolean;

  @Prop({ type: Boolean, default: false })
  isAccountNonLocked: boolean;

  @Prop({ type: Boolean, default: false })
  isCredentialsNonExpired: boolean;

  @Prop({ type: Scm.Types.Array, required: true })
  roles: [];

  @Prop({ type: Scm.Types.Array, required: true })
  devices: [];
  
}

export const UserAuthSchema = SchemaFactory.createForClass(UserAuth);
