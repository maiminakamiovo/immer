import { Button } from 'antd';
import { produce } from 'immer';
import { createStore } from 'redux';

const UserForm = () => {
    // 初始状态
    const initialState = {
        todos: [
            { id: 1, text: 'Buy groceries', completed: false },
            { id: 2, text: 'Write code', completed: true },
        ],
    };

    // Reducer 函数，使用 Immer 处理状态变更
    const todosReducer = (state = initialState, action) => {
        return produce(state, (draft) => {
            switch (action.type) {
                case 'ADD_TODO':
                    // 增加 todo
                    draft.todos.push({ id: action.id, text: action.text, completed: false });
                    break;
                case 'TOGGLE_TODO':
                    // 切换 todo 的完成状态
                    const toggledTodo = draft.todos.find((todo) => todo.id === action.id);
                    if (toggledTodo) {
                        toggledTodo.completed = !toggledTodo.completed;
                    }
                    break;
                // 删除
                case 'DELETE_TODO':
                    draft.todos = draft.todos.splice(draft.todos.findIndex((todo) => todo.id === action.id));
                    break;
                // 编辑
                case 'EDIT_TODO':
                    draft.todos[draft.todos.findIndex((todo) => todo.id === action.id)]['text'] = action.text;
                    break;
                // 查找
                case 'SEARCH_TODO':
                    draft.todos = draft.todos.filter((todo) => todo.id === action.id);
                    break;
                case 'RESET_TODOS':
                    // 重置 todos 到初始状态
                    draft.todos = initialState.todos;
                    break;
                default:
                    break;
            }
        });
    };

    // 创建 Redux store
    const store = createStore(todosReducer);
    // 订阅 state 变化
    store.subscribe(() => {
        console.log('Current State:', store.getState());
    });

    return (
        <div>
            <Button onClick={() => store.dispatch({ type: 'ADD_TODO', id: 3, text: 'Learn Redux' })}>Add</Button>
            <Button onClick={() => store.dispatch({ type: 'DELETE_TODO', id: 2 })}>Del</Button>
            <Button onClick={() => store.dispatch({ type: 'EDIT_TODO', id: 1, text: 'Hello,world' })}>Edit</Button>
            <Button onClick={() => store.dispatch({ type: 'SEARCH_TODO', id: 1 })}>Search</Button>
            <Button onClick={() => store.dispatch({ type: 'RESET_TODOS' })}> Reset</Button>
        </div>
    );
};

export default UserForm;
