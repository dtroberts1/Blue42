import React from 'react';
import PropTypes from 'prop-types';
import './GenericDropdown.less';
import styles from './GenericDropdown.less';
import acImage from '../../assets/team-icons/AC.png';
import ReactTooltip from 'react-tooltip';
import {IoMdArrowDropdown} from 'react-icons/io';
import { v4 } from 'uuid'


class GenericDropdown extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedEntity: props.data[0],
      dataDropdownExpanded: false,
    }
  }
  componentDidMount(){
    this.loaded = true;
  }
  
  componentWillMount(){
    let dataListItems = this.dataListItems();

    this.setState((state, props) => ({
      dataList: dataListItems
    }));
  }

  toggleDataDropdown(){
    this.setState((state, props) => ({
      dataDropdownExpanded: !state.dataDropdownExpanded
    }));
  }

  selectedEntity(itm){
    this.setState((state, props) => ({
      dataDropdownExpanded: false,
      selectedEntity: this.props.data.find((currItm) =>  currItm.name === itm.name)
    }));
  }

  dataListItems(params) {
    return this.props.data.sort().map((itm) => 
    <React.Fragment key={v4()}>
      <li className={styles.ImgSelectorItem} key={itm.name}>
        <div onClick={(evt) => {this.selectedEntity(itm)}} className={styles.ImgSelectorItemContainer}>
          <div className={styles.ImgSelectorItemImg}><img src={acImage}/></div>
          <div className={styles.ImgSelectorItemValue}>
            <div>{itm.name} <ReactTooltip />
            </div>
          </div> 
        </div>
      </li>
    </React.Fragment>)
  }

  dataDropdownBlurred(){
    if (this.state.dataDropdownExpanded){
      this.setState((state,props) => ({
        dataDropdownExpanded: false
      }));
    }
  }

  render(){
    return(
      <div onBlur={(evt) => {this.dataDropdownBlurred()}} tabIndex="1" className={styles.ImgSelectorContainer + ' ' + this.props.customClass}>
        <div 
          onClick={(evt) => {this.toggleDataDropdown()}}
          style={{borderBottom: this.state.dataDropdownExpanded ? 'inset 2px' : 'unset'}}
          className={styles.CustomGenericListBtn + ' ' + styles.ImgSelectorItemContainer}>
          <div className={styles.ImgSelectorItemImg}><img src={acImage}/></div>
          <div className={styles.ImgSelectorItemValue}><div data-tip={this.state.selectedEntity.name} data-class={styles.ToolTipClass}>{this.state.selectedEntity.name} <ReactTooltip /></div> 
          <IoMdArrowDropdown className={styles.DropdownArrow + ' ' + (this.state.dataDropdownExpanded ? styles.DropdownArrowRotate : styles.DropdownUnRotate)}/>
          </div> 
        </div>
        {
          this.loaded &&           
          <ul className={styles.ImgSelectorList + ' ' + (this.state.dataDropdownExpanded ? styles.ImgSelectorListExpanded : this.loaded ? styles.ImgSelectorListCollapsed : '')}>
            {this.state.dataList}
          </ul>
        }
    </div>
    );
  }
}

GenericDropdown.propTypes = {};

GenericDropdown.defaultProps = {};

export default GenericDropdown;
