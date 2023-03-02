/*
https://docs.nestjs.com/proDiariesers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posts, PostsDocument } from 'src/schema/posts.schema';
import { UserBasics, UserBasicsDocument } from 'src/schema/userbasics.schema';

@Injectable()
export class ApiService {
  constructor(
    @InjectModel(UserBasics.name)
    private userBasicsModel: Model<UserBasicsDocument>,
    @InjectModel(Posts.name)
    private postsModel: Model<PostsDocument>,
  ) {}

  public async searchContent(filter?: string): Promise<Object> {
    try {
      const user = await this.getUser(filter);
      const pict = await this.getPostsPicture(filter);
      const video = await this.getPostsVideos(filter);
      const diary = await this.getPostsDiaries(filter);

      return {
        user,
        pict,
        video,
        diary,
      };
    } catch (error) {
      console.log(error);
    }
  }

  private async getUser(filter?: string) {
    try {
      const userAggregate = [
        {
          $lookup: {
            from: 'userauths',
            localField: 'profileID',
            foreignField: 'userID',
            as: 'userAuth',
          },
        },
        {
          $addFields: {
            profilePictureId: {
              $arrayElemAt: [{ $objectToArray: '$profilePict' }, 1],
            },
          },
        },
        {
          $addFields: {
            profilePictureId: '$profilePictureId.v',
          },
        },
        {
          $lookup: {
            from: 'mediaprofilepicts',
            localField: 'profilePictureId',
            foreignField: 'mediaID',
            as: 'profilePicture',
          },
        },
        {
          $addFields: {
            profilePicture: { $arrayElemAt: ['$profilePicture', 0] },
          },
        },
      ];

      let userBasics;

      if (filter) {
        userBasics = await this.userBasicsModel
          .aggregate(userAggregate)
          .match({
            'userAuth.username': {
              $regex: '.*' + filter + '.*',
              $options: 'i',
            },
          })
          .limit(5);
      } else {
        userBasics = await this.userBasicsModel
          .aggregate(userAggregate)
          .limit(5);
      }

      const user = [];

      for (const userBasicsItem of userBasics) {
        if (userBasicsItem.profilePicture) {
          user.push({
            _id: userBasicsItem._id,
            fullName: userBasicsItem.fullName,
            profilePict: userBasicsItem.profilePict,
            username: userBasicsItem.userAuth[0].username,
            email: userBasicsItem.userAuth[0].email,
            avatar: userBasicsItem.profilePicture,
          });
        } else {
          user.push({
            id: userBasicsItem._id,
            fullName: userBasicsItem.fullName,
            username: userBasicsItem.userAuth[0].username,
            email: userBasicsItem.userAuth[0].email,
          });
        }
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  private async getPostsPicture(filter?: string) {
    const postsPictAggregate = [
      {
        $lookup: {
          from: 'mediapicts',
          localField: 'postID',
          foreignField: 'postID',
          as: 'mediaPicts',
        },
      },
      {
        $lookup: {
          from: 'contentevents',
          localField: 'postID',
          foreignField: 'postID',
          as: 'contentEvents',
        },
      },
    ];

    let postsPict;
    if (filter) {
      postsPict = await this.postsModel
        .aggregate(postsPictAggregate)
        .match({
          $and: [
            { postType: 'pict' },
            { description: { $regex: '.*' + filter + '.*', $options: 'i' } },
          ],
        })
        .limit(5);
    } else {
      postsPict = await this.postsModel
        .aggregate(postsPictAggregate)
        .match({ postType: 'pict' })
        .limit(5);
    }

    const posts = [];
    for (const postsPictItem of postsPict) {
      const insight = {
        shares: postsPictItem.contentEvents?.filter((e) => {
          return e.eventType === 'SHARE';
        }).length,
        comments: postsPictItem.contentEvents?.filter((e) => {
          return e.eventType === 'COMMENT';
        }).length,
        views: postsPictItem.contentEvents?.filter((e) => {
          return e.eventType === 'VIEW';
        }).length,
        likes: postsPictItem.contentEvents?.filter((e) => {
          return e.eventType === 'LIKE';
        }).length,
      };
      posts.push({
        boosted: [],
        _id: postsPictItem._id,
        mediaThumbEndPoint: `/thumb/${postsPictItem._id}`,
        mediaEndPoint: `/stream/${postsPictItem._id}`,
        mediaType: postsPictItem.mediaPicts[0].mediaType,
        createdAt: postsPictItem.createdAt,
        updatedAt: postsPictItem.updatedAt,
        postID: postsPictItem.postID,
        email: postsPictItem.postID,
        postType: postsPictItem.postType,
        description: postsPictItem.description,
        active: postsPictItem.active,
        location: postsPictItem.location,
        isOwned: postsPictItem.isOwned,
        visibility: postsPictItem.visibility,
        allowComments: postsPictItem.allowComments,
        allowLikes: postsPictItem.allowLikes,
        insight,
      });
    }
    return posts;
  }

  private async getPostsVideos(filter?: string) {
    const postsVidAggregate = [
      {
        $lookup: {
          from: 'mediavideos',
          localField: 'postID',
          foreignField: 'postID',
          as: 'mediavideos',
        },
      },
      {
        $lookup: {
          from: 'contentevents',
          localField: 'postID',
          foreignField: 'postID',
          as: 'contentEvents',
        },
      },
    ];

    let postsVid;
    if (filter) {
      postsVid = await this.postsModel
        .aggregate(postsVidAggregate)
        .match({
          $and: [
            { postType: 'vid' },
            { description: { $regex: '.*' + filter + '.*', $options: 'i' } },
          ],
        })
        .limit(5);
    } else {
      postsVid = await this.postsModel
        .aggregate(postsVidAggregate)
        .match({ postType: 'vid' })
        .limit(5);
    }

    const posts = [];
    for (const postsVidItem of postsVid) {
      const insight = {
        shares: postsVidItem.contentEvents?.filter((e) => {
          return e.eventType === 'SHARE';
        }).length,
        comments: postsVidItem.contentEvents?.filter((e) => {
          return e.eventType === 'COMMENT';
        }).length,
        views: postsVidItem.contentEvents?.filter((e) => {
          return e.eventType === 'VIEW';
        }).length,
        likes: postsVidItem.contentEvents?.filter((e) => {
          return e.eventType === 'LIKE';
        }).length,
      };
      posts.push({
        boosted: [],
        _id: postsVidItem._id,
        mediaThumbEndPoint: `/thumb/${postsVidItem.postID}`,
        mediaEndPoint: `/stream/${postsVidItem.postID}`,
        mediaType: postsVidItem.mediavideos[0].mediaType,
        createdAt: postsVidItem.createdAt,
        updatedAt: postsVidItem.updatedAt,
        postID: postsVidItem.postID,
        email: postsVidItem.postID,
        postType: postsVidItem.postType,
        description: postsVidItem.description,
        active: postsVidItem.active,
        metadata: {
          duration: postsVidItem.metadata?.duration,
          postRoll: postsVidItem.metadata?.postRoll,
          postType: postsVidItem.metadata?.postType,
          preRoll: postsVidItem.metadata?.preRoll,
          midRoll: postsVidItem.metadata?.midRoll,
          postID: postsVidItem.metadata?.postID,
          email: postsVidItem.metadata?.email,
        },
        location: postsVidItem.location,
        isOwned: postsVidItem.isOwned,
        visibility: postsVidItem.visibility,
        allowComments: postsVidItem.allowComments,
        allowLikes: postsVidItem.allowLikes,
        insight,
      });
    }
    return posts;
  }

  private async getPostsDiaries(filter?: string) {
    const postsDiariesAggregate = [
      {
        $lookup: {
          from: 'mediadiaries',
          localField: 'postID',
          foreignField: 'postID',
          as: 'mediaDiaries',
        },
      },
      {
        $lookup: {
          from: 'contentevents',
          localField: 'postID',
          foreignField: 'postID',
          as: 'contentEvents',
        },
      },
    ];

    let postsDiaries;
    if (filter) {
      postsDiaries = await this.postsModel
        .aggregate(postsDiariesAggregate)
        .match({
          $and: [
            { postType: 'diary' },
            { description: { $regex: '.*' + filter + '.*', $options: 'i' } },
          ],
        })
        .limit(5);
    } else {
      postsDiaries = await this.postsModel
        .aggregate(postsDiariesAggregate)
        .match({ postType: 'diary' })
        .limit(5);
    }

    const posts = [];
    for (const postsDiariesItem of postsDiaries) {
      const insight = {
        shares: postsDiariesItem.contentEvents?.filter((e) => {
          return e.eventType === 'SHARE';
        }).length,
        comments: postsDiariesItem.contentEvents?.filter((e) => {
          return e.eventType === 'COMMENT';
        }).length,
        views: postsDiariesItem.contentEvents?.filter((e) => {
          return e.eventType === 'VIEW';
        }).length,
        likes: postsDiariesItem.contentEvents?.filter((e) => {
          return e.eventType === 'LIKE';
        }).length,
      };
      posts.push({
        boosted: [],
        _id: postsDiariesItem._id,
        mediaThumbEndPoint: `/thumb/${postsDiariesItem.postID}`,
        mediaEndPoint: `/stream/${postsDiariesItem.postID}`,
        mediaType: postsDiariesItem.mediaDiaries[0].mediaType,
        createdAt: postsDiariesItem.createdAt,
        updatedAt: postsDiariesItem.updatedAt,
        postID: postsDiariesItem.postID,
        email: postsDiariesItem.postID,
        postType: postsDiariesItem.postType,
        description: postsDiariesItem.description,
        active: postsDiariesItem.active,
        metadata: {
          duration: postsDiariesItem.metadata?.duration,
          postRoll: postsDiariesItem.metadata?.postRoll,
          postType: postsDiariesItem.metadata?.postType,
          preRoll: postsDiariesItem.metadata?.preRoll,
          midRoll: postsDiariesItem.metadata?.midRoll,
          postID: postsDiariesItem.metadata?.postID,
          email: postsDiariesItem.metadata?.email,
        },
        location: postsDiariesItem.location,
        isOwned: postsDiariesItem.isOwned,
        visibility: postsDiariesItem.visibility,
        allowComments: postsDiariesItem.allowComments,
        allowLikes: postsDiariesItem.allowLikes,
        insight,
      });
    }
    return posts;
  }
}
