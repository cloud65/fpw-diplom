import React from 'react'
import { Grid, Container, Item, Icon }  from 'semantic-ui-react'

import imgMachine from '../images/machine.png'; 
import imgTransmission from '../images/transmission.png'; 
import imgBridgeDrv from '../images/bridge_drv.png'; 
import imgMotor from '../images/motor.png'; 
import imgBridgeCtrl from '../images/bridge_ctrl.png'; 
import imgShipment from '../images/shipment.png'; 
import imgContract from '../images/contract.png'; 
import imgAddress from '../images/address.png'; 
import imgClient from '../images/client.png'; 
import imgService from '../images/service.png'; 
import imgConsignee from '../images/consignee.png'; 
import imgEquipment from '../images/equipment.png'; 



import {formatDate} from './Funcs.js'

const ItemInfo=props=>{
    return <Item.Group unstackable>
        <Item>
            <Item.Image size={props.media==='desktop' ? 'tiny': 'mini'} src={props.image} />
            <Item.Content>
                <Item.Meta>{props.unit}</Item.Meta>
                {props.model && <Item.Header>{props.model}</Item.Header>}
                {props.number && <Item.Description>{props.number}</Item.Description>}
                <Item.Extra>{props.description}</Item.Extra>
            </Item.Content>
        </Item>
   </Item.Group>
}


export const MachineInfo = (props) => {

 return <Grid columns={3} divided>
    <Grid.Column mobile={16} computer={5} tablet={8}>
        <ItemInfo media={props.media} image={imgMachine} unit='Модель' model={props.model.name} number={"№ "+props.number} description={props.model.description}/>
    </Grid.Column>
    <Grid.Column mobile={16} computer={5} tablet={8}>
        <ItemInfo media={props.media} image={imgMotor} unit='Двигатель' model={props.motor.name} number={"№ "+props.motor_number} description={props.motor.description}/>
    </Grid.Column>
    <Grid.Column mobile={16} computer={5} tablet={8}>
        <ItemInfo media={props.media} image={imgTransmission} unit='Трансмиссия' model={props.transmission.name} number={"№ "+props.transmission_number} description={props.transmission.description}/>
    </Grid.Column>
    <Grid.Column mobile={16} computer={5} tablet={8}>
        <ItemInfo media={props.media} image={imgBridgeDrv} unit='Ведущий мост' model={props.bridge_drv.name} number={"№ "+props.bridge_drv_number} description={props.bridge_drv.description}/>
    </Grid.Column>
    <Grid.Column mobile={16} computer={5} tablet={8}>
        <ItemInfo media={props.media} image={imgBridgeCtrl} unit='Управляемый мост' model={props.bridge_ctrl.name} number={"№ "+props.bridge_ctrl_number} description={props.bridge_ctrl.description}/>
    </Grid.Column>
    {props.auth && <React.Fragment>
        <Grid.Column mobile={16} computer={5} tablet={8}>
            <ItemInfo media={props.media} image={imgShipment} unit='Дата отгрузки с завода' model={formatDate(props.shipment)} number={''} description={''}/>
        </Grid.Column>
        <Grid.Column mobile={16} computer={5} tablet={8}>
            <ItemInfo media={props.media} image={imgContract} unit='Договор поставки' model={props.contract} number={''} description={'Номер и дата'}/>
        </Grid.Column>
        <Grid.Column mobile={16} computer={5} tablet={8}>
            <ItemInfo media={props.media} image={imgConsignee} unit='Грузополучатель' model={''} number={props.consignee} description={'конечный потребитель'}/>
        </Grid.Column>
        <Grid.Column mobile={16} computer={5} tablet={8}>
            <ItemInfo media={props.media} image={imgAddress} unit='Адрес поставки' model={''} number={props.address} description={''}/>
        </Grid.Column>
        
        <Grid.Column mobile={16} computer={5} tablet={8}>
            <ItemInfo media={props.media} image={imgClient} unit='Клиент' model={props.client && props.client.profile.organization_name} description={''}/>
        </Grid.Column>
        
        <Grid.Column mobile={16} computer={5} tablet={8}>
            <ItemInfo media={props.media} image={imgService} unit='Сервисная компания' model={props.service && props.service.profile.organization_name} description={''}/>
        </Grid.Column>
        
        <Grid.Column mobile={16} computer={5} tablet={8}>
            <ItemInfo media={props.media} image={imgEquipment} unit='Комплектация' model={''} 
                number={props.equipment.split(/\r?\n/).map((e,i)=><p key={i}>{e}</p>)} 
                description={''}/>
        </Grid.Column>
        
    </React.Fragment>}
 </Grid>
}

