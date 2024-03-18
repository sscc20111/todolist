import React, { Component } from 'react';

class MainApp extends Component {
    constructor() {
        super();
        this.state = {
            hours: 0,
            minutes: 0,
        };
        this.USER_LS = "currentUser";
    }

    componentDidMount() {
        this.init();
        this.startInterval();
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    init() {
        this.getSendTime();
    }

    getSendTime() {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        this.setState({ hours, minutes });
    }

    startInterval() {
        this.intervalID = setInterval(() => {
            this.getSendTime();
        }, 1000);
    }


}

export default MainApp;
