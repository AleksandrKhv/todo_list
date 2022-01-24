import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './AppWithRedux';
import styles from './Todolist.module.css'
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, Typography} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import Task from './Task';

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

export const Todolist = React.memo(({filter, ...props}: PropsType) => {
    const addTask = useCallback((title: string) => props.addTask(title, props.todoListId), [props.addTask, props.todoListId])
    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.todoListId), [props.todoListId, props.changeFilter]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.todoListId), [props.todoListId, props.changeFilter]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.todoListId), [props.todoListId, props.changeFilter]);

    let tasksForTodolist = props.tasks
    if (filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(tl => !tl.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(tl => tl.isDone);
    }

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.todoListId)
    }, [props.changeTodoListTitle, props.todoListId])

    const removeTodoListHandler = useCallback(() => {
        props.removeTodoList(props.todoListId)
    }, [props.removeTodoList, props.todoListId])

    return <div>
        <Typography variant={'h6'} align={'center'} color={'primary'} paragraph>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
            {/*{props.title}*/}
            {/*<button onClick={removeTodoListHandler}>remove List</button>*/}
            <IconButton onClick={removeTodoListHandler} size={'small'}>
                <Delete fontSize={'small'}/>
            </IconButton>
        </Typography>

        <AddItemForm addItem={addTask}/>

        <div>
            {
                tasksForTodolist.map(t => {
                    return <Task key={t.id}
                                 todoListId={props.todoListId}
                                 task={t}
                                 removeTask={props.removeTask}
                                 changeStatus={props.changeStatus}
                                 changeTaskTitle={props.changeTaskTitle}/>
                    /*const onClickHandler = () => props.removeTask(t.id, props.todoListId)
                    const onChangeHandlerForChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, event.currentTarget.checked, props.todoListId)
                    }
                    const changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(t.id, newTitle, props.todoListId)
                    }
                    return <div key={t.id} className={t.isDone ? styles.isDone : ''}>
                        <IconButton onClick={onClickHandler} size={'small'}>
                            <Delete fontSize={'small'}/>
                        </IconButton>
                        <Checkbox defaultChecked
                                  size={'small'}
                                  color="primary"
                                  checked={t.isDone}
                                  onChange={onChangeHandlerForChangeStatus}/>
                        {/!*<input type="checkbox" checked={t.isDone}
                               onChange={onChangeHandlerForChangeStatus}/>*!/}
                        {/!*<input type="checkbox" checked={t.isDone} onChange={(event)=>onChangeHandlerForChangeStatus(t.id,event)}/>*!/}
                        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                        {/!*<span>{t.title}</span>*!/}
                        {/!*<button onClick={onClickHandler}>x</button>*!/}
                    </div>*/
                })
            }
        </div>

        <div>
            <ButtonGroup size={'small'} variant={'contained'} color={'primary'} disableElevation fullWidth>
                <Button color={filter === 'all' ? 'secondary' : 'primary'}
                        onClick={onAllClickHandler}>All</Button>
                <Button color={filter === 'active' ? 'secondary' : 'primary'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={filter === 'completed' ? 'secondary' : 'primary'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>
})
