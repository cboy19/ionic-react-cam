import React, { useState, useRef } from "react";
import { IonButton, IonIcon, IonLabel } from "@ionic/react";
import { camera } from "ionicons/icons";

import {
  Plugins,
  CameraResultType,
  CameraSource,
  Capacitor,
} from "@capacitor/core";

import "./ImagePicker.css";

export interface Photo{
  path: string | undefined; 
  preview: string 
}

const { Camera } = Plugins;

const ImagePicker: React.FC<{
  onImagePicker: (photo: Photo) => void;
}> = (props) => {
  const [takenPhoto, setTakenPhoto] = useState<Photo>();

  const filePickerRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    filePickerRef.current?.click();
  };

  const pickFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target!.files![0];
    const fr = new FileReader();
    fr.onload = () => {
      const photo: Photo = {
        path: undefined,
        preview: fr.result!.toString(),
      };
      setTakenPhoto(photo);
      props.onImagePicker(photo);
    };
    fr.readAsDataURL(file);
  };

  const takePhotoHandler = async () => {
    if (!Capacitor.isPluginAvailable("Camera")) {
      openFilePicker();
      return;
    }

    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 80,
        width: 500,
      });

      if (!photo || !photo.webPath) {
        return;
      }

      const photoPicked: Photo = {
        path: photo.path,
        preview: photo.webPath,
      };

      setTakenPhoto(photoPicked);
      props.onImagePicker(photoPicked);
    } catch (error) {
      openFilePicker();
    }

    /*     if (!photo || !photo.path || !photo.webPath) {
      return;
    } */
  };

  return (
    <React.Fragment>
      <div className="image-preview">
        {!takenPhoto && <h3>no photo yet!</h3>}
        {takenPhoto && <img src={takenPhoto.preview} alt="Preview" />}
      </div>
      <IonButton fill="clear" onClick={takePhotoHandler}>
        <IonIcon icon={camera} slot="start" />
        <IonLabel>Take Photo</IonLabel>
      </IonButton>
      <input
        type="file"
        hidden
        ref={filePickerRef}
        onChange={pickFileHandler}
      />
    </React.Fragment>
  );
};

export default ImagePicker;
