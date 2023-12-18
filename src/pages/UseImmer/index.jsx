/**
 * @file: immer  useImmer, useImmerReducer示例
 * @author: wuqiying
 */

import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useImmer, useImmerReducer } from 'use-immer';

const initialState = {
    users: [
        { id: 1, name: 'John', age: 25 },
        { id: 2, name: 'Jane', age: 30 },
    ],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'updateUser':
            // eslint-disable-next-line no-case-declarations
            const user = state.users.find((user) => user.id === action.payload.id);
            if (user) {
                user.name = action.payload.name;
                user.age = action.payload.age;
            }
            break;
        default:
            break;
    }
};

const HomePage = () => {
    let data = [];
    for (let i = 0; i < 12; i++) {
        data.push({
            key: i,
            name: `Edward ${i}`,
            age: 32,
            address: `London Park no. ${i}`,
        });
    }
    const [dataMap, setDataMap] = useState(data);
    const [person, updatePerson] = useImmer(data);
    const [state, dispatch] = useImmerReducer(reducer, initialState);
    // 使用useImmerReducer创建的Reducer函数中，我们不需要再手动处理状态的更新，
    // 因为useImmerReducer已经自动使用immer来处理了状态的更新。这样可以让我们更方便地使用可变的操作来修改原有对象或数组中的某一项

    const updateUser = (payload) => {
        dispatch({ type: 'updateUser', payload });
    };
    // 在updateUser函数中，我们通过调用dispatch函数并传入updateUser类型的action来更新一个用户的信息。
    // 在Reducer函数中，我们使用find方法找到指定ID的用户对象，并直接修改其name和age属性。

    const columns = [
        { title: 'Full Name', dataIndex: 'name', key: 'name', fixed: 'left' },
        { title: 'Age', dataIndex: 'age', key: 'age', fixed: 'left' },
        { title: 'Address', dataIndex: 'address', key: 'address', fixed: 'left' },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            render: () => <a>action</a>,
        },
    ];

    function updateName(name) {
        updatePerson((draft) => {
            draft[0].name = name;
            console.log(draft);
            console.log(JSON.stringify(draft));
        });
    }

    console.log(data);
    console.log(person);

    const modifyDefaultData = () => {
        dataMap[0]['name'] = 'Jim';
        setDataMap(dataMap);
    };

    // Cannot assign to read only property '0' of object '[object Array]'   出现此原因 是因为immer冻结了初始state
    // 通过 produce 生成的 nextState 是被冻结freeze的 immer内部使用Object.freeze方法，
    // 只冻结 nextState 跟 currentState 相比修改的部分，这样，当直接修改nextState 时将会报错 这使得 nextState 成为了真正的不可变数据。

    useEffect(() => {
        // console.log(32323);
        // console.log(dataMap);
        // console.log(person);
        // console.log(state.users);
        // 不会执行
    }, [dataMap, person, state.users]);

    return (
        <PageContainer ghost>
            <Card
                extra={
                    <>
                        <Button onClick={modifyDefaultData}>修改默认数据</Button>
                        <Button onClick={() => updateName('lili')}>使用immer修改默认数据</Button>
                        <Button onClick={() => updateUser({ id: 2, name: 'Jane Doe', age: 35 })}>使用immer-useImmerReducer修改默认数据</Button>
                    </>
                }
            >
                <Table columns={columns} dataSource={dataMap} />
                <ul>
                    {state.users.map((user) => (
                        <li key={user.id}>
                            {user.name} - {user.age}{' '}
                        </li>
                    ))}
                </ul>
            </Card>
        </PageContainer>
    );
};

export default HomePage;
