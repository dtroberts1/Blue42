import React from 'react';
import PropTypes from 'prop-types';
import './CreateGameModalContent.less';
import styles from './CreateGameModalContent.less';
import acImage from '../../assets/team-icons/AC.png';
import ReactTooltip from 'react-tooltip';
import {IoMdArrowDropdown} from 'react-icons/io';

const teams = [
  'New York Patriots',
  'New York Jets',
  'Tampa Bay Bucs',
  'New York Giants',
  'Washington Redskins',
  'Miami Dolphins',
  'San Francisco 49ers'
]

class CreateGameModalContent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedTeam: teams[0],
      teamsDropdownExpanded: false
    }

  }

  componentWillMount(){
    console.log("before teamListItems")
    let teamListItems = this.teamListItems();
    console.log("after teamListItems")

    this.setState((state, props) => ({
      teamList: teamListItems
    }));

    console.log("finished setting state");
  }

  toggleTeamsDropdown(){
    this.setState((state, props) => ({
      teamsDropdownExpanded: !state.teamsDropdownExpanded
    }));
  }

  selectedTeam(team){
    this.setState((state, props) => ({
      teamsDropdownExpanded: false,
      selectedTeam: teams.filter((currTeam) =>  currTeam === team)
    }));
  }

  teamListItems(params) {
    return teams.sort().map((team) => 
    <React.Fragment>
      <li className={styles.ImgSelectorItem}>
        <div onClick={(evt) => {this.selectedTeam(team)}} className={styles.ImgSelectorItemContainer}>
          <div className={styles.ImgSelectorItemImg}><img src={acImage}/></div>
          <div className={styles.ImgSelectorItemValue}>
            <div data-tip={team} delayHide={3500} data-class={styles.ToolTipClass}>{team} <ReactTooltip />
            </div>
          </div> 
        </div>
      </li>
    </React.Fragment>)
  }

  teamDropdownBlurred(){
    if (this.state.teamsDropdownExpanded){
      this.setState((state,props) => ({
        teamsDropdownExpanded: false
      }));
    }
  }

  render(){
    console.log('count is ' + (this.state.teamList ? this.state.teamList.length :0))
    return(
      <div className={styles.CreateGameModalContent}>
        <div onBlur={(evt) => {this.teamDropdownBlurred()}} tabIndex="1" className={styles.ImgSelectorContainer}>
          <div 
            onClick={(evt) => {this.toggleTeamsDropdown()}}
            style={{borderBottom: this.state.teamsDropdownExpanded ? 'inset 2px' : 'unset'}}
            className={styles.CustomGenericListBtn + ' ' + styles.ImgSelectorItemContainer}>
            <div className={styles.ImgSelectorItemImg}><img src={acImage}/></div>
            <div className={styles.ImgSelectorItemValue}><div data-tip={this.state.selectedTeam} data-class={styles.ToolTipClass}>{this.state.selectedTeam} <ReactTooltip /></div> 
            <IoMdArrowDropdown className={styles.DropdownArrow + ' ' + (this.state.teamsDropdownExpanded ? styles.DropdownArrowRotate : styles.DropdownUnRotate)}/>
            </div> 
          </div>
          { this.state.teamsDropdownExpanded && 
            <ul className={styles.ImgSelectorList}>
            {this.state.teamList}
          </ul>
          }
        </div>
    </div>
    );
  }
}

CreateGameModalContent.propTypes = {};

CreateGameModalContent.defaultProps = {};

export default CreateGameModalContent;
