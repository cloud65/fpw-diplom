import React from 'react'
import { Grid, Container, Item, Icon, Form, Button }  from 'semantic-ui-react'

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
            <Item.Image size={props.media==='desktop' ? 'mini' : 'tiny'} src={props.image} />
            <Item.Content>
                <Item.Meta>{props.unit}</Item.Meta>
                {props.model && <Item.Header>{props.model}</Item.Header>}
                {props.number && <Item.Description>{props.number}</Item.Description>}
                <Item.Extra>{props.description}</Item.Extra>
            </Item.Content>
        </Item>
   </Item.Group>
}

const MachineView = (props) => {
 const { data } = props
 return <Grid columns={3} divided>
    <Grid.Column mobile={16} computer={5} tablet={8}>
        <ItemInfo media={data.media} image={imgMachine} unit='Модель' model={data.model.name} number={"№ "+data.number} description={data.model.description}/>
    </Grid.Column>
    <Grid.Column mobile={16} computer={5} tablet={8}>
        <ItemInfo media={data.media} image={imgMotor} unit='Двигатель' model={data.motor.name} number={"№ "+data.motor_number} description={data.motor.description}/>
    </Grid.Column>
    <Grid.Column mobile={16} computer={5} tablet={8}>
        <ItemInfo media={data.media} image={imgTransmission} unit='Трансмиссия' model={data.transmission.name} number={"№ "+data.transmission_number} description={data.transmission.description}/>
    </Grid.Column>
    <Grid.Column mobile={16} computer={5} tablet={8}>
        <ItemInfo media={data.media} image={imgBridgeDrv} unit='Ведущий мост' model={data.bridge_drv.name} number={"№ "+data.bridge_drv_number} description={data.bridge_drv.description}/>
    </Grid.Column>
    <Grid.Column mobile={16} computer={5} tablet={8}>
        <ItemInfo media={data.media} image={imgBridgeCtrl} unit='Управляемый мост' model={data.bridge_ctrl.name} number={"№ "+data.bridge_ctrl_number} description={data.bridge_ctrl.description}/>
    </Grid.Column>
    {props.right && <React.Fragment>
        <Grid.Column mobile={16} computer={5} tablet={8}>
            <ItemInfo media={data.media} image={imgShipment} unit='Дата отгрузки с завода' model={formatDate(data.shipment)} number={''} description={''}/>
        </Grid.Column>
        <Grid.Column mobile={16} computer={5} tablet={8}>
            <ItemInfo media={data.media} image={imgContract} unit='Договор поставки' model={data.contract} number={''} description={'Номер и дата'}/>
        </Grid.Column>
        <Grid.Column mobile={16} computer={5} tablet={8}>
            <ItemInfo media={data.media} image={imgConsignee} unit='Грузополучатель' model={''} number={data.consignee} description={'конечный потребитель'}/>
        </Grid.Column>
        <Grid.Column mobile={16} computer={5} tablet={8}>
            <ItemInfo media={data.media} image={imgAddress} unit='Адрес поставки' model={''} number={data.address} description={''}/>
        </Grid.Column>
        
        <Grid.Column mobile={16} computer={5} tablet={8}>
            <ItemInfo media={data.media} image={imgClient} unit='Клиент' model={data.client && data.client.profile.organization_name} description={''}/>
        </Grid.Column>
        
        <Grid.Column mobile={16} computer={5} tablet={8}>
            <ItemInfo media={data.media} image={imgService} unit='Сервисная компания' model={data.service && data.service.profile.organization_name} description={''}/>
        </Grid.Column>
        
        <Grid.Column mobile={16} computer={5} tablet={8}>
            <ItemInfo media={data.media} image={imgEquipment} unit='Комплектация' model={''} 
                number={data.equipment.split(/\r?\n/).map((e,i)=><p key={i}>{e}</p>)} 
                description={''}/>
        </Grid.Column>
        
    </React.Fragment>}
 </Grid>
}

