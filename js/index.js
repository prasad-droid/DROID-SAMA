"use strict";
let videoSrc="src/404.mp4"
let player = videojs("player", {
    html5: {
      vhs: {
        withCredentials: true,
      },
    },
  });

  player.src({
    src: videoSrc,
    withCredentials: true,
  });