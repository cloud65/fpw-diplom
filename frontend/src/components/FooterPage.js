import React from 'react'
import { Menu, Container, Image, Icon }  from 'semantic-ui-react'

export const FooterPage = (props) => {
    const {phone, telegram} = props
 return <Menu fixed='bottom' inverted color='blue'>
      <Container>        
        <Menu.Item as='a' position='right' href={'tel:'+phone}><Icon name='phone'/>&nbsp;{phone}</Menu.Item> 
        <Menu.Item as='a' position='right'><Icon name='telegram'/>&nbsp;{telegram}</Menu.Item>               
        <Menu.Item as='span' position='right' header>
            Мой Силант 2023
            &nbsp;<Image size='mini' src='/logo_white.png' style={{ marginRight: '1.5em' }} />            
        </Menu.Item>               
      </Container>
      
    </Menu>
}

