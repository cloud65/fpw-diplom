import React from 'react'
import { Table, Icon, Button, Portal, Segment, Header, Form, Modal }  from 'semantic-ui-react'
import {formatDate} from './Funcs.js'
import {maintenanceListRequest} from './Requests.js'
import {maintenanceGetRequest} from './Requests.js'
import {maintenanceSaveRequest} from './Requests.js'
import {resolvePath} from './Funcs.js'


const getCols = (media, right)=>{
    const data = {
       desktop: [
            ['_date', 'Дата', 2], 
            ['form.name', 'Вид ТО', 2],
            ['machine.model.name', 'Модель', 2],            
            ['machine.number', 'Номер', 2],
            ['mileage', 'Наработка', 2],
            ['organization.name', 'Организация, проводившая ТО', 2],
            ['service.profile.organization_name', 'Сервисная компания', 2],
       ],
       tablet: [
            ['_date', 'Дата', 2], 
            ['form.name', 'Вид', 2],
            ['machine.model.name', 'Модель', 3],            
            ['machine.number', 'Номер', 3],            
            ['mileage', 'Наработка', 2],  
       ],
       mobile: [
            ['_date', 'Дата', 5], 
            ['form.name', 'Вид', 7],          
            ['machine.number', 'Номер', 4],
       ]        
    }
    return data[media]
}

const FilterBox=(props)=>{
    const [filter, setFilter] = React.useState({})
    
    React.useEffect(()=>{
        setFilter(props.filter)
    }, [props.filter])
    
    const handleChange=(ev,{name, value})=>{
        const newFilter = {...filter, [name]:value};
        if (!value) delete newFilter[name];
        setFilter(newFilter);
    }
    
    const getOptions=(name)=>{
        if (!props.references[name]) return [];
        return props.references[name].map(e=> {return { key: e.guid || e.user, value: e.guid || e.user, text: e.name || e.organization_name}});
    }
    
    const handleClose=(reset)=>{
        if (reset) {
            props.setFilter({});
            setFilter({});
        }else props.setFilter(filter)
        props.onClose()
    }
    
    return <Portal onClose={props.onClose} open={props.open}>
    <Segment
      style={{
        left: '20%',
        position: 'fixed',
        top: '20%',
        zIndex: 1000,
      }}
    >
      <Header>Фильтр таблицы "ТО"</Header>
      <Form>
        <Form.Select  search  selection  clearable       
            label='Вид ТО' name='form' value={filter.form||null} 
            onChange={handleChange} options={getOptions('form_maintenance')} />
        <Form.Input label='Зав.номер машины' name='number' value={filter.number||''} 
            onChange={handleChange}/>
        <Form.Select  search  selection  clearable      
            label='Сервисная компания' name='service' value={filter.service||null} 
            onChange={handleChange} options={getOptions('service')} />
        <Button content='Отключить' onClick={()=>handleClose(true)}/>
        <Button type='submit' content='Включить' color='blue' onClick={()=>handleClose(false)}/>
      </Form>
    </Segment>
  </Portal>
}

const SelectField = (props)=>{
    if (!props.readOnly) return <Form.Select {...props} search/>
        else return <Form.Input {...props} value={(props.options.find(r=>r.value=props.value) || {text:''}).text} readOnly/>
}

