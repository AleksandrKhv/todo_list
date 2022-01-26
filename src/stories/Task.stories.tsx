import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import Task from '../Task';
import {action} from '@storybook/addon-actions';

export default {
    title: 'TODOLISTS/Task',
    component: Task,
    args: {
        removeTask: action('Remove task'),
        changeStatus: action('Change status'),
        changeTaskTitle: action('Change title'),
        todoListId: '7',
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
    task: {id: '1', title: 'React', isDone: true},
};

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
    task: {id: '1', title: 'React', isDone: false},
};

