import React from 'react'
import { Menu, Container, Image, Header, Icon, Modal, Button, Form} from 'semantic-ui-react'

import {loginRequest} from './Requests.js'

const LoginWin = (props)=>{
    const [data, setData] = React.useState({login:'', password:''})
    
    const auth=()=>{
        loginRequest(data, (result)=>{
            console.log(result)
        })
    }
    
    
    
    return <Modal
      closeIcon
      open={props.open}
      trigger={<Button>Show Modal</Button>}
      onClose={() => props.setOpen(false)}
      onOpen={() => props.setOpen(true)}
      size='mini'
    >   
      <Header icon='user' content='Авторизация' />
      <Modal.Content>
        <Form>
          <Form.Input value={data.login} onChange={(ev,{value})=>setData({...data, login:value})} 
                fluid icon='user' iconPosition='left' placeholder='Логин'/>
          <Form.Input value={data.password} onChange={(ev,{value})=>setData({...data, password:value})} 
            fluid icon='lock'  iconPosition='left'  placeholder='Пароль' type='password' />
        </Form>
        </Modal.Content>      
      <Modal.Actions>
        <Button onClick={() => props.setOpen(false)}>
          <Icon name='cancel' /> Отмена
        </Button>
        <Button type='submit' color='blue' onClick={auth}>
          <Icon name='checkmark' /> Вход
        </Button>
      </Modal.Actions>
      
    </Modal>
}



export const HeaderPage = (props) => {
  const [showLogin, setShowLogin] = React.useState(false)
    
  const {phone, telegram, userData} = props
  
  
  return <React.Fragment>
    <Menu fixed='top' color='blue' inverted size='huge' icon style={{display:'block'}} id='header-content'>
      <Container>      
        <Image size='tiny' src='/logo_red.png' style={{ position: 'fixed', marginTop: '1.5em' }} />
        <Menu.Item as='a' position='right' href={'tel:'+phone}><Icon name='phone'/>&nbsp;{phone}</Menu.Item> 
        <Menu.Item as='a' position='right'><Icon name='telegram'/>&nbsp;{telegram}</Menu.Item> 
        <Menu.Item as='a' position='right' onClick={()=>setShowLogin(true)}><Icon name='sign-in'/>&nbsp;Авторизация</Menu.Item>
      </Container>
      <Container> 
        <Header as='h3' color='olive' style={{ margin: 'auto'}}>
            Электронная сервисная книжка "Мой Силант"
        </Header>
      </Container>
    </Menu>
    <LoginWin open={showLogin} setOpen={setShowLogin}/>
    </React.Fragment>
}

