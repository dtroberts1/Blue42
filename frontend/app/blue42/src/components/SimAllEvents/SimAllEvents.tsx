import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './SimAllEvents.less';
import styles from './SimAllEvents.less';
import nflIcon from '../../assets/images/nfl_logo.png';
import styled from 'styled-components';
import tbIcon from '../../assets/team-icons/TBB.png';
import ssIcon from '../../assets/team-icons/SS.png';
import GenericModal from '../GenericModal/GenericModal';
import Blue42Btn from '../Blue42Btn/Blue42Btn';
import {Game, GameOdd, OddCard, TestOdd} from '../../interfaces/interface';
import GamesService from '../../services/game.service';
import {Observable, Subject} from 'rxjs';
import GameOddService from '../../services/gameOdd.service';
import { setConstantValue } from 'typescript';

type Props = {
}

type State = {
  selectedOdd: OddCard | null,
  createEventModalIsVisible: boolean,
}

type AllEventsOverviewOddsCardProp = {
  odd: OddCard,
  compVisibility : boolean,
  isEmpty ?: boolean,
}

const AllEventsOverviewOddsCard = styled.div`
  padding: .6em 1.4em;
  visibility: ${(props: AllEventsOverviewOddsCardProp) => (props.compVisibility ? 'visible' : 'hidden')};
  font-size: .9rem;
  border-radius: 8px;
  position: relative;
  width: 2.6em;
  height: 2.5em;
  filter: brightness(${(props: AllEventsOverviewOddsCardProp) => (props.odd.isActive ? 1.8 : 1)});
  background: ${(props) => (props.odd.isActive ? 'linear-gradient(90deg, rgba(55, 0, 179, 0.3) 0%, rgba(98, 41, 229, 0.3) 100%), rgba(255, 255, 255, 0.1) !important' : '#271b2f')};

  &:hover{
      filter: brightness(1.8);
      cursor: pointer;
      background: linear-gradient(90deg, rgba(55, 0, 179, 0.3) 0%, rgba(98, 41, 229, 0.3) 100%), rgba(255, 255, 255, 0.1) !important
  }

  &::before{
      content: "${props => !props.isEmpty ? props.odd.header : ''}";
      position: absolute;
      top: .23em;
      left: 0;
      width: 100%;
      text-align: center;
      font-weight: 500;

  }

  &::after{
    content: "${props => !props.isEmpty ? props.odd.value : 'Add'}";
    position: absolute;
    left: 0;
    bottom: ${props => !props.isEmpty ? '.38em !important' : '35% !important'};
    width: 100%;
    text-align: center;
    font-weight: 500;

  }

}`;

const initialGames : Game[] = [];

const populateInitialState = () => {
  return initialGames;
};

