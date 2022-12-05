import React from 'react';
import PropTypes from 'prop-types';
import './CreateOddsModalContent.less';
import styles from './CreateOddsModalContent.less';

type Props = {
  callBack(promise: (() => Promise<unknown>) | null): unknown;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void,
}

export default class CreateOddsModalContent extends React.Component{
  props: Props;

  constructor(props: Props){
    super(props);
    this.props = props;
  }

  render(){
    return (
      <div className={styles.CreateOddsModalContent}>
        CreateOddsModalContent Component
      </div>
    );
  }
}