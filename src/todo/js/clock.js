import React from 'react';

const Main = (props) => {
    return(
        <span className='ms-time'>{`${props.hours < 10 ? `0${props.hours}` : props.hours}:${props.minutes < 10 ? `0${props.minutes}` : props.minutes}`}</span>
    )
}

const Todo = (props) => {
    return(
        <div className='time p-3'>
            <p className="date">{`${props.dayName}, ${props.month} ${props.days}`}</p>
            <h3 className="currentTime">{`${props.hours < 10 ? `0${props.hours}` : props.hours}:${props.minutes < 10 ? `0${props.minutes}` : props.minutes}`}</h3>
        </div>
    )
}

let ClockApp;

const Clock = (props) => {
    const week = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const month = monthNames[date.getMonth() + 1];
    const days = date.getDate();
    const dayName = week[date.getDay()];
    
    if(props.type === 'main'){
        ClockApp = <Main hours={hours} minutes={minutes} />
    }else{
        ClockApp = <Todo hours={hours} minutes={minutes} month={month} days={days} dayName={dayName} />
    }


    return(
        <>
            {ClockApp}
        </>
    ) 
}


export default Clock;