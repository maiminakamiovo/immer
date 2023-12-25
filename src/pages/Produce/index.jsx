import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Table } from 'antd';
import { produce } from 'immer';
import { useCallback, useState } from 'react';

export default function AccessPage() {
    const [todoList, setTodolist] = useState([
        { name: 'lily', age: 12 },
        { name: 'judy', age: 13 },
    ]);

    const [todo, setTodo] = useState(val);

    let val = { name: 'lily', age: 12, val: { key: '1' } };
    const columns = [
        { title: 'Full Name', dataIndex: 'name', key: 'name', fixed: 'left' },
        { title: 'Age', dataIndex: 'age', key: 'age', fixed: 'left' },
    ];

    // 增
    const handleAdd = useCallback((obj) => {
        setTodolist(
            produce((draft) => {
                draft.push(obj);
            }),
        );
    });

    // 增
    const chanegTodo = useCallback((val1, val2) => {
        setTodo(
            produce((draft) => {
                draft[val1] = val2;
                console.log(draft);
            }),
        );
    });

    // 删
    const handleRemove = useCallback((val) => {
        setTodolist(
            produce((draft) => {
                draft.splice(
                    draft.findIndex((index) => index.name === val),
                    1,
                );
            }),
        );
    });

    // 改
    const handleChange = useCallback((val1, val2, val3) => {
        setTodolist(
            produce((draft) => {
                let todo = draft.findIndex((index) => index.name === val1);
                draft[todo][val2] = val3;
            }),
        );
    });

    // 查
    const handleSearch = useCallback((val) => {
        setTodolist(
            produce((draft) => {
                // 这里filter返回的是一个新数组 则需要return   pusu splice
                // 等函数是直接修改原始数组的方法，它们会改变原始数组并返回修改后的数组长度，而不是返回修改后的数组本身
                return draft.filter((index) => index.name === val);
            }),
        );
    });

    return (
        <PageContainer
            ghost
            header={{
                title: 'produce',
            }}
        >
            <Card
                extra={
                    <>
                        <Button onClick={() => handleAdd({ name: 'yanguang', age: 21 })}>add</Button>
                        <Button onClick={() => handleRemove('judy')}>remove</Button>
                        <Button onClick={() => handleChange('lily', 'age', 88)}>edit</Button>
                        <Button onClick={() => handleSearch('judy')}>search</Button>
                        <Button onClick={() => chanegTodo('name', 'wwww')}>search</Button>
                    </>
                }
            >
                <Table columns={columns} dataSource={todoList} />
            </Card>
        </PageContainer>
    );
}

AccessPage;
