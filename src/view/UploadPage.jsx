import React from "react";
import "./main.css";
import styles from "./UploadPage.module.css";
import { Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TakePhoto from "../component/takePhoto/TakePhoto";

class UploadPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            takePhoto: false,
        };
    }

    takePhoto = () => {
        console.log("takePhoto:");
        this.setState({ takePhoto: true });
    };
    cancelTake = () => {
        console.log("cancelTake:");
        this.setState({ takePhoto: false });
    };
    usePhoto = (imageUrl) => {
        console.log("usePhoto:", imageUrl);
        this.setState({ takePhoto: false });
    };

    render() {
        const { loading, takePhoto } = this.state;
        const uploadButton = (
            <div className={styles.addPhotoButton} onClick={this.takePhoto}>
                <PlusOutlined className={styles.addPhotoIcon} />
                <div className={styles.photoItemTitle}>点击上传图片</div>
            </div>
        );
        return (
            <div className={styles.main}>
                <div className={styles.content}>
                    <div className={styles.photoContent}>
                        <Spin spinning={loading}>{uploadButton}</Spin>
                    </div>
                </div>
                {takePhoto === true && (
                    <TakePhoto
                        cancelTake={this.cancelTake}
                        usePhoto={this.usePhoto}
                    />
                )}
            </div>
        );
    }
}

export default UploadPage;
