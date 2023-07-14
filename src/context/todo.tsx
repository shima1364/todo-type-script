import { createContext, useReducer,Reducer} from "react";
import { Todo, TodoContextProviderProps, TodoContextType } from "./types";

export const TodoContext = createContext({} as TodoContextType);
const initialState: TodoState ={
    todos: [],
};
const reducer: Reducer<TodoState, TodoActions> = (state, action) => {
    switch (action.type){
        case "create":{
            return {
                todos : [
                    ...state.todos, 
                    {...action.payload, id:state.todos.length + 1, completed:false}
                ],
            };
        }

        case "remove": {
            return { todos: state.todos.filter((todo)=> todo.id !== action.payload)

            };
        }
        case "complete": {
            const copyofTodos = [...state.todos];
            const todoIndex = copyofTodos.findIndex((todo)=> todo.id === action.payload.id);
            copyofTodos[todoIndex].completed = action.payload.complete;
            return {todos: copyofTodos}

        }
        default:
        return state;
    }

};

export const TodoContextProvider = ({children}: TodoContextProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
    <TodoContext.Provider 
      value={{
        todos: state.todos,
        addTodoItem: (item) => dispatch({type: "create", payload: item}),
        removeTodoItem: (id) => dispatch({type: "remove", payload: id}),
        markAsCompleted: (id) => dispatch({type: "complete", payload: id}),


       }}
    >
        {children}
   </TodoContext.Provider>
   )


}
