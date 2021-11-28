import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';


export type FilterType = 'All' | 'Active' | 'Completed'

function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: "Hello world111", isDone: true},
        {id: v1(), title: "I am Happy111", isDone: false},
        {id: v1(), title: "Yo111", isDone: false},
        {id: v1(), title: "Hello world", isDone: true},
        {id: v1(), title: "I am Happy", isDone: false},
        {id: v1(), title: "Yo", isDone: false}
    ])

    const removeTask = (mId: string) => {
        setTasks(tasks.filter(f => f.id !== mId))
    }

    const addTask = (title:string) => {
        let task = {id: v1(), title: title, isDone: true}
        setTasks([task, ...tasks])
    }

    let [filter, setMyFilter] = useState<FilterType>('All')

    const setFilter = (value: FilterType) => {
        setMyFilter(value)
    }

    let newTask = tasks
    if (filter === 'All') {
        newTask = tasks
    }
    if (filter === 'Active') {
        newTask = tasks.filter(f => f.isDone)
    }
    if (filter === 'Completed') {
        newTask = tasks.filter(f => !f.isDone)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn1='}
                      tasks={newTask}
                      removeTask={removeTask}
                      setFilter={setFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
