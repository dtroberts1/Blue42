import React from 'react';
import PropTypes from 'prop-types';
import './SimAllEvents.less';
import styles from './SimAllEvents.less';
import nflIcon from '../../assets/images/nfl_logo.png';

const testData = {
  category1Header: 'Winner. Half 1',
  category2Header: 'Total. Half 1',
  category3Header: 'Handicap. Half 1',
  eventDateStr: 'Nov 13',
  eventTimeStr: '9:30',
};

class SimAllEvents extends React.Component{

  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className={styles.SimAllEvents}>
        <div>
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
            Data
          </div>
        </div>
      </div>
    ); 
  }
}

SimAllEvents.propTypes = {};

SimAllEvents.defaultProps = {};

export default SimAllEvents;
