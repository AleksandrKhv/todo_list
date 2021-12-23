import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css'
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

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

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListId)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
            {/*{props.title}*/}
            {/*<button onClick={removeTodoListHandler}>remove List</button>*/}
            <IconButton onClick={removeTodoListHandler} size={'small'}>
                <Delete fontSize={'small'}/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>

        <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.todoListId)
                    const onChangeHandlerForChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, event.currentTarget.checked, props.todoListId)
                    }
                    const changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(t.id, newTitle, props.todoListId)
                    }
                    return <div key={t.id} className={t.isDone ? styles.isDone : ''}>
                        <Checkbox defaultChecked
                                  size={'small'}
                                  color="primary"
                                  checked={t.isDone}
                                  onChange={onChangeHandlerForChangeStatus}/>
                        {/*<input type="checkbox" checked={t.isDone}
                               onChange={onChangeHandlerForChangeStatus}/>*/}
                        {/*<input type="checkbox" checked={t.isDone} onChange={(event)=>onChangeHandlerForChangeStatus(t.id,event)}/>*/}
                        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                        {/*<span>{t.title}</span>*/}
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <IconButton onClick={onClickHandler} size={'small'}>
                            <Delete fontSize={'small'}/>
                        </IconButton>
                    </div>
                })
            }
        </div>

        <div>
            <ButtonGroup size={'small'} variant={'contained'} color={'primary'} disableElevation>
                <Button color={filter === 'all' ? 'secondary' : 'primary'} onClick={onAllClickHandler}>All</Button>
                <Button color={filter === 'active' ? 'secondary' : 'primary'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={filter === 'completed' ? 'secondary' : 'primary'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>
}
