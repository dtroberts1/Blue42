import React, { ChangeEvent, LegacyRef }  from 'react';
import './CreateGameModalContent.less';
import styles from './CreateGameModalContent.less';
import {GenericDropdown} from '../GenericDropdown/GenericDropdown';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import {BsFillCalendarWeekFill} from 'react-icons/bs';
import {BsClock} from 'react-icons/bs';
import moment from 'moment';
import "react-toggle/style.css" // for ES6 modules
import Toggle from 'react-toggle'
import Blue42Btn from '../Blue42Btn/Blue42Btn';
import {Team, Venue} from '../../interfaces/interface';

type Props = {
  callBack(promise: (() => Promise<unknown>) | null): unknown;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void,
}

type State = {
  calendarOpened: boolean,
  editTimeMode: boolean,
  date: Date,
  seedOdds: boolean
}

const teams = [
  {name: 'New York Patriots'},
  {name: 'New York Jets'},
  {name: 'Tampa Bay Bucs'},
  {name: 'New York Giants'},
  {name: 'Washington Redskins'},
  {name: 'Miami Dolphins'},
  {name: 'San Francisco 49ers'}
]

const venues = [
  {name: 'Gillete Stadium'},
  {name: 'FedEx Field'}
]

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
      seedOdds: true
    }
  }
  componentDidMount(){
  }

  teamSelected(competitorNbr : number, team: Team){

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

  venueSelected(venue : Venue){

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
    if (withData){
      // Send callback, which will be invoked by parent component
      let promise = () => {
        return new Promise((resolve, reject) => {
          // Write Backend calls here (TODO)
          //
          //
          //
          resolve(true);
        })
      };
      this.props.callBack(promise);
    }
    else{
      this.props.callBack(null);
    }
  }

  render(){
    return(
      <div className={styles.CreateGameModalContent}>
        <div className={styles.SectionLabel}>
          Competitors
        </div>
        <div style={{position: 'absolute', display: 'flex', paddingTop: '1em'}}>
          <div style={{zIndex: '2'}}>
            <div 
              className={styles.CompetitorDropdown}>
              <GenericDropdown 
                hasTooltips={false}
                data={teams} 
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
              data={teams}
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
                style={{position: 'absolute', top: '-.48em', left: '-30px', zIndex: '1', visibility: (this.state.editTimeMode ? 'visible' : 'hidden')}}
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
                <GenericDropdown data={venues}
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
    );
  }
}