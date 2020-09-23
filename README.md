> 方案不一定是最好的，但是能够节省时间

## 一、结论

- PC 上可以实现
- 移动端不能实现

## 二、方案

### 2.1 input 标签
input 可以解决选择文件的问题。在PC和移动表现有区别
- PC 上直接选择文件
- 移动端可以选择拍照和相册，选项随手机系统及版本变化，不可自定义（如只保留部分选项）

在手机端拍照是直接调用系统相机拍照，也是不能自定页面的。

### 2.2 自定义拍照页面方案

核心原理：自定义拍照效果（如拍摄身份证、银行卡、人像）是通过 CSS 布局叠加 HTML 标签实现。

获取视频流：
 通过 navigator.mediaDevices.getUserMedia 获取到视频流，然后使用 video 播放视频流。
 
实现拍照：通过 canvas 获取 video 视频流的某一帧然后生成指定格式图片 base64 字符串数据，然后使用 img 或者 canvas 显示实现普通拍照效果。

自定义拍照效果：使用 img  或者 canvas 来显示蒙版，通过 CSS 布局 覆盖到 video 上面来实现蒙版效果。

参考：[Navigator.mediaDevices](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/mediaDevices)、[MediaDevices](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices)、[MediaDevices.getUserMedia](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia)、[Taking still photos with WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos)

### 2.3 移动端不能实现原因说明

页面做好之后，首先要部署到 HTTPS 服务，然后再手机浏览器访问，在iOS微信中直接打开没有视频流，在iOS Chrome 中打开没有视频流，然后发现 navigator.mediaDevices 返回的是 undefined 。根本原因是 [navigator.mediaDevices is available in Safari, but not in the WKWebview](https://bugs.chromium.org/p/chromium/issues/detail?id=752458)
。iOS 端不能实现，移动端可以直接放弃该方案。

仓库地址：[html-custom-photo-page](https://github.com/1071942338/html-custom-photo-page)

#### 2.3.1 其他相关描述
- [Safari on macOS High Sierra, iOS 11](https://webkit.org/blog/7726/announcing-webrtc-and-media-capture/)
- [webRTC isn't supported by Chrome for iOS](https://github.com/twilio/twilio-video-app-react/issues/225)
- [Apple doesn't fully support WebRTC in the browser on iOS](https://developer.apple.com/forums/thread/92713)

