import React from 'react';
import './index.css';
import Note from './Note';
import AppPage from './todo/index';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Route, Routes, useLocation } from 'react-router-dom';

const Transition = () => {
    
    const delay = 1500;

    const location = useLocation();

    return (<>
    <TransitionGroup className="transition-group">
        <CSSTransition location={location} classNames="fade" timeout={delay}>
            <Routes location={location} >
                <Route path="/" element={<Note />} />
                <Route path="/AppPage" element={<AppPage />} />
            </Routes>
        </CSSTransition>
    </TransitionGroup>
    </>
    );
};

export default Transition;
