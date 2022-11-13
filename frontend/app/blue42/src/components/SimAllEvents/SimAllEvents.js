import React from 'react';
import PropTypes from 'prop-types';
import './SimAllEvents.less';
import styles from './SimAllEvents.less';
import nflIcon from '../../assets/images/nfl_logo.png';
import styled from 'styled-components';
import tbIcon from '../../assets/team-icons/TBB.png';
import ssIcon from '../../assets/team-icons/SS.png';

const AllEventsOverviewOddsCard = styled.div`
padding: .6em 1.4em;
font-size: .9rem;
border-radius: 8px;
position: relative;
width: 2.6em;
height: 2.5em;
filter: brightness(${(props) => (props.odds.isActive ? 1.8 : 1)});
background: ${(props) => (props.odds.isActive ? 'linear-gradient(90deg, rgba(55, 0, 179, 0.3) 0%, rgba(98, 41, 229, 0.3) 100%), rgba(255, 255, 255, 0.1) !important' : '#271b2f')};

&:hover{
    filter: brightness(1.8);
    cursor: pointer;
    background: linear-gradient(90deg, rgba(55, 0, 179, 0.3) 0%, rgba(98, 41, 229, 0.3) 100%), rgba(255, 255, 255, 0.1) !important
}

&::before{
    content: "${props => props.odds.header}";
    position: absolute;
    top: .23em;
    left: 0;
    width: 100%;
    text-align: center;
    font-weight: 500;

}

&::after{
  content: "${props => props.odds.value}";
  position: absolute;
  left: 0;
  bottom: .38em;
  width: 100%;
  text-align: center;
  font-weight: 500;

}

}`;

class SimAllEvents extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      selectedOdd: null,
      testData : {
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
            value: 830,
            isActive: false
          },
          {
            header: '2',
            value: 123,
            isActive: false
          },
          {
            header: 'O 12.5',
            value: '-118',
            isActive: false
          },
          {
            header: 'U 21.5',
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
      }
    }
  }

  clickedOddsCard(index, event){
    //this.setState({testData.odds[index].isActive : true})

    let arr = this.state.testData.odds;
    arr.filter((itm, itmIndex) => itmIndex !== index).forEach((odd) => {odd.isActive = false});
    arr[index].isActive = !arr[index].isActive;

    this.setState( {
        testData : {
          ...this.state.testData,
          odds: arr
      }}
    );
    if (arr[index].isActive){
      this.setState({selectedOdd: arr[index]});
    }
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
                {this.state.testData.eventDateStr} &#x2022; {this.state.testData.eventTimeStr}
              </div>
            </div>
            <div className={styles.AllEventsOverviewHeadersRight}>
              <div className={styles.CategoryHeader} style={{flex: 3}}>
                {this.state.testData.category1Header}
              </div>
              <div className={styles.CategoryHeader} style={{flex: 2}}>
                {this.state.testData.category2Header}
              </div>
              <div className={styles.CategoryHeader} style={{flex: 2}}>
                {this.state.testData.category3Header}
              </div>
            </div>
          </div>
          <div className={styles.AllEventsOverviewData}>
            <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem'}}>
              Tampa Bay Buccaneers <img src={tbIcon} style={{padding: '0 2ch 0 1ch'}}/> 
              VS 
              <img src={ssIcon} style={{padding: '0 1ch 0 2ch'}}/> Seattle Seahawks
            </div>
            <div style={{display: 'flex', flex: 1}}>
              <div className={styles.AllEventsOverviewOddsCell} style={{flex: 3}}>
                <div>
                  <div style={{position: 'relative'}}>
                    <AllEventsOverviewOddsCard onClick={(e) => this.clickedOddsCard(0, e)} odds={this.state.testData.odds[0]}/>
                  </div>
                </div>
                <div>
                  <div style={{position: 'relative'}}>
                    <AllEventsOverviewOddsCard onClick={(e) => this.clickedOddsCard(1, e)} odds={this.state.testData.odds[1]}/>
                  </div>
                </div>
                <div>
                  <div style={{position: 'relative'}}>
                    <AllEventsOverviewOddsCard onClick={(e) => this.clickedOddsCard(2, e)} odds={this.state.testData.odds[2]}/>
                  </div>
                </div>
              </div>
              <div className={styles.AllEventsOverviewOddsCell} style={{flex: 2}}>
                <div>
                  <div style={{position: 'relative'}}>
                    <AllEventsOverviewOddsCard onClick={(e) => this.clickedOddsCard(3, e)} odds={this.state.testData.odds[3]}/>
                  </div>
                </div>
                <div>
                  <div style={{position: 'relative'}}>
                    <AllEventsOverviewOddsCard onClick={(e) => this.clickedOddsCard(4, e)} odds={this.state.testData.odds[4]}/>
                  </div>
                </div>
              </div>
              <div className={styles.AllEventsOverviewOddsCell} style={{flex: 2}}>
                <div>
                  <div style={{position: 'relative'}}>
                    <AllEventsOverviewOddsCard onClick={(e) => this.clickedOddsCard(5, e)} odds={this.state.testData.odds[5]}/>
                  </div>
                </div>
                <div>
                  <div style={{position: 'relative'}}>
                    <AllEventsOverviewOddsCard onClick={(e) => this.clickedOddsCard(6, e)} odds={this.state.testData.odds[6]}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ); 
  }
}

SimAllEvents.propTypes = {};

SimAllEvents.defaultProps = {};

export default SimAllEvents;
