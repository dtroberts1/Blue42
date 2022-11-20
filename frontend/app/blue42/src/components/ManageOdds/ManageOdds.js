import React from 'react';
import PropTypes from 'prop-types';
import styles from './ManageOdds.less';
import ReactModal from 'react-modal';

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
      console.log("in close create modal");

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
        <ReactModal
          onRequestClose={(event) => {this.closeCreateModal()}}
          isOpen={this.state.createModalIsVisible} 
          overlayClassName={styles.CreationModalOverlay}
          portalClassName={styles.CreationModalPortal}
          className={styles.CreationModalContent}
          ariaHideApp={
            true
          /* Boolean indicating if the appElement should be hidden */}
          shouldFocusAfterRender={
            true
          /* Boolean indicating if the modal should be focused after render. */}

          shouldCloseOnOverlayClick={
            true
          /* Boolean indicating if the overlay should close the modal */}

          shouldCloseOnEsc={
            true
          /* Boolean indicating if pressing the esc key should close the modal
            Note: By disabling the esc key from closing the modal
            you may introduce an accessibility issue. */}

          shouldReturnFocusAfterClose={
            true
          /* Boolean indicating if the modal should restore focus to the element
            that had focus prior to its display. */}
        >
          <div className={styles.ModalHeader}>
            Create 
            <div className={styles.ExitModalBtnContainer}>
              <div tabIndex="1" onClick={(event) => {this.closeCreateModal()}}
                className={styles.ExitModalBtn}>
                <div>
                  X
                </div>
              </div>
            </div>
          </div>
          <div className={styles.ModalBody1}>
            Body
          </div>
        </ReactModal>
      </div>
    );
  }
}

ManageOdds.propTypes = {};

ManageOdds.defaultProps = {};

export default ManageOdds;
