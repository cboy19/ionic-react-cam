import React from 'react';
import { IonRow, IonCol } from '@ionic/react';
import MemoryItems from './MemoryItems';
import { Memory } from '../data/memories-context';

const MemoriesList:React.FC<
{itemsList: Memory[]}
> = props => {

    return (
        <React.Fragment>
        {props.itemsList.map((memory, index) => (
            <IonRow key={index}>
              <IonCol>
                <MemoryItems memory={memory}/>
              </IonCol>
            </IonRow>
          ))}
          </React.Fragment>
    );
};

export default MemoriesList;