const SimAllEvents : (props: Props) => JSX.Element = (props : Props) => {
  const [games, setGames] = useState(populateInitialState);
  
  const [createEventModalIsVisible, setCreateEventModalIsVisible] = useState(() => false);

  useEffect(() => {
    GameOddService.init();
    const gameOddSubscription = GameOddService.subscribe(handleOddCardChange);
    GamesService.init();


      return () => {
        gameOddSubscription.unsubscribe();
      };
  }, []);
  
  const openCreateGameModal = () => {
    setCreateEventModalIsVisible(true);
  }
  
  const closeCreateModal = (promise: () => Promise<any>) => {

    setCreateEventModalIsVisible(false);

    if (promise){
      promise()
        .then(() => {
          
        });
    }
  }

  const handleOddCardChange = (data: {managementCards: OddCard[], games: Game[]}) => {
    setGames([...data.games]);

  };

  const clickedOddsCard = (game: Game, index : number, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

    for(let i = 0; i < game.oddCardMap.size; i++){
      let oddCard: OddCard = game.oddCardMap.get(i) as OddCard;
      if (i === index){
        oddCard.isActive = !oddCard.isActive;
        if (oddCard.isActive){
          
          // Add handler that executes when the card gets closed in ManageOdd component 

          oddCard.cardMode = oddCardIsEmpty(game, index) ? "add" : "update";
          
          GameOddService.addManagementCard(oddCard);
        }
        else{
          GameOddService.removeManagementCard(oddCard.id as number);
        }
      }

   //   game.oddCardMap.set(i, oddCard);
    }
    
    setGames([...games]);

  }

  const oddCardIsEmpty = (game: Game, index: number) => {
    type ObjectKey = keyof typeof game.allGameOdds[0];
    const key = game.oddCardMap.get(index)?.cardType.name as ObjectKey;
    return game.allGameOdds[0] ? game.allGameOdds[0][key] ? false : true : true;


  }


  const gamesUi = function() {
    return (
    <React.Fragment>
      {games.map(game =>         
        <div key={game.id}>
          <div className={styles.AllEventsOverviewHeaders}>
            <div className={styles.AllEventsOverviewHeadersLeft}>
              <div className={styles.AllEventsNFLIconContainer}>
                <img src={nflIcon} title="NFL"  />
              </div>
              <span>
                NFL
              </span>
              <div style={{position: 'absolute', right: '8em'}}>
                {'Nov 13'} &#x2022; {'9:30'}
              </div>
            </div>
            <div className={styles.AllEventsOverviewHeadersRight}>
              <div className={styles.CategoryHeader} style={{flex: 3}}>
                {'Money Line. Full Game'}
              </div>
              <div className={styles.CategoryHeader} style={{flex: 2}}>
                {'Total. Full Game'}
              </div>
              <div className={styles.CategoryHeader} style={{flex: 2}}>
                {'Spread. Full Game'}
              </div>
            </div>
          </div>
          <div className={styles.AllEventsOverviewData}>
            <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem'}}>
              {game.awayTeam.name} <img src={game.awayTeam.imagePath} style={{padding: '0 2ch 0 1ch'}}/> 
              VS 
              <img src={game.homeTeam.imagePath} style={{padding: '0 1ch 0 2ch'}}/> {game.homeTeam.name}
            </div>
            <div style={{display: 'flex', flex: 1}}>
              <div className={styles.AllEventsOverviewOddsCell} style={{flex: 3}}>
                <div>
                  <div style={{position: 'relative'}}>
                  <AllEventsOverviewOddsCard 
                        key={game.id} 
                        onClick={(e) => clickedOddsCard(game, 0, e)} 
                          compVisibility={(game.allGameOdds[0] ? true : false)}
                          isEmpty={oddCardIsEmpty(game, 0)}
                          odd={game.oddCardMap.get(0) as OddCard}
                        />
                  </div>
                </div>
                <div>
                  <div style={{position: 'relative'}}>
                  <AllEventsOverviewOddsCard 
                        key={game.id} 
                        onClick={(e) => clickedOddsCard(game, 1, e)} 
                          compVisibility={(game.allGameOdds[0] ? true : false)}
                          isEmpty={oddCardIsEmpty(game, 1)}
                          odd={game.oddCardMap.get(1) as OddCard}
                        />
                  </div>
                </div>
                <div>
                  <div style={{position: 'relative'}}>
                  <AllEventsOverviewOddsCard 
                        key={game.id} 
                        onClick={(e) => clickedOddsCard(game, 2, e)} 
                          compVisibility={(game.allGameOdds[0] ? true : false)}
                          isEmpty={oddCardIsEmpty(game, 2)}
                          odd={game.oddCardMap.get(2) as OddCard}
                        />
                  </div>
                </div>
              </div>
              <div className={styles.AllEventsOverviewOddsCell} style={{flex: 2}}>
                <div>
                  <div style={{position: 'relative'}}>
                  <AllEventsOverviewOddsCard 
                        key={game.id} 
                        onClick={(e) => clickedOddsCard(game, 3, e)} 
                          compVisibility={(game.allGameOdds[0] ? true : false)}
                          isEmpty={oddCardIsEmpty(game, 3)}
                          odd={game.oddCardMap.get(3) as OddCard}
                        />
                  </div>
                </div>
                <div>
                  <div style={{position: 'relative'}}>
                    <AllEventsOverviewOddsCard 
                        key={game.id} 
                        onClick={(e) => clickedOddsCard(game, 4, e)} 
                          compVisibility={(game.allGameOdds[0] ? true : false)}
                          isEmpty={oddCardIsEmpty(game, 4)}
                          odd={game.oddCardMap.get(4) as OddCard}
                        />
                  </div>
                </div>
              </div>
              <div className={styles.AllEventsOverviewOddsCell} style={{flex: 2}}>
                <div>
                  <div style={{position: 'relative'}}>
                    <AllEventsOverviewOddsCard 
                      key={game.id} 
                      onClick={(e) => clickedOddsCard(game, 5, e)} 
                        compVisibility={(game.allGameOdds[0] ? true : false)}
                        isEmpty={oddCardIsEmpty(game, 5)}
                        odd={game.oddCardMap.get(5) as OddCard}
                      />
                  </div>
                </div>
                <div>
                  <div style={{position: 'relative'}}>
                    <AllEventsOverviewOddsCard 
                        key={game.id} 
                        onClick={(e) => clickedOddsCard(game, 6, e)} 
                          compVisibility={(game.allGameOdds[0] ? true : false)}
                          isEmpty={oddCardIsEmpty(game, 6)}
                          odd={game.oddCardMap.get(6) as OddCard}
                        />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>)}
    </React.Fragment>
    );
  }

  return (
    <div className={styles.SimAllEvents}>
          <React.Fragment>
          {gamesUi()}
        </React.Fragment>
      <Blue42Btn onClick={(event) => {openCreateGameModal()}} btnText={'Create Event'} className={styles.Blue42BtnClass} />

      {
        createEventModalIsVisible &&
          <GenericModal
          onCloseModal={(promise: () => Promise<any>) => {closeCreateModal(promise)}}
          title="Create Game"
          />
      }
    </div>
  ); 
  
}

export default SimAllEvents;
