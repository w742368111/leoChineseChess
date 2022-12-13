import * as React from 'react'
import * as Redux from 'redux'
import {Modal, Radio} from 'antd'
import {style} from 'typestyle'
import {onModelOKAction, onModelCancelAction} from '../../models/buttonClick'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

interface StartModelProps {
  visible: boolean
  dispatch: Redux.Dispatch<any>
}

 
export interface gameOptions { 
  mode: number  
  difficulty: number 
  side: number   
  color: string  
}

 
export default class StartModel extends React.Component<StartModelProps, any> {
   
  options:gameOptions = {mode:3, difficulty:3, side:-1, color:'b'}

  constructor(props) {
    super(props)
    this.state={confirmLoading:false}  
  }

  handleOKButton() {
    this.setState({confirmLoading:true})
    setTimeout(()=>{
      this.setState({confirmLoading:false})
      this.props.dispatch(onModelOKAction(this.options))
    },1000)
  }

  render() {
    const ButtonStyle = style({
      margin: '0 15px'
    })
    
    const RadioButtonStyle = {
      margin: '0 15px'
    }

    const noneDisplay = {
      margin: '0 15px',
      display:"none"
    }
    return (
      <Modal
        title={<h2><strong>Game Options</strong></h2>}
        visible={this.props.visible}
        onOk={()=>{this.handleOKButton()}}
        onCancel={()=>{this.props.dispatch(onModelCancelAction())}}
        confirmLoading={this.state.confirmLoading}
        okText={"Confirm"}
        cancelText={"Cancle"}
      >
        <div style={{fontSize:16}}>
          Battle Mode:
          <RadioGroup onChange={(e)=>{this.options.mode= (e as any).target.value}} defaultValue={3} size='large'>
            <RadioButton value={3} style={RadioButtonStyle}>Player VS Player</RadioButton>
            <RadioButton value={1} style={RadioButtonStyle}>Player VS Machine</RadioButton>
            {/* <RadioButton value={2} style={RadioButtonStyle}>Machine vs Machine</RadioButton> */}
          </RadioGroup>
        </div>
        <div style={{fontSize:16,marginTop:16}}>
          Games Difficulty:
          <RadioGroup onChange={(e)=>{this.options.difficulty= (e as any).target.value}} defaultValue={3} size='large'>
            <RadioButton value={2} style={RadioButtonStyle}>Easy</RadioButton>
            <RadioButton value={3} style={RadioButtonStyle}>Normal</RadioButton>
            <RadioButton value={4} style={RadioButtonStyle}>Hard</RadioButton>
          </RadioGroup>
        </div>
        <div style={{fontSize:16,marginTop:16}}>
          Who Goes First:
          <RadioGroup onChange={(e)=>{this.options.side= (e as any).target.value}} defaultValue={-1} size='large'>
            <RadioButton value={-1} style={RadioButtonStyle}>Black</RadioButton>
            <RadioButton value={1} style={RadioButtonStyle}>Red</RadioButton>
          </RadioGroup>
        </div>
        <div style={{fontSize:16,marginTop:16}}>
          Choose My Color:
          <RadioGroup onChange={(e)=>{this.options.color= (e as any).target.value}} defaultValue={'b'} size='large'>
            <RadioButton value={'b'} style={RadioButtonStyle}>Black</RadioButton>
            <RadioButton value={'r'} style={RadioButtonStyle}>Red</RadioButton>
          </RadioGroup>
        </div>
      </Modal>
    )
  }
}
