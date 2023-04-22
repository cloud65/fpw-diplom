import React from 'react'
import { Header, Input, Button, Icon, Segment, Image }  from 'semantic-ui-react'
import {machineCheckRequest} from './Requests.js'
import {MachineForm} from  './MachineForm.js';
import logoRed from '../images/logotype-red.png'; 


export const AnonumousPanel = (props) => {
  const inputRef = React.useRef()
  const [number, setNumber] = React.useState("")
  const [info, setInfo] = React.useState(null)
  
  React.useEffect(()=>{
      inputRef.current.focus()
      //setNumber('0045');
  }, [])
   
  const findDetail=()=>{
      console.log(number)
      machineCheckRequest(number, props.token, (result, data)=> {
          if (result!==200){
              props.setMessage('По вашему запросу ничего не найдено!')
              setInfo(null);
          }
          setInfo(data.data);
      });
  }
   
 return <>
    <Header color='olive' size='medium'>Проверьте комплектацию и технические характеристики техники Силант</Header>    
    <Input ref={inputRef} fluid
         icon='search' iconPosition='left'
         action={{
          color: 'red',
          labelPosition: 'right',
          icon: 'search',
          content: 'Найти',
          onClick: findDetail
        }}
        placeholder='Укажите заводской номер вашей техники'
        onChange={(ev, {value})=>setNumber(value)} value={number}/>
    <Segment color='olive' inverted>
        <Header size='small' color='blue' textAlign='center'>
            <Icon name='settings'/>
            <Header.Content>Информация о комплектации и технических характеристиках Вашей техники</Header.Content>
        </Header>
    </Segment>
    <Header size='tiny' color='olive' content='Результат поиска:' style={{margin:0}}/>
    <Segment color='olive' inverted className='conetnt-fill-segment'>
    {info && <div><MachineForm data={info}  media={props.media}/></div>}
    {!info && <Image src={logoRed} className='find-logo'/>}
    </Segment>
 </>
}

