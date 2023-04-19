import React from 'react'
import { Menu, Container, Image, Header, Icon, Modal, Button, Form, Message} from 'semantic-ui-react'

import {loginRequest, logoutRequest} from './Requests.js'

const LoginWin = (props)=>{
    const [data, setData] = React.useState({login:'', password:''});
    const [message, setMessage] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    
    const auth=(result, data)=>{
        setLoading(false)
        if (result!==200){
            const msg = (data.non_field_errors && data.non_field_errors.join(';')) || String(data)
            setMessage(msg)
            return
        }
        setMessage(null);
        props.setUser(d=>{return {...d, token: data.token}});
        sessionStorage.setItem('user', data.token);
        props.setOpen(false)
    }
    
    
    
    return <Modal      
      open={props.open}
      trigger={<Button>Show Modal</Button>}
      onClose={() => props.setOpen(false)}
      onOpen={() => props.setOpen(true)}
      size='mini'
    >   
      <Header icon='user' content='Авторизация' />
      <Modal.Content>
        <Form loading={loading}>
          <Form.Input value={data.login} onChange={(ev,{value})=>setData({...data, login:value})} 
                fluid icon='user' iconPosition='left' placeholder='Логин'/>
          <Form.Input value={data.password} onChange={(ev,{value})=>setData({...data, password:value})} 
            fluid icon='lock'  iconPosition='left'  placeholder='Пароль' type='password' />
        </Form>
        {message && <Message error content={message}/>}
        </Modal.Content>      
      <Modal.Actions>
        <Button onClick={() => props.setOpen(false)}>
          <Icon name='cancel' /> Отмена
        </Button>
        <Button type='submit' color='blue' disabled={loading} onClick={()=>{setLoading(true); loginRequest(data, auth);}}>
          <Icon name='checkmark' /> Вход
        </Button>
      </Modal.Actions>
      
    </Modal>
}



export const HeaderPage = (props) => {
  const [showLogin, setShowLogin] = React.useState(false);
    
  const {phone, telegram, userData} = props;
  const isMobile=props.media==='mobile';
   
  const logout=()=>{
      logoutRequest(userData.token, ()=>{
          props.setUser({});
          sessionStorage.setItem('user', null);
      });
  }
  
  
  return <React.Fragment>
    <Menu fixed='top' color='blue' inverted size='huge' icon style={{display:'block'}} id='header-content'>
      <Container>      
        <Image size='tiny' src='/logo_red.png' style={{ position: 'fixed', marginTop: '1.5em' }} />
        <Menu.Item as='a' position='right' href={'tel:'+phone}><Icon name='phone'/>&nbsp;{!isMobile ? phone : ''}</Menu.Item> 
        <Menu.Item as='a' position='right' href={telegram}><Icon name='telegram'/>&nbsp;{!isMobile ? 'telegram' : ''}</Menu.Item> 
        { !props.userData.name && <Menu.Item as='a' position='right' onClick={()=>setShowLogin(true)}><Icon name='sign-in'/>&nbsp;{!isMobile ? 'Авторизация' : ''}</Menu.Item>}
        { props.userData.name && <Menu.Item as='a' position='right' onClick={logout}><Icon name='sign-out'/>&nbsp;{!isMobile ? 'Выход' : ''}</Menu.Item>}
      </Container>
      <Container> 
        <Header size={isMobile ? 'tiny' : 'small'} color='olive' style={{ margin: 'auto'}} textAlign='center'>
            Электронная сервисная книжка "Мой Силант"
        </Header>
      </Container>
    </Menu>
    <LoginWin open={showLogin} setOpen={setShowLogin} setUser={props.setUser}/>
    </React.Fragment>
}

