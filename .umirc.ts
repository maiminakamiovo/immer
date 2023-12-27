import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/produce',
    },
    {
      name: 'produce示例',
      path: '/produce',
      component: './Produce',
    },
    {
      name: '手写Immer',
      path: '/immerdemo',
      component: './ImmerDemo',
    },
    {
      name: 'useImmer示例',
      path: '/useImmer',
      component: './UseImmer',
    },
    {
      name: 'redux结合Immer使用示例',
      path: '/reduxImmer',
      component: './ImmerForRedux',
    },
  ],
  npmClient: 'yarn',
});

