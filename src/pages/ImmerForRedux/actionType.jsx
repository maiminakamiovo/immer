export const CREATE_USER = 'CREATE_USER';
export const EDIT_USER = 'EDIT_USER';
export const SAVE_USER = 'SAVE_USER';
export const DELETE_USER = 'RESET_USER';
export const RESET_USER = 'RESET_USER';


//创建
export const createUser = (user) => ({
  type: CREATE_USER,
  payload: user,
});

// 编辑
export const editUser = (user) => ({
  type: EDIT_USER,
  payload: user,
});

// 保存
export const saveUser = () => ({
  type: SAVE_USER,
});

// 删除
export const deleteUser = () => ({
    type: DELETE_USER,
  });

// 重重
export const resetUser = () => ({
  type: RESET_USER,
});

