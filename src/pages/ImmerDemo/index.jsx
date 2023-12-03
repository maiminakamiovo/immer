import { PageContainer } from '@ant-design/pro-components';
import { Button, Divider, Drawer, message, Card } from 'antd';
import { useCallback, useRef, useState } from 'react';

const ImmerDemo = () => {

  // 首先实现一个简单的共享状态的拷贝功能 


  // let cope = { ...state }
  // cope.email = '111@qq.com'
  // console.log(copo.name === state.name) // true 这里并没有去改变初始state中的值

  // step2
  // 实现一个简单的immer

  const state = {
    name: 'lily', email: "mina@gmail.com", hobbies: {
      read: '1'
    }
  }

  // function immer(state, thunk) {
  //   const handler = {
  //     get(target, prop) {
  //       return target[prop]; // 直接返回属性值
  //     },


  //     set(target, prop, value) {
  //       const copy = { ...target };
  //       // 浅拷贝只复制了原始数据对象的属性 而没有复制属性值所引用的对象 
  //       // 对于属性值是对象的情况copy的对象和原始数据对象会共享同一个对象
  //       copy[prop] = value; // 给拷贝对象赋值
  //       thunk(copy); // 调用 thunk 函数÷
  //       return true; // 必须返回 true 表示修改成功
  //     }
  //   };

  //   const proxy = new Proxy(state, handler);
  //   thunk(proxy);
  //   return proxy;
  // }

  // const newState = immer(state, draft => {
  //   draft.name = 'Bob';
  //   draft.email = 'qqaa';
  //   draft.hobbies.read = '3';
  // });

  function immer(state, thunk) {
    const handler = {
      get(target, prop) {
        return target[prop]; // 直接返回属性值
      },
      set(target, prop, value) {
        let copy = target;
        // 浅拷贝只复制了原始数据对象的属性 而没有复制属性值所引用的对象 
        // 对于属性值是对象的情况copy的对象和原始数据对象会共享同一个对象
        copy[prop] = value; // 给拷贝对象赋值
        thunk(copy); // 调用 thunk 函数，并传递修改后的对象
        return true; // 返回 true 表示修改成功
      }
    };

    const proxy = new Proxy(state, handler);
    thunk(proxy);
    return proxy; // 返回代理对象
  }

  const newState = immer(state, draft => {
    draft.name = 'Bob';
    draft.email = 'qqaa';
    draft.hobbies = { ...draft.hobbies, read: '3' }; // 修改嵌套对象的属性
  });

  console.log(JSON.stringify(newState))

  return (
    <PageContainer
      header={{
        title: 'Immerdemo',
      }}
    >
      <Card title='immer-demo' exter={<>
        <Button onClick={() => handlerChange('bd')}>changeValue</Button>
      </>} />

    </PageContainer>
  );
};

export default ImmerDemo;
