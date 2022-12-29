import React, { ChangeEvent, LegacyRef }  from 'react';
import './CreateGameModalContent.less';
import styles from './CreateGameModalContent.less';
import GenericDropdown from '../GenericDropdown/GenericDropdown';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import {BsFillCalendarWeekFill} from 'react-icons/bs';
import {BsClock} from 'react-icons/bs';
import moment from 'moment';
import "react-toggle/style.css" // for ES6 modules
import Toggle from 'react-toggle'
import Blue42Btn from '../Blue42Btn/Blue42Btn';
import {Game, GameOdd, Team, Venue} from '../../interfaces/interface';
import TeamsService from '../../services/team.service';
import { Grid } from  'react-loader-spinner'
import GamesService from '../../services/game.service';
import GameOddService from '../../services/gameOdd.service';
/*import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";*/
type Props = {
  callBack(promise: (() => Promise<unknown>) | null): unknown;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void,
}

type State = {
  calendarOpened: boolean,
  editTimeMode: boolean,
  date: Date,
  seedOdds: boolean,
  teams: Team[],
  venues: {name: string}[]
  isLoading: boolean,
  selectedCompetitor1: Team | null,
  selectedCompetitor2: Team | null,
  selectedVenue: {name: string} | null,
}


const locale = 'en'; // or whatever you want...
const hours : {name: string} [] = [];

moment.locale(locale);  // optional - can remove if you are only dealing with one locale

for(let hour = 0; hour < 24; hour++) {
    hours.push({name: moment({ hour }).format('h:mm A')});
    hours.push(
      { 
        name: 
        moment({
            hour,
            minute: 15
        }).format('h:mm A')}
    );
    hours.push(
      { 
        name: 
        moment({
            hour,
            minute: 30
        }).format('h:mm A')}
    );
    hours.push(
      { 
        name: 
        moment({
            hour,
            minute: 45
        }).format('h:mm A')}
    );
}

const CalendarContainer = styled.div`
  .react-calendar{
    background: linear-gradient(90deg, #3700b3 0%, #6229e5 100%), #ffffff !important;     

    button{
      &:not(.react-calendar__month-view__days__day--neighboringMonth){
        color: white !important;
      }

      &.react-calendar__tile--now{
        &:not(.react-calendar__tile--active){
          background-color: darkgoldenrod  !important;
        }
      }      

      &:enabled{
            &:hover{
                background-color: #7747e5 !important;
            }
        }
      
    }
    .react-calendar__navigation{
      button:enabled:focus{
          background-color: #7747e5 !important;
        }
    }

  }
`;

export default class CreateGameModalContent extends React.Component{
  loaded = false;
  calendarRef: LegacyRef<HTMLDivElement> | undefined;
  props: Props;
  state: State;

  constructor(props : Props){
    super(props);
    this.calendarRef = React.createRef();
    this.props = props;
    let today = new Date();
    today.setSeconds(0);

    this.state = {
      calendarOpened: false,
      editTimeMode: false,
      date: today,
      seedOdds: true,
      teams: TeamsService.getTeams(),
      venues: [],
      isLoading: false,
      selectedCompetitor1: null,
      selectedCompetitor2: null,
      selectedVenue: null,
    };
  }

  componentDidMount(){
    
  }

  teamSelected(competitorNbr : number, team: Team){

    let tmpVenues : {name: string}[] = this.state.venues;
    if (tmpVenues.length === 2){
      tmpVenues.pop();
    }

    if (!tmpVenues.some(v => v.name === team.venue.name)){
      tmpVenues.push({
        name: team.venue.name
      });
    }
    

    this.setState((state : State, props: Props) => ({
      venues : [...tmpVenues],
      selectedCompetitor1: competitorNbr === 0 ? team : (this.state.selectedCompetitor1 ?? null),
      selectedCompetitor2: competitorNbr === 1 ? team : (this.state.selectedCompetitor2 ?? null),
    }))
  }

  venueSelected(venue : Venue){
    this.setState((state: State, props: Props) => ({
      selectedVenue: this.state.venues.find(v => v.name === venue.name)
    }));
  }

