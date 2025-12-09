/**
 * Comprehensive list of music-related subreddits organized by category
 * Based on the original Music Player for Reddit subreddit list
 */

export interface SubredditCategory {
  name: string;
  path: string;
  category: string;
}

export const REDDIT_SUBREDDITS: Record<string, SubredditCategory[]> = {
  Favorite: [
    {
      name: "My Subreddit Playlist",
      path: "custom-reddit",
      category: "Favorite",
    },
  ],

  "Listening Communities": [
    {
      name: "listenothis",
      path: "r/listenothis",
      category: "Listening Communities",
    },
    { name: "music", path: "r/music", category: "Listening Communities" },
    {
      name: "indieheads",
      path: "r/indieheads",
      category: "Listening Communities",
    },
    {
      name: "hiphopheads",
      path: "r/hiphopheads",
      category: "Listening Communities",
    },
    { name: "popheads", path: "r/popheads", category: "Listening Communities" },
  ],

  Alternative: [
    { name: "90sPunk", path: "r/90spunk", category: "Alternative" },
    { name: "EmoScreamo", path: "r/emoscreamo", category: "Alternative" },
    { name: "GaragePunk", path: "r/garagepunk", category: "Alternative" },
    {
      name: "Punkskahardcore",
      path: "r/punkskahardcore",
      category: "Alternative",
    },
    { name: "Ska", path: "r/ska", category: "Alternative" },
    { name: "crustpunk", path: "r/crustpunk", category: "Alternative" },
    { name: "grunge", path: "r/grunge", category: "Alternative" },
    { name: "poppunkers", path: "r/poppunkers", category: "Alternative" },
    { name: "postpunk", path: "r/postpunk", category: "Alternative" },
    { name: "punk", path: "r/punk", category: "Alternative" },
    { name: "metal", path: "r/metal", category: "Alternative" },
    { name: "Metalcore", path: "r/Metalcore", category: "Alternative" },
    { name: "BlackMetal", path: "r/BlackMetal", category: "Alternative" },
    { name: "deathmetal", path: "r/deathmetal", category: "Alternative" },
    { name: "doommetal", path: "r/doommetal", category: "Alternative" },
    { name: "folkmetal", path: "r/folkmetal", category: "Alternative" },
    { name: "powermetal", path: "r/powermetal", category: "Alternative" },
    { name: "progmetal", path: "r/progmetal", category: "Alternative" },
    { name: "thrashmetal", path: "r/thrashmetal", category: "Alternative" },
  ],

  Asian: [
    { name: "cpop", path: "r/cpop", category: "Asian" },
    { name: "jpop", path: "r/jpop", category: "Asian" },
    { name: "japanesemusic", path: "r/japanesemusic", category: "Asian" },
    { name: "kpop", path: "r/kpop", category: "Asian" },
    { name: "vkgm", path: "r/vkgm", category: "Asian" },
    { name: "thaimusic", path: "r/thaimusic", category: "Asian" },
    { name: "indianmusic", path: "r/indianmusic", category: "Asian" },
    { name: "Asianrap", path: "r/Asianrap", category: "Asian" },
  ],

  "Blues / Funk / Jazz / Soul": [
    { name: "blues", path: "r/blues", category: "Blues / Funk / Jazz / Soul" },
    { name: "funk", path: "r/funk", category: "Blues / Funk / Jazz / Soul" },
    { name: "jazz", path: "r/jazz", category: "Blues / Funk / Jazz / Soul" },
    { name: "soul", path: "r/soul", category: "Blues / Funk / Jazz / Soul" },
    {
      name: "RnBHeads",
      path: "r/RnBHeads",
      category: "Blues / Funk / Jazz / Soul",
    },
  ],

  "Country / Folk / Bluegrass": [
    {
      name: "country",
      path: "r/country",
      category: "Country / Folk / Bluegrass",
    },
    {
      name: "country_music",
      path: "r/country_music",
      category: "Country / Folk / Bluegrass",
    },
    {
      name: "bluegrass",
      path: "r/bluegrass",
      category: "Country / Folk / Bluegrass",
    },
    {
      name: "altcountry",
      path: "r/altcountry",
      category: "Country / Folk / Bluegrass",
    },
    { name: "folk", path: "r/folk", category: "Country / Folk / Bluegrass" },
    {
      name: "FolkPunk",
      path: "r/FolkPunk",
      category: "Country / Folk / Bluegrass",
    },
  ],

  "Electronic / EDM": [
    {
      name: "electronicmusic",
      path: "r/electronicmusic",
      category: "Electronic / EDM",
    },
    { name: "edm", path: "r/edm", category: "Electronic / EDM" },
    { name: "house", path: "r/house", category: "Electronic / EDM" },
    { name: "techno", path: "r/techno", category: "Electronic / EDM" },
    { name: "trance", path: "r/trance", category: "Electronic / EDM" },
    {
      name: "drum_and_bass",
      path: "r/drum_and_bass",
      category: "Electronic / EDM",
    },
    { name: "DnB", path: "r/DnB", category: "Electronic / EDM" },
    { name: "dubstep", path: "r/dubstep", category: "Electronic / EDM" },
    { name: "trap", path: "r/trap", category: "Electronic / EDM" },
    { name: "synthwave", path: "r/synthwave", category: "Electronic / EDM" },
    { name: "outrun", path: "r/outrun", category: "Electronic / EDM" },
    { name: "deephouse", path: "r/deephouse", category: "Electronic / EDM" },
    {
      name: "futurebeats",
      path: "r/futurebeats",
      category: "Electronic / EDM",
    },
    {
      name: "futurefunkairlines",
      path: "r/futurefunkairlines",
      category: "Electronic / EDM",
    },
    { name: "idm", path: "r/idm", category: "Electronic / EDM" },
    {
      name: "industrialtechno",
      path: "r/industrialtechno",
      category: "Electronic / EDM",
    },
    { name: "BigRoom", path: "r/BigRoom", category: "Electronic / EDM" },
    { name: "complextro", path: "r/complextro", category: "Electronic / EDM" },
    {
      name: "electrohouse",
      path: "r/electrohouse",
      category: "Electronic / EDM",
    },
    {
      name: "progressivehouse",
      path: "r/progressivehouse",
      category: "Electronic / EDM",
    },
    { name: "tech_house", path: "r/tech_house", category: "Electronic / EDM" },
    { name: "treemusic", path: "r/treemusic", category: "Electronic / EDM" },
  ],

  Experimental: [
    { name: "experimental", path: "r/experimental", category: "Experimental" },
    { name: "avantgarde", path: "r/avantgarde", category: "Experimental" },
    { name: "noisemusic", path: "r/noisemusic", category: "Experimental" },
    {
      name: "generativemusic",
      path: "r/generativemusic",
      category: "Experimental",
    },
    {
      name: "psychedelicrock",
      path: "r/psychedelicrock",
      category: "Experimental",
    },
  ],

  "Hip Hop / Rap": [
    { name: "hiphop", path: "r/hiphop", category: "Hip Hop / Rap" },
    { name: "hiphopheads", path: "r/hiphopheads", category: "Hip Hop / Rap" },
    { name: "90sHipHop", path: "r/90sHipHop", category: "Hip Hop / Rap" },
    { name: "altrap", path: "r/altrap", category: "Hip Hop / Rap" },
    { name: "backspin", path: "r/backspin", category: "Hip Hop / Rap" },
    { name: "makinghiphop", path: "r/makinghiphop", category: "Hip Hop / Rap" },
    { name: "trapmuzik", path: "r/trapmuzik", category: "Hip Hop / Rap" },
    {
      name: "trapproduction",
      path: "r/trapproduction",
      category: "Hip Hop / Rap",
    },
    { name: "rappers", path: "r/rappers", category: "Hip Hop / Rap" },
    {
      name: "undergroundhiphop",
      path: "r/undergroundhiphop",
      category: "Hip Hop / Rap",
    },
  ],

  Pop: [
    { name: "pop_music", path: "r/pop_music", category: "Pop" },
    { name: "popheads", path: "r/popheads", category: "Pop" },
    { name: "pop", path: "r/pop", category: "Pop" },
    { name: "poprock", path: "r/poprock", category: "Pop" },
    { name: "PowerPop", path: "r/PowerPop", category: "Pop" },
  ],

  Rock: [
    { name: "rock", path: "r/rock", category: "Rock" },
    { name: "classicrock", path: "r/classicrock", category: "Rock" },
    { name: "hardrock", path: "r/hardrock", category: "Rock" },
    { name: "progressiverock", path: "r/progressiverock", category: "Rock" },
    { name: "progressivemetal", path: "r/progressivemetal", category: "Rock" },
    { name: "psychrock", path: "r/psychrock", category: "Rock" },
    { name: "stonerrock", path: "r/stonerrock", category: "Rock" },
    { name: "AltRock", path: "r/AltRock", category: "Rock" },
    { name: "indie_rock", path: "r/indie_rock", category: "Rock" },
    { name: "Alternativerock", path: "r/Alternativerock", category: "Rock" },
    { name: "90sAlternative", path: "r/90sAlternative", category: "Rock" },
    { name: "90smusic", path: "r/90smusic", category: "Rock" },
    { name: "80smusic", path: "r/80smusic", category: "Rock" },
    { name: "70smusic", path: "r/70smusic", category: "Rock" },
    { name: "60smusic", path: "r/60smusic", category: "Rock" },
  ],

  "Chill / Ambient / Lo-Fi": [
    { name: "lofi", path: "r/lofi", category: "Chill / Ambient / Lo-Fi" },
    {
      name: "lofihiphop",
      path: "r/lofihiphop",
      category: "Chill / Ambient / Lo-Fi",
    },
    { name: "ambient", path: "r/ambient", category: "Chill / Ambient / Lo-Fi" },
    {
      name: "ambientmusic",
      path: "r/ambientmusic",
      category: "Chill / Ambient / Lo-Fi",
    },
    {
      name: "chillmusic",
      path: "r/chillmusic",
      category: "Chill / Ambient / Lo-Fi",
    },
    {
      name: "chillout",
      path: "r/chillout",
      category: "Chill / Ambient / Lo-Fi",
    },
    {
      name: "downtempo",
      path: "r/downtempo",
      category: "Chill / Ambient / Lo-Fi",
    },
    {
      name: "chillhop",
      path: "r/chillhop",
      category: "Chill / Ambient / Lo-Fi",
    },
    {
      name: "vaporwave",
      path: "r/vaporwave",
      category: "Chill / Ambient / Lo-Fi",
    },
    {
      name: "futuresynth",
      path: "r/futuresynth",
      category: "Chill / Ambient / Lo-Fi",
    },
  ],

  "Reggae / Dancehall / Dub": [
    { name: "reggae", path: "r/reggae", category: "Reggae / Dancehall / Dub" },
    { name: "dub", path: "r/dub", category: "Reggae / Dancehall / Dub" },
    {
      name: "dubstep",
      path: "r/dubstep",
      category: "Reggae / Dancehall / Dub",
    },
    {
      name: "realdubstep",
      path: "r/realdubstep",
      category: "Reggae / Dancehall / Dub",
    },
    {
      name: "reggaeton",
      path: "r/reggaeton",
      category: "Reggae / Dancehall / Dub",
    },
    {
      name: "Rocksteady",
      path: "r/Rocksteady",
      category: "Reggae / Dancehall / Dub",
    },
  ],

  "Latin / World": [
    { name: "latin", path: "r/latin", category: "Latin / World" },
    { name: "Salsa", path: "r/Salsa", category: "Latin / World" },
    { name: "afrobeats", path: "r/afrobeats", category: "Latin / World" },
    { name: "Afrohouse", path: "r/Afrohouse", category: "Latin / World" },
    { name: "balkanbrass", path: "r/balkanbrass", category: "Latin / World" },
    { name: "Cumbia", path: "r/Cumbia", category: "Latin / World" },
    { name: "WorldMusic", path: "r/WorldMusic", category: "Latin / World" },
  ],

  Classical: [
    { name: "classicalmusic", path: "r/classicalmusic", category: "Classical" },
    { name: "composer", path: "r/composer", category: "Classical" },
    { name: "contemporary", path: "r/contemporary", category: "Classical" },
    { name: "opera", path: "r/opera", category: "Classical" },
  ],

  "Singer-Songwriter / Acoustic": [
    {
      name: "singersongwriter",
      path: "r/singersongwriter",
      category: "Singer-Songwriter / Acoustic",
    },
    {
      name: "singersongwriters",
      path: "r/singersongwriters",
      category: "Singer-Songwriter / Acoustic",
    },
    {
      name: "AcousticOriginals",
      path: "r/AcousticOriginals",
      category: "Singer-Songwriter / Acoustic",
    },
    {
      name: "Acousticguitar",
      path: "r/Acousticguitar",
      category: "Singer-Songwriter / Acoustic",
    },
  ],

  "Indie / Alternative": [
    { name: "indie", path: "r/indie", category: "Indie / Alternative" },
    { name: "indiefolk", path: "r/indiefolk", category: "Indie / Alternative" },
    {
      name: "indieheads",
      path: "r/indieheads",
      category: "Indie / Alternative",
    },
    {
      name: "indie_rock",
      path: "r/indie_rock",
      category: "Indie / Alternative",
    },
    { name: "IndieFolk", path: "r/IndieFolk", category: "Indie / Alternative" },
  ],

  Production: [
    { name: "makinghiphop", path: "r/makinghiphop", category: "Production" },
    {
      name: "musicproduction",
      path: "r/musicproduction",
      category: "Production",
    },
    {
      name: "trapproduction",
      path: "r/trapproduction",
      category: "Production",
    },
    {
      name: "audioengineering",
      path: "r/audioengineering",
      category: "Production",
    },
    {
      name: "WeAreTheMusicMakers",
      path: "r/WeAreTheMusicMakers",
      category: "Production",
    },
    { name: "edmproduction", path: "r/edmproduction", category: "Production" },
    { name: "Ableton", path: "r/Ableton", category: "Production" },
    { name: "FL_Studio", path: "r/FL_Studio", category: "Production" },
  ],

  Soundtracks: [
    { name: "gamemusic", path: "r/gamemusic", category: "Soundtracks" },
    { name: "soundtracks", path: "r/soundtracks", category: "Soundtracks" },
    { name: "OST", path: "r/OST", category: "Soundtracks" },
    { name: "FilmMusic", path: "r/FilmMusic", category: "Soundtracks" },
    { name: "chiptunes", path: "r/chiptunes", category: "Soundtracks" },
  ],

  "Other Genres": [
    { name: "disco", path: "r/disco", category: "Other Genres" },
    { name: "Vocaloid", path: "r/Vocaloid", category: "Other Genres" },
    { name: "Nightcore", path: "r/Nightcore", category: "Other Genres" },
    { name: "Kawaii", path: "r/Kawaii", category: "Other Genres" },
    { name: "swing", path: "r/swing", category: "Other Genres" },
    { name: "Bossanova", path: "r/Bossanova", category: "Other Genres" },
    { name: "Flamenco", path: "r/Flamenco", category: "Other Genres" },
    { name: "Goth", path: "r/Goth", category: "Other Genres" },
    { name: "Cabaret", path: "r/Cabaret", category: "Other Genres" },
  ],
};
