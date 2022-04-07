import { v4 as uuid } from "uuid";

/**
 *  Database can be added here.
 * You can add  of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    name: "EDM",
    description: "Electronic Dance Music",
  },
  {
    _id: uuid(),
    name: "Hip Hop",
    description: "",
  },
  {
    _id: uuid(),
    name: "Classical",
    description: "",
  },
  {
    _id: uuid(),
    name: "Pop",
    description: "",
  },
];
