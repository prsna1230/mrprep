const mongoose = require("mongoose");
const { __esModule } = require("validator/lib/isAlpha");
const { Schema } = mongoose;

const TopicSchema = new Schema(
  {
    topicName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    resources: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const TopicModel = mongoose.model("Topic", TopicSchema);

module.exports = { TopicModel };