  timeSelected(time : {name: string}){
    let isPM = time.name.toString().includes('PM');
    let strippedTime = time.name.toString().replace(" AM", "").replace(" PM", "");
    let hoursMinutes = strippedTime.split(':');
    let hour = parseInt(hoursMinutes[0]);
    let minutes = parseInt(hoursMinutes[1]);
    if (!isPM){
      if (hour === 12){
        hour = 0;
      }
    }
    else{
      if (hour < 12){
        hour += 12;
      }
    }

    let currDate = new Date(this.state.date);
    currDate.setHours(hour);
    currDate.setMinutes(minutes);
    currDate.setSeconds(0);

    setTimeout(() => {
      this.setState((state, props) => ({
        editTimeMode: false,
        date: currDate
      }));
    }, 0)
  }

  dateChanged(date : Date, evt: Event){
    evt.stopPropagation();

    this.setState((state, props) => ({
      calendarOpened: false,
      date: date
    }));   
  }

  openCalendarView(evt : React.MouseEvent<SVGElement, MouseEvent>){
    this.setState((state, props) => ({calendarOpened: true}));
    evt.stopPropagation();
    setTimeout(() => {
      let calRef = (this.calendarRef as any);
      calRef.current.focus();
    }, 0);
  }

  blurCalendar(evt : any){
    if (evt.target && evt.target.className && evt.target.className.includes('react-calendar') ||
      (evt.relatedTarget && evt.relatedTarget.className.includes('react-calendar'))){
        let calRef = (this.calendarRef as any);
        calRef.current.focus();
      return;
    }
    else{
      setTimeout(() => {
        this.setState((state, props) => ({calendarOpened: false}));
  
      }, 100);
    }
  }

  handleOddsChange(evt : ChangeEvent<HTMLInputElement>){
    this.setState((state, props) => ({
      seedOdds: evt && evt.target && (evt.target as any).checked
    }));
  }

  async closeModal(withData: boolean){
    if (withData && this.state.selectedCompetitor1 && this.state.selectedCompetitor2){
      // Send callback, which will be invoked by parent component

      this.setState((state: State, props: Props) => ({
        isLoading: true
      }));

      console.log({"this.state":this.state})
      let homeTeam = this.state.selectedCompetitor1.venue.name === this.venueSelected.name ? 
        this.state.selectedCompetitor1 : this.state.selectedCompetitor2;

      let awayTeam = this.state.selectedCompetitor1.id === homeTeam.id ? 
        this.state.selectedCompetitor2 : this.state.selectedCompetitor1;
        
      let newGame : Game = {
        id: -1,
        dateTime: this.state.date,
        season: -1,
        status: {id: 2, statusText: 'Scheduled'},
        seasonType: 1,
        apiWeek: -1,
        allGameOdds: [],
        oddCardMap: new Map(),
        homeTeam: homeTeam,
        awayTeam: awayTeam,
      }

      GamesService.post(newGame)
        .subscribe(async (response: Response) => {
          console.log({"response":response})
          let gameId = await response.json();
          console.log({"gameId":gameId})
          
          let newGameOdd : GameOdd = {
            awayMoneyLine: this.state.seedOdds ? -204 : -1,
            homeMoneyLine: this.state.seedOdds? 212 : -1,
            drawMoneyLine: this.state.seedOdds ? 830 : -1,
            homePointSpread: this.state.seedOdds ? -3.5 : -1,
            homePointSpreadPayout: this.state.seedOdds ? -130 : -1,
            awayPointSpread: this.state.seedOdds ? 3.5 : -1,
            awayPointSpreadPayout: this.state.seedOdds ? -109 : -1,
            overPayout: this.state.seedOdds ? -120 : -1,
            overUnder: this.state.seedOdds ? 19.5 : -1,
            underPayout: this.state.seedOdds ? -115 : -1,
            oddType: 'pregame',
            created: this.state.date,
            updated: this.state.date,
            gameId: gameId,
            game: {
              ...newGame,
              id: gameId,
            },
            book: {
              id: 1,
            },

          }
          GameOddService.createNewGameOdd(newGameOdd)
            .subscribe((res: Response) => {
              console.log({"createNewGameOddResponse":res});
            })
        });
      

      setTimeout(() => {
        this.setState((state: State, props: Props) => ({
          isLoading: false
        }));
        this.props.callBack(null);


      }, 800)
    }
    else{
      this.props.callBack(null);
    }
  }

