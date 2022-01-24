import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type propsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

const EditableSpan = React.memo((props: propsType) => {
    let [title, setTitle] = useState(props.title)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditMode = () => {
        setEditMode(true)
    }

    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    return (
        editMode
            ? <TextField value={title}
                         size={'small'}
                         onChange={onChangeHandler}
                         autoFocus={true}
                         onBlur={offEditMode}
                         variant={'outlined'}
                         color={'secondary'}
            />
            /* <input value={title}
                     onChange={onChangeHandler}
                     autoFocus={true}
                     onBlur={offEditMode}/>*/
            : <span onClick={onEditMode} style={{cursor: 'pointer'}}>{props.title}</span>
    );
})

export default EditableSpan;