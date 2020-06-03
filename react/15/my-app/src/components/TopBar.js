import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../assets/css/TopBar.css'

class TopBar extends Component {
    render() {
        return (
            <div className="top-bar">
                <h3>TopBar</h3>
            </div>
        );
    }
}

TopBar.propTypes = {

};

export default TopBar;