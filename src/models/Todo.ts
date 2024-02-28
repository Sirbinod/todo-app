import mongoose from "mongoose";
import slugify from "slugify";

const todoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "done"],
      default: "upcoming",
    },
    slug: {
      type: String,
      //   unique: true,
    },
  },
  { timestamps: true }
);

todoSchema.pre("save", async function (next) {
  this.slug = createSlug(this.name);
  next();
});

function createSlug(name: string): string {
  return slugify(name, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  });
}

const Todo = mongoose.model("Todo", todoSchema);

export { Todo };
