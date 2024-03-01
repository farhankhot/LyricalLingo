import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
} from '@chakra-ui/react';

import './App.css'; 

function Lyrics({ lyrics, language, playerRef }) {
  const [activeWordIndex, setActiveWordIndex] = useState(-1);

  const handleWordClick = (word, language) => {
    // Handle the word click event
    if (language === 'french') {
      const msg = new SpeechSynthesisUtterance();
      msg.text = word;
      msg.lang = 'fr-FR';
      window.speechSynthesis.speak(msg);
    }
  };

  useEffect(() => {
    const highlightLyrics = () => {
      const currentTime = playerRef.current?.getCurrentTime?.() ?? 0;

      let newIndex = -1;
      lyrics.forEach((item, index) => {
        if (item.word !== '\n' && currentTime >= item.time && (index === lyrics.length - 1 || (lyrics[index + 1].word === '\n' || currentTime < lyrics[index + 1].time))) {
          newIndex = index;
        }  
      });

      if (newIndex !== activeWordIndex) {
        setActiveWordIndex(newIndex);
      }

    };

    const interval = setInterval(highlightLyrics, 100); // Update every 100 milliseconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [activeWordIndex, lyrics, playerRef]);

  return (
      <Box id={`${language}Lyrics`} overflowY="auto" maxH="300px">
        {lyrics.map((item, index) =>
        item.word === '\n' ? (
          <br key={index} />
        ) : (
          <Text
            as="span"
            key={index}
            textShadow={index === activeWordIndex ? '0 0 10px #FFFFFF' : 'none'}
            fontWeight={index === activeWordIndex ? '550' : '400'}
            cursor={language === 'french' ? 'pointer' : 'default'}
            onClick={() => handleWordClick(item.word, language)}
            className={index === activeWordIndex ? 'highlight' : ''}
          >
            {item.word}{' '}
          </Text>
        )
      )}
    </Box>
  );
}

export default Lyrics;
