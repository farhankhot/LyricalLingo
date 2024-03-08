import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
  Grid,
  Flex,
  Select,
  Spacer,
  Badge,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';

import {StarIcon } from '@chakra-ui/icons'
import { Icon } from '@chakra-ui/react'
import { IoMdPlayCircle } from 'react-icons/io'
import { IoMdSkipBackward } from 'react-icons/io'
import { IoMdSkipForward } from 'react-icons/io'
import { IoMdMicrophone } from 'react-icons/io'

import {selectSong, startEndTimeOfSong, getSongName, getArtistName, getTranslation} from './helper.js';

import YouTubePlayer from './YouTubePlayer';
import Lyrics from './Lyrics.js';
import LearnedWordsDrawer from './LearnedWordsDrawer.js';

function MainPage() {
  const [videoId, setVideoId] = useState("");
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [playbackSpeed, setPlaybackSpeed] = useState("");
  const [englishLyrics, setEnglishLyrics] = useState([]);
  const [frenchLyrics, setFrenchLyrics] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const playerRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [learnedWords, setLearnedWords] = useState([]);
  const [translations, setTranslations] = useState([]);


  const [frenchHoveredIndices, setFrenchHoveredIndices] = useState([]);
  const [englishHoveredIndices, setEnglishHoveredIndices] = useState([]);

  const handleWordHover = (index) => {
    const translation = translations.find((t) => t.indices.includes(index));
    if (translation) {
      setEnglishHoveredIndices(translation.englishIndices);
      setFrenchHoveredIndices(translation.indices);
    }
  };

  const handleMouseLeave = () => {
    setEnglishHoveredIndices([]);
    setFrenchHoveredIndices([]);
  };


  const addLearnedWord = (word) => {
    const translation = translations.find((item) => item.french === word);
    if (translation && !learnedWords.some((item) => item.french === word)) {
      setLearnedWords([...learnedWords, translation]);
    }
  };

  const fetchLyrics = async (initialVideoId) => {
    const [englishLyrics, frenchLyrics] = await selectSong(initialVideoId);
    setEnglishLyrics(englishLyrics);
    setFrenchLyrics(frenchLyrics);
  };

  const fetchStartEndTimeSong = (initialVideoId) => {
    const [startTime, endTime] = startEndTimeOfSong(initialVideoId);
    setStartTime(startTime);
    setEndTime(endTime);
  };

  const fetchName = (initialVideoId) => {
    const name = getSongName(initialVideoId);
    setSongName(name);
  }

  const fetchArtistName = (initialVideoId) => {
    const artistName = getArtistName(initialVideoId);
    setArtistName(artistName);
  }
  
  const fetchTranslation = async (initialVideoId) => {
    const artistName = await getTranslation(initialVideoId);
    setTranslations(artistName);
  }

  useEffect(() => {
    const initialVideoId = "fmdLsdmYzTo";
    setVideoId(initialVideoId);  
    fetchName(initialVideoId);
    fetchArtistName(initialVideoId);
    fetchLyrics(initialVideoId);
    fetchStartEndTimeSong(initialVideoId);
    fetchTranslation(initialVideoId);
  }, []);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setPlaybackRate(playbackSpeed);
    }
  }, [playbackSpeed]);  
  
  const handleSongChange = (event) => {
    const newVideoId = event.target.value; 
    setVideoId(newVideoId);
    fetchName(newVideoId);
    fetchArtistName(newVideoId);
    selectSong(newVideoId);
    fetchLyrics(newVideoId);
    fetchStartEndTimeSong(newVideoId);
  };

  const handlePlaybackSpeed = (event) => {
    const newSpeed = parseFloat(event.target.value);
    setPlaybackSpeed(newSpeed);
    if (playerRef.current) {
      playerRef.current.setPlaybackRate(newSpeed);
    }
  }; 

  return (
    <>
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1rem" bgGradient="linear(to-r, #6D28D9, #4C1D95)" color="white">
      <Flex align="center" mr={5}>
        <StarIcon w={8} h={8} />
        <Text fontSize="xl" fontWeight="bold" marginLeft="10px">
          Lyrical Lingo
        </Text>
      </Flex>
      <Spacer />
      <Box>
        {/* You can add additional navigation items here */}
        <Button onClick={onOpen}>Learned Words</Button>
      </Box>
    </Flex>

    <LearnedWordsDrawer isOpen={isOpen} onClose={onClose} learnedWords={learnedWords} />

    <Flex
      position="relative" 
      justifyContent="center"
      alignItems="center"
      marginTop={5}
      style={{ transition: 'margin-right .5s', marginRight: isOpen ? '300px' : '0px' }}
    >
      <Card >
        <CardBody>
          <Flex direction={{ base: 'column', lg: 'row' }} align="start" justify="start" wrap="wrap">
            
            <Box bg="black" borderRadius="md" overflow="hidden">
              {/* Simulating an album cover container for the YouTube Player */}
              <YouTubePlayer
                videoId={videoId}
                startTime={startTime}
                endTime={endTime}
                playerRef={playerRef}
              />
            </Box>
            <Flex direction="column" justifyContent="center" marginLeft={7}>
              <Heading size='lg'>{songName}</Heading>
              <Text fontSize="md"><Badge>{artistName}</Badge></Text>
              <br></br>
              <Button><Icon as={IoMdMicrophone}/>Record Yourself</Button>
            </Flex>
          </Flex>

          {/* <Flex justify="end" align="end" mt={{ base: -15, lg: -8 }} ml={{ base: -8, lg: 4 }} padding={4}>
            <Icon as={IoMdSkipBackward} w={10} h={10} />
            <Icon as={IoMdPlayCircle} w={12} h={12} mx={2} />
            <Icon as={IoMdSkipForward} w={10} h={10} />
          </Flex> */}
          <br></br>
          
          {/* Here we render the lyrics */}
          <Stack direction={{ base: 'column', md: 'row' }} divider={<StackDivider />} spacing="4">
            <Box minHeight="200px" flex="1" bgGradient="linear(to-r, #6D28D9, #4C1D95)" p={4} borderRadius="md" boxShadow="0 0 10px #e0b0ff">
              <Flex alignItems="center" justifyContent="space-between">
              </Flex>
              <Lyrics lyrics={frenchLyrics} language="french" playerRef={playerRef} 
              addLearnedWord={addLearnedWord} translations={translations}
              hoveredIndices={frenchHoveredIndices} handleWordHover={handleWordHover} handleMouseLeave={handleMouseLeave}/>
            </Box>

            {/* For english we do not pass addLearnedWord  */}
            <Box minHeight="200px" flex="1" bg="purple.500" p={4} borderRadius="md">
              <Lyrics lyrics={englishLyrics} language="english" playerRef={playerRef}
              translations={translations} hoveredIndices={englishHoveredIndices}/>
            </Box>
          </Stack>

          <br></br>

          {/* Here, we render the options (song and playback speed) */}
          <Stack divider={<StackDivider />} spacing='4'>
            <Box px="4" maxWidth="150px">
              <Select value={videoId} onChange={handleSongChange}>
                <option value="fmdLsdmYzTo">I KNOW ?</option>
                <option value="Sv5yCzPCkv8">Snooze</option>
              </Select>
              <br></br>
              <Select value={playbackSpeed} onChange={handlePlaybackSpeed}>
                <option value="0.5">0.5x</option>
                <option value="0.75">0.75x</option>
                <option value="1">1x (Normal)</option>
              </Select>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
    </>
  );
}

export default MainPage;
