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
    thumbNail: "https://i.postimg.cc/rm0J1Y4H/mqdefault-6s.webp",
    viewCount: 1200345,
    videoDesc: "David Guetta@Tomorrowland, Saturday, July 27th 2019",
    publishedAt: toTimestamp("03/03/2022 23:31:30"),
    category: "EDM",
    videoURL: "https://www.youtube.com/watch?v=rbMv6o1_3gA",
    tags: ["EDM", "Music", "Tomorrowland", "David Guetta"],
  },
  {
    _id: uuid(),
    title: "🎧 Best of Neffex Music Mix 2020 (8D/3D Music)",
    creatorImage:
      "https://yt3.ggpht.com/ytc/AKedOLSlMYKje1yQizk-euPXx56lZlX7wDKOuGISTB-8=s48-c-k-c0x00ffffff-no-rj",
    creatorName: "Unsung Moron",
    thumbNail:
      "https://i.ytimg.com/vi/PefZzwwwLjE/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCDQaa9qSKT6d9IKV6BbBaPQEloaQ",
    viewCount: 12003,
    videoDesc:
      "🎧 Use Headphone to feel the real 3D audio effect.This Mix contains best tracks of Neffex.",
    publishedAt: toTimestamp("07/01/2020 2:31:30"),
    category: "EDM",
    videoURL: "https://www.youtube.com/watch?v=PefZzwwwLjE",
    tags: ["EDM", "Trap", "Hip Hop", "Music", "Neffex", "Unsung Moron"],
  },
  {
    _id: uuid(),
    title: "The Most Beautiful & Relaxing Piano Pieces (Vol. 1)",
    creatorImage:
      "https://yt3.ggpht.com/ytc/AKedOLTGik__A9u5YdLS2VtAkkzskCV0f-L2cy6XM6Hh=s48-c-k-c0x00ffffff-no-rj",
    creatorName: "Rousseau",
    thumbNail: "https://i.postimg.cc/dVsjH0dr/mqdefault-6s.webp",
    viewCount: 47538896,
    videoDesc:
      "Hello, I'm Rousseau, I make piano covers of classical and pop songs with a reactive visualizer. New videos every Monday and Thursday!",
    publishedAt: toTimestamp("03/13/2019 23:31:30"),
    category: "Classical",
    videoURL: "https://www.youtube.com/watch?v=WJ3-F02-F_Y",
    tags: ["Music", "Piano", "Relaxing Music", "Classical", "Rousseau"],
  },
  {
    _id: uuid(),
    title: "Mozart – Lacrimosa",
    creatorImage:
      "https://yt3.ggpht.com/ytc/AKedOLTENAX_RNlwH5L4oz7gt1B7VdX6ZQBRiYUHxCxy=s68-c-k-c0x00ffffff-no-rj",
    creatorName: "Kassia",
    thumbNail: "https://i.postimg.cc/k5hstd28/mqdefault-6s.webp",
    viewCount: 538896,
    videoDesc: "Mozart – Lacrimosa",
    publishedAt: toTimestamp("03/13/2020 23:31:30"),
    category: "Classical",
    videoURL: "https://www.youtube.com/watch?v=5Yamu70Z_FI",
    tags: [
      "Music",
      "Piano",
      "Relaxing Music",
      "Classical",
      "Mozart",
      "Lacrimosa",
      "Kassia",
    ],
  },
  {
    _id: uuid(),
    title: "Cartoon & Andromedik - Whatever (ft. Jüri Pootsmann) [NCS Release]",
    creatorImage:
      "https://yt3.ggpht.com/YIBi8NVC87fMfJHfQ2O0dyzjis7tUlO7VqWLhk1lq1fkIOQTrpX_Ip7G6S_u0IJosXYSe_Z9=s88-c-k-c0x00ffffff-no-rj",
    creatorName: "NoCopyrightSounds",
    thumbNail: "https://i.postimg.cc/cHpcXMML/mqdefault-6s.webp",
    viewCount: 601159,
    videoDesc:
      "NCS (NoCopyrightSounds): Empowering Creators through Copyright / Royalty Free Music",
    publishedAt: toTimestamp("05/1/2021 23:31:30"),
    category: "EDM",
    videoURL: "https://youtube.com/watch?v=uDEy060DZXg",
    tags: [
      "Music",
      "EDM",
      "NCS",
      "NoCopyrightSounds",
      "Whatever",
      "Jüri Pootsmann",
      "Cartoon",
      "Andromedik",
    ],
  },
  {
    _id: uuid(),
    title: "Silent Child - F**K YOU (lyrics)",
    creatorImage:
      "https://yt3.ggpht.com/ANmgv2-dyHCi7tnIuUtJLcKUI9QIk2Rp8Fojl4Gwe4PLxFCxD-S0jvJdO7JvEbHnT3Rk_zaD=s88-c-k-c0x00ffffff-no-rj",
    creatorName: "MrSuicideSheep",
    thumbNail: "https://i.postimg.cc/Mp5dqBx9/mqdefault-6s.webp",
    viewCount: 54689437,
    videoDesc: "Silent Child - F**K YOU",
    publishedAt: toTimestamp("03/13/2019 23:31:30"),
    category: "EDM",
    videoURL: "https://youtube.com/watch?v=L7T6UOkHkJo",
    tags: [
      "Music",
      "EDM",
      "F**K YOU",
      "Silent Child",
      "Lyrics",
      "MrSuicideSheep",
    ],
  },
  {
    _id: uuid(),
    title: "Eminem - Rap God (Explicit)",
    creatorImage:
      "https://yt3.ggpht.com/ytc/AKedOLTl3oEyE5erZSJL6T3AqzFUo2pjsbI2f595a8gvQQ=s88-c-k-c0x00ffffff-no-rj",
    creatorName: "EminemMusic",
    thumbNail:
      "https://i.ytimg.com/vi/XbGs_qK2PQA/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAatfPwAzRt-udN2X0oPiJz9k97kg",
    viewCount: 180000000,
    videoDesc: "Eminem - Rap God (Explicit)",
    publishedAt: toTimestamp("02/13/2013 23:31:30"),
    category: "Hip Hop",
    videoURL: "https://www.youtube.com/watch?v=XbGs_qK2PQA",
    tags: [
      "Music",
      "Hip Hop",
      "Rap",
      "Eminem",
      "Explicit",
      "Rap God",
      "EminemMusic",
    ],
  },
  {
    _id: uuid(),
    title: "Juice WRLD - Lucid Dreams (Directed by Cole Bennett)",
    creatorImage:
      "https://yt3.ggpht.com/ytc/AKedOLQpH7ilr8k0ALkDT1e8rHpVVlB2EFzB_WhfnjUx=s68-c-k-c0x00ffffff-no-rj",
    creatorName: "Lyrical Lemonade",
    thumbNail: "https://i.postimg.cc/NFRkV9p7/mqdefault-6s.webp",
    viewCount: 807538896,
    videoDesc: "Juice WRLD - Lucid Dreams (Directed by Cole Bennett)",
    publishedAt: toTimestamp("09/1/2019 23:31:30"),
    category: "Hip Hop",
    videoURL: "https://www.youtube.com/watch?v=mzB1VGEGcSU",
    tags: ["Music", "Hip Hop", "Rap", "Juice WRLD", "Lucid Dreams"],
  },
  {
    _id: uuid(),
    title:
      "Machine Gun Kelly - Mind of a Stoner ft. Wiz Khalifa (OFFICIAL MUSIC VIDEO)",
    creatorImage:
      "https://yt3.ggpht.com/ytc/AKedOLRkrSDf5fh-1FJCxsbFMzkqyiO3Q655hmNiKIcTBg=s88-c-k-c0x00ffffff-no-rj",
    creatorName: "Machine Gun Kelly",
    thumbNail: "https://i.postimg.cc/1trmFHTY/mqdefault-6s.webp",
    viewCount: 47538896,
    videoDesc:
      "Machine Gun Kelly - Mind of a Stoner ft. Wiz Khalifa (OFFICIAL MUSIC VIDEO)",
    publishedAt: toTimestamp("03/13/2013 23:31:30"),
    category: "Hip Hop",
    videoURL: "https://www.youtube.com/watch?v=SQ2HstgvzZ4",
    tags: [
      "Music",
      "Hip Hop",
      "Rap",
      "Machine Gun Kelly",
      "Mind of a Stoner",
      "Wiz Khalifa",
    ],
  },
  {
    _id: uuid(),
    title: "Taylor Swift - Delicate (Official Video)",
    creatorImage:
      "https://yt3.ggpht.com/MqKm9xyjonzkICKA78ir0AM-WUR47ntkBeJlgHeIk_rUnPuukiWtzOEmU7UjO8cFoPrBatCh3As=s88-c-k-c0x00ffffff-no-rj",
    creatorName: "Taylor Swift",
    thumbNail: "https://i.postimg.cc/zX1jh7Gd/mqdefault-6s.webp",
    viewCount: 908538896,
    videoDesc: "Taylor Swift - Delicate (Official Video)",
    publishedAt: toTimestamp("03/13/2018 23:31:30"),
    category: "Pop",
    videoURL: "https://www.youtube.com/watch?v=tCXGJQYZ9JA",
    tags: ["Music", "Pop", "Taylor Swift", "Delicate"],
  },
  {
    _id: uuid(),
    title: "Ed Sheeran - Bad Habits [Official Video]",
    creatorImage:
      "https://yt3.ggpht.com/-syoRcPPGt3NE3TzbKJsefa5Rej4w_lSof-aXSm1Q9cDx5Gyn-Cuus8UKjKBtILs_Bqwgc_i0A=s88-c-k-c0x00ffffff-no-rj",
    creatorName: "Ed Sheeran",
    thumbNail: "https://i.postimg.cc/255T65Sr/mqdefault-6s.webp",
    viewCount: 908538896,
    videoDesc: "Ed Sheeran - Bad Habits [Official Video]",
    publishedAt: toTimestamp("01/13/2022 23:31:30"),
    category: "Pop",
    videoURL: "https://www.youtube.com/watch?v=orJSJGHjBLI",
    tags: ["Music", "Pop", "Ed Sheeran", "Bad Habits"],
  },
];
