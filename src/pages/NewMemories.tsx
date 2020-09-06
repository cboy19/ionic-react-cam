import React, { useState, useRef, useContext } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

import MemoriesContext from "../data/memories-context";
import ImagePicker from "../components/ImagePicker";
import {Photo} from '../components/ImagePicker';


const NewMemories: React.FC = () => {
  const [takenPhoto, setTakenPhoto] = useState<Photo>();
  const [memoryType, setMemoryType] = useState<"Good" | "Bad">("Good");

  const memoriesCtx = useContext(MemoriesContext);
  const titleRef = useRef<HTMLIonInputElement>(null);
  const history = useHistory();

  const photoPickHandler = (photo: Photo) => {
    setTakenPhoto(photo);
  };

  const addMemoryHandler = async () => {
    const enteredTitle = titleRef.current?.value;

    if (
      !enteredTitle ||
      enteredTitle.toString().length === 0 ||
      !takenPhoto ||
      !memoryType
    ) {
      return;
    }

    memoriesCtx.addMemory(
      takenPhoto,
      enteredTitle.toString(),
      memoryType
    );
    history.length > 0 ? history.goBack() : history.replace("/good-memories");
  };

  const selectMemoryHandler = (event: CustomEvent) => {
    const selectedMemoryType = event.detail.value;
    setMemoryType(selectedMemoryType);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/good-memories" />
          </IonButtons>
          <IonTitle>New Memories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Memory Title</IonLabel>
                <IonInput type="text" ref={titleRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonSelect onIonChange={selectMemoryHandler} value={memoryType}>
                <IonSelectOption value="Good">Good Memory</IonSelectOption>
                <IonSelectOption value="Bad">Bad Memory</IonSelectOption>
              </IonSelect>
            </IonCol>
          </IonRow>
          <IonRow className="ion-text-center">
            <IonCol>
              <ImagePicker onImagePicker={photoPickHandler} />
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin-top">
            <IonCol className="ion-text-center">
              <IonButton onClick={addMemoryHandler}>Add Memory</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default NewMemories;
