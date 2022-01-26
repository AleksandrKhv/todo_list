import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {action} from '@storybook/addon-actions';
import EditableSpan from '../EditableSpan';

export default {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
    title: '123',
    changeTitle: action('newTitle: string')
};
