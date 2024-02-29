const songDetails = {
    "fmdLsdmYzTo": {
        name: "i_know",
        displayName: "I KNOW ?",
        startTime: 90,
        endTime: 115
    },
    "Sv5yCzPCkv8": {
        name: "snooze",
        displayName: "Snooze",
        startTime: 39,
        endTime: 55
    }
    // Add more songs as needed
};

export async function selectSong(videoId) {
    const song = songDetails[videoId];
    const englishLyrics = await loadLyrics(song.name, 'english');
    const frenchLyrics = await loadLyrics(song.name, 'french');

    // Fill the learned words div with all the French words
    const learnedWords = frenchLyrics.map(item => {
        return { word: item.word, translation: 'Translation here' }; // Replace 'Translation here' with actual translation logic
    });
    // updateLearnedWordsList();
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

// function updateLearnedWordsList() {
//     const learnedWordsList = document.getElementById('learnedWords');
//     learnedWordsList.innerHTML = '';

//     learnedWords.forEach(item => {
//         const listItem = document.createElement('li');
//         listItem.innerText = `${item.word} - ${item.translation}`;
//         learnedWordsList.appendChild(listItem);
//     });
// }