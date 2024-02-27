import { Types } from "mongoose";

// VALIDATE MONGO OBJECT_ID
export const isValidateMongoDBId = (id: string) => {
  return Types.ObjectId.isValid(id) && String(new Types.ObjectId(id)) === id;
};
