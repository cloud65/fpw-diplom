import React from 'react'
import { Table, Icon, Button, Portal, Segment, Header, Form, Modal }  from 'semantic-ui-react'
import {formatDate} from './Funcs.js'
import {reclamationListRequest} from './Requests.js'
import {reclamationSaveRequest} from './Requests.js'
import {resolvePath} from './Funcs.js'

const diffInDays =(first, second)=>{
    const x = new Date(first);
    const y = new Date(second);
     
    return Math.floor((y-x) / (1000 * 60 * 60 * 24));
}


const getCols = (media, right)=>{
    const data = {
       desktop: [
            ['_date', 'Дата отказа', 2], 
            ['machine.model.name', 'Модель', 2],            
            ['machine.number', 'Номер', 1],
            ['unit.name', 'Узел отказа', 2],
            ['recovery.name', 'Способ восстановления', 2],
            ['_repair_date', 'Дата восстановления', 2],
            ['service.profile.organization_name', 'Сервисная компания', 2],
       ],
       tablet: [
            ['_date', 'Дата отказа', 2],             
            ['machine.model.name', 'Модель', 3],            
            ['machine.number', 'Номер', 2], 
            ['unit.name', 'Узел отказа', 2],
            ['_repair_date', 'Восстановление', 2],            
       ],
       mobile: [
            ['_date', 'Дата', 5], 
            ['machine.number', 'Номер', 4],
            ['unit.name', 'Узел', 7],

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
      <Header>Фильтр таблицы "Рекламации"</Header>
      <Form>
        <Form.Select  search  selection  clearable       
            label='Узел оказа' name='unit' value={filter.unit||null} 
            onChange={handleChange} options={getOptions('unit')} />
         <Form.Select  search  selection  clearable       
            label='Способ восстановления' name='recovery' value={filter.recovery||null} 
            onChange={handleChange} options={getOptions('recovery')} />
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
    const units = props.references.unit.map(e=> {return {key:e.guid, value:e.guid, text:e.name}})
    const recoveries = props.references.recovery.map(e=> {return {key:e.guid, value:e.guid, text:e.name}})
    const services = props.references.service.map(e=> {return {key:e.user, value:e.user, text:e.organization_name}})
    
    const ro=props.readOnly
    
    const downtime = Math.max(diffInDays(data.date, data.repair_date), 0);
    
    React.useEffect(()=> {
        const newData = {...props.data}         
        newData.date = props.data.date || formatDate(new Date())
        newData.repair_date = props.data.repair_date || formatDate(new Date())
        newData.machine = props.data.machine && props.data.machine.guid || props.machine
        newData.unit = props.data.unit && props.data.unit.guid
        newData.recovery = props.data.recovery && props.data.recovery.guid
        newData.service = props.data.service && props.data.service.id  || props.service
        setData(newData)
    }, [props.data, props.machine]);
    
    const handleChange=(ev, {name, value})=>setData(d=>{return {...d, [name]:value }})    
    
    const save=()=>{
        setLoader(true);
        reclamationSaveRequest({...data, downtime: downtime}, props.token, (result, data )=> {
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
            
            <Form.Input type='date' label='Дата отказа' name='date' value={data.date||''} onChange={handleChange} readOnly={ro}/>
            
            <SelectField label='Узел отказа' name='unit' value={data.unit||''} onChange={handleChange} options={units} readOnly={ro}/>
            
            <Form.Input type='number' label='Наработка, м/час' name='mileage' value={data.mileage||''} onChange={handleChange} readOnly={ro}/>
            
            <Form.TextArea label='Описание отказа' name='description' value={data.description||''} onChange={handleChange} readOnly={ro}/>
            
            <SelectField label='Способ восстановления' name='recovery' value={data.recovery||''} onChange={handleChange} options={recoveries} readOnly={ro}/>
            
            <Form.TextArea label='Используемые запасные части' name='repair_units' value={data.repair_units||''} onChange={handleChange} readOnly={ro}/>
            
            <Form.Input type='date' label='Дата восстановления' name='repair_date' value={data.repair_date||''} onChange={handleChange} readOnly={ro}/>
            
            <Form.Input type='number' label='Время простоя техники' name='downtime' value={downtime||''} readOnly={true}/>
            
            <SelectField label='Сервисная компания' name='service' value={data.service||''} onChange={handleChange}  options={services} 
            readOnly={ro || props.isService}/>
        </Form>
        </Modal.Content>
        <Modal.Actions style={{padding:'3px'}}>
        <Button color='black' content='Закрыть' onClick={props.onClose} size='mini' icon='cancel' disabled={loader}/>
        {!ro && <Button color='blue' content='Записать' onClick={save} size='mini' icon='save' disabled={loader || ro}/>}
      </Modal.Actions>
    </Modal>
}


export const ReclamationTable = (props) => {
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
      const filterRequest = {...filter}
      if (props.machine) filterRequest['machine'] = props.machine
      reclamationListRequest(filterRequest, order, page, props.userData.token, (result, data)=> {
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
      row._repair_date = formatDate(row.repair_date)
      const rowCols = cols.map(e=>{
          let value = resolvePath(row, e[0], '');
          return <Table.Cell key={'r_'+e[0] } title={value}>{value}</Table.Cell>
      })
      return <Table.Row key={row.guid} onClick={()=>setEdit(row.guid)}>
        <Table.Cell>{i+1}</Table.Cell>
        {rowCols}
      </Table.Row>       
  })
  
 
 const readOnly = props.userData.right!==1 && props.userData.right!==2;
 
 const isService = props.userData.right===2;
 
 
 return <Segment basic style={{margin:0, padding:0}} loading={loader}>
   <div   style={{  margin: '2px 2px 0 2px'}}>
    <Button.Group size='mini'>
      <Button basic icon color={Object.keys(filter).length ? 'red' :'blue'} onClick={()=>setShowFilter(true)}>
        <Icon name='filter' />
      </Button>
      {!readOnly && <Button basic icon color='blue' onClick={()=>{setEdit('create')}}>
        <Icon name='plus' color='red'/> Добавить        
      </Button>}
    </Button.Group>
    <div><Header size='small' color='blue' textAlign='center' content={props.strMachine}/></div>
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
            machine={props.machine} service={isService ? props.userData.id : null}
            isService={isService}
            onClose={()=>setEdit(null)} reload={()=>reload()} references={props.references} readOnly={readOnly}/>}
 </Segment>
}

