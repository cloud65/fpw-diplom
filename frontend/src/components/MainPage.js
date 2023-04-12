import React from 'react'
import {HeaderPage} from  './HeaderPage.js';
import {FooterPage} from  './FooterPage.js';

import {AnonumousPanel} from  './AnonumousPanel.js';

import {userDataRequest} from './Requests.js'

import { Container, Segment } from 'semantic-ui-react'




export const MainPage = () => {
   const [userData, setUser] = React.useState({})
    
   React.useEffect(()=>{
      const token=sessionStorage.getItem('user'); 
      if (!token){
          setUser({name:null, token: null});
          return;
      }
      userDataRequest(token, (result, data)=> {
           if(result==200) setUser(d=>{return {...d, token:token, ...data.user}})
      });
   }, [userData.name, userData.token]);
   
   
    
  return (<React.Fragment>
    <HeaderPage phone='+545645645' telegram='t.me' userData={userData} setUser={setUser}/>
  <Container id='main-content' style={{ marginTop: 'var(--top-content)' }}>
    <Segment className='content-segment' color='blue' inverted>
        {!userData.name && <AnonumousPanel token={userData.token}/>}
    
    </Segment>
  </Container>
  <FooterPage phone='+545645645' telegram='t.me'/>
  </React.Fragment>)
}


