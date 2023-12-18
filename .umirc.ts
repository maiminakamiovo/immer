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
      name: 'produce',
      path: '/produce',
      component: './Produce',
    },
    {
      name: 'immerdemo',
      path: '/immerdemo',
      component: './ImmerDemo',
    },
    {
      name: 'useImmer',
      path: '/useImmer',
      component: './UseImmer',
    },
    {
      name: 'redux-useImmer',
      path: '/reduxImmer',
      component: './ImmerForRedux',
    },
  ],
  npmClient: 'yarn',
});

