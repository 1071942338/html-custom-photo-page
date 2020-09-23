import React from "react";
import styles from "./TakePhotoBar.module.css";
import { Button } from "antd";

export default function TakePhotoBar(props) {
    const { take, takePhoto, resetPhoto, usePhoto, cancelTake } = props;
    return (
        <div className={styles.main}>
            {take === false && <Button onClick={cancelTake}>返回</Button>}
            {take === false && <Button onClick={takePhoto}>拍照</Button>}
            {take === true && <Button onClick={resetPhoto}>取消</Button>}
            {take === true && <Button onClick={usePhoto}>使用</Button>}
        </div>
    );
}
