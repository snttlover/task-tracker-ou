import PropTypes from 'prop-types'
import React from 'react'
import Button from './Button'
import { useLocation } from 'react-router-dom';

const Header = ({ title, toggleForm, showAdd}) => {
    const handleToggle = () => {
        toggleForm('click');
    }

    let location = useLocation();
    console.log(location)

    return (
        <header className="header">
            <h1>{title}</h1>
            {(location.pathname === '/' || location.pathname === '/task-tracker' || location.pathname === '/task-tracker/') && <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={handleToggle}/>}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

//CSS in JS
// style={headingStyle} inside the element
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'purple',
// }

export default Header
