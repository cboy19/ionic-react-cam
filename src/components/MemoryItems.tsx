import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle } from '@ionic/react';
import { Memory } from '../data/memories-context';

import './MemoryItems.css';

const MemoryItems:React.FC<{
    memory:Memory
}> = (props) => {
    return (
        <IonCard className="memory-item">
        <img src={props.memory.base64String} alt={props.memory.title}/>
        <IonCardHeader>
          <IonCardTitle>
            {props.memory.title}
          </IonCardTitle>
        </IonCardHeader>
      </IonCard>
    );
};

export default MemoryItems;
