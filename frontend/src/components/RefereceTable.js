import React from 'react'
import { Table, Icon, Button, Segment, Form, Modal }  from 'semantic-ui-react'
import {refereceGetSection} from './Requests.js'
import {refereceSaveRequest} from './Requests.js'


const options=[
            {key:1, value:1, text:"Модели техники"},
            {key:2, value:2, text:"Модели двигателя"},
            {key:3, value:3, text:"Модели трансмиссии"},
            {key:4, value:4, text:"Модели ведущего моста"},
            {key:5, value:5, text:"Модели управляемого моста"},
            {key:6, value:6, text:"Виды ТО"},
            {key:7, value:7, text:"Узлы"},
            {key:8, value:8, text:"Способы восстановления"},
            {key:9, value:9, text:"Организации, text:проводившие ТО"},
]

const EditBox=(props)=>{
    const [loader, setLoader] = React.useState(false)
    const [data, setData] = React.useState({});
    React.useEffect(()=>setData({...props.data, section:props.section}), [props.data, props.section]);
    
    const handleChange=(ev, {name, value})=>setData(d=>{return {...d, [name]:value }})    
    
    const save=()=>{
       setLoader(true);
        refereceSaveRequest(data, props.token, (result, data)=> {
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
            <Form.Input label='Наименование' name='name' value={data.name||''} onChange={handleChange}/>
            <Form.TextArea label='Описание' name='description' value={data.description||''} onChange={handleChange}/>            
        </Form>
        </Modal.Content>
        <Modal.Actions style={{padding:'3px'}}>
        <Button color='black' content='Отмена' onClick={props.onClose} size='mini' icon='cancel' disabled={loader}/>
        <Button color='blue' content='Записать' onClick={save} size='mini' icon='save' disabled={loader}/>
      </Modal.Actions>
    </Modal>
}


export const RefereceTable = (props) => {
    const [loader, setLoader] = React.useState(false)
    const [section, setSection] = React.useState(1)
    const [data, setData] = React.useState([])
    const [edit, setEdit] = React.useState(null)
    
    
    const sectionReload=()=>{
        setLoader(true);
        refereceGetSection(section, props.userData.token, (result, data)=> {
              setLoader(false);
              if (result!==200) {
                  props.setMessage('Нет данных (код '+result+')')
                  return
              }
              setData(data.data)
        })
    }
    
    React.useEffect(()=>{
        sectionReload();
    }, [section])

    const rows=data.map((e, i)=>{
         return <Table.Row key={e.guid} onDoubleClick={()=>setEdit(e.guid)}>
            <Table.Cell>{i+1}</Table.Cell>
            <Table.Cell>{e.name}</Table.Cell>
            {props.media!=='mobile' && <Table.Cell>{e.description}</Table.Cell>}
            <Table.Cell style={{padding: '0 2px'}}>
                <Button basic icon size='mini' onClick={()=>setEdit(e.guid)}><Icon name='edit'/></Button>
            </Table.Cell>
          </Table.Row>
    })
    
    //console.log(edit)
    
    return <><Form style={{padding: '0.4em'}} loading={loader}>
            <Form.Select label='Секция' name='section' value={section}
                style={{position: 'relative', zIndex: '51'}} 
                onChange={(e,{value})=>setSection(value)} options={options}/>             
    </Form>
    <Segment basic style={{margin:0, padding:0}} loading={loader}>
        <Table celled fixed selectable singleLine unstackable sortable style={{marginTop: '0.2rem'}}>
            <Table.Header> 
                <Table.Row>
                    <Table.HeaderCell width={1} style={{padding: '0 2px'}}>
                        <Button color='blue' circular icon size='mini' onClick={()=>setEdit('create')}><Icon name='plus'/></Button>
                    </Table.HeaderCell>
                    <Table.HeaderCell width={5} content='Наименование' />
                    {props.media!=='mobile' && <Table.HeaderCell width={8} content='Описание' />}
                    <Table.HeaderCell width={1} />
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {rows}
            </Table.Body>
        </Table>
    </Segment>
    {edit!==null && <EditBox data={data.find(e=>e.guid===edit) || {guid: 'create'}} token={props.userData.token}
            section={section} onClose={()=>setEdit(null)} reload={()=>{ sectionReload(); props.reload(); }}/>}
    </>
}