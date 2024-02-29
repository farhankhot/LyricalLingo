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
} from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import YouTubePlayer from './YouTubePlayer';
import {selectSong, startEndTimeOfSong, getSongName} from './helper.js';
import Lyrics from './Lyrics.js';

function MainPage() {
  const [videoId, setVideoId] = useState("");
  const [songName, setSongName] = useState("");
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

  useEffect(() => {
    const initialVideoId = "fmdLsdmYzTo";
    setVideoId(initialVideoId);  
    fetchName(initialVideoId);
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
    <Flex justifyContent="center" alignItems="center" marginTop={5}>
      <Card>
        <CardHeader>
          <Heading size='md' textAlign='center'>{songName}</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            {/* Render youtube player here */}
            {videoId !== "" && (
              <div className="youtube-player-container">
                <YouTubePlayer
                  videoId={videoId}
                  startTime={startTime}
                  endTime={endTime}
                  playerRef={playerRef}  
                />
              </div>
            )}
            <Box>
              {/* Here, we render the options (song and playback speed) */}
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
            <Lyrics lyrics={englishLyrics} language="english" playerRef={playerRef} />
            <Lyrics lyrics={frenchLyrics} language="french" playerRef={playerRef}/>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default MainPage;
