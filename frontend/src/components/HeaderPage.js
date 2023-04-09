import React from 'react'
import { Menu, Container, Image, Header, Icon} from 'semantic-ui-react'

export const HeaderPage = (props) => {    
  const {phone, telegram} = props
  return <React.Fragment>
    <Menu fixed='top' color='blue' inverted size='huge' icon style={{display:'block'}} id='header-content'>
      <Container>      
        <Image size='tiny' src='/logo_red.png' style={{ position: 'fixed', marginTop: '1.5em' }} />
        <Menu.Item as='a' position='right' href={'tel:'+phone}><Icon name='phone'/>&nbsp;{phone}</Menu.Item> 
        <Menu.Item as='a' position='right'><Icon name='telegram'/>&nbsp;{telegram}</Menu.Item> 
        <Menu.Item as='a' position='right'><Icon name='sign-in'/>&nbsp;Авторизация</Menu.Item>
      </Container>
      <Container> 
        <Header as='h3' color='olive' style={{ margin: 'auto'}}>
            Электронная сервисная книжка "Мой Силант"
        </Header>
      </Container>
    </Menu>
    
    </React.Fragment>
}

