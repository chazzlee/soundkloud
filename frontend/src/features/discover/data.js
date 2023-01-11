export const sampleArtistsToFollow = [
  {
    id: 1,
    name: "Slayer",
    likes: 3238,
    follows: 324,
    avatar: "https://www.metal-archives.com/images/7/2/72_logo.png",
  },
  {
    id: 2,
    name: "Sepultura",
    likes: 5432,
    follows: 624,
    avatar: "https://www.metal-archives.com/images/7/8/78_logo.jpg",
  },
  {
    id: 3,
    name: "Suffocation",
    likes: 238,
    follows: 724,
    avatar: "https://www.metal-archives.com/images/1/1/9/119_photo.jpg",
  },
  {
    id: 4,
    name: "Sodom",
    likes: 57238,
    follows: 840,
    avatar: "https://www.metal-archives.com/images/4/1/9/419_logo.jpg",
  },
  {
    id: 5,
    name: "Destroyer 666",
    likes: 888,
    follows: 333,
    avatar: "https://www.metal-archives.com/images/2/2/3/223_logo.jpg",
  },
  {
    id: 6,
    name: "Helstar",
    likes: 4338,
    follows: 650,
    avatar: "https://www.metal-archives.com/images/1/4/2/142_logo.jpg",
  },
  {
    id: 7,
    name: "Judas Priest",
    likes: 3638,
    follows: 45494,
    avatar: "https://www.metal-archives.com/images/9/7/97_logo.png",
  },
  {
    id: 8,
    name: "Immolation",
    likes: 38838,
    follows: 103934,
    avatar: "https://www.metal-archives.com/images/1/9/4/194_logo.jpg",
  },
  {
    id: 9,
    name: "Obscura",
    likes: 8098,
    follows: 33403,
    avatar: "https://www.metal-archives.com/images/6/3/1/0/63100_logo.jpg",
  },
  {
    id: 10,
    name: "Elderwind",
    likes: 6738,
    follows: 43234,
    avatar: "https://www.metal-archives.com/images/3/5/4/0/3540355550_logo.jpg",
  },
  {
    id: 11,
    name: "Bloodbath",
    likes: 1138,
    follows: 640,
    avatar:
      "https://4.bp.blogspot.com/_UCnOzPoV3nM/SY5PDA_7IRI/AAAAAAAABDE/JtQ31bksc78/s400/Bloodbath_Logo.png",
  },
  {
    id: 12,
    name: "Dissection",
    likes: 5038,
    follows: 3660,
    avatar: "https://www.metal-archives.com/images/1/8/3/183_logo.jpg",
  },
  {
    id: 13,
    name: "Psycroptic",
    likes: 6538,
    follows: 3543,
    avatar:
      "https://i.discogs.com/EfzfSw2vJ3FBiDR-yrxjD71HW9EDDzx2j5171Vi4geI/rs:fit/g:sm/q:90/h:595/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQyNDM2/NzktMTQyNTQ3NDU2/OC00NDA1LmpwZWc.jpeg",
  },
];

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};
export const artistsToFollow = shuffle(sampleArtistsToFollow).slice(0, 8);
export const newTracks = shuffle(sampleArtistsToFollow).slice(0, 4);
