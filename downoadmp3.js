const download = require("download");

// Array of file URLs, not exclusive to just .mp3 files
const fileList = [
  "https://content.inter-nation.uz/videos/intermediate/1_week/01_the_purple_palace.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
];

// Folder to download to
const filePath = "files";

// Downloader method loops through fileList array
for (const file of fileList) {
  download(file, filePath).then(() => {
    console.log("Download Complete: " + file);
  });
}
