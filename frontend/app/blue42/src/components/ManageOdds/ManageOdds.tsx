import React, { useEffect, useState } from 'react';
import styles from './ManageOdds.less';
import ReactModal from 'react-modal';
import GenericModal from '../GenericModal/GenericModal';
import Blue42Btn from '../Blue42Btn/Blue42Btn'
import ManageOdd from '../ManageOdd/ManageOdd';
import GameOddService from '../../services/gameOdd.service';
import {OddCard} from '../../interfaces/interface';
import { v4 } from 'uuid'

type Props = {
};



type State = {
  selectedTab: string;
  createModalIsVisible: boolean;
}

const initialCards : OddCard[] = [];

const ManageOdds : (props: Props) => JSX.Element = (props: Props) => {

  const [selectedTab, setSelectedTab] = useState('odds');
  const [createModalIsVisible, setCreateModalIsVisible] = useState(false);
  const [oddCards, setOddCards] = useState(initialCards);

  useEffect(() => {
    const subscription = GameOddService.subscribe(handleOddCardChange);
    
    if (typeof(window) !== 'undefined') {
      ReactModal.setAppElement('body')
    }

    return () => subscription.unsubscribe();
  }, []);

  const handleOddCardChange = (data: {managementCards: OddCard[]}) => {
    setOddCards(data.managementCards);

  };

  const openCreateModal = () => {
    setCreateModalIsVisible(true);
  }

  const closeCreateModal = () => {
    setCreateModalIsVisible(false);
  }

  const getOddCards = function() {
    return oddCards && oddCards.length ? <React.Fragment>
      {oddCards.map((card : OddCard) =>
      <React.Fragment key={v4()}> 
      <ManageOdd 
        cardMode={card.cardMode ?? 'add'}
        headerNbr={Number.parseFloat(card.header)} 
        valueNbr={Number.parseFloat(card.value)} />
        </React.Fragment>)
      }</React.Fragment> : '';
  }

    return(
      <div className={styles.ManageOdds}>
        <div className={styles.ManageOddsContainer} style={{borderRadius: '22px 22px 10px 10px', position: 'relative'}}>
          <div onClick={(e) =>{setSelectedTab('odds')}} className={styles.ManageOddsContainerTab} 
            style={{float: 'left', borderRadius: '22px 0 0 0', backgroundColor: selectedTab === 'odds' ? '#7747E5' : '#3A2334'}}>
            Odds
          </div>
          <div onClick={(e) =>{setSelectedTab('myOdds')}} className={styles.ManageOddsContainerTab} 
            style={{float: 'right', borderRadius: '0 22px 0 0', backgroundColor: selectedTab === 'myOdds' ? '#7747E5' : '#3A2334'}}>
            My Odds
          </div>
          <div className={styles.CardsContainer}>
                {getOddCards()}

          </div>
        </div>
        <div className={styles.ManageOddsContainer} style={{height: 'initial'}}>
         <div >
          <Blue42Btn onClick={(event) => {openCreateModal()}} btnText={'Create Odds'} />
         </div>

        </div>
        <div className={styles.ManageOddsContainer} style={{height: '1.5em'}}>
          SettingsContainer
        </div>
        {createModalIsVisible && 
          <GenericModal
            onCloseModal={(evt) => {closeCreateModal()}}
            title="Create Odds"
          />
        }
      </div>
    );
}


export default ManageOdds;