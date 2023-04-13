import React from 'react'
import { Grid, Container, Item, Icon }  from 'semantic-ui-react'

import imgMachine from '../images/machine.png'; 
import imgTransmission from '../images/transmission.png'; 
import imgBridgeDrv from '../images/bridge_drv.png'; 
import imgMotor from '../images/motor.png'; 
import imgBridgeCtrl from '../images/bridge_ctrl.png'; 
import imgShipment from '../images/shipment.png'; 

const  formatDate=(date)=>{
	let d=new Date(date)	
	return ("0" + d.getDate()).slice(-2) + "." 
		+ ("0"+(d.getMonth()+1)).slice(-2) + "." 
		+ d.getFullYear();
}

const ItemInfo=props=>{
    return <Item.Group>
        <Item>
            <Item.Image size='tiny' src={props.image} />
            <Item.Content>
                <Item.Meta>{props.unit}</Item.Meta>
                <Item.Header>{props.model}</Item.Header>                
                {props.number && <Item.Description>№ {props.number}</Item.Description>}
                <Item.Extra>{props.description}</Item.Extra>
            </Item.Content>
        </Item>
   </Item.Group>
}


export const MachineInfo = (props) => {  
 return <Grid columns={3} divided>
    <Grid.Column mobile={16} computer={5} tablet={8}>
        <ItemInfo image={imgMachine} unit='Машина' model={props.model.name} number={props.number} description={props.model.description}/>
    </Grid.Column>
    <Grid.Column mobile={16} computer={5} tablet={8}>
        <ItemInfo image={imgMotor} unit='Двигатель' model={props.motor.name} number={props.motor_number} description={props.motor.description}/>
    </Grid.Column>
    <Grid.Column mobile={16} computer={5} tablet={8}>
        <ItemInfo image={imgTransmission} unit='Трансмиссия' model={props.transmission.name} number={props.transmission_number} description={props.transmission.description}/>
    </Grid.Column>
    <Grid.Column mobile={16} computer={5} tablet={8}>
        <ItemInfo image={imgBridgeDrv} unit='Ведущий мост' model={props.bridge_drv.name} number={props.bridge_drv_number} description={props.bridge_drv.description}/>
    </Grid.Column>
    <Grid.Column mobile={16} computer={5} tablet={8}>
        <ItemInfo image={imgBridgeCtrl} unit='Управляемый мост' model={props.bridge_ctrl.name} number={props.bridge_ctrl_number} description={props.bridge_ctrl.description}/>
    </Grid.Column>
    <Grid.Column mobile={16} computer={5} tablet={8}>
        <ItemInfo image={imgShipment} unit='Дата отгрузки с завода' model={formatDate(props.shipment)} number={''} description={''}/>
    </Grid.Column>
 </Grid>
}

