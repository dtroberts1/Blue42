import React, { useState }  from 'react';
import PropTypes from 'prop-types';
import './CreateGameModalContent.less';
import styles from './CreateGameModalContent.less';
import GenericDropdown from '../GenericDropdown/GenericDropdown';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import {BsFillCalendarWeekFill} from 'react-icons/bs';
import {BsClock} from 'react-icons/bs';

const teams = [
  {name: 'New York Patriots'},
  {name: 'New York Jets'},
  {name: 'Tampa Bay Bucs'},
  {name: 'New York Giants'},
  {name: 'Washington Redskins'},
  {name: 'Miami Dolphins'},
  {name: 'San Francisco 49ers'}
]

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

class CreateGameModalContent extends React.Component{
  loaded = false;

  constructor(props){
    super(props);
    this.calendarRef = React.createRef();

    this.state = {
      calendarOpened: false,
      date: new Date(),
    }
  }
  componentDidMount(){
  }

  teamSelected(team){

  }

  dateChanged(date, evt){
    evt.stopPropagation();

    this.setState((state, props) => ({
      calendarOpened: false,
      date: date
    }));   
  }

  openCalendarView(evt){
    console.log({"openCalEvt":evt})
    this.setState((state, props) => ({calendarOpened: true}));
    evt.stopPropagation();
    setTimeout(() => {
      this.calendarRef.current.focus();
    }, 0);
  }

  blurCalendar(evt){
    if (evt.target && evt.target.className && evt.target.className.includes('react-calendar') ||
      (evt.relatedTarget && evt.relatedTarget.className.includes('react-calendar'))){
        this.calendarRef.current.focus();
      return;
    }
    else{
      setTimeout(() => {
        this.setState((state, props) => ({calendarOpened: false}));
  
      }, 100);
    }


  }

  render(){
    return(
      <div className={styles.CreateGameModalContent}>
        <div className={styles.SectionLabel}>
          Competitors
        </div>
        <div style={{position: 'absolute', display: 'flex', paddingTop: '1em'}}>
          <div style={{zIndex: '999999'}}>
            <div 
              className={styles.CompetitorDropdown}>
              <GenericDropdown 
                data={teams} 
                tabIndex="1"
                handleSelectedEntity={(team) => {this.teamSelected(team)}}
                labelName={'Competitor #1'}/>
            </div>
          </div>
          <div style={{zIndex: '999999'}}>
            <div  
              className={styles.CompetitorDropdown}>
              <GenericDropdown data={teams}                 
              tabIndex="1"
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
          <div style={{marginTop:'.5em', alignItems: 'center', display: 'flex'}}>
            <BsFillCalendarWeekFill tabIndex="1" onClick={(evt) => {this.openCalendarView(evt)}} className={styles.CalendarIcon}/>
            <span style={{marginLeft: '1ch'}}>{this.state.date.toLocaleString()}</span>
            <span className={styles.ClockIcon}><BsClock /></span>
          </div>
          <CalendarContainer>
            <div style={{position: 'relative'}}>
              <div ref={this.calendarRef} onBlur={(evt) => {this.blurCalendar(evt)}}  tabIndex="1" style={{zIndex:'2', position:'absolute', top: '1em', visibility: this.state.calendarOpened ? 'visible' : 'hidden'}}>
                <Calendar tabIndex="2" onChange={(date, evt) =>{this.dateChanged(date, evt)}} value={this.state.date}/>
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
          <div>
            Venue Selector Goes here
          </div>
        </div>
        <div style={{width: '100%', height: '7em'}}>

        </div>
      </div>
    );
  }
}

CreateGameModalContent.propTypes = {};

CreateGameModalContent.defaultProps = {};

export default CreateGameModalContent;
