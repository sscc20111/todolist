import React, {  useState  } from 'react';
import { Button, CloseButton, Container } from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

import '../css/common.css';
import './css/todostyle.css';
import './css/media.css';
import Lists from './js/List.js'
import Draw from './js/draw';
import Tools from './js/tool';
import Clock from './js/clock';
import ImgApp from './js/img';
import Weather from './js/weather';
import Popup from '../js/popup';

import uuid from 'react-uuid';
import { CSSTransition, TransitionGroup, } from 'react-transition-group';

const NoteApp = () => {
    const TodoArray = JSON.parse(localStorage.getItem('todoList'));
    const CompletedArray = JSON.parse(localStorage.getItem('completedList'));

    const [ListText, setText] = useState('');//list 글작성
    const [dataUser, setData] = useState(localStorage.getItem('UserName'));
    const [UserName, setUser] = useState(localStorage.getItem('UserName'));
    const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(false);//userName input 토글

    const [CanvasTogle, setCanvasTogle] = useState(true);//canvas : list 토글
    const [IsListTogle, setIsListTogle] = useState(false);//going : complete 토글
    const [ListData, setList] = useState(TodoArray);//list data


    const UserNameChange = () => {
        setIsRegisterFormVisible(!isRegisterFormVisible);
        setUser('')
    }
    const UserNameDataChange = () => {
        setIsRegisterFormVisible(!isRegisterFormVisible);
        setUser(dataUser);
        localStorage.setItem('UserName', dataUser);
    }

    const Popclose = (e) => {
        e.preventDefault()
        const popup = new Popup();
        popup.removeAlert();
    }

    const Visible = (boolean) => {//going : complete 토글시 dataset 렌더링
        if(!boolean){
            setList(TodoArray)
        }else{
            setList(CompletedArray)
        }
        setIsListTogle(boolean)
    }

    const ListPush = (ListText) => {
        const popup = new Popup();
        if (ListText === '') {
            popup.alertNoText();
            return;
        }

        const updatedTodo = TodoArray ? [...ListData, { id: uuid(), text: ListText }] : [{ id: uuid(), text: ListText }];
        localStorage.setItem('todoList', JSON.stringify(updatedTodo));
        setList(updatedTodo);
        setText('');
    }

    const ListDelete = (id) => {
        const updatedList = ListData.filter((Data) => Data.id !== id);
        const storageKey = IsListTogle ? 'completedList' : 'todoList';
        localStorage.setItem(storageKey, JSON.stringify(updatedList));
        setList(updatedList);
    }

    const DataTogle = (id) => {
        const updatedTarget = ListData.find((Data) => Data.id === id);
        const updatedList = IsListTogle ? 
                            (TodoArray ? [...TodoArray, updatedTarget] : updatedTarget) //반대 스토리지에 저장
                            : (CompletedArray ? [...CompletedArray, updatedTarget] : [updatedTarget]);

        const storageKey = IsListTogle ? 'todoList' : 'completedList';
        localStorage.setItem(storageKey, JSON.stringify(updatedList));
        ListDelete(id); //해당 리스트에서 삭제
    }

    const DataEdit = (EditText, id) => {
        const updatedTodo = ListData.map(Data => {
            if (Data.id === id) {
                return { ...Data, text:EditText};
            }
            return Data;
        });
        localStorage.setItem('todoList', JSON.stringify(updatedTodo));
        setList(updatedTodo);
    }




    const drawRange = (e) => {
        const targetvalue = e.target.value;
        const canvas = document.querySelector('.canvasWrap canvas');
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = targetvalue;
    }
    const drawColor = (e) => {
        const targetColor = e.target.style.backgroundColor;
        const canvas = document.querySelector('.canvasWrap canvas');
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = targetColor;
        ctx.fillStyle = targetColor;
    }
    const canvasFill = () => {
        const canvas = document.querySelector('.canvasWrap canvas');
        const ctx = canvas.getContext('2d');
        ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    }
    const canvasReset = () => {
        const canvas = document.querySelector('.canvasWrap canvas');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    }
    const canvasSave = () => {
        const canvas = document.querySelector('.canvasWrap canvas');
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'Your Masterpiece';
        link.click();
    }

    return (
        <div className='transitionBox w-100 h-100' style={{background:'#fff'}}>
            <Container className='d-flex todoContainer'>
                <div className='boarWrap'>
                    {CanvasTogle ? (
                        <div className='todoWrap'>
                            <div className='alert__text'>
                                <p>please type some words in the text box.</p>
                                <CloseButton className='close' onClick={Popclose}></CloseButton>
                            </div>
                            <div className='todoMenu'>
                                <div className="ongoing__btn active" onClick={() => Visible(false)}>
                                    <i className="fas fa-hourglass-half"></i>
                                    <p>Ongoing</p>
                                </div>
                                <div className="completed__btn" onClick={() => Visible(true)}>
                                    <i className="fas fa-hourglass-end"></i>
                                    <p>Completed</p>
                                </div>
                            </div>
                            <div className='ListWrap p-4'>
                                    <TransitionGroup className="todo-list">
                                        {Array.isArray(ListData) && (
                                        ListData.map((item) =>  (
                                        <CSSTransition key={item.id} timeout={300} classNames="item" >
                                            <Lists id={item.id} Tododata={item} Togle={DataTogle} Edit={DataEdit} Visible={IsListTogle} Delete={ListDelete} />
                                        </CSSTransition>
                                        )))}
                                    </TransitionGroup>
                                    <div className='createList'>
                                        <input type="text" className="todolist__input" value={ListText} onChange={(e) => setText(e.target.value)} />
                                        <Button className='btn' onClick={() => ListPush(ListText)}><FontAwesomeIcon icon={faPlus} /></Button>
                                    </div>
                            </div>
                        </div>
                    ):(
                        <div className='canvasWrap'>
                            <Draw></Draw>
                        </div>
                    )}
                </div>
                <div className='ToolsWrap'>
                    <div className='todoInfo'>
                        <div className='infoHeader py-4 px-5 mb-3'>
                            <ImgApp />
                            <h2 className='todo_user'>{UserName}</h2>
                            {isRegisterFormVisible ? (
                                <FontAwesomeIcon icon={faCheck} className='fa-user-edit checked' onClick={UserNameDataChange} />
                                ) : (
                                <FontAwesomeIcon icon={faUserEdit} className='fa-user-edit' onClick={UserNameChange} />
                            )}
                            <input type='text' className={`userName__input ${isRegisterFormVisible ? 'show' : ''}`} value={dataUser} onChange={(e) => setData(e.target.value)}></input>
                        </div>
                        <div className='infoBody'>
                            <Weather />
                            <Clock type='todo' />
                        </div>
                    </div>
                    <div className='todoTool'>
                        <Tools setCanvasTogle={setCanvasTogle} drawColor={drawColor} drawRange={drawRange} canvasFill={canvasFill} canvasSave={canvasSave} canvasReset={canvasReset} />
                    </div>
                </div>
                    
            </Container>
        </div>
    );
}

export default NoteApp;
