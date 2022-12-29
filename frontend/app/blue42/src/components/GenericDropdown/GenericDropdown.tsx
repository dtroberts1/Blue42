import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import './GenericDropdown.less';
import styles from './GenericDropdown.less';
import acImage from '../../assets/team-icons/AC.png';
import ReactTooltip from 'react-tooltip';
import {IoMdArrowDropdown} from 'react-icons/io';
import { v4 } from 'uuid'

type Props ={
  customClass ?: string;
  data: {
    imagePath?: string,
    name: string,
  }[],
  hasTooltips: boolean,
  hasLabel: boolean,
  handleSelectedEntity: (itm: any) => void,
  hasImages: boolean,
  labelName ?: string,
}

type State = {
  dataList: any[];
  dataDropdownExpanded: boolean;
  selectedEntity: {imagePath ?: string, name: string},
  data: {
    imagePath?: string,
    name: string,
  }[],
}

class GenericDropdown extends React.Component{
  loaded: boolean = false;
  state: State;
  props: Props;
  
  constructor(props: Props){
    super(props);
    this.state = {
      selectedEntity: props.data[0],
      dataDropdownExpanded: false,
      dataList: [],
      data: props.data
    }
    this.props = props;
  }
  componentDidMount(){


    this.loaded = true;

  }

  static getDerivedStateFromProps(nextProps : Props, prevState: State) {
    return ({data: nextProps.data, selectedEntity: prevState.selectedEntity == null ? nextProps.data[0] : prevState.selectedEntity})
  }

  toggleDataDropdown(){
    this.setState((state : State, props: Props) => ({
      dataDropdownExpanded : !state.dataDropdownExpanded
    }));
  }

  selectedEntity(itm : any){
    this.setState((state : State, props : Props) => ({
      dataDropdownExpanded: false,
      //data: state.data.filter(currItm => currItm.name !== itm.name),
      selectedEntity: props.data.find((currItm) =>  currItm?.name === itm?.name)
    }));

    // Emit event for parent
    if (this.props.handleSelectedEntity){
      this.props.handleSelectedEntity(itm);
    }
  }

  dataListItems = () => {
    return this.state.data.filter(dataItm => dataItm.name !== this.state.selectedEntity.name).sort().map((itm) => 
    <React.Fragment key={v4()}>
      <li className={styles.ImgSelectorItem} key={itm?.name}>
        <div onClick={(evt) => {this.selectedEntity(itm)}} className={styles.ImgSelectorItemContainer}>
          {
            /* If Dropdown Image should be displayed */
            this.props.hasImages && <div className={styles.ImgSelectorItemImg}><img src={itm.imagePath}/></div>
          }
          <div className={styles.ImgSelectorItemValue}>
            <div data-tip={itm?.name} data-class={styles.ToolTipClass}>{itm?.name} {this.props.hasTooltips && <ReactTooltip />}
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
      <div onBlur={(evt) => {this.dataDropdownBlurred()}} tabIndex={1} className={styles.ImgSelectorContainer + ' ' + this.props.customClass}>
        {/*If Label should be displayed */   
        this.props.hasLabel &&
        <div className={styles.DropdownLabel}>
          {this.props.labelName}
        </div>
        }
        <div 
          onClick={(evt) => {this.toggleDataDropdown()}}
          style={{borderBottom: this.state.dataDropdownExpanded ? 'inset 2px' : 'unset'}}
          className={styles.CustomGenericListBtn + ' ' + styles.ImgSelectorItemContainer + ' ' + (this.props.hasLabel ? styles.HasLabel : '')}>
          {
            /* If Dropdown Image should be displayed */
            this.props.hasImages &&
            <div className={styles.ImgSelectorItemImg}><img src={this.state.selectedEntity?.imagePath ?? ''}/></div>
          }
          <div className={styles.ImgSelectorItemValue + ' ' + (this.props.hasImages ? styles.hasImages : '')}><div data-tip={this.state.selectedEntity?.name} data-class={styles.ToolTipClass}>
          {this.state.selectedEntity?.name} 
            {this.props.hasTooltips && <ReactTooltip />}
          </div>
          <div style={{height: '100%'}}>
            <IoMdArrowDropdown className={styles.DropdownArrow + ' ' + (this.state.dataDropdownExpanded ? styles.DropdownArrowRotate : styles.DropdownUnRotate)}/>
          </div> 
          </div> 
        </div>
        {
          this.loaded &&           
          <ul style={{'display': this.state.dataDropdownExpanded ? 'block': 'none'}} className={styles.ImgSelectorList + ' ' + (this.state.dataDropdownExpanded ? styles.ImgSelectorListExpanded : this.loaded ? styles.ImgSelectorListCollapsed : '')}>
            {this.dataListItems()}
          </ul>
        }
      </div>
    );
  }
}

export default GenericDropdown;