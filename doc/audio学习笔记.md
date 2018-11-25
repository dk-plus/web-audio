# audio学习笔记

## 在网页上简单使用audio

> 在本文，我们将抛弃古老的`<object>`,`<embed>`等实现方式，拥抱html5的`<audio>`。

我们可以在`.html`文件里直接编写`<audio src="url"></audio>`，当然，本文更推荐使用js的方式创建和管理你的音频。

## 创建audio

我们看一个简单的例子：

```javascript
// 创建一个audio
let audio = document.createElement('audio');
audio.src = 'abc.mp3';
```

我们通过`document.createElement()`创建了一个`<audio>`标签，并且给它的src赋值，当然，我们也可以以另一种方式创建：

```javascript
// 创建一个audio
let audio = new Audio();
audio.preload = false;
audio.src = 'abc.mp3';
```

这个例子我们选择用`Audio`构造函数创建，唯一的不同就是`Audio`构造函数创建的时候会把`preload`属性设为`auto`。

封装一个函数，方便创建Audio：

```javascript
function createAudio(url, callback) {
  let audio = document.createElement('audio');
  getAudio(url, (data) => {
    audio.src = url;
    callback && typeof callback === 'function' && callback(audio, data);
  });
  return audio;
}
```

这里我们调用的时候传入音频的url和回调函数callback（可选），并且返回值就是所创建的audio，callback的第一个参数也是所创建的audio。保险起见，我们采用异步加载的方式，确保音频全部加载完毕再进行操作。

我们可以看一个完整的例子：[异步加载音频](../src/example_1.js)

## audio属性、管理与操作

我们想要掌握audio，就要先掌握它的相关api，包括它的属性、方法以及事件监听。

我们在浏览器的控制台输入`Audio.prototype`就能看到这些信息了。

### audio方法

下面我们来看看一些音频常用的方法：
- `load()`：重新加载音频
- `play()`：播放
- `pause()`：暂停
- `getStartDate()`：返回一个新的Date对象，表示当前时间偏移量
- `fastSeek()`：指定播放时间
- `canPlayType()`：检查浏览器是否可以播放指定的音频类型
- `addTextType()`：在音频中添加一个新的文本轨道

### audio属性

我们在控制台看到的属性是非常多的，并且这些属性大多数都是对应着`getter`和`setter`函数的，下面总结了我所了解到的属性，欢迎提issue补充：

- `preload`：`<boolean>` 自动加载。获取/改变音频是否自动加载
- `networkState`：返回音频当前网络连接状态
- `readyState`：返回音频当前的就绪状态
- `crossOrigin`：设置或返回音频的CORS设置
- `buffered`：`<object>` 返回表示音频已缓冲部分的TimeRanges对象
- `loop`：`<boolean>` 循环。获取/改变音频是否循环
- `autoplay`：`<boolean>` 自动播放。获取/改变音频是否自动播放
- `controlls`：`<boolean>` 返回音频是否显示控件
- `controller`：`<object>` 返回音频当前媒体控制器的MediaController对象
- `controllsList`
- `mediaGroup`：`<int>` 设置或返回音频所属的组合
- `mediaKeys`
- `audioTracks`：`<object>` 返回表示可用音频轨道的AduioTrackList对象
- `textTrack`：`<object>` 返回表示文本可以轨道的TextTrackList对象
- `src`：`<string>` 资源。
- `currentSrc`：`<string>` 当前播放源。
- `played`：`<object>` 返回表示音频已播放部分的TimeRanges对象
- `paused`：`<boolean>` 暂停。获取/改变音频是否暂停
- `ended`：`<boolean>` 结束。获取音频是否结束
- `volume`：`<int>` 音量。获取/改变音量，0-1
- `defaultMuted`：`<boolean>` 默认静音。
- `muted`：`<boolean>` 静音。获取/改变音频是否静音
- `currentTime`：`<int>` 当前时间。获取/改变音频当前播放时间
- `defaultPlaybackRate`：设置或返回默认播放速度
- `playbackRate`：返回音频播放速度
- `defaultPlaybackRate`：返回默认的播放速度
- `disableRemotePlayback`
- `seekable`：`<object>` 返回表示音频可寻址部分的TimeRanges对象
- `seeking`：`<boolean>` 返回用户是否在音频中进行查找

### audio事件

我们了解到了audio对象拥有的属性，这些属性都是随着audio对象的状态变化联动的，而我们可以通过事件监听来获知这些对象属性的改变，目前总结出一些事件：

* `onloadstart`：开始加载音频时
* `ondurationchange`：音频时长变化时
* `onloadedmetadata`：音频元数据加载后
* `onloadeddata`：当前帧数据加载完成且还没有足够的数据播放下一帧音频时
* `onwaiting`：播放下一帧而需要缓冲时
* `onprogress`：下载指定的音频时
* `oncanplay`：用户可以播放
* `oncanplaythrough`：用户可以播放（无需停顿和缓冲时）
* `onabort`：音频终止加载时
* `onerror`：音频加载期间错误
* `onstall`：在浏览器获取媒体数据，但媒体数据不可用时
* `onsuspend`：在浏览器读取媒体数据终止时
* `onemptied`：当前播放列表为空
* `onplay`：播放
* `onplaying`：播放中
* `onpause`：暂停
* `onseeking`：用户重新定位音频时
* `onvolumechange`：音量变化
* `onratechange`：音频播放速度变化时
* `ontimeupdate`：音频播放位置改变，大概0.25秒一次触发
* `onended`：结束