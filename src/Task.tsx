import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from './Todolist';
import styles from './Todolist.module.css';
import {Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import EditableSpan from './EditableSpan';

export type PropsType = {
    todoListId: string
    task: TaskType
    removeTask: (id: string, todoListId: string) => void
    changeStatus: (id: string, event: boolean, todoListId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void
}

const Task = React.memo(({todoListId, task, removeTask, changeStatus, changeTaskTitle}: PropsType) => {
    const onClickHandler = useCallback(() => removeTask(task.id, todoListId), [task.id, removeTask, todoListId])
    const onChangeHandlerForChangeStatus = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        changeStatus(task.id, event.currentTarget.checked, todoListId)
    }, [task.id, changeStatus, todoListId])
    const changeTaskTitleHandler = useCallback((newTitle: string) => {
        changeTaskTitle(task.id, newTitle, todoListId)
    }, [task.id, changeTaskTitle, todoListId])

    return <div key={task.id} className={task.isDone ? styles.isDone : ''}>
        <IconButton onClick={onClickHandler} size={'small'}>
            <Delete fontSize={'small'}/>
        </IconButton>
        <Checkbox defaultChecked
                  size={'small'}
                  color="primary"
                  checked={task.isDone}
                  onChange={onChangeHandlerForChangeStatus}/>
        {/*<input type="checkbox" checked={t.isDone}
                               onChange={onChangeHandlerForChangeStatus}/>*/}
        {/*<input type="checkbox" checked={t.isDone} onChange={(event)=>onChangeHandlerForChangeStatus(t.id,event)}/>*/}
        <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
        {/*<span>{t.title}</span>*/}
        {/*<button onClick={onClickHandler}>x</button>*/}
    </div>
})


export default Task;