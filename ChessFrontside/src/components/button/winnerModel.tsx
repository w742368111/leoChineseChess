import * as React from 'react'
import * as Redux from 'redux'
import {Modal, Button} from 'antd'
import {startClickAction, onGameOverAction} from '../../models/buttonClick'

interface WinnerModelProps {
  mode: number  
  color: string  
  winner: number   
  dispatch: Redux.Dispatch<any>
}

 
export default class WinnerModel extends React.Component<WinnerModelProps, any> {

  renderText() {
    if (this.props.mode == 1) {
      return this.props.winner==1?'Congratulations,you win,play one more time?':'Sorry,you lose,play one more time?'
    } else {
      let result:string 
      if (this.props.winner==1) { 
        result = this.props.color=='r'?'Red':'Black'  
      } else if (this.props.winner==-1) {
        result = this.props.color=='r'?'Black':'Red'  
      } 
      return `Games Result： ${result} Win !`
    }
  }

  render() {
    return (
      <Modal
        title={<h2><strong>Game Result</strong></h2>}
        visible={Math.abs(this.props.winner)==1}
        onCancel={()=>{this.props.dispatch(onGameOverAction())}}
        footer={[
          <Button key='1' size="large" onClick={()=>{this.props.dispatch(startClickAction())}}>Restart</Button>,
          <Button key='2' type="primary" size="large" onClick={()=>{this.props.dispatch(onGameOverAction())}}>
            Confirm
          </Button>,
        ]}
      >
        {this.renderText()}
      </Modal>
    )
  }
}
