import React, {useState} from 'react';
import './App.css';
import {PropsType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App(props: PropsType) {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    function removeTask(id: string) {
        console.log('appappappapp')
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

   /* let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }*/

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={props.tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={props.changeFilter}
                      addTask={addTask}/>
        </div>
    );
}

export default App;
