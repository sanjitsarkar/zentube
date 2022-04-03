/**
 * Videos Database can be added here.
 * You can add videos of your wish with different attributes
 * */

import { v4 as uuid } from "uuid";
import { toTimestamp } from "../../utils";

export const videos = [
  {
    _id: uuid(),
    title:
      "David Guetta | Tomorrowland 2019 | David Guetta | Tomorrowland 2019",
    creatorImage:
      "https://i.pinimg.com/originals/52/16/a0/5216a0259d75cd14780873a5384b4d7e.jpg",
    creatorName: "Tomorowland",
    thumbNail: "https://img.youtube.com/vi/rbMv6o1_3gA/mqdefault.jpg",
    viewCount: 1200345,
    videoDesc: "David Guetta@Tomorrowland, Saturday, July 27th 2019",
    publishedAt: toTimestamp("03/03/2022 23:31:30"),
    categories: ["EDM"],
    videoURL: "https://www.youtube.com/watch?v=rbMv6o1_3gA",
    tags: ["EDM", "Music", "Tomorrowland", "David Guetta"],
  },
  {
    _id: uuid(),
    title: "🎧 Best of Neffex Music Mix 2020 (8D/3D Music)",
    creatorImage:
      "https://yt3.ggpht.com/ytc/AKedOLSlMYKje1yQizk-euPXx56lZlX7wDKOuGISTB-8=s48-c-k-c0x00ffffff-no-rj",
    creatorName: "Unsung Moron",
    thumbNail: "https://img.youtube.com/vi/PefZzwwwLjE/mqdefault.jpg",
    viewCount: 12003,
    videoDesc:
      "🎧 Use Headphone to feel the real 3D audio effect.This Mix contains best tracks of Neffex.",
    publishedAt: toTimestamp("07/01/2020 2:31:30"),
    categories: ["EDM", "Hip Hop"],
    videoURL: "https://www.youtube.com/watch?v=PefZzwwwLjE",
    tags: ["EDM", "Trap", "Hip Hop", "Music", "Neffex", "Unsung Moron"],
  },
  {
    _id: uuid(),
    title: "The Most Beautiful & Relaxing Piano Pieces (Vol. 1)",
    creatorImage:
      "https://yt3.ggpht.com/ytc/AKedOLTGik__A9u5YdLS2VtAkkzskCV0f-L2cy6XM6Hh=s48-c-k-c0x00ffffff-no-rj",
    creatorName: "Rousseau",
    thumbNail: "https://img.youtube.com/vi/WJ3-F02-F_Y/mqdefault.jpg",
    viewCount: 47538896,
    videoDesc:
      "Hello, I'm Rousseau, I make piano covers of classical and pop songs with a reactive visualizer. New videos every Monday and Thursday!",
    publishedAt: toTimestamp("03/13/2019 23:31:30"),
    categories: ["Classical"],
    videoURL: "https://www.youtube.com/watch?v=WJ3-F02-F_Y",
    tags: ["Music", "Piano", "Relaxing Music", "Classical"],
  },
];
