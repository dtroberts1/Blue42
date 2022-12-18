import React from 'react';
import PropTypes from 'prop-types';
import './GenericModal.less';
import ReactModal from 'react-modal';
import CreateOddsModalContent from '../CreateOddsModalContent/CreateOddsModalContent';
import CreateGameModalContent from '../CreateGameModalContent/CreateGameModalContent';
import styles from './GenericModal.less';

type Props = {
  onCloseModal: (promise: any) => void,
  title: string,
};

export default class GenericModal extends React.Component{
  props: Props;
  constructor(props: Props){
    super(props);
    this.props = props;
  }

  handleModalCallback(callBack: (() => Promise<unknown>)){
    this.props.onCloseModal(callBack)
  }

  render(){
    return (
      <ReactModal
        onRequestClose={(event) => {this.props.onCloseModal(null)}}
        isOpen={true} 
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
          {this.props.title}
          <div className={styles.ExitModalBtnContainer}>
            <div tabIndex={1} onClick={(event) => {this.props.onCloseModal(null)}}
              className={styles.ExitModalBtn}>
              <div>
                X
              </div>
            </div>
          </div>
        </div>
        <div className={styles.ModalBody1}>
          <div style={{width: '100%', height: '100%', position: 'relative'}}>
            {
              this.props.title === 'Create Odds' &&
              <CreateOddsModalContent callBack={(promise: (() => Promise<unknown>)) => this.handleModalCallback(promise)} />
            }
            {
              this.props.title === 'Create Game' &&
              <CreateGameModalContent callBack={(promise: (() => Promise<unknown>)) => this.handleModalCallback(promise)} />
            }
          </div>
        </div>
      </ReactModal>
    )
  }
}