  render(){
    return(
      <React.Fragment>
        <div style={{display: (!this.state.isLoading ? 'none': 'flex'), width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <Grid
            height="80"
            width="80"
            color="#7747e5"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
        <div className={styles.CreateGameModalContent} style={{display: (this.state.isLoading ? 'none': 'initial')}}>
          <div className={styles.SectionLabel}>
            Competitors
          </div>
          <div style={{position: 'absolute', display: 'flex', paddingTop: '1em'}}>
            <div style={{zIndex: '2'}}>
              <div 
                className={styles.CompetitorDropdown}>
                <GenericDropdown 
                  hasTooltips={false}
                  data={this.state.teams} 
                  hasLabel={true}     
                  hasImages={true}        
                  handleSelectedEntity={(team: Team) => {this.teamSelected(0, team)}}
                  labelName={'Competitor #1'}/>
              </div>
            </div>
            <div style={{zIndex: '2'}}>
              <div  
                className={styles.CompetitorDropdown}>
                <GenericDropdown 
                data={this.state.teams}
                hasTooltips={false}
                hasLabel={true}  
                hasImages={true}           
                handleSelectedEntity={(team: Team) => {this.teamSelected(1, team)}}
                labelName={'Competitor #2'}/>
              </div>
            </div>
          </div>
          <div className={styles.SectionSeparator}>
          </div>
          <div className={styles.Section} style={{top: '6.5em'}}>
            <div>
              Date & Time
            </div>
            <div style={{marginTop:'.5em', alignItems: 'center', display: 'flex', position: 'relative'}}>
              <BsFillCalendarWeekFill tabIndex={1} onClick={(evt: React.MouseEvent<SVGElement, MouseEvent>) => {this.openCalendarView(evt)}} className={styles.CalendarIcon}/>
              <span style={{marginLeft: '1ch'}}>{this.state.date.toLocaleString()}</span>
              <span style={{position: 'relative'}} tabIndex={1} onClick={(evt) => {this.setState({editTimeMode: true})}} className={styles.ClockIcon}>
              <BsClock />
                <div  
                  style={{position: 'absolute', top: '-.48em', left: '-30px', zIndex: '9', visibility: (this.state.editTimeMode ? 'visible' : 'hidden')}}
                  className={styles.TimeDropdown}>
                  <GenericDropdown 
                    data={hours}
                    hasTooltips={false}
                    hasLabel={false}             
                    hasImages={false}
                    handleSelectedEntity={(time) => {this.timeSelected(time)}}
                  />
                </div>
              </span>
            </div>
            <CalendarContainer>
              <div style={{position: 'relative'}}>
                <div ref={this.calendarRef} onBlur={(evt) => {this.blurCalendar(evt)}}  tabIndex={1} 
                style={{zIndex:'2', position:'fixed', top: '22em', visibility: this.state.calendarOpened ? 'visible' : 'hidden'}}>
                  <Calendar onChange={(date: Date, evt: any) =>{this.dateChanged(date, evt)}} value={this.state.date}/>
                </div>
              </div>            
            </CalendarContainer>

          </div>
          <div style={{width: '100%', height: '7em'}}>
          </div>
          <div className={styles.Section} style={{top: '12.5em'}}>
            <div>
              Venue
            </div>
            <div style={{position: 'relative'}}>
              <div  
                  style={{position: 'absolute', top: '.38em', left: '0', zIndex: '1', marginLeft: '0'}}
                  className={styles.VenueDropdown}>
                  <GenericDropdown data={this.state.venues}
                  hasTooltips={false}
                  hasLabel={false}             
                  hasImages={false}
                  handleSelectedEntity={(venue) => {this.venueSelected(venue)}}
                  />
                </div>
                <div style={{position: 'absolute', top: '4em', height: '2em', display: 'flex'}}>
                  <label>
                    <Toggle
                      defaultChecked={this.state.seedOdds}
                      className={styles.SeedCheckbox}
                      onChange={(evt : ChangeEvent<HTMLInputElement>) => {this.handleOddsChange(evt)}} />
                    <div style={{height: '100%', float: 'right', paddingLeft: '1ch'}}>Seed Odds</div>
                  </label>
                </div>
            </div>
          </div>
          <div style={{width: '100%', height: '3em', position: 'absolute', bottom: '0'}}>
            <div style={{position: 'relative', display: 'flex', justifyContent: 'center', gap: '1.5ch'}}>
              <Blue42Btn onClick={() => {this.closeModal(true)}} btnText={'Create'} className={styles.Blue42BtnClass} isSecondary={false}  />
              <Blue42Btn onClick={() => {this.closeModal(false)}} btnText={'Cancel'} className={styles.Blue42BtnClass} isSecondary={true} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}