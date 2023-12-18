import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';

const ImmerDemo = () => {
    // version1
    // ======================================================================================================
    // function produce(state, callback) {
    //     let draft = deepCopy(state); // 创建原数据的副本
    //     callback(draft); // 在回调函数中修改副本
    //     return draft; // 返回修改后的副本
    // }

    // function deepCopy(obj) {
    //     if (typeof obj !== 'object' || obj === null) {
    //         return obj;
    //     }
    //     const copy = Array.isArray(obj) ? [] : {};
    //     for (let key in obj) {
    //         if (obj.hasOwnProperty(key)) {
    //             copy[key] = deepCopy(obj[key]);
    //         }
    //     }
    //     return copy;
    // }

    // // 使用 produce 函数进行状态修改
    // const state = {
    //     name: 'Alice',
    //     age: 25,
    //     hobbies: ['reading', 'painting'],
    // };

    // const newState = produce(state, (draft) => {
    //     draft.name = 'Bob';
    //     draft.age = 30;
    //     if (!draft.hobbies) {
    //         draft.hobbies = [];
    //     }
    //     draft.hobbies.push('swimming');
    // });

    // console.log(state); // { name: 'Alice', age: 25, hobbies: [ 'reading', 'painting' ] }
    // console.log(newState); // { name: 'Bob', age: 30, hobbies: [ 'reading', 'painting', 'swimming' ] }

    // version2
    // ======================================================================================================

    function produce(state, callback) {
        const proxy = createProxy(state, callback);
        callback(proxy);
        return proxy._value;
    }

    function createProxy(target, callback) {
        const handler = {
            get(target, prop) {
                const value = target[prop];
                if (typeof value === 'object' && value !== null) {
                    return createProxy(value, callback);
                }
                return value;
            },
            set(target, prop, value) {
                const copy = deepCopy(target);
                copy[prop] = value;
                callback(copy);
                return true;
            },
        };
        const proxy = new Proxy({ _value: target }, handler);
        return proxy;
    }

    function deepCopy(obj) {
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }
        const copy = Array.isArray(obj) ? [] : {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                copy[key] = deepCopy(obj[key]);
            }
        }
        return copy;
    }

    // 使用 produce 函数进行状态修改
    const state = {
        name: 'Alice',
        age: 25,
        hobbies: ['reading', 'painting'],
    };

    const newState = produce(state, (draft) => {
        draft.name = 'Bob';
        draft.age = 30;
        if (!draft.hobbies) {
            draft.hobbies = [];
        } else {
            draft.hobbies.push('swimming');
        }
    });

    console.log(state); // { name: 'Alice', age: 25, hobbies: [ 'reading', 'painting' ] }
    console.log(newState); // { name: 'Bob', age: 30, hobbies: [ 'reading', 'painting', 'swimming' ] }
    console.log(JSON.stringify(newState));
    return (
        <PageContainer
            header={{
                title: 'Immerdemo',
            }}
        >
            <Card title="immer-demo" />
        </PageContainer>
    );
};

export default ImmerDemo;
