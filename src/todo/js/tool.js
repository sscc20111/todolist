import React, { useState } from 'react';

import FormRange from 'react-bootstrap/esm/FormRange';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faPaintBrush, faSave, faPalette, faPencil, faPaintRoller } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-regular-svg-icons";


const Tools = ({ setCanvasTogle, drawColor, drawRange, canvasSave, canvasReset, canvasFill }) => {
    const [ToolsOpen, setToolsOpen] = useState(false);
    const [ColorOpen, setColorOpen] = useState(false);
    const [pointer, setpointer] = useState(false);

    const handleToolsOpen = () => {
        setCanvasTogle(false);
        setToolsOpen(true);
    };

    const handleToolsClose = () => {
        setCanvasTogle(true);
        setToolsOpen(false);
        setColorOpen(false);
        setpointer(false);
    };

    return(
        <>
            <div className='controllBox d-grid'>
                <div className='lineWidth'>
                    <FormRange min = ".1" max= "5" step="0.1" onChange={(e) => {drawRange(e)}} className={`controller px-3 ${pointer ? 'scaleToOne' : ''}`}></FormRange>
                </div>
                <div className='drawColor'>
                    <ul className={`color gap-1 ${ColorOpen ? 'scaleToOne' : ''}`}>
                        <li className='colors' style={{ backgroundColor:'#E17055' }} onClick={(e) => {drawColor(e)}}></li>
                        <li className='colors' style={{ backgroundColor:'#FDCB6E' }} onClick={(e) => {drawColor(e)}}></li>
                        <li className='colors' style={{ backgroundColor:'#00B894' }} onClick={(e) => {drawColor(e)}}></li>
                        <li className='colors' style={{ backgroundColor:'#2F61D2' }} onClick={(e) => {drawColor(e)}}></li>
                        <li className='colors' style={{ backgroundColor:'#6C5CE7' }} onClick={(e) => {drawColor(e)}}></li>
                    </ul>
                </div>
            </div>
            <div className={`drawing__tool ${ToolsOpen ? 'scaleToOne' : ''} my-3 d-grid`}>
                <div className={`brush-btn toolItem ${ToolsOpen ? 'scaleToOne' : ''}`} style={{alignItems:'center', zIndex:9}} onClick={(e) => {setpointer(!pointer);}}>
                    <FontAwesomeIcon icon={faPencil} />
                </div>
                <div className={`fill-btn toolItem ${ToolsOpen ? 'scaleToOne' : ''}`} style={{alignItems:'center', zIndex:8}} onClick={canvasFill}>
                    <FontAwesomeIcon icon={faPaintRoller} />
                </div>
                <div className={`palette toolItem ${ToolsOpen ? 'scaleToOne' : ''}`} style={{zIndex:7}} onClick={(e) => {setColorOpen(!ColorOpen);}}>
                    <FontAwesomeIcon icon={faPalette} />
                </div>
                <div className={`save-btn toolItem ${ToolsOpen ? 'scaleToOne' : ''}`} style={{zIndex:4}} onClick={canvasSave}>
                    <FontAwesomeIcon icon={faSave} />
                </div>
            </div>
            <div xs="auto" className='app d-grid'>
                <div style={{zIndex:6}} className='todo' onClick={handleToolsClose}>
                    <FontAwesomeIcon icon={faListUl} />
                </div>
                {!ToolsOpen ? (
                    <div className='draw toolItem' style={{zIndex:5}} onClick={handleToolsOpen}>
                        <FontAwesomeIcon icon={faPaintBrush} />
                    </div>
                ) : (
                    <div className={`new-layer toolItem ${ToolsOpen ? 'scaleToOne' : ''}`} style={{zIndex:5}} onClick={canvasReset}>
                        <FontAwesomeIcon icon={faFile} />
                    </div>
                )}
            </div>
        </>
    ) 
}


export default Tools;