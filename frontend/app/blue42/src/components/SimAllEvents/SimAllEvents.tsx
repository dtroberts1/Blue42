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
import {Game, OddCard, TestOdd} from '../../interfaces/interface';
import {GamesService} from '../../services/game.service';
import {Observable, Subject} from 'rxjs';
import GameOddService from '../../services/gameOdd.service';

type Props = {
}

type State = {
  testData: {
    odds: TestOdd[],
    category1Header: string,
    category2Header: string,
    category3Header: string,
    eventDateStr: string,
    eventTimeStr: string,
  }
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

const SimAllEvents : (props: Props) => JSX.Element = (props : Props) => {
  let initialGames : Game[] = [];
  const [games, setGames] = useState(initialGames);
  const [testData, setTestData] = useState({
    category1Header: 'Winner. Half 1',
    category2Header: 'Total. Half 1',
    category3Header: 'Handicap. Half 1',
    eventDateStr: 'Nov 13',
    eventTimeStr: '9:30',
    odds : [
      {
        header: '1',
        value: '-120',
        isActive: false
      },
      {
        header: 'X',
        value: '830',
        isActive: false
      },
      {
        header: '2',
        value: '123',
        isActive: false
      },
      {
        header: 'O 12.5',
        value: '-118',
        isActive: false
      },
      {
        header: 'U 12.5',
        value: '-118',
        isActive: false
      },
      {
        header: '1 -0.5',
        value: '-122',
        isActive: false
      },
      {
        header: '2 +0.5',
        value: '-118',
        isActive: false
      }
    ]
  });

  const [selectedOdd, setSelectedOdd] = useState<TestOdd | null>(null);
  const [createEventModalIsVisible, setCreateEventModalIsVisible] = useState(false);

  useEffect(() => {
    const subscription = GamesService.getGames()

      .subscribe((promise: Promise<Game[]>) =>{
        promise.then((retrievedGames: Game[]) => {

          setGames(retrievedGames);

        });

        const gameOddSubscription = GameOddService.subscribe(handleOddCardChange);
        //GameOddService.init();
    
        return () => {
          gameOddSubscription.unsubscribe();
          subscription.unsubscribe();
        };

      });

    return () => subscription.unsubscribe();
  }, []);
  
  const handleOddCardChange = (cards: OddCard[]) => {
    //setOddCards(cards);
  };


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

  const clickedOddsCard = (game: Game, index : number, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

    for(let i = 0; i < game.oddCardMap.size; i++){
      let oddCard: OddCard = game.oddCardMap.get(i) as OddCard;
      if (i === index){
        oddCard.isActive = !oddCard.isActive;
        if (oddCard.isActive){
          GameOddService.addManagementCard(oddCard);
        }
        else{
          GameOddService.removeManagementCard(oddCard);
        }
      }
      else{
        //oddCard.isActive = false;
      }

      game.oddCardMap.set(i, oddCard);
    }
    
    setGames([...games]);
    /*
    let arr = testData.odds;
    arr.filter((itm, itmIndex) => itmIndex !== index).forEach((odd) => {odd.isActive = false});
    arr[index].isActive = !arr[index].isActive;
    setTestData({...testData, odds: arr});

    if (arr[index].isActive){
      setSelectedOdd(arr[index]);
    }
    */
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
                {testData.eventDateStr} &#x2022; {testData.eventTimeStr}
              </div>
            </div>
            <div className={styles.AllEventsOverviewHeadersRight}>
              <div className={styles.CategoryHeader} style={{flex: 3}}>
                {testData.category1Header}
              </div>
              <div className={styles.CategoryHeader} style={{flex: 2}}>
                {testData.category2Header}
              </div>
              <div className={styles.CategoryHeader} style={{flex: 2}}>
                {testData.category3Header}
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
                          isEmpty={game.allGameOdds[0] ? game.allGameOdds[0].overPayout ? false : true : true}
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
