import React, { useEffect, useRef } from 'react';

function YouTubePlayer({ videoId, startTime, endTime, playerRef }) {

  useEffect(() => {
    const onPlayerReady = (event) => {
      event.target.playVideo();
    };

    const onPlayerStateChange = (event) => {
      // You can handle player state changes here if needed
    };

    const loadYouTubeIframeAPI = () => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        playerRef.current = new window.YT.Player('player', {
          height: '200',
          width: '200',
          videoId: videoId,
          playerVars: {
            controls: 1, // the bottom bar on youtube
            rel: 0,
            disablekb: 1,
            loop: 1,
            start: startTime,
            end: endTime
        },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
      };
    };

    if (!window.YT) {
      // Load the IFrame Player API code asynchronously if not already loaded
      loadYouTubeIframeAPI();
    } else {
      // If YT is already loaded, directly create the player
      if (!playerRef.current) {
        playerRef.current = new window.YT.Player('player', {
          videoId: videoId,
          playerVars: {
            controls: 1, // the bottom bar on youtube
            rel: 0,
            disablekb: 1,
            loop: 1,
            start: startTime,
            end: endTime
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
      } else {
        playerRef.current.loadVideoById({
          videoId: videoId,
          startSeconds: startTime,
          endSeconds: endTime,
        });
      }
    }

    return () => {
      
    };
  }, [videoId, startTime, endTime, playerRef]);

  return <div id="player"></div>;
}

export default YouTubePlayer;
