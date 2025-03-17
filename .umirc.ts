import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {
    // configProvider
    configProvider: {},
    // themes
    dark: true,
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  mfsu: false,
  layout: {
    title: 'Bigtou',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '图片标注',
      path: '/home',
      component: './Home',
    },
    {
      name: '点云标注',
      path: '/point-cloud',
      component: './PointCloud',
    },
    {
      name: '标签树',
      path: '/tag-tree',
      component: './TagTree',
    },
    {
      name: 'Chat',
      path: '/chat',
      component: './Chat',
    },
  ],

  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3000',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  npmClient: 'pnpm',
  tailwindcss: {},
});
