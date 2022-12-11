import React from 'react';
import styles from './ManageOdd.less';
import {RiEditLine} from 'react-icons/ri';
import {FcCancel} from 'react-icons/fc';
import {GiAmericanFootballBall} from 'react-icons/gi';
import {FiSave} from 'react-icons/fi';
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {IoMdPulse} from 'react-icons/io';
import Blue42Btn from '../Blue42Btn/Blue42Btn';

type Props = {
  cardMode: "add" | "update",
  headerNbr: number,
  valueNbr: number,
}

type State = {
  updatingHeader: boolean,
  updatingValue: boolean,
}

class ManageOdd extends React.Component{
  state: State;
  props: Props;
  headerRef: React.LegacyRef<HTMLInputElement> | undefined;
  valueRef: React.LegacyRef<HTMLInputElement> | undefined; 

  constructor(props : any){
    super(props);
    this.headerRef = React.createRef();
    this.state = {
      updatingHeader: false,
      updatingValue: false,
    }
    this.props = props;
    
  }

  clickedEditValue(evt: React.MouseEvent<HTMLDivElement, MouseEvent>){
    this.setState((state, props) => ({
      updatingValue: true
    }));
    setTimeout(() => {
      let valueRef = (this.valueRef as any);
      valueRef.current.focus();
    }, 200);

  }

  cancelEditValue(evt: React.MouseEvent<HTMLDivElement, MouseEvent>){
    this.setState((state, props) => ({
      updatingValue: false
    }));
  }

  valueNbrChanged(e: React.ChangeEvent<HTMLInputElement>){
    const limit = 4;
    this.setState((state, props) => ({
      valueNbr: e.target.value.slice(0, limit),
    }));
  }

  clickedEditHeader(evt: React.MouseEvent<HTMLDivElement, MouseEvent>){
    this.setState((state, props) => ({
      updatingHeader: true
    }));
    setTimeout(() => {
      let headerRef = (this.headerRef as any);
      headerRef.current.focus();
    }, 200);

  }

  cancelEditHeader(evt: React.MouseEvent<HTMLDivElement, MouseEvent>){
    this.setState((state, props) => ({
      updatingHeader: false
    }));
  }

  headerNbrChanged(e: React.ChangeEvent<HTMLInputElement>){
    const limit = 4;
    this.setState((state, props) => ({
      headerNbr: e.target.value.slice(0, limit),
    }));
  }

  closeCard(e: React.MouseEvent<HTMLDivElement, MouseEvent>){

  }

  render(): React.ReactNode {
    return (
      <div className={styles.ManageOddsBody}>
        <div style={{position:'relative'}}>
          <div onClick={(evt) => {this.closeCard(evt)}} tabIndex={1} className={styles.UpperCloseBtn}>
            <AiOutlineCloseCircle />
          </div>
          <div className={styles.ManageOddsBodyGameLabel}>Tennessee Titans vs Jacksonville Jaguars</div>
          <div style={{position: 'relative', paddingTop: '0.3em', paddingLeft: '2.3em'}}>
            <div className={styles.CardOddHeader}>
              <div>
                Over&nbsp;
                {!this.state.updatingHeader && this.props.cardMode === 'update' && <React.Fragment><span>{this.props.headerNbr}</span></React.Fragment>} 
                {(this.state.updatingHeader || this.props.cardMode === 'add') && <React.Fragment>
                  <span>
                    <input 
                    type="number"
                    ref={this.headerRef}
                    name="headerNbr"
                    value={this.props.headerNbr}
                    onChange={(e) => {this.headerNbrChanged(e)}}
                    style={{width: '5ch', borderRadius: '8px', color: 'white', background: '#614F5D', fontSize: '1.03rem', textAlign: 'center'}} 
                    maxLength={5}>
                    </input>
                  </span>
                </React.Fragment>}
              </div>
              {this.props.cardMode === "update" &&
                <React.Fragment>
                  {
                    this.state.updatingHeader &&
                    <React.Fragment>
                      <div onClick={(evt => {this.cancelEditHeader(evt)})} style={{marginLeft: '0.35em'}} tabIndex={1} className={styles.CardOddHeaderBtn}>
                        <FiSave />
                      </div>
                      <div onClick={(evt => {this.cancelEditHeader(evt)})} style={{marginLeft: '0.35em'}} tabIndex={1} className={styles.CardOddHeaderBtn}>
                        <FcCancel />
                      </div>
                    </React.Fragment>
                  }
                  {
                    !this.state.updatingHeader &&
                    <React.Fragment>
                      <div onClick={(evt => {this.clickedEditHeader(evt)})} tabIndex={1} style={{marginLeft: '0.85em'}}  className={styles.CardOddHeaderBtn}>
                        <RiEditLine />
                      </div>
                    </React.Fragment>
                  }
                </React.Fragment>
              }
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
                {!this.state.updatingValue && this.props.cardMode === 'update' && <React.Fragment><span>{this.props.valueNbr}</span></React.Fragment>} 
                {(this.state.updatingValue || this.props.cardMode === 'add') && <React.Fragment>
                  <span>
                    <input 
                    type="number"
                    ref={this.valueRef}
                    name="valueNbr"
                    value={this.props.valueNbr}
                    onChange={(e) => {this.valueNbrChanged(e)}}
                    style={{width: '5ch', borderRadius: '8px', color: 'white', background: '#614F5D', fontSize: '1.03rem', textAlign: 'center'}} 
                    maxLength={5}>
                    </input>
                  </span>
                </React.Fragment>}
              </div>
              {
                this.props.cardMode === 'update' && 
                <React.Fragment>
                  {
                    this.state.updatingValue && 
                    <React.Fragment>
                      <div onClick={(evt => {this.cancelEditValue(evt)})} style={{marginLeft: '0.35em'}} tabIndex={1} className={styles.CardOddHeaderBtn}>
                        <FiSave />
                      </div>
                      <div onClick={(evt => {this.cancelEditValue(evt)})} style={{marginLeft: '0.35em'}} tabIndex={1} className={styles.CardOddHeaderBtn}>
                        <FcCancel />
                      </div>
                    </React.Fragment>
                  }
                  {
                    !this.state.updatingValue && 
                    <React.Fragment>
                      <div onClick={(evt => {this.clickedEditValue(evt)})} style={{marginLeft: '0.85em'}} tabIndex={1} className={styles.CardOddHeaderBtn}>
                        <RiEditLine />
                      </div>
                    </React.Fragment>
                  }
                </React.Fragment>
              }
            </div>
          </div>
          <div style={{display: 'flex', justifyContent:'center', transform: 'scale(.8)'}}>
            <div style={{marginTop: '1em'}}>
              <Blue42Btn onClick={(event) => {}} btnText={'Create'} />
            </div>
          </div>
        </div>
      </div>
    );
  }

}(
  <div className="ManageOdd">
    ManageOdd Component
  </div>
);
export default ManageOdd;

