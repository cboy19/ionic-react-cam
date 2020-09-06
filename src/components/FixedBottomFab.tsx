import React from "react";
import { IonFab, isPlatform, IonFabButton, IonIcon } from "@ionic/react";

const FixedButtomFab: React.FC<{
  icon: string;
  link: string;
}> = (props) => {
  return (
    <React.Fragment>
      {!isPlatform("ios") && (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink={props.link}>
            <IonIcon icon={props.icon} />
          </IonFabButton>
        </IonFab>
      )}
    </React.Fragment>
  );
};

export default FixedButtomFab;
