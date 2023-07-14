export type Todo = {
    id: number;
    title: string;
    priority: 0 | 1 | 2 | 3;
    completed: boolean;
};
type CreateAction={
    type: "create";
    payload: Omit<Todo, "id" | "completed">



};

type RemoveAction= {
    type: "remove";
    paload: number

}

type CompleteAction ={
    tepe: "complete";
    payload: {id: number; complete: boolean};
};

export type TodoActions = CreateAction | RemoveAction| CompleteAction

export type TodoContextProviderProps = {
    children: React.ReactNode;
};

export type TodoContextType = {
    todos: Todo[];
    addTodoItem: (item: CreateAction["payload"]) => void;
    removeTodoItem: (id: number) => void;
    markAsCompleted: (todo:CompleteAction["payload"]) => void;
}; 