import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    vedioFile: {
      type: String, //Cloudnary url
      required: true,
    },
    thumbnail: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    duration: {
      type: String, //Cloudnary url
      require: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  }, {timestamps: true}
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Vedio = mongoose.model("Vedio", videoSchema);