import React from 'react'
import { FaTimes } from 'react-icons/fa'

const Task = ({ task, deleteTask, toggleReminder}) => {
    const handleDelete = () => {
        deleteTask(task.id);
    }

    const handleToggle = () => {
        toggleReminder(task.id);
    }
    
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={handleToggle}>
            <h3>
                {task.text} <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={handleDelete}/>
            </h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task
