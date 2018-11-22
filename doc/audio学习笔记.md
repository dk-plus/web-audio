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

我们在浏览器的控制台输入`Audio.prototype`就能看到这些信息了，以下是我总结的一些相关信息，如有纰漏，请在issue里指出：

```javascript
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
```

### audio方法

下面我们来看看一些音频常用的方法：
- `play()`：播放
- `pause()`：暂停

以上两个方法其实没啥好说的，看名字就知道怎么用，值得一提的是调用`play()`方法时会返回一个状态为`pending`的`Promise`对象，调用完毕后状态就变为`resolved`，在播放状态下重复调用`play()`的时候音频并不会重新开始播放。

### audio属性

我们在控制台看到的属性是非常多的，并且这些属性大多数都是对应着`getter`和`setter`函数的，下面总结了我所了解到的属性，欢迎提issue补充：

- `loop`：循环。获取/改变音频是否循环
- `autoplay`：自动播放。获取/改变音频是否自动播放
- `preload`：自动加载。获取/改变音频是否自动加载
- `controlls`
- `controllsList`
- `src`：资源。
- `currentSrc`：当前播放源。
- `currentTime`：当前时间。获取/改变音频当前播放时间
- `defaultMuted`：默认静音。
- `muted`：静音。获取/改变音频是否静音
- `defaultPlaybackRate`
- `disableRemotePlayback`
- `mediaKeys`
- `played`
- `paused`：暂停。获取/改变音频是否暂停
- `volume`：音量。获取/改变音量
- `ended`：结束。获取音频是否结束
- `duration`：时长。获取音频的长度，单位为秒。