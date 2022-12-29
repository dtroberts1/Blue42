
import {Game, GameOdd, OddCard, TestOdd} from '../../interfaces/interface';
import styled from 'styled-components';
import tbIcon from '../../assets/team-icons/TBB.png';
import ssIcon from '../../assets/team-icons/SS.png';

type AllEventsOverviewOddsCardProp = {
    odd: OddCard,
    compVisibility : boolean,
    isEmpty ?: boolean,
  }
  
  const AllEventsOverviewOddsCard = styled.div`
    padding: .6em 1.4em;
    visibility: ${(props: AllEventsOverviewOddsCardProp) => (props.compVisibility ? 'visible' : 'hidden')};
    font-size: .9rem;
    border-radius: 8px;
    position: relative;
    width: 2.6em;
    height: 2.5em;
    filter: brightness(${(props: AllEventsOverviewOddsCardProp) => (props.odd.isActive ? 1.9 : 1)});
    background: ${(props) => (props.odd.isActive ? 'linear-gradient(90deg, rgba(55, 0, 179, 0.3) 0%, rgba(98, 41, 229, 0.3) 100%), rgba(255, 255, 255, 0.1) !important' : '#271b2f')};
  
    &:hover{
        cursor: pointer;
        background: blueviolet;
    }
  
    &::before{
        content: "${props => !props.isEmpty ? props.odd.header : ''}";
        position: absolute;
        top: .23em;
        left: 0;
        width: 100%;
        text-align: center;
        font-weight: 500;
  
    }
  
    &::after{
      content: "${props => !props.isEmpty ? props.odd.value : 'Add'}";
      position: absolute;
      left: 0;
      bottom: ${props => !props.isEmpty ? '.38em !important' : '35% !important'};
      width: 100%;
      text-align: center;
      font-weight: 500;
  
    }
  
  }`;
  
  export default AllEventsOverviewOddsCard;