import React, { useState, useRef, useEffect } from 'react';

const Draw = () => {
    const canvasRef = useRef(null);
    const [ctx, setCtx] = useState(null);
    const [painting, setPainting] = useState(false);
    const [currentColor, setCurrentColor] = useState('#934242');
    const [lineWidth, setLineWidth] = useState(2.5);

    const initCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        setCtx(ctx);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        ctx.strokeStyle = currentColor;
        ctx.fillStyle = currentColor;
        ctx.lineWidth = lineWidth;
    }
    
    useEffect(()=> {
        initCanvas()
    },[])

    const stopPainting = () => {
        setPainting(false);
    };
    
    const startPainting = () => {
        ctx.beginPath();
        setPainting(true);
    };

    const onMouseMove = (event) => {
        const x = event.nativeEvent.offsetX;
        const y = event.nativeEvent.offsetY;
        if(!painting){
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    };

    return (
        <canvas
            ref={canvasRef}
            onMouseMove={onMouseMove}
            onMouseDown={startPainting}
            onMouseUp={stopPainting}
        />
    );
};

export default Draw;
