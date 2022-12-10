import React from 'react';
import PropTypes from 'prop-types';
import styles from './ManageOdds.less';
import ReactModal from 'react-modal';
import GenericModal from '../GenericModal/GenericModal';
import Blue42Btn from '../Blue42Btn/Blue42Btn'
import { type } from '@testing-library/user-event/dist/type';
import {RiEditLine} from 'react-icons/ri';
import {FcCancel} from 'react-icons/fc';
import {GiAmericanFootballBall} from 'react-icons/gi';
import {FiSave} from 'react-icons/fi';
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {IoMdPulse} from 'react-icons/io';

type Props = {
  
};

type State = {
  selectedTab: string;
  createModalIsVisible: boolean;
}

export default class ManageOdds extends React.Component{

  props: Props;
  state: State;

  constructor(props : Props){
    super(props);
    this.state = {
      selectedTab: 'odds',
      createModalIsVisible: false
    }
    this.props = props;
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
            <div tabIndex={1} className={styles.UpperCloseBtn}>
              <AiOutlineCloseCircle />
            </div>
            <div style={{position:'relative'}}>
              <div className={styles.ManageOddsBodyGameLabel}>Tennessee Titans vs Jacksonville Jaguars</div>
              <div style={{position: 'relative', paddingTop: '0.3em', paddingLeft: '2.3em'}}>
                <div className={styles.CardOddHeader}>
                  <div>
                    Over 20.5
                  </div>
                  <div tabIndex={1} style={{marginLeft: '0.85em'}}  className={styles.CardOddHeaderBtn}>
                    <RiEditLine />
                  </div>
                  <div style={{marginLeft: '0.35em'}} tabIndex={1} className={styles.CardOddHeaderBtn}>
                    <FiSave />
                  </div>
                  <div style={{marginLeft: '0.35em'}} tabIndex={1} className={styles.CardOddHeaderBtn}>
                    <FcCancel />
                  </div>
                </div>
                <div style={{color: '#9c9c9c', fontWeight: '640', filter: 'brightness(1.2)'}}>
                  Total. Half 1
                </div>
                <div style={{position: 'absolute', left: '0', top: '0', fontSize: '1.3rem', height: '100%', display: 'flex', alignItems: 'center', paddingLeft: '0.2em'}}>
                  <GiAmericanFootballBall />
                </div>
              </div>
              <div className={styles.CardOddValue}>
                <div className={styles.CardOddData}>
                  <div>
                    <IoMdPulse />
                  </div>
                  <div className={styles.CardOddDataValue}>
                    -115
                  </div>
                  <div style={{marginLeft: '0.85em'}} tabIndex={1} className={styles.CardOddHeaderBtn}>
                    <RiEditLine />
                  </div>
                  <div style={{marginLeft: '0.35em'}} tabIndex={1} className={styles.CardOddHeaderBtn}>
                    <FiSave />
                  </div>
                  <div style={{marginLeft: '0.35em'}} tabIndex={1} className={styles.CardOddHeaderBtn}>
                    <FcCancel />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.ManageOddsContainer} style={{height: 'initial'}}>
         <div >
          <Blue42Btn onClick={(event) => {this.openCreateModal()}} btnText={'Create Odds'} />
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