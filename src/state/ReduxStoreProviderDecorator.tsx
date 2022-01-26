import React from 'react';
import {Provider} from 'react-redux';
import {AppRootStateType, store} from './store';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './tasks2-reducer';
import {todolistsReducer} from './todolists-reducer';
import {v1} from 'uuid';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})

const initialGlobalState = {
    todoLists: [
        {id: 'todoListId_1', title: 'What to learn', filter: 'all'},
        {id: 'todoListId_2', title: 'What to buy ', filter: 'all'}
    ],
    tasks: {
        ['todoListId_1']: [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        ['todoListId_2']: [
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "CASS", isDone: false},
            {id: v1(), title: "MySQL", isDone: false},
            {id: v1(), title: "WorldPress", isDone: false},
            {id: v1(), title: "CSS", isDone: false},
        ],
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);


const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
};

export default ReduxStoreProviderDecorator;