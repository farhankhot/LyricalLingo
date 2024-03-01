const songDetails = {
    "fmdLsdmYzTo": {
        name: "i_know",
        displayName: "I KNOW ?",
        artist: "Travis Scott",
        startTime: 90,
        endTime: 115
    },
    "Sv5yCzPCkv8": {
        name: "snooze",
        displayName: "Snooze",
        artist: "SZA",
        startTime: 39,
        endTime: 55
    }
    // Add more songs as needed
};

export async function selectSong(videoId) {
    const song = songDetails[videoId];
    const englishLyrics = await loadLyrics(song.name, 'english');
    const frenchLyrics = await loadLyrics(song.name, 'french');
    return [englishLyrics, frenchLyrics];
}

export function startEndTimeOfSong(videoId) {
  const song = songDetails[videoId];
  return [song.startTime, song.endTime];
}

export async function loadLyrics(name, language) {
  const response = await fetch(`./${name}_${language}_timestamps.json`);
  const lyrics = await response.json();
  return lyrics;
}

export function getSongName(videoId) {
  const song = songDetails[videoId];
  return song.displayName; 
}

export function getArtistName(videoId) {
  const song = songDetails[videoId];
  return song.artist;
}