import React from 'react';
import PropTypes from 'prop-types';
import './CreateGameModalContent.less';
import styles from './CreateGameModalContent.less';
import GenericDropdown from '../GenericDropdown/GenericDropdown';


const teams = [
  {name: 'New York Patriots'},
  {name: 'New York Jets'},
  {name: 'Tampa Bay Bucs'},
  {name: 'New York Giants'},
  {name: 'Washington Redskins'},
  {name: 'Miami Dolphins'},
  {name: 'San Francisco 49ers'}
]

class CreateGameModalContent extends React.Component{
  loaded = false;

  constructor(props){
    super(props);

  }

  teamSelected(team){

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
                handleSelectedEntity={(team) => {this.teamSelected(team)}}
                customClass={styles.MyCustomGenericDropdownClass} 
                labelName={'Competitor #1'}/>
            </div>
          </div>
          <div style={{zIndex: '999999'}}>
            <div  
              className={styles.CompetitorDropdown}>
              <GenericDropdown data={teams} customClass={styles.MyCustomGenericDropdownClass} labelName={'Competitor #2'}/>
            </div>
          </div>
        </div>
        <div className={styles.SectionSeparator}>
        </div>
        <div className={styles.Section} style={{top: '6.5em'}}>
          <div>
            Date & Time
          </div>
          <div>
            Calendars go here
          </div>
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
