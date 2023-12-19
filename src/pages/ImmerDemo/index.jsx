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

    function produce(baseState, producer) {
        // 深度克隆初始状态
        const clonedState = deepClone(baseState);
        // 创建 Proxy 对象
        const proxy = createProxy(clonedState);
        // 执行 producer 函数，其中对 proxy 的任何修改都会被捕获
        producer(proxy);
        // 获取最终的修改结果
        const result = getFinalResult(clonedState);
        return result;
    }

    // 创建 Proxy 对象的函数
    function createProxy(baseState) {
        // 用于存储修改的路径和对应的值
        const patches = [];
        // 使用 Proxy 拦截对象的操作
        const handler = {
            get(target, prop) {
                // 如果属性是一个对象，递归创建 Proxy
                if (typeof target[prop] === 'object' && target[prop] !== null) {
                    return createProxy(target[prop], (path) => `${prop}.${path}`);
                }
                return target[prop];
            },
            set(target, prop, value) {
                // 记录修改的路径和对应的值
                patches.push({ path: prop, value });
                // 应用修改到克隆对象
                target[prop] = value;
                return true;
            },
        };
        // 创建 Proxy 对象
        const proxy = new Proxy(baseState, handler);
        // 递归创建 Proxy 的函数
        function createProxy(target, pathFn) {
            return new Proxy(target, {
                get(subTarget, prop) {
                    if (typeof subTarget[prop] === 'object' && subTarget[prop] !== null) {
                        return createProxy(subTarget[prop], (path) => `${pathFn(prop)}.${path}`);
                    }
                    return subTarget[prop];
                },
                set(subTarget, prop, value) {
                    patches.push({ path: pathFn(prop), value });
                    subTarget[prop] = value;
                    return true;
                },
            });
        }
        // 在 Proxy 上附加方法，用于获取最终的修改结果
        proxy.getPatches = () => patches;
        return proxy;
    }

    // 获取最终的修改结果
    function getFinalResult(clonedState) {
        const patches = clonedState.getPatches();
        // 应用所有的修改到原始对象，得到最终的结果
        const result = applyPatches(clonedState, patches);
        return result;
    }

    // 应用修改到原始对象的函数
    function applyPatches(baseState, patches) {
        // 克隆原始对象
        const nextState = deepClone(baseState);
        // 遍历所有的修改，将其应用到新对象上
        patches.forEach((patch) => {
            const path = patch.path.split('.');
            let target = nextState;
            // 寻找修改的目标对象
            for (let i = 0; i < path.length - 1; i++) {
                target = target[path[i]];
            }
            // 应用修改
            target[path[path.length - 1]] = patch.value;
        });

        return nextState;
    }

    // 深度克隆对象的函数
    function deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    // 示例
    const state = { a: 1, b: { c: 2 } };
    const nextState = produce(state, (draft) => {
        draft.a = 42;
        draft.b.c = 99;
    });

    console.log(state); // 输出: { a: 1, b: { c: 2 } }
    console.log(nextState); // 输出: { a: 42, b: { c: 99 } }

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
