import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const TypeBar = observer(()=> {
    const { device } = useContext(Context);

        return (
            <ListGroup as="ul" className=''>
                {
                  device.types.length > 0 &&   device.types.map( (type )=>{
                        return (
                            <ListGroup.Item
                                active={type.id === device.selectedType.id}
                                style={{cursor:'pointer'}}
                                key={type.id}
                                as="li"
                                onClick={()=>device.setSelectedType(type.id === device.selectedType.id
                                    ? {}
                                    : type)}
                            >
                                {type.name}
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        );
    }
)

export default TypeBar;
