import React from 'react'
import {HeaderPage} from  './HeaderPage.js';
import {FooterPage} from  './FooterPage.js';

import { Container, Segment } from 'semantic-ui-react'

export const MainPage = () => {
  return (<React.Fragment>
  <HeaderPage phone='+545645645' telegram='t.me'/>
  <Container id='main-content' style={{ marginTop: 'var(--top-content)' }}>
    <Segment style={{ height: 'var(--height-content)' }} color='blue' inverted>
    </Segment>
  </Container>
  <FooterPage phone='+545645645' telegram='t.me'/>
  </React.Fragment>)
}


