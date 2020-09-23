import React from "react";
import styles from "./TakePhoto.module.css";
import maskImage from "./image/id-card-mask.png";
import TakePhotoBar from "./TakePhotoBar";

const TakePhotoVideoId = "TakePhotoVideo";
const ImageCanvasId = "ImageCanvasId";

export default class TakePhoto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPhoto: false,
            videoWidth: 0,
            videoHeight: 0,
            maskImageWidth: 0,
            maskImageHeight: 0,
            maskImageTop: 0,
            maskImageLayer: false,
        };

        this.videoElement = null;
        this.imageUrl = null;
        this.stream = null;
    }

    componentDidMount() {
        //获取视频元素
        const video = document.getElementById(TakePhotoVideoId);
        this.videoElement = video;

        //根据视频计算遮罩图片的宽度和高度
        const maskWidth = 0.8 * video.clientWidth;
        const maskHeight = maskWidth * (85.6 / 54);
        const maskTop = (video.clientHeight - maskHeight) / 2;

        this.setState(
            {
                videoWidth: video.clientWidth,
                videoHeight: video.clientHeight,
                maskWidth,
                maskHeight,
                maskTop,
            },
            () => {
                setTimeout(() => {
                    this.startStreamedVideo();
                }, 0);
                // this.startStreamedVideo();
            }
        );
    }
    componentWillUnmount() {
        console.log("componentWillUnmount:");
        this.stopStreamedVideo(this.videoElement);
    }

    stopStreamedVideo = (videoElem) => {
        const stream = videoElem.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(function (track) {
                track.stop();
            });
            videoElem.srcObject = null;
        }
    };
    startStreamedVideo() {
        const { videoWidth, videoHeight } = this.state;
        const constraints = {
            video: {
                width: videoWidth,
                height: videoHeight,
                // facingMode: { exact: "environment" },
            },
        };
        console.log("mediaDevices:", navigator.mediaDevices);
        console.log(
            "getUserMedia:",
            navigator.mediaDevices.getUserMedia(constraints)
        );

        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
                console.log(stream);
                this.videoElement.srcObject = stream;
                this.videoElement.onloadedmetadata = (e) => {
                    this.videoElement.play();
                };
            })
            .catch((error) => {
                console.log("视频播放错误:", error);
                console.log("视频播放错误:", error.name);
                alert(error.name);
            });
    }

    takePhoto = () => {
        const imageCanvas = document.getElementById(ImageCanvasId);
        const imageCanvasContext = imageCanvas.getContext("2d");
        const { videoWidth, videoHeight } = this.state;
        //生成图片
        imageCanvasContext.drawImage(
            this.videoElement,
            0,
            0,
            videoWidth,
            videoHeight
        );
        //生成图片base64
        this.imageUrl = imageCanvas.toDataURL("image/png");

        //显示照片
        this.setState(
            {
                showPhoto: true,
            },
            () => {
                this.stopStreamedVideo(this.videoElement);
            }
        );
    };
    resetPhoto = () => {
        this.startStreamedVideo();
        this.setState({
            showPhoto: false,
        });
    };

    usePhoto = () => {
        const { usePhoto } = this.props;
        if (usePhoto) {
            usePhoto(this.imageUrl);
        }
    };
    render() {
        const {
            showPhoto,
            videoWidth,
            videoHeight,
            maskWidth,
            maskHeight,
            maskTop,
        } = this.state;

        return (
            <div className={styles.main}>
                <div className={styles.top}>
                    <video
                        id={TakePhotoVideoId}
                        className={styles.videoElement}
                        preload="true"
                        autoPlay
                        playsInline
                        loop
                        muted
                    />

                    <canvas
                        id={ImageCanvasId}
                        width={videoWidth}
                        height={videoHeight}
                        className={styles.imageCanvas}
                        style={{
                            display: showPhoto === false ? "none" : "block",
                        }}
                    />
                    {showPhoto === false && (
                        <img
                            alt={""}
                            src={maskImage}
                            className={styles.maskImage}
                            style={{
                                width: maskWidth,
                                height: maskHeight,
                                top: maskTop,
                            }}
                        />
                    )}
                </div>
                <div className={styles.bottom}>
                    <TakePhotoBar
                        take={showPhoto}
                        takePhoto={this.takePhoto}
                        resetPhoto={this.resetPhoto}
                        usePhoto={this.usePhoto}
                        cancelTake={this.props.cancelTake}
                    />
                </div>
            </div>
        );
    }
}
