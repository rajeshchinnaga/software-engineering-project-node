/**
 * @file Follow Schema represents the schema of the follow collections that is present in the MongoDB.
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follow/Follow";

const FollowSchema = new mongoose.Schema<Follow>({
    userFollower: {type:Schema.Types.ObjectId, ref: 'UserModel'},
    userFollowing: {type: Schema.Types.ObjectId, ref: 'UserModel'},
    followedOn: {type: Date, default: Date.now}
}, {collection: 'follow'});

export default FollowSchema;