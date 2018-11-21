
var audioSample = createAudio('sample.mp3', (audio, data) => {
  // console.log('成功了：', audio, data);
  document.querySelector('body').appendChild(audio);
  audio.play();
})
console.log(audioSample);

function createAudio(url, callback) {
  let audio = document.createElement('audio');
  getAudio(url, (data) => {
    console.log('成功加载资源：', url);
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
