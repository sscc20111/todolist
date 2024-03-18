import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRotateLeft, faPenToSquare, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";


const Lists = ({Tododata, Togle, Edit, Delete, Visible}) => {
    const [editTogle,seteditTogle] = useState(true)
    const [ListText, setText] = useState(Tododata.text);
    const remove = (id) => {
        Delete(id)
    }
    const edit = (EditText) => {
        Edit(EditText, Tododata.id)
        seteditTogle(true)
    }
    const cancel = () => {
        setText(Tododata.text)
        seteditTogle(true)
    }

    if(!Visible){
        return(
                    <div key={Tododata.id} className="item item-enter-done">
                        {editTogle ? (<>
                            <span>{ListText}</span>
                            <div className='btnBox'>
                                <button className="check" data-id={Tododata.id} onClick={()=>Togle(Tododata.id)}>
                                    <FontAwesomeIcon icon={faCircleCheck} />
                                </button>
                                <button className="edit" data-id={Tododata.id} onClick={()=>seteditTogle(false)}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                <button className="delete" data-id={Tododata.id} onClick={()=>remove(Tododata.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div></>
                        ):(<>
                            <input type="text" className="todolist__input" value={ListText} onChange={(e) => setText(e.target.value)} />
                            <div className='btnBox'>
                                <button className='check' onClick={()=>edit(ListText, Tododata.id)}><FontAwesomeIcon icon={faCheck} /></button>
                                <button className='cancel' onClick={cancel}><FontAwesomeIcon icon={faXmark} /></button>
                            </div></>
                        )}
                    </div>
        ) 
    }else{
        return(
                <div key={Tododata.id} className="item Completed">
                    <span className="textLine">
                        {Tododata.text}
                    </span>
                    <div className='btnBox'>
                        <button className="return" data-id={Tododata.id} onClick={()=>Togle(Tododata.id)}>
                            <FontAwesomeIcon icon={faRotateLeft} />
                        </button>
                        <button className="delete" data-id={Tododata.id} onClick={()=>remove(Tododata.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
        )
    }
}

export default Lists;