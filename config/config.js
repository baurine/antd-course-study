export default {
  singular: true,

  plugins: [
    ['umi-plugin-react', {
      antd: true,
    }]
  ],

  routes: [
    {
      path: '/',
      component: '../layout',
      routes: [
        {
          path: 'helloworld',
          component: './HelloWorld'
        }
      ]
    }
  ]
}
