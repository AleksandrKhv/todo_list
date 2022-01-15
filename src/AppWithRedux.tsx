import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {AppBar, Paper, Toolbar, IconButton, Button, Typography, Container, Grid} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeStatusTitleAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks2-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    /*const todoListId_1 = v1()
    const todoListId_2 = v1()*/

    /*const [todoLists, dispatchTodolist] = useReducer(todolistsReducer, [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy ', filter: 'all'}
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "CASS", isDone: false},
            {id: v1(), title: "MySQL", isDone: false},
            {id: v1(), title: "WorldPress", isDone: false},
            {id: v1(), title: "CSS", isDone: false},
        ],
    })*/

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    function removeTask(id: string, todoListId: string) {
        let action = removeTaskAC(id, todoListId)
        dispatch(action)

    }

    function addTask(title: string, todoListId: string) {
        dispatch(addTaskAC(title, todoListId))
    }

    const changeStatus = (CurrentId: string, value: boolean, todoListId: string) => {
        dispatch(changeStatusTitleAC(CurrentId, value, todoListId))
    }

    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todoListId))
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatch(changeFilterTodolistAC(value, todoListId))
    }

    function changeTodoListTitle(title: string, todoListId: string) {
        dispatch(changeTitleTodolistAC(title, todoListId))
    }

    const removeTodoList = (todoListId: string) => {
        let action = removeTodolistAC(todoListId)
        dispatch(action)
    }

    const addTodoList = (title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)
    }

    const todoListComponents = todoLists.map(tl => {
        let tasksForTodolist = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(tl => !tl.isDone);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(tl => tl.isDone);
        }
        return (<Grid item key={tl.id}>
                <Paper elevation={3} style={{padding: 20}}>
                    {/*<div className="App">*/}
                    <Todolist todoListId={tl.id}
                              title={tl.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeStatus={changeStatus}
                              filter={tl.filter}
                              removeTodoList={removeTodoList}
                              changeTaskTitle={changeTaskTitle}
                              changeTodoListTitle={changeTodoListTitle}
                    />
                    {/*</div>*/}
                </Paper>
            </Grid>
        );
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;
