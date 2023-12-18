import produce from 'immer';
import {
    CREATE_USER,
    EDIT_USER,
    SAVE_USER,
    RESET_USER,
    DELETE_USER
} from './actionType';

const initialState = {
    user: null,
};

const userReducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case CREATE_USER:
            case EDIT_USER:
                draft.user = action.payload;
                break;
            case SAVE_USER:
                // 将用户信息保存到持久化存储中
                // 重置表单为初始状态
                draft.user = null;
                break;
            case RESET_USER:
                draft.user = null;
                break;
            case DELETE_USER:
                draft.user = null;
                // 进行删除用户的逻辑
                break;
            default:
                break;
        }
    });
};

export default userReducer;