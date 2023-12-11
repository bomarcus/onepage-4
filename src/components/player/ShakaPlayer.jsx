import { useEffect, useRef, useCallback, useState, memo } from 'react';
import shaka from 'shaka-player/dist/shaka-player.ui.js';
import 'shaka-player/dist/controls.css';

const ShakaPlayer = memo(({ videoUrl }) => {
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const playerRef = useRef(null);
  const [isBrowserSupported, setIsBrowserSupported] = useState(true);
  const [playerError, setPlayerError] = useState(null);

  const onPlayerError = useCallback((event) => {
    const error = event.detail;
    console.error('Error code', error.code, 'Object', error);
    setPlayerError(`Playback error: ${error.message} (Code: ${error.code})`);
  }, []);

  const initPlayer = useCallback(() => {
    const video = videoRef.current;
    const videoContainer = videoContainerRef.current;
    console.log(shaka.Player.version);

    const player = new shaka.Player();
    playerRef.current = player;

    if (shaka.log && typeof shaka.log.setLevel === 'function') {
      shaka.log.setLevel(shaka.log.Level.V2);
    }

    player.addEventListener('error', onPlayerError);

    player.attach(video).then(() => {
      const ui = new shaka.ui.Overlay(player, videoContainer, video);
      const config = {
        addSeekBar: true,
        addBigPlayButton: true,
        enableTooltips: true,
        customContextMenu: true,
        showAudioChannelCountVariants: true,
        seekBarColors: {
          base: 'rgba(255, 10, 255, 0.3)',
          buffered: 'rgba(255, 155, 55, 0.54)',
          played: 'rgb(255, 255, 55)'
        },
        contextMenuElements: ['statistics'],
        statisticsList: [
          'width',
          'height',
          'streamBandwidth',
          'decodedFrames',
          'droppedFrames',
          'corruptedFrames',
          'estimatedBandwidth',
          'gapsJumped',
          'stallsDetected',
          'completionPercent',
          'loadLatency',
          'manifestTimeSeconds',
          'drmTimeSeconds',
          'playTime',
          'pauseTime',
          'bufferingTime',
          'licenseTime',
          'liveLatency',
          'maxSegmentDuration'
        ],
        overflowMenuButtons: ['statistics'],
        controlPanelElements: [
          'play_pause',
          'mute',
          'volume',
          'fullscreen',
          'time_and_duration',
          'spacer',
          'overflow_menu',
          'airplay',
          'fast_forward',
          'quality',
          'captions',
          'language',
          'picture_in_picture'
        ]
      };
      ui.configure(config);

      player.load(videoUrl).catch((error) => {
        if (error.code === shaka.util.Error.Code.LOAD_INTERRUPTED) {
          console.log('Load interrupted');
        } else {
          console.error('Error loading video:', error);
          setPlayerError(`Error loading video: ${error.message}`);
        }
      });
    });
  }, [onPlayerError, videoUrl]);

  useEffect(() => {
    shaka.polyfill.installAll();

    if (shaka.Player.isBrowserSupported()) {
      initPlayer();
    } else {
      setIsBrowserSupported(false);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.removeEventListener('error', onPlayerError);
        playerRef.current.destroy();
      }
    };
  }, [initPlayer, videoUrl, onPlayerError]);

  if (!isBrowserSupported) {
    return <div>Sorry, your browser is not supported.</div>;
  }

  return (
    <div className="App">
      <div ref={videoContainerRef} className="shaka-video-container">
        <video ref={videoRef} className="shaka-video" controls={false}></video>
      </div>
      {playerError && <div className="error-message">{playerError}</div>}
    </div>
  );
});

ShakaPlayer.displayName = 'ShakaPlayer';

export default ShakaPlayer;
