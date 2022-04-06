import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "EDM",
    description: "Electronic Dance Music",
  },
  {
    _id: uuid(),
    categoryName: "Hip Hop",
    description: "",
  },
  {
    _id: uuid(),
    categoryName: "Classical",
    description: "",
  },
  {
    _id: uuid(),
    categoryName: "Pop",
    description: "",
  },
];
