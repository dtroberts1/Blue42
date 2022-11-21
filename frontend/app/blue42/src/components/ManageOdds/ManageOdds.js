import React from 'react';
import PropTypes from 'prop-types';
import styles from './ManageOdds.less';
import ReactModal from 'react-modal';
import GenericModal from '../GenericModal/GenericModal';

class ManageOdds extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'odds',
      createModalIsVisible: false
    }
  }

  componentDidMount(){
    if (typeof(window) !== 'undefined') {
        ReactModal.setAppElement('body')
    }
  }

  openCreateModal(){
    this.setState((state, props) => ({
      createModalIsVisible: true
    }));
  }

  closeCreateModal(){

    this.setState((state, props) => ({
      createModalIsVisible: false
    }));
  }

  render(){
    return(
      <div className={styles.ManageOdds}>
        <div className={styles.ManageOddsContainer} style={{borderRadius: '22px 22px 10px 10px', position: 'relative'}}>
          <div onClick={(e) =>{this.setState({selectedTab: 'odds'})}} className={styles.ManageOddsContainerTab} style={{float: 'left', borderRadius: '22px 0 0 0', backgroundColor: this.state.selectedTab === 'odds' ? '#7747E5' : '#3A2334'}}>
            Odds
          </div>
          <div onClick={(e) =>{this.setState({selectedTab: 'myOdds'})}} className={styles.ManageOddsContainerTab} style={{float: 'right', borderRadius: '0 22px 0 0', backgroundColor: this.state.selectedTab === 'myOdds' ? '#7747E5' : '#3A2334'}}>
            My Odds
          </div>
          <div className={styles.ManageOddsBody}>
            Body
          </div>
        </div>
        <div className={styles.ManageOddsContainer} style={{height: 'initial'}}>
          <div className={styles.CreateBtn} tabIndex="1" onClick={(event) => {this.openCreateModal()}}> 
            Create Odds
          </div>
        </div>
        <div className={styles.ManageOddsContainer} style={{height: '1.5em'}}>
          SettingsContainer
        </div>
        {this.state.createModalIsVisible && 
          <GenericModal
            onCloseModal={(evt) => {this.closeCreateModal()}}
            title="Create Odds"
          />
        }
      </div>
    );
  }
}

ManageOdds.propTypes = {};

ManageOdds.defaultProps = {};

export default ManageOdds;
