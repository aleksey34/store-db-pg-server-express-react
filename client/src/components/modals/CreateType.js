import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {createType} from "../../http/deviceApi";

const CreateType = ({show , onHide }) => {
   const [value , setValue] = useState('');
    const addType = ()=>{
        createType({ name: value })
            .then( (data)=>{
                setValue('');
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
                <Modal.Title>
                    Добавить новый тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={(e)=>setValue(e.target.value)}
                        placeholder={'Введите название типа'}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;
