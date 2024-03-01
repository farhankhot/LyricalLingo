import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
  Flex,
  Select,
  Spacer,
} from '@chakra-ui/react';
import {StarIcon } from '@chakra-ui/icons'

import { useState, useEffect, useRef } from 'react';
import YouTubePlayer from './YouTubePlayer';
import {selectSong, startEndTimeOfSong, getSongName, getArtistName} from './helper.js';
import Lyrics from './Lyrics.js';

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

  useEffect(() => {
    const initialVideoId = "fmdLsdmYzTo";
    setVideoId(initialVideoId);  
    fetchName(initialVideoId);
    fetchArtistName(initialVideoId);
    fetchLyrics(initialVideoId);
    fetchStartEndTimeSong(initialVideoId);
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
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1rem" bg="purple.500" color="white">
  <Flex align="center" mr={5}>
    <StarIcon w={8} h={8} />
    <Text fontSize="xl" fontWeight="bold" marginLeft="10px">
      Lyrical Lingo
    </Text>
  </Flex>
  <Spacer />
  <Box>
    {/* You can add additional navigation items here */}
  </Box>
</Flex>

    <Flex justifyContent="center" alignItems="center" marginTop={5}>
      <Card >
        <CardHeader>
          
          <Heading size='lg' textAlign='center'>{songName}</Heading>
          <Text fontSize="md" textAlign='center' marginTop="5px">
            {artistName}
          </Text>
        </CardHeader>

        <CardBody>
          <Flex direction={{ base: 'column', lg: 'row' }} align="start" justify="center" wrap="wrap">
            
            {/* Here we render the YouTube Player */}
            <Box flex="1" px="4">
              <div className='youtube-player-container'>
                <YouTubePlayer
                  videoId={videoId}
                  startTime={startTime}
                  endTime={endTime}
                  playerRef={playerRef}
                />
              </div>
            </Box>
            <br></br>


            {/* Here we render the lyrics */}
            <Stack direction={{ base: 'column', md: 'row' }} divider={<StackDivider />} spacing="4">

              <Box minHeight="200px" flex="1" bgGradient="linear(to-r, #6D28D9, #4C1D95)" p={4} borderRadius="md" boxShadow="0 0 10px #e0b0ff">
                <Flex alignItems="center" justifyContent="space-between">
                  {/* <Text fontWeight="bold" color="white" fontSize="lg">
                    French Lyrics
                  </Text> */}
                  {/* <StarIcon /> */}
                </Flex>
                <Lyrics lyrics={frenchLyrics} language="french" playerRef={playerRef}/>
              </Box>

              <Box minHeight="200px" flex="1" bg="purple.500" p={4} borderRadius="md">
                {/* <Text fontWeight="bold" color="white">
                  English Lyrics
                </Text> */}
                <Lyrics lyrics={englishLyrics} language="english" playerRef={playerRef} />
              </Box>

            </Stack>
            
            {/* Sidebar for Learned Words */}
            <Box order={3} flex="1" px="4">
              
            </Box>
          </Flex>
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
