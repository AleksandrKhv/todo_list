import React, {ChangeEvent, useState} from 'react';

type propsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

const EditableSpan = (props: propsType) => {
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
            ? <input value={title}
                     onChange={onChangeHandler}
                     autoFocus={true}
                     onBlur={offEditMode}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

export default EditableSpan;