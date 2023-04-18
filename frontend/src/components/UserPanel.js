import React from 'react'
import { Header, Input, Button, Icon, Segment, Image, Tab }  from 'semantic-ui-react'
import {refereceRequest} from './Requests.js'
import {MachineInfo} from  './MachineInfo.js';
import {MachineTable} from  './MachineTable.js';


 

const rightText=["Не авторизован", "Менеджер", "Сервисная компания", "Клиент"]
const rightIcon=["user secret", "address book", "users", "user"]

export const UserPanel = (props) => {
  const [number, setNumber] = React.useState("")
  const [references, setReferences] = React.useState({})
  const [info, setInfo] = React.useState(null)
  
  React.useEffect(()=>{
        refereceRequest(props.userData.token, (result, data)=> {
          if (result!==200) {
              props.setMessage('Нет данных справочников (код '+result+')')
              return
          } 
          setReferences(data.data)
      })
  }, [])
   
   const panes = [
  {
    menuItem: 'Машины',
    render: () => <Tab.Pane as='div'><MachineTable {...props} references={references}/></Tab.Pane>,
  },
  {
    menuItem: 'ТО',
    render: () => <Tab.Pane as='div'><MachineTable {...props} references={references}/></Tab.Pane>,
  },
  {
    menuItem: 'Рекламации',
    render: () => <Tab.Pane as='div'><MachineTable {...props} references={references}/></Tab.Pane>,
  },
]
   
 return <>
    <Segment color='olive' inverted>
        <Header size='medium' color='blue' textAlign='center'>
            <Icon name={rightIcon[props.userData.right]}/>
            <Header.Content><i>{rightText[props.userData.right]}:</i> {props.userData.organization_name || props.userData.username}</Header.Content>
        </Header>
    </Segment>  
    <Segment color='olive' inverted style={{marginTop: 0}}>
        <Header size='small' color='blue' textAlign='center'>
            <Icon name='settings'/>
            <Header.Content>Информация о комплектации и технических характеристиках Вашей техники</Header.Content>
        </Header>
    </Segment>
    <Segment color='olive' inverted className='conetnt-fill-segment' style={{padding:0}}>
        <Tab menu={{ secondary: true, pointing: true, color:'blue', attached:true  }} panes={panes} />        
    </Segment>
 </>
}

