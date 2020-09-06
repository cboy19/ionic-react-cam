import React from "react";
import {
  IonToolbar,
  IonTitle,
  isPlatform,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";

const ToolbarAction: React.FC<{
  title: string;
  link: string;
  icon: string
}> = (props) => {
  return (
    <React.Fragment>
      <IonToolbar>
        <IonTitle>{props.title}</IonTitle>
        {isPlatform("ios") && (
          <IonButtons slot="end">
            <IonButton routerLink={props.link}>
              <IonIcon slot="icon-only" icon={props.icon} />
            </IonButton>
          </IonButtons>
        )}
      </IonToolbar>
    </React.Fragment>
  );
};

export default ToolbarAction;
