import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css'
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

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
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export function Todolist({filter, ...props}: PropsType) {

    const addTask = (title: string) => props.addTask(title, props.todoListId)

    const onAllClickHandler = () => props.changeFilter("all", props.todoListId);
    const onActiveClickHandler = () => props.changeFilter("active", props.todoListId);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todoListId);


    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.todoListId)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
            {/*{props.title}*/}
            <button onClick={() => props.removeTodoList(props.todoListId)}>remove List</button>
        </h3>
        <AddItemForm addItem={addTask}/>

        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.todoListId)
                    /*const onChangeHandlerForChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, event.currentTarget.checked, props.id)
                    }*/
                    const changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(t.id, newTitle, props.todoListId)
                    }
                    return <li key={t.id} className={t.isDone ? styles.isDone : ''}>
                        <input type="checkbox" checked={t.isDone}
                               onChange={(event) => props.changeStatus(t.id, event.currentTarget.checked, props.todoListId)}/>
                        {/*<input type="checkbox" checked={t.isDone} onChange={(event)=>onChangeHandlerForChangeStatus(t.id,event)}/>*/}
                        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                        {/*<span>{t.title}</span>*/}
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
