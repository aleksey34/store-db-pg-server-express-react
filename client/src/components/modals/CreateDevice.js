import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Modal, Row , Col} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice} from "../../http/deviceApi";
import {observer} from "mobx-react-lite";

const CreateDevice = observer( ({show , onHide}) => {

    const {device} = useContext(Context);
    const [info , setInfo] = useState([]);

    const addInfo = ()=>{
        setInfo(
            [ ...info, {title:'',description:"", number: Date.now()}]
        );
    }
    const removeInfo = (number)=>{
        setInfo(info.filter( (i)=> i.number !== number));
    }

   const [ name , setName] = useState('');
   const [ price , setPrice] = useState(0);
   const [ file , setFile] = useState(null);

   const selectedFile = e=>{
       setFile(e.target.files[0]);
   }

    const changeInfo = (key , value , number)=>{
       setInfo( info.map( ( i )=>i.number === number ? {...i , [key]: value} : i));
    }

    const addDevice = ()=>{
       const formData = new FormData();
       formData.append('name' , name);
       formData.append('price' , String(price));
       formData.append('img' , file);
       formData.append('brandId' , device.selectedBrand.id);
       formData.append('typeId' , device.selectedType.id);
       formData.append( 'info'  , JSON.stringify(info));

        createDevice(formData)
            .then( (data)=>{
                setName('');
                setPrice(0);
                setFile(null);
                setInfo([]);
                onHide();
            } )
            .catch( e=>{})
    }

        return (
            <Modal
                size="lg"
                // aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title >
                        Добавить новое устройство
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Dropdown  className={'my-2'}>
                            <Dropdown.Toggle>
                                {Object.keys(device.selectedType).length ? device.selectedType.name : "Выберете тип"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    device.types.map( (type)=>(
                                        <Dropdown.Item
                                            onClick={ ()=>device.setSelectedType(type)}
                                            key={type.id}>
                                            {type.name}
                                        </Dropdown.Item>
                                    ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown  className={'my-2'}>
                            <Dropdown.Toggle>
                                {Object.keys(device.selectedBrand).length ? device.selectedBrand.name :  "Выберете бренд"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    device.brands.map( (brand)=>(
                                        <Dropdown.Item
                                            onClick={ ()=> device.setSelectedBrand(brand)}
                                            key={brand.id}>
                                            {brand.name}
                                        </Dropdown.Item>
                                    ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Control
                            value={name}
                            onChange={e=>setName(e.target.value)}
                        placeholder={'Введите название устройства'}
                        type={'text'}
                        className={'mt-3'}  />
                        <Form.Group className={'d-flex justify-content-between align-items-center'}>
                            <Form.Label className={'w-auto h-100 align-self-end'}>
                                Введите цену
                            </Form.Label>
                            <Form.Control
                                value={price}
                                onChange={e=>setPrice(Number(e.target.value))}
                                placeholder={'Введите стоимость устройства'}
                                type={'number'}
                                className={'mt-3 w-75'}  />
                        </Form.Group>

                        <Form.Control
                            placeholder={'Добавьте изображение'}
                            type={'file'}
                            className={'mt-3'}
                            onChange={e=> selectedFile(e)}/>
                            <hr/>

                            <Button
                                onClick={addInfo}
                                variant={'outline-dark'}>
                                Добавить новое свойство
                            </Button>
                        {
                            info.map( i=>{
                                return (
                                    <Row key={i.number} className={'mt-4'}>
                                        <Col md={4} >
                                            <Form.Control
                                            value={i.title}
                                            onChange={ (e)=>changeInfo( 'title' , e.target.value  , i.number)}
                                            type={'text'}
                                            placeholder={'Введите название свойсва'}/>
                                        </Col>
                                        <Col md={4} >
                                            <Form.Control
                                                onChange={(e)=> changeInfo( 'description' , e.target.value , i.number)}
                                                value={i.description}
                                                type={'text'}
                                                placeholder={'Введите описание свойсва'}/>
                                        </Col>
                                        <Col md={4} >
                                            <Button
                                                onClick={()=>removeInfo(i.number)}
                                                variant={'outline-danger'}>
                                                Удалить
                                            </Button>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                    <Button variant={"outline-success"} onClick={addDevice}>Добавить</Button>
                </Modal.Footer>
            </Modal>
        );
    }
);
export default CreateDevice;