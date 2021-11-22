import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    tasksForTodolist: Array<TaskType>;
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}


export function Todolist(props: PropsType) {

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = props.tasks;

    if (filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    const [title, setTitle] = useState('')

    const onPressKeyHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter')
            keyAddHandler()
    }

    const keyAddHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    /*const cActiveAllHandler = () => {
        props.changeFilter("all")
    }
    const cActiveActiveHandler = () => {
        props.changeFilter("active")
    }
    const cActiveCompletedHandler = () => {
        props.changeFilter("completed")
    }
*/
    const kingOfAllChaingHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
    }

    const allRemoveTaskHandler = (id: string) => {
        props.removeTask(id)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            {/*<input onChange={(event)=> setTitle(event.currentTarget.value )}/>*/}
            <input value={title} onChange={onChangeHandler} onKeyPress={onPressKeyHandler}/>
            <button onClick={keyAddHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => allRemoveTaskHandler(t.id)}>x
                    </button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={() => kingOfAllChaingHandler('all')}>All</button>
            <button onClick={() => kingOfAllChaingHandler('active')}>Active</button>
            <button onClick={() => kingOfAllChaingHandler('completed')}>Completed</button>
        </div>
    </div>
}
