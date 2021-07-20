import React, { useState, useEffect } from 'react' 
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

function App() {
  
  // const data = [
  //   {
  //       id: 1,
  //       text: 'Doctors Appoinment',
  //       day: 'Feb 5th at 2:30pm',
  //       reminder: true,
  //   },
  //   {
  //       id: 2,
  //       text: 'Doctors Appoinment',
  //       day: 'Feb 5th at 2:30pm',
  //       reminder: true,
  //   },
  //   {
  //       id: 3,
  //       text: 'Doctors Appoinment',
  //       day: 'Feb 5th at 2:30pm',
  //       reminder: true,
  //   }
  // ]

  const jsonServer = 'https://my-json-server.typicode.com/Strivemspr/task-tracker/tasks/'
  // 'http://localhost:8000/tasks/'
  const [url, setUrl] = useState(jsonServer);
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(false);

  const fetchTasks = async () => {
    const res = await fetch(url);
    const data = await res.json();
    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`${url}${id}`);
    const data = await res.json();
    return data
  }

  useEffect(() => {
    const getTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
      console.log(data);
    }

    getTasks();
  }, [])

  const addTask = async (task) => {
    task.id = tasks[tasks.length - 1].id + 1;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json' // Indicates the content 
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    console.log(data);

    setTasks((previous) => [...previous, data]);
  }

  const deleteTask = async(id) => {
    await fetch(`${url}${id}`, {
      method: 'DELETE',
    });

    setTasks(tasks.filter((task) => task.id !== id))
  }
    
  const toggleReminder = async (id) => {
    const reminderToUpdate = await fetchTask(id);
    const updatedReminder = {...reminderToUpdate, reminder: !reminderToUpdate.reminder}
    console.log(reminderToUpdate);

    const res = await fetch(`${url}${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedReminder),
    })

    const data = await res.json();

    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task));
  };

  const toggleForm = () => {
    setForm(!form);
  }

  const Home = () => {
    return (
      <>
        {form && <AddTask addTask={addTask}/>}
        {tasks.length > 0 ? <Tasks tasks={tasks} toggleReminder={toggleReminder} deleteTask={deleteTask}/> : 'No Tasks To Show'}
      </>
    )
  }
  
  return (
    <Router>
      <div className="container">
        <Header showAdd={form} toggleForm={toggleForm}/>

        {/* Another Way to render the route fragments -----------------------------------------*/}
        {/* <Route exact path='/' render={(props) => (
          <>
            {form && <AddTask addTask={addTask}/>}
            {tasks.length > 0 ? <Tasks tasks={tasks} toggleReminder={toggleReminder} deleteTask={deleteTask}/> : 'No Tasks To Show'}
          </>
        )}/> */}

        <Route exact path={["/", "/task-tracker"]}>
          <Home/>
        </Route>

        <Route path='/task-tracker/about' component={About}/>
        <Footer/>
      </div>
    </Router>
  );
}


export default App;
