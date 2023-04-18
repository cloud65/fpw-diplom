import React from 'react'

import useMediaQuery from "../hooks/useMediaQuery";

import {HeaderPage} from  './HeaderPage.js';
import {FooterPage} from  './FooterPage.js';

import {AnonumousPanel} from  './AnonumousPanel.js';
import {UserPanel} from  './UserPanel.js';

import {userDataRequest} from './Requests.js'

import { Container, Segment, Header, Button, Portal } from 'semantic-ui-react'

const getRight=(groups)=>{
    if (groups.indexOf('manager')!==-1) return 1
    if (groups.indexOf('serivce')!==-1) return 2
    if (groups.indexOf('client')!==-1) return 3
    return 0
}

const PHONE='+7-8352-20-12-09';
const TELEGRAM='https://t.me/'+PHONE;


const MessageBox=(props)=>{
    return <Portal onClose={props.onClose} open={!!props.message}>
    <Segment
      style={{
        left: '20%',
        position: 'fixed',
        top: '30%',
        zIndex: 1000,
      }}
    >
       <Header>{props.message}</Header>

      <Button
        content='Ok'
        color='blue'
        onClick={props.onClose}
      />
    </Segment>
  </Portal>
}



export const MainPage = () => {
   const [userData, setUser] = React.useState({})
   const [message, setMessage] = React.useState(null)
   
   const isDesktop = useMediaQuery('(min-width: 960px)');   
   const isTablet = useMediaQuery('(min-width: 600px)');
   const isMobile = useMediaQuery('(min-width: 360px)');
   const media = isDesktop ? 'desktop' : isTablet ? 'tablet' : 'mobile';
    
   React.useEffect(()=>{
      const token=sessionStorage.getItem('user'); 
      if (!token){
          setUser({name:null, token: null});
          return;
      }
      userDataRequest(token, (result, data)=> {
           if(result==200) setUser(d=>{return {...d, token:token, ...data.user, right: getRight(data.user.groups || [])}})
      });
   }, [userData.name, userData.token]);
   
   
    
  return (<React.Fragment>
    <HeaderPage phone={PHONE} telegram={TELEGRAM} userData={userData} setUser={setUser} media={media}/>
  <Container id='main-content' style={{ marginTop: 'var(--top-content)' }}>
    <Segment className='content-segment' color='blue' inverted>
        {(!userData.name) 
            ? <AnonumousPanel token={userData.token} setMessage={setMessage} media={media}/>
            : <UserPanel userData={userData} setMessage={setMessage} media={media}/>
        }
    </Segment>
  </Container>
  <FooterPage phone={PHONE} telegram={TELEGRAM}  media={media}/>
  <MessageBox message={message} onClose={()=>setMessage(null)}/> 
  </React.Fragment>)
}


