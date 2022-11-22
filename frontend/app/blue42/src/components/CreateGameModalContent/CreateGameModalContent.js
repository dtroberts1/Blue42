import React from 'react';
import PropTypes from 'prop-types';
import './CreateGameModalContent.less';
import styles from './CreateGameModalContent.less';
import GenericDropdown from '../GenericDropdown/GenericDropdown';


const teams = [
  {name: 'New York Patriots'},
  {name: 'New York Jets'},
  {name: 'Tampa Bay Bucs'},
  {name: 'New York Giants'},
  {name: 'Washington Redskins'},
  {name: 'Miami Dolphins'},
  {name: 'San Francisco 49ers'}
]

class CreateGameModalContent extends React.Component{
  loaded = false;

  constructor(props){
    super(props);

  }

  render(){
    return(
      <div className={styles.CreateGameModalContent}>
        <GenericDropdown data={teams} customClass={styles.MyCustomGenericDropdownClass}/>
      </div>
    );
  }
}

CreateGameModalContent.propTypes = {};

CreateGameModalContent.defaultProps = {};

export default CreateGameModalContent;
