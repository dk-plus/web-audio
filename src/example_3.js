
// 属性数组
var attrArr = [
  `preload`
  , `networkState`
  , `readyState`
  , `crossOrigin`
  , `buffered`
  , `loop`
  , `autoplay`
  , `controlls`
  , `controller`
  , `controllsList`
  , `mediaGroup`
  , `mediaKeys`
  , `audioTracks`
  , `textTrack`
  , `src`
  , `currentSrc`
  , `played`
  , `paused`
  , `ended`
  , `volume`
  , `defaultMuted`
  , `muted`
  , `currentTime`
  , `defaultPlaybackRate`
  , `playbackRate`
  , `defaultPlaybackRate`
  , `disableRemotePlayback`
  , `seekable`
  , `seeking`
];

// 事件数组
var eventName = [
  , `loadstart`
  , `durationchange`
  , `loadedmetadata`
  , `loadeddata`
  , `waiting`
  , `progress`
  , `canplay`
  , `canplaythrough`
  , `abort`
  , `error`
  , `stall`
  , `suspend`
  , `emptied`
  , `play`
  , `playing`
  , `pause`
  , `seeking`
  , `volumechange`
  , `ratechange`
  , `timeupdate`
  , `ended`
];

var audioSample = createAudio('sample.mp3', (audio) => {
  // console.log('成功了：', audio, data);
  document.querySelector('body').appendChild(audio);
  initAudioEvent(audio);
  audio.play();
})
console.log(audioSample);

function createAudio(url, callback) {
  let audio = document.createElement('audio');
  audio.src = url;
  callback && typeof callback === 'function' && callback(audio);
  return audio;
}


/**
 * 给音频对象创建事件
 * @param {object} audio 音频对象
 */
function initAudioEvent(audio) {
  eventName.forEach((name) => {
    audio.addEventListener(name, () => {
      console.groupCollapsed(name);
      showAttr(audio, attrArr);
      console.groupEnd(name);
    });
  });
}

/**
 * 控制台显示音频属性
 * @param {object} audio 音频对象
 * @param {Array} attrArr 音频属性
 */
function showAttr(audio, attrArr) {
  var audioObj = {};
  attrArr.forEach((attr) => {
    audioObj[attr] = audio[attr];
  });
  console.log('audio-attr: ', audioObj);
}