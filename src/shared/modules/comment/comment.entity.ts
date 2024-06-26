import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer';
import { UserEntity } from '../user';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true, type: () => String })
  public text: string;

  @prop({
    ref: OfferEntity,
    required: true,
    type: () => String
  })
  public offerId: Ref<OfferEntity>;

  @prop({
    ref: UserEntity,
    required: true,
    type: () => String
  })
  public userId: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
