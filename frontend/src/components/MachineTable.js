import React from 'react'
import { Table, Icon, Button, Portal, Segment, Header, Form }  from 'semantic-ui-react'
import {formatDate} from './Funcs.js'
import {machineryListRequest} from './Requests.js'
import {machineryGetRequest} from './Requests.js'
import {MachineForm} from  './MachineForm.js';

const getCols = (media, right)=>{
    const data = {
       desktop: [
            ['_shipment', 'Дата отгрузки', 2], 
            ['number', 'Номер', 2],
            ['model', 'Модель', 2],            
            ['motor', 'Двигатель', 2],
            ['transmission', 'Трансмиссия', 2],
            ['bridge_drv', 'Ведущий мост', 2],
            ['bridge_ctrl', 'Управляемый мост', 2],
       ],
       tablet: [
            ['_shipment', 'Дата', 2], 
            ['number', 'Номер', 2],
            ['model', 'Модель', 2],            
            ['motor', 'Двигатель', 2],            
       ],
       mobile: [
            ['_shipment', 'Дата', 7], 
            //['number', 'Номер', 4],
            ['model', 'Модель', 8]          
       ]        
    }
    if (right==1){
        data.desktop.push(['service', 'Сервис', 3])
        data.desktop.push(['client', 'Клиент', 3])
    }
    else if (right==2){
        data.desktop.push(['client', 'Клиент', 3])
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
        return props.references[name].map(e=> {return { key: e.guid, value: e.guid, text: e.name }});
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
      <Header>Фильтр таблицы "Машины"</Header>
      <Form>
        <Form.Select  search  selection  clearable       
            label='Модель' name='model' value={filter.model||null} 
            onChange={handleChange} options={getOptions('model')} />
        <Form.Select  search  selection clearable       
            label='Двигатель' name='motor' value={filter.motor||null} 
            onChange={handleChange} options={getOptions('motor')} />
        <Form.Select  search  selection  clearable      
            label='Трансмиссия' name='transmission' value={filter.transmission||null} 
            onChange={handleChange} options={getOptions('transmission')} />
        <Form.Select  search  selection clearable       
            label='Ведущий мост' name='bridge_drv' value={filter.bridge_drv||null} 
            onChange={handleChange} options={getOptions('bridge_drv')} />
        <Form.Select  search  selection clearable       
            label='Управляемый мост' name='bridge_ctrl' value={filter.bridge_ctrl||null} 
            onChange={handleChange} options={getOptions('bridge_ctrl')} />
        <Button content='Отключить' onClick={()=>handleClose(true)}/>
        <Button type='submit' content='Включить' color='blue' onClick={()=>handleClose(false)}/>
      </Form>
    </Segment>
  </Portal>
}


export const MachineTable = (props) => {
  const [filter, setFilter] = React.useState({}) 
  const [loader, setLoader] = React.useState(false) 
  const [showFilter, setShowFilter] = React.useState(false) 
  const [order, setOrder] = React.useState('descending') 
  const [page, setPage] = React.useState(1) 
  const [data, setData] = React.useState([]) 
  const [machine, setMachine] = React.useState(null)
  const [edit, setEdit] = React.useState(false)
  
  React.useEffect(()=>{
      machineryListRequest(filter, order, page, props.userData.token, (result, data)=> {
          if (result!==200) {
              props.setMessage('Нет данных (код '+result+')')
              return
          }
          setData(data.data)
      })
  }, [filter, order, page])
  
  const openMachine=(guid)=>{
      if (!guid){
          setMachine({guid: null})
          return
      }
      setLoader(true);
      machineryGetRequest(guid, props.userData.token, (result, data)=> {
          setLoader(false);
          if (result!==200) {
              props.setMessage('Нет данных (код '+result+')')
              return
          }
          setMachine(data.data)
      })
  }
  
  const cols = getCols(props.media, props.userData.right)
   
  const headers = cols.map(e=> {
        const orderData = (e[0]==='_shipment') 
                ? {sorted: order, onClick: ()=>setOrder(order==='ascending' ? 'descending' : 'ascending'), style: {cursor:'pointer'}} 
                : {}        
        return <Table.HeaderCell key={'c_'+e[0] } width={e[2]} content={e[1]} {...orderData}/>
  })
  
  const rows = data.map((row, i)=>{
      row._shipment = formatDate(row.shipment)
      const rowCols = cols.map(e=>{
          let value = row[e[0]];
          if(typeof(value)==='object'){
              value = (value.profile) ? value.profile.organization_name : value.name;
          }
          return <Table.Cell key={'r_'+e[0] } title={value}>{value}</Table.Cell>
      })
      return <Table.Row key={row.guid} onClick={()=>openMachine(row.guid)}>
        <Table.Cell>{i+1}</Table.Cell>
        {rowCols}
      </Table.Row>       
  })
  
 if (machine){
     return <MachineForm data={machine} edit={edit} right={props.userData.right}  media={props.media} references={props.references}
                onClose={()=>{setEdit(false);setMachine(null)}} setEdit={setEdit}/>

 } 
 
 return <Segment basic style={{margin:0, padding:0}} loading={loader}>
   <div   style={{  margin: '2px 2px 0 2px'}}>
    <Button.Group>
      <Button basic icon color={Object.keys(filter).length ? 'red' :'blue'} onClick={()=>setShowFilter(true)}>
        <Icon name='filter' />
      </Button>
      {props.userData.right===1 && <Button basic icon color='blue' onClick={()=>{setEdit(true); openMachine(null)}}>
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
 </Segment>
}

