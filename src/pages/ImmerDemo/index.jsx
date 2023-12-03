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

  function immer(state, callback) {
    const handler = {
      get(target, prop) {
        let value = target[prop];  // 草稿
        if (typeof value === 'object' && value !== null) {
          return new Proxy(value, handler); // 对嵌套对象进行代理
        }
        return value; 
      },

      // set(target, prop, value) {
      //   let copy = Array.isArray(target) ? [...target] : { ...target };
      //   console.log(copy,prop,value);
      //   copy[prop] = value;
      //   callback(copy);
      //   return true;
      // }

      // 错误示例 
      set(target, prop, value) {
        let copy = target;
        // 浅拷贝只复制了原始数据对象的属性 而没有复制属性值所引用的对象 
        // 对于属性值是对象的情况copy的对象和原始数据对象会共享同一个对象
        copy[prop] = value; // 给拷贝对象赋值
        callback(copy); // 调用 c'a'l'l'ba'c'k 函数，并传递修改后的对象
        return true; // 返回 true 表示修改成功
      }
    };

    const proxy = new Proxy(state, handler);
    callback(proxy);
    return proxy; // 返回代理对象
  }

  const newState = immer(state, draft => {
    draft.name = 'Bob';
    draft.email = 'qqaa';
    if (!draft.hobbies) { // 如果 hobbies 对象不存在，则进行初始化
      draft.hobbies = {};
    }
    draft.hobbies.read = '3';
    // 直接写draft.hobbies.read = '3';可能导致找不到hobbies
    // draft.hobbies = { ...draft.hobbies, read: '3' };  修改嵌套对象的性
  });

  console.log(newState)
  console.log(JSON.stringify(newState));
  // 这里返回的还是个proxy对象 查看的话可以可以使用JSON.stringify打印查看

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
