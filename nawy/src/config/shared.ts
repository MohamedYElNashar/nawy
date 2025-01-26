import { ObjectId } from "mongodb";
import { z } from "zod";

export const zodObjectId = () =>
  z
    .string()
    .length(24)
    .transform((str) => new ObjectId(str))