const MachineEdit=(props)=>{
    const [data, setData] = React.useState({})
    
    const models = props.references.model.map(e=> {return {key:e.guid, value:e.guid, text:e.name}})
    const motors = props.references.motor.map(e=> {return {key:e.guid, value:e.guid, text:e.name}})
    const transmissions = props.references.transmission.map(e=> {return {key:e.guid, value:e.guid, text:e.name}})
    const bridge_drvs = props.references.bridge_drv.map(e=> {return {key:e.guid, value:e.guid, text:e.name}})
    const bridge_ctrls = props.references.bridge_ctrl.map(e=> {return {key:e.guid, value:e.guid, text:e.name}})
    const clients = props.references.client.map(e=> {return {key:e.user, value:e.user, text:e.organization_name}})
    const services = props.references.service.map(e=> {return {key:e.user, value:e.user, text:e.organization_name}})
    
    React.useEffect(()=>{
        console.log(props.data)
        if (!props.data.guid) {
            setData({guid:null})
            return
        }
        const editData={}
        Object.keys(props.data).forEach(key=>{
            editData[key] = props.data[key];
            if (typeof(props.data[key])==='object') editData[key] = props.data[key].guid || props.data[key].id;           
        })
        setData(editData)
    }, [props.data.guid])
    
    const handleChange=(ev, {name, value})=>setData(d=>{return {...d, [name]:value }})


    return <Form style={{padding: '0.4em'}}>
        <Form.Group widths='equal' >
            <Form.Select label='Модель техники' name='model' value={data.model||''} onChange={handleChange} options={models}/>
            <Form.Input label='Зав. № машины' name='number' value={data.number||''} onChange={handleChange}/>
        </Form.Group>
        <Form.Group widths='equal' >
            <Form.Select label='Модель двигателя' name='motor' value={data.motor||''} onChange={handleChange} options={motors}/>
            <Form.Input label='Зав. № двигателя' name='motor_number' value={data.motor_number||''} onChange={handleChange}/>
        </Form.Group>
        <Form.Group widths='equal' >
            <Form.Select label='Модель трансмиссии' name='transmission' value={data.transmission||''} onChange={handleChange} options={transmissions}/>
            <Form.Input label='Зав. № трансмиссии' name='transmission_number' value={data.transmission_number||''} onChange={handleChange}/>
        </Form.Group>
        <Form.Group widths='equal' >
            <Form.Select label='Модель ведущего моста' name='bridge_drv' value={data.bridge_drv||''} onChange={handleChange} options={bridge_drvs}/>
            <Form.Input label='Зав. № ведущего моста' name='bridge_drv_number' value={data.bridge_drv_number||''} onChange={handleChange}/>
        </Form.Group>
        <Form.Group widths='equal' >
            <Form.Select label='Модель управляемого моста' name='bridge_ctrl' value={data.bridge_ctrl||''} onChange={handleChange} options={bridge_ctrls}/>
            <Form.Input label='Зав. № управляемого моста' name='bridge_ctrl_number' value={data.bridge_ctrl_number||''} onChange={handleChange}/>
        </Form.Group>
        <Form.Group widths='equal' >
            <Form.Input label='Договор поставки №, дата' name='contract' value={data.contract||''} onChange={handleChange}/>
            <Form.Input type='date' label='Дата отгрузки с завода' name='shipment' value={data.shipment||''} onChange={handleChange}/>
            <Form.Input label='Грузополучатель (конечный потребитель)' name='consignee' value={data.consignee||''} onChange={handleChange}/>
        </Form.Group>
        <Form.Group widths='equal' >
            <Form.TextArea label='Адрес поставки (эксплуатации)' name='address' value={data.address||''} onChange={handleChange}/>
            <Form.TextArea label='Комплектация (доп. опции)' name='equipment' value={data.equipment||''} onChange={handleChange}/>
        </Form.Group>
        <Form.Group widths='equal' >            
            <Form.Select label='Сервисная компания' name='service' value={data.service||''} onChange={handleChange}  options={services} search/>
            <Form.Select label='Клиент' name='client' value={data.client||''} onChange={handleChange} options={clients} search/>
        </Form.Group>
    </Form>
}


export const MachineForm = (props) => {
    if (props.edit){
        return (<>
        <Button onClick={props.onClose} icon color='blue' basic>
            <Icon name='cancel'/>Отмена
        </Button>
        {props.right===1 && <Button basic icon color='blue' onClick={()=>props.setEdit(false)}>
             <Icon name='save' color='red'/>Записать        
        </Button>}
        <div>
            <MachineEdit {...props}/>
        </div>
        </>)
    }else {
        return (<>
        <Button onClick={props.onClose} icon color='blue' basic>
            <Icon name='list ul'/>Список
        </Button>
        {props.right===1 && <Button basic icon color='blue' onClick={()=>props.setEdit(true)}>
             <Icon name='edit' color='red'/> Изменить        
        </Button>}
        <div>
            <MachineView {...props}/>
        </div>
        </>)
    }
}