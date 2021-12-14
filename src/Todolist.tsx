import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css'
import AddItemForm from './AddItemForm';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (CurrentId: string, value: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
}

export function Todolist({filter, ...props}: PropsType) {
    /*let [title, setTitle] = useState("")*/
    /*const [error, setError] = useState(false)*/

    const addTask = (title: string) => props.addTask(title, props.todoListId)

        /*if (title.trim()) {
            props.addTask(title.trim(), props.todoListId);
            setTitle("");
        } else {
            setError(true)
        }
    }*/
    /*const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }*/
    /*const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask();
            setError(false)
        }
    }*/

    const onAllClickHandler = () => props.changeFilter("all", props.todoListId);
    const onActiveClickHandler = () => props.changeFilter("active", props.todoListId);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todoListId);

    // const onChangeHandlerForChangeStatus=(CurrentId: string,event:ChangeEvent<HTMLInputElement>)=>{
    //     props.changeStatus(CurrentId,event.currentTarget.checked)
    // }

    return <div>
        <h3>{props.title}
        <button onClick={()=> props.removeTodoList(props.todoListId)}>remove List</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        {/*<div>
            <input className={error ? styles.error : ''} value={title} onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={addTask}>+</button>
            {error && <div className={styles.errorMessage}>Title is required</div>}
        </div>*/}
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.todoListId)
                    /*const onChangeHandlerForChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, event.currentTarget.checked, props.id)
                    }*/
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}
                               onChange={(event) => props.changeStatus(t.id, event.currentTarget.checked, props.todoListId)}/>
                        {/*<input type="checkbox" checked={t.isDone} onChange={(event)=>onChangeHandlerForChangeStatus(t.id,event)}/>*/}
                        <span className={t.isDone ? styles.isDone : ''}>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>

        <div>
            <button className={filter === 'all' ? styles.activeFilter : ''} onClick={onAllClickHandler}>All</button>
            <button className={filter === 'active' ? styles.activeFilter : ''} onClick={onActiveClickHandler}>Active
            </button>
            <button className={filter === 'completed' ? styles.activeFilter : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
