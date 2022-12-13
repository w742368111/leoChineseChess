import * as React from 'react'
import * as Redux from 'redux'
import {Button} from 'antd'
import {style} from 'typestyle'
import {startClickAction, changeSideAction, toggleAIAction, clearChessAction, showHintAction, regretMoveAction} from '../../models/buttonClick'
import StartModel from './StartModel'

interface ButtonGroupProps {
  mode: number  
  side: number  
  showModel: boolean   
  history: string[][][]
  dispatch: Redux.Dispatch<any>
}

 
export default class ButtonGroup extends React.Component<ButtonGroupProps, any> {

  renderThirdButton() {
    const ButtonStyle = style({
      margin: '0 15px'
    })
    const TestStyle = style({
      margin: '0 15px',
      display:'none'
    })
    if (this.props.mode == 2) {
       
      return <Button size='large' onClick={()=>{this.props.dispatch(toggleAIAction())}} className={TestStyle} disabled={(this.props.side==0)}>{Math.abs(this.props.side)==2?'Start':'Pause'}</Button>
    } else {
      return <Button size='large' className={TestStyle} disabled={this.props.side==0||this.props.history.length==1} onClick={()=>{this.props.dispatch(regretMoveAction())}}>Retract</Button>
    }
  }

  render() {
    const ButtonStyle = style({
      display: 'block',
      margin: '0 auto',
      height: '40px',
      width: '110px',
      fontSize:'15px',
    })
    const TestStyle = style({
      margin: '0 15px',
      display:'none'
    })
    return (
      <div>
        <div style={{height:'100%', width:'100%'}}>
          <Button type='primary' size='large' className={ButtonStyle} disabled={(this.props.mode==2)&&(Math.abs(this.props.side)==1)} onClick={()=>{this.props.dispatch(startClickAction())}}>Game Start</Button>
          <Button size='large' className={TestStyle} disabled={(this.props.mode==2)||(this.props.side==0)} onClick={()=>{this.props.dispatch(showHintAction())}}>Hint</Button>
          {this.renderThirdButton()}
          <Button size='large' className={TestStyle} disabled={(this.props.side==0)||(this.props.mode==2)&&(Math.abs(this.props.side)==1)} onClick={()=>{this.props.dispatch(changeSideAction())}}>Exchange</Button>
          <Button size='large' className={TestStyle} disabled={(this.props.side==0)||(this.props.mode==2)} onClick={()=>{this.props.dispatch(clearChessAction())}}>Handicap</Button>
        </div>
        <StartModel visible={this.props.showModel} dispatch={this.props.dispatch} />
      </div>
    )
  }
}
