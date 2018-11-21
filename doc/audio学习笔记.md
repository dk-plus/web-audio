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

我们可以看一个完整的例子：[异步加载音频](./src/example_1.js)

## audio属性、管理与操作

我们既然