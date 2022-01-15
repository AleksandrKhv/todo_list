type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            let newStageAge = {...state}
            newStageAge.age = state.age + 1;
            return newStageAge;
        case 'INCREMENT-CHILDREN-COUNT': //а можно писать сразу в одну строчку через ретурн, что возвращаем копию стейта с измененныем значением чилдренкаунт
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            }
        case 'CHANGE-NAME':
            let newStateName = {...state}
            newStateName.name = action.newName
            return newStateName
        default:
            throw new Error("I don't understand this type")
    }
}
