import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import './App.css';

/*
The logic for finding the corresponding indices 
based on the translations and the current hovered word in the French lyrics was working correctly.
However, the issue was with the communication of those indices to the English lyrics component. 
Even though the correct English indices were being identified and logged, 
the English lyrics component did not have access to that information to update its own state and highlight the corresponding words. 
This is because each instance of the `Lyrics` component was managing its own state independently, 
and there was no mechanism for the French lyrics component to communicate the identified English indices to the English lyrics component.

By lifting the state up to the parent component and passing it down as props, 
you enabled both instances of the `Lyrics` component to access and react to the same set of hovered indices, 
allowing the English lyrics to be highlighted based on the French lyrics that were hovered over.
*/

function Lyrics({
  lyrics,
  language,
  playerRef,
  addLearnedWord,
  translations,
  hoveredIndices,
  handleWordHover,
  handleMouseLeave
}) {

  const [activeWordIndex, setActiveWordIndex] = useState(-1);

  const handleWordClick = (index) => {
    const translation = translations.find((t) => t.indices.includes(index));
    if (translation) {
      const msg = new SpeechSynthesisUtterance();
      msg.text = translation.french;
      msg.lang = 'fr-FR';
      window.speechSynthesis.speak(msg);
      addLearnedWord(translation.french);
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

    const interval = setInterval(highlightLyrics, 100);
    return () => clearInterval(interval);
  }, [activeWordIndex, lyrics, playerRef]);

  return (
    <>
      <Box id={language === 'french' ? 'frenchLyrics' : 'englishLyrics'} overflowY="auto" maxH="300px">
        {lyrics.map((item, index) => (
          <React.Fragment key={index}>
            {item.word === '\n' ? (
              <br />
            ) : (
              <>
                <Text
                  as="span"
                  fontSize="lg"
                  textShadow={(index === activeWordIndex) || hoveredIndices.includes(index)
                     ? '0 0 10px #FFFFFF' 
                     : 'none'
                  }
                  fontWeight={index === activeWordIndex ? '550' : '400'}
                  cursor={language === 'french' ? 'pointer' : 'default'}
                  onMouseEnter={language === 'french' ? () => handleWordHover(index) : undefined}
                  onMouseLeave={language === 'french' ? handleMouseLeave : undefined}
                  onClick={language === 'french' ? () => handleWordClick(index) : undefined}
                >
                  {item.word}
                </Text>
                {item.word !== '\n' && ' '}
              </>
            )}
          </React.Fragment>
        ))}
      </Box>
    </>
  );
}

export default Lyrics;
