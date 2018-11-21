/**
 * play
 * pause
 * 
 * loop
 * autoplay
 * preload
 * controlls
 * controllsList
 * src
 * currentSrc
 * currentTime
 * defaultMuted
 * muted
 * defaultPlaybackRate
 * disableRemotePlayback
 * mediaKeys
 * played
 * paused
 * volume 0-1
 * ended
 * duration 秒
 * 
 * onvolumechange
 * onratechange
 * ontimeupdate
 * onplay
 * onplaying
 * onpause
 * oncanplay
 * oncanplaythrough
 */
var audioSample = createAudio('sample.mp3', (audio, data) => {
  document.querySelector('body').appendChild(audio);
  initAudioEvent(audio);
  audio.play();
  setTimeout(() => {
    audio.pause();
  }, 2500);
  setTimeout(() => {
    audio.volume = 0.1;
    audio.play();
  }, 4500);
})

function createAudio(url, callback) {
  let audio = document.createElement('audio');
  getAudio(url, (data) => {
    audio.src = url;
    callback && typeof callback === 'function' && callback(audio, data);
  });
  return audio;
}

function getAudio(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.onload = () => {
    callback && typeof callback === 'function' && callback(xhr.response);
  };
  xhr.onerror = () => {
    console.error('请求资源错误：', url);
  };
  xhr.send();
}

function initAudioEvent(audio) {
  audio.addEventListener('play', () => {
    console.log(`play: played=${JSON.stringify(audio.played)}, paused=${audio.paused} ended=${audio.ended}`)
  });
  audio.addEventListener('canplay', () => {
    console.log(`canplay duration=${audio.duration}`)
  });
  audio.addEventListener('canplaythrough', () => {
    console.log(`canplaythrough duration=${audio.duration}`)
  });
  audio.addEventListener('pause', () => {
    console.log(`pause: played=${JSON.stringify(audio.played)}, paused=${audio.paused} ended=${audio.ended}`)
  });
  audio.addEventListener('volumechange', () => {
    console.log(`volumechange volume=${audio.volume}`)
  });
  audio.addEventListener('ended', () => {
    console.log(`end ended=${audio.ended}`)
  });
}