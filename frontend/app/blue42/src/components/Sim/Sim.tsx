import React from 'react';
import PropTypes from 'prop-types';
import styles from './Sim.less';
import nflIcon from '../../assets/images/nfl_logo.png';
import styled from 'styled-components';
import SimAllEvents from '../SimAllEvents/SimAllEvents';
import TeamsService from '../../services/team.service';


type Props = {
  
};

type State = {
  selectedMenu: string;
};

const ComponentWithPseudoClass = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 10px 10px;
  margin-right: 10px;
  font-size: 15px;
  font-weight: bold;
  transition: .1s all ease;

  &:hover{
      cursor: pointer;
  }

  &:focus{
    outline: none;
    cursor: none;
  }

  &:after{
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    border-radius: 100px 100px 0 0;
  }



  &.selected{
    color: #0CD664;
    &:after{
      background-color: #0CD664;
    }
  }
  &:not(.selected){
    &:not(:hover){
      color: #7a828b;
    }
    &:hover{
      color: white;
    }
  }`;

export default class Sim extends React.Component{
  props: Props;
  state: State;

  constructor(props : Props){
    super(props);
    this.state = {
      selectedMenu: 'all'
    };
    TeamsService.init();
    this.props = props;
  }

  clickedTab(selectedTabStr: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>){
    if (event){
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({selectedMenu: selectedTabStr});

  }
  render(){
    return (  
      <div className={styles.Sim}>
        <div className={styles.FootballImageContainer}>
          <div className={styles.FootballImage}>
          </div>
          <div className={styles.FootballIconLabel}>
            Football
          </div>
          <div className={styles.NFLIconContainer}>
            <a>
              <img src={nflIcon} title="NFL" className={styles.NFLIcon} />
            </a>
          </div>
        </div>
        <div className={styles.SimViewControls}>
          <div>
            <ComponentWithPseudoClass onClick={(e) => this.clickedTab('all', e)} data-text="all" className={this.state.selectedMenu === 'all' ? 'selected' : ''}>
              <span> 
                All
              </span>
            </ComponentWithPseudoClass>
          </div>
          <div>
            <ComponentWithPseudoClass onClick={(e) => this.clickedTab('live', e)}  data-text="live" className={this.state.selectedMenu === 'live' ? 'selected' : ''}>
              <span> 
                  Live
                </span>
              </ComponentWithPseudoClass>
          </div>
          <div>
            <ComponentWithPseudoClass onClick={(e) => this.clickedTab('pregame', e)} data-text="pregame" className={this.state.selectedMenu === 'pregame' ? 'selected' : ''}>
                <span> 
                  Pregame
                </span>
              </ComponentWithPseudoClass>
          </div>
        </div>
        {        
          this.state.selectedMenu === 'all' && <SimAllEvents />
        }
      </div>
    );
  }
}