const EditBox=(props)=>{
    const [loader, setLoader] = React.useState(false)
    const [data, setData] = React.useState({});
    
    const machines = props.references.machine.map(e=> {return {key:e.guid, value:e.guid, text:e.name}})
    const form_maintenances = props.references.form_maintenance.map(e=> {return {key:e.guid, value:e.guid, text:e.name}})
    const organizations = props.references.organization.map(e=> {return {key:e.guid, value:e.guid, text:e.name}})
    const services = props.references.service.map(e=> {return {key:e.user, value:e.user, text:e.organization_name}})
    
    const ro=false
    
    React.useEffect(()=> {
        const newData = {...props.data}         
        newData.date = props.data.date || formatDate(new Date())
        newData.order_date = props.data.order_date || formatDate(new Date())
        newData.machine = props.data.machine && props.data.machine.guid || props.machine
        newData.form = props.data.form && props.data.form.guid
        newData.organization = props.data.organization && props.data.organization.guid
        newData.service = props.data.service && props.data.service.id
        setData(newData)
    }, [props.data, props.machine]);
    
    const handleChange=(ev, {name, value})=>setData(d=>{return {...d, [name]:value }})    
    
    const save=()=>{
        setLoader(true);
        maintenanceSaveRequest(data, props.token, (result, data)=> {
              setLoader(false);
              if (result!==200) {
                  props.setMessage({header: 'Ошибка записи (код '+result+')', error:data.error})
                  return
              }
              props.onClose();
              props.reload();
        })
    }
    
    
    return <Modal open={true} onClose={props.onClose} size='mini'>
        <Modal.Content>
        <Form loading={loader}>
            <SelectField label='Машина' name='machine' value={data.machine||''} onChange={handleChange} options={machines} readOnly={ro}/>                    
            <SelectField label='Вид ТО' name='form' value={data.form||''} onChange={handleChange} options={form_maintenances} readOnly={ro}/>
            <Form.Input type='date' label='Дата проведения ТО' name='date' value={data.date||''} onChange={handleChange} readOnly={ro}/>
            <Form.Input type='number' label='Наработка, м/час' name='mileage' value={data.mileage||''} onChange={handleChange} readOnly={ro}/>
            <Form.Input label='№ заказ-наряда' name='order_number' value={data.order_number||''} onChange={handleChange} readOnly={ro}/>
            <Form.Input type='date' label='Дата заказ-наряда' name='order_date' value={data.order_date||''} onChange={handleChange} readOnly={ro}/>
            <SelectField label='Организация, проводившая ТО' name='organization' value={data.organization||''} onChange={handleChange} options={organizations} readOnly={ro}/>
            <SelectField label='Сервисная компания' name='service' value={data.service||''} onChange={handleChange}  options={services} readOnly={ro}/>
        </Form>
        </Modal.Content>
        <Modal.Actions style={{padding:'3px'}}>
        <Button color='black' content='Закрыть' onClick={props.onClose} size='mini' icon='cancel' disabled={loader}/>
        {!ro && <Button color='blue' content='Записать' onClick={save} size='mini' icon='save' disabled={loader || ro}/>}
      </Modal.Actions>
    </Modal>
}


export const MaintenanceTable = (props) => {
  const [filter, setFilter] = React.useState({}) 
  const [loader, setLoader] = React.useState(false) 
  const [showFilter, setShowFilter] = React.useState(false) 
  const [order, setOrder] = React.useState('descending') 
  const [page, setPage] = React.useState(1) 
  const [data, setData] = React.useState([]) 
  const [record, setRecord] = React.useState(null)
  const [edit, setEdit] = React.useState(null)
  
  const reload=()=>{
      setLoader(true);      
      maintenanceListRequest(filter, order, page, props.userData.token, (result, data)=> {
          setLoader(false);
          if (result!==200) {
              props.setMessage('Нет данных (код '+result+')')
              return
          }
          setData(data.data)
      })
  }
  
  
  React.useEffect(()=>reload(), [filter, order, page])
  
     
  const cols = getCols(props.media, props.userData.right)
   
  const headers = cols.map(e=> {
        const orderData = (e[0]==='_date') 
                ? {sorted: order, onClick: ()=>setOrder(order==='ascending' ? 'descending' : 'ascending'), style: {cursor:'pointer'}} 
                : {}        
        return <Table.HeaderCell key={'c_'+e[0] } width={e[2]} content={e[1]} {...orderData}/>
  })
  
  const rows = data.map((row, i)=>{
      row._date = formatDate(row.date)
      const rowCols = cols.map(e=>{
          let value = resolvePath(row, e[0], '');
          return <Table.Cell key={'r_'+e[0] } title={value}>{value}</Table.Cell>
      })
      return <Table.Row key={row.guid} onClick={()=>setEdit(row.guid)}>
        <Table.Cell>{i+1}</Table.Cell>
        {rowCols}
      </Table.Row>       
  })
  
 
 return <Segment basic style={{margin:0, padding:0}} loading={loader}>
   <div   style={{  margin: '2px 2px 0 2px'}}>
    <Button.Group>
      <Button basic icon color={Object.keys(filter).length ? 'red' :'blue'} onClick={()=>setShowFilter(true)}>
        <Icon name='filter' />
      </Button>
      {props.userData.right>0 && <Button basic icon color='blue' onClick={()=>{setEdit('create')}}>
        <Icon name='plus' color='red'/> Добавить        
      </Button>}
    </Button.Group>
    <FilterBox media={props.media} open={showFilter} references={props.references} 
        filter={filter} setFilter={setFilter} 
        onClose={()=>setShowFilter(false)}
     />
   </div>
   <Table celled fixed selectable singleLine unstackable sortable columns={16} style={{marginTop: '0.2rem'}}>
    <Table.Header> 
        <Table.Row>
            <Table.HeaderCell width={1} content='#' />
            {headers}
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {rows}
    </Table.Body>
  </Table>
  {edit!==null && <EditBox data={data.find(e=>e.guid===edit) || {guid: 'create'}} 
            token={props.userData.token} setMessage={props.setMessage}
            onClose={()=>setEdit(null)} reload={()=>reload()} references={props.references}/>}
 </Segment>
}

