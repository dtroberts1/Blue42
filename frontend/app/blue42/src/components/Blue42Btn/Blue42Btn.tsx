import React, { MouseEventHandler } from 'react';
import styles from './Blue42Btn.less';

type Props = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void,
  btnText: string,
  isSecondary ?: boolean,
  className ?: string
}

class Blue42Btn extends React.Component{
  props: Props;
  constructor(props: Props){
    super(props);
    this.props = props;
  }

  clickedBtn(event : React.MouseEvent<HTMLElement>){
    this.props.onClick(event);
  }

  render(){
    return (
      <div tabIndex={1} onClick={(event: React.MouseEvent<HTMLElement>) => {this.clickedBtn(event)}} className={styles.ActionBtn + (this.props.isSecondary ? ' ' + styles.SectionaryBtn : '') + (this.props.className ? ' ' + this.props.className : '')}>
        {this.props.btnText}
      </div>
    );
  }
}

export default Blue42Btn;
