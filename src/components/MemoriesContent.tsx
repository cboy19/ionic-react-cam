import React from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { add } from "ionicons/icons";
import MemoriesList from "./MemoriesList";
import { Memory } from "../data/memories-context";
import FixedButtomFab from "./FixedBottomFab";
import ToolbarAction from "./ToolbarAction";

const MemoriesContent: React.FC<{
  items: Memory[];
  title: string;
}> = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <ToolbarAction title={props.title} link="/new-memories" icon={add} />
      </IonHeader>
      <IonContent>
        <IonGrid>
          {props.items.length === 0 && (
            <IonRow>
              <IonCol className="ion-text-center">
                <h2>No {props.title} Found</h2>
              </IonCol>
            </IonRow>
          )}
          <MemoriesList itemsList={props.items} />
        </IonGrid>
        <FixedButtomFab icon={add} link="/new-memories" />
      </IonContent>
    </IonPage>
  );
};

export default MemoriesContent;
