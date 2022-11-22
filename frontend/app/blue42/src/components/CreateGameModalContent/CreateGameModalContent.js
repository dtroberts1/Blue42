import React from 'react';
import PropTypes from 'prop-types';
import './CreateGameModalContent.less';
import styles from './CreateGameModalContent.less';
import acImage from '../../assets/team-icons/AC.png';
import ReactTooltip from 'react-tooltip';

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
      teamList: this.teamListItems()
    }
  }

  teamListItems(params) {
    return teams.map((team) => 
    <li className={styles.ImgSelectorItem}>
      <div className={styles.ImgSelectorItemContainer}>
        <div className={styles.ImgSelectorItemImg}><img src={acImage}/></div>
        <div className={styles.ImgSelectorItemValue}><div data-tip={team} data-class={styles.ToolTipClass}>{team} <ReactTooltip /></div></div> 
      </div>
    </li>
  );
  }

  render(){
    return(
      <div className={styles.CreateGameModalContent}>
      CreateGameModalContent Component
      <div className={styles.ImgSelectorContainer}>
        <ul className={styles.ImgSelectorList}>
          {this.state.teamList}
        </ul>
      </div>
    </div>
    );
  }
}

CreateGameModalContent.propTypes = {};

CreateGameModalContent.defaultProps = {};

export default CreateGameModalContent;
