/**
 * 函数
 * play()
 * pause()
 * 
 * 属性
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
 * 事件
 * onvolumechange
 * onratechange
 * ontimeupdate
 * onplay
 * onplaying
 * onpause
 * oncanplay
 * oncanplaythrough
 */
var attrArr = [
  'loop'
  , 'autoplay'
  , 'preload'
  , 'controlls'
  , 'controllsList'
  , 'src'
  , 'currentSrc'
  , 'currentTime'
  , 'defaultMuted'
  , 'muted'
  , 'defaultPlaybackRate'
  , 'disableRemotePlayback'
  , 'mediaKeys'
  , 'played'
  , 'paused'
  , 'volume'
  , 'ended'
  , 'duration'
];

var audioSample = createAudio('sample.mp3', (audio, data) => {
  document.querySelector('body').appendChild(audio);
  initAudioEvent(audio);
  var p1 = audio.play();
  console.log('p1:', p1);
  setTimeout(() => {
    console.log('p1:', p1);
    audio.pause();
    console.log('p1:', p1);
  }, 2500);
  setTimeout(() => {
    audio.volume = 0.1;
    audio.currentTime = 0;
    var p2 = audio.play();
    console.log('p2:', p2);
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
    showAttr(audio, attrArr);
  });
  audio.addEventListener('canplay', () => {
    console.log(`canplay duration=${audio.duration}`)
    showAttr(audio, attrArr);
  });
  audio.addEventListener('canplaythrough', () => {
    console.log(`canplaythrough duration=${audio.duration}`)
    showAttr(audio, attrArr);
  });
  audio.addEventListener('pause', () => {
    console.log(`pause: played=${JSON.stringify(audio.played)}, paused=${audio.paused} ended=${audio.ended}`)
    showAttr(audio, attrArr);
  });
  audio.addEventListener('volumechange', () => {
    console.log(`volumechange volume=${audio.volume}`)
    showAttr(audio, attrArr);
  });
  audio.addEventListener('ended', () => {
    console.log(`end ended=${audio.ended}`)
    showAttr(audio, attrArr);
  });
}

function showAttr(audio, attrArr) {
  var audioObj = {};
  attrArr.forEach((attr) => {
    audioObj[attr] = audio[attr];
  });
  console.log('audio-attr: ', audioObj);
}