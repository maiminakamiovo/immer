import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  createUser,
  editUser,
  saveUser,
  resetUser,
  deleteUser,
} from './actionType';

const UserForm = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    name: '',
    age: '',
    address: '',
  });

  const handleCreateUser = () => {
    dispatch(createUser(userInfo));
  };

  const handleEditUser = () => {
    dispatch(editUser(userInfo));
  };

  const handleSaveUser = () => {
    dispatch(saveUser());
  };

  const handleResetUser = () => {
    dispatch(resetUser());
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  return (
    <div>
      {user ? (
        <>
          <h2>Edit User</h2>
          <Input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="age"
            value={userInfo.age}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="address"
            value={userInfo.address}
            onChange={handleChange}
          />
          <Button onClick={handleSaveUser}>Save</Button>
          <Button onClick={handleResetUser}>Reset</Button>
          <Button onClick={handleDeleteUser}>Delete</Button>
        </>
      ) : (
        <>
          <h2>Create User</h2>
          <Input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="age"
            value={userInfo.age}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="address"
            value={userInfo.address}
            onChange={handleChange}
          />
          <Button onClick={handleCreateUser}>Create</Button>
        </>
      )}
    </div>
  );
};

export default UserForm;