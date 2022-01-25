import React, {useContext, useEffect} from 'react';
import {Pagination} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const Pages = observer(  () => {
    const {device} = useContext(Context);
    const pageCount = Math.ceil(device.totalCount / device.limit);
    const pages = [];

    for (let i = 1; i <= pageCount; i++){
        pages.push(i);
    }

   useEffect(  () =>{
       for (let i = 1; i <= Math.ceil(device.totalCount / device.limit); i++){
           pages.push(i);
       }
   } , [device.totalCount])

    return (
        <Pagination className={'mt-5'}>
            {
                pages.map( (number)=>{
                    return (
                        <Pagination.Item
                            onClick={()=>device.setPage(number)}
                            active={number === device.page}
                            key={number}>
                            {number}
                        </Pagination.Item>
                    )
                } )
            }
            {/*<Pagination.First />*/}
            {/*<Pagination.Prev />*/}
            {/*<Pagination.Item>{1}</Pagination.Item>*/}
            {/*<Pagination.Ellipsis />*/}

            {/*<Pagination.Item>{10}</Pagination.Item>*/}
            {/*<Pagination.Item>{11}</Pagination.Item>*/}
            {/*<Pagination.Item active>{12}</Pagination.Item>*/}
            {/*<Pagination.Item>{13}</Pagination.Item>*/}
            {/*<Pagination.Item disabled>{14}</Pagination.Item>*/}

            {/*<Pagination.Ellipsis />*/}
            {/*<Pagination.Item>{20}</Pagination.Item>*/}
            {/*<Pagination.Next />*/}
            {/*<Pagination.Last />*/}
        </Pagination>
    );
});

export default Pages;
