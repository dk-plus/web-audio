
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

/**
 * 创建音频对象
 * @param {string} url 音频链接
 * @param {function} callback 音频加载完毕的回调函数
 * @return {object} 创建的音频对象
 */
function createAudio(url, callback) {
  let audio = document.createElement('audio');
  getAudio(url, (data) => {
    audio.src = url;
    callback && typeof callback === 'function' && callback(audio, data);
  });
  return audio;
}

/**
 * 异步请求音频
 * @param {string} url 音频链接
 * @param {function} callback 成功加载音频的回调函数
 */
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