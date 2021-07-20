import React, {useState} from 'react'

const AddTask = ({addTask}) => {
    const [task, setTask] = useState('');
    const [date, setDate] = useState('');
    const [reminder, setReminder] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if(!task) {
            alert('Please Add a Task');
            return;
        }
        const newTask = {
            text: task,
            day: date,
            reminder: reminder,
        } 

        addTask(newTask);

        setTask('');
        setDate('');
        setReminder(false);
    }

    return (
        <form className="add-form" onSubmit={handleAdd}>
            <div className="form-control">
                <label htmlFor="">Task</label>
                <input type="text" placeholder="Add Task" value={task} onChange={(e) => setTask(e.target.value)}/>
            </div>
            <div className="form-control">
                <label htmlFor="">Day & Time</label>
                <input type="text" placeholder="Add Day & Time" value={date} onChange={(e) => setDate(e.target.value)}/>
            </div>
            <div className="form-control form-control-check">
                <label htmlFor="">Set Reminder</label>
                <input type="checkbox" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
            </div>
            
            <input type="submit" className="btn btn-block" placeholder="Save Task"/>
        </form>
    )
}

export default AddTask
