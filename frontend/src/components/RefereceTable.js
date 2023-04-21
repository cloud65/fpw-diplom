import React from 'react'
import { Table, Icon, Button, Portal, Segment, Header, Form }  from 'semantic-ui-react'
import {refereceGetSection} from './Requests.js'

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
    
}


export const RefereceTable = (props) => {
    const [loader, setLoader] = React.useState(false)
    const [section, setSection] = React.useState(1)
    const [data, setData] = React.useState([])
    const [edit, setEdit] = React.useState(null)
    
    React.useEffect(()=>{
        setLoader(true);
        refereceGetSection(section, props.userData.token, (result, data)=> {
              setLoader(false);
              if (result!==200) {
                  props.setMessage('Нет данных (код '+result+')')
                  return
              }
              setData(data.data)
        })
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
    
    return <><Form style={{padding: '0.4em'}} loading={loader}>
        <Form.Select label='Секция' name='section' value={section}
            style={{position: 'relative', zIndex: '51'}}
            onChange={(e,{value})=>setSection(value)} options={options}/>
    </Form>
    <Segment basic style={{margin:0, padding:0}} loading={loader}>
        <Table celled fixed selectable singleLine unstackable sortable style={{marginTop: '0.2rem'}}>
            <Table.Header> 
                <Table.Row>
                    <Table.HeaderCell width={1} content='#' />
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
    {edit!==null & <EditBox data={data.find(e=>e.guid===edit)} section={section} onClose={()=>setEdit(null)} reload={props.reload}/>}
    </>
}