# Ant Design Course Note

Learn Ant Design from [Ant Design 实战教程（beta 版）](https://www.yuque.com/ant-design/course)

![](../art/antd-course-demo.png)

## Note

antd 中很多组件使用了 prop 为 component 的用法：

    <SubMenu
      title={<span><Icon type='dashboard'/><span>Dashboard</span></span>}>
      <Menu.Item>分析页</Menu.Item>
      <Menu.Item>监控页</Menu.Item>
      <Menu.Item>工作台</Menu.Item>
    </SubMenu>

    <Card.Meta
      avatar={<img 
        alt=""
        style={{ width: '64px', height: '64px', borderRadius: '32px' }}
        src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"/>}
      title="Alipay"
      description="在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。"/>

用到了 render prop 模式 (Table 组件)：

    class List extends React.Component {
      columns = [
        {
          title: '名称',
          dataIndex: 'name'
        },
        {
          title: '描述',
          dataIndex: 'desc'
        },
        {
          title: '链接',
          dataIndex: 'url',
          render: value => <a href={value}>{value}</a>
        }
      ]

在 Layout 中使用了 props.children：

    <Layout>
      <Sider>sider</Sider>
      <Layout>
        <Header>header</Header>
        <Content>{ this.props.children }</Content>
        <Footer>footer</Footer>
      </Layout>
    </Layout>

umi 集成了 mock 和 proxy 功能。

dva 定义 model 后不用显式调用 `app.model(myModel)`，会自动被使用。

自动启动了 css modules。

> CSS modules 不是一个可以安装的 npm 包，也不是 w3c 中的某个标准，只是一项流行的社区规范（an opinionated proposal）。webpack browserify 等打包工具（module bundler）的能力让工具生成局部 CSS 成为可能，CSS modules 规范也应运而生。

上传与下载一小节的总结很不错。

理解了这个课程后再看 Ant Design Pro 的文档就很好理解了。

---

Update: 重新记录一些更详细的笔记，上面的笔记太粗略了。

### 第一章 - 基础知识

#### 前端开发的演变

略。

#### 初始化项目

采用 umi 作为脚手架/编译工具。

初始化项止:

    $ mkdir antd-course
    $ cd antd-course
    $ npm init [-y]

安装 umi:

    $ npm install umi --save-dev

umi 采用的目录结构 (手动创建)：

    - antd-course
      - config
        - config.js
      - src
        - components
        - layout
        - page
          - HelloWorld.js
      - package.json
      - .gitignore
      - node_modules

> 在 umi 中，大量的使用了配置和约定来帮助你快速开发代码。首先，我们先来创建配置文件。配置文件被约定为 config/config.js (或者 .umirc.js，二选一)。

> 在 umi 中，约定的存放页面代码的文件夹是 pages，是复数，不过如果你喜欢单数的话你配置项中你可以添加 singular 为 true 来让 page 变为约定的文件夹。

    // config/config.js
    export default {
      singular: true,
    }

修改 package.json 增加 umi 的启动代码:

    {
      "scripts": {
    +   "dev": "umi dev",
    +   "build": "umi build"
      }
    }

启动:

    $ npm run dev

访问 `http://localhost:8000/helloworld`

> 在 umi 中，你可以使用约定式的路由，在 page 下面的 JS 文件都会按照文件名映射到一个路由，比如上面这个例子，访问 `/helloworld` 会对应到 HelloWorld.js。

> 除了约定式的路由，你也可以使用配置式的路由。至于使用哪种路由取决于你的喜好，这不是本课程的重点。在本课程中为了让开发者更好的理解路由组件嵌套，我们会使用配置式的路由。

配置式路由:

    // config/config.js
    export default {
      routes: [{
        path: '/',
        component: './HelloWorld',
      }],
    }

之前学习 Next.js，觉得用法很相似。

> 当有了 routes 的配置之后 umi 就不会再执行约定式对应的路由逻辑了，而是直接使用你通过配置声明的路由。

##### 添加 umi-plugin-react 插件

> umi 是一个可插拔的企业级 react 应用框架，它的很多功能都是通过插件实现。尤其是 umi 官方的 umi-plugin-react 这个插件集成了常用的一些进阶的功能。

比如这个插件可以用来集成 antd 和 dva ... (那我为啥不单独安装它们呢)

安装:

    $ npm install umi-plugin-react --save-dev

配置:

    export default {
      plugins: [
        ['umi-plugin-react', {
          // 这里暂时还没有添加配置，该插件还不会有作用，我们会在后面的课程按照需求打开相应的配置
          // antd: true,
          // dva: true
        }],
      ],
      ...

构建和布署:

    $ npm run build  // 实际执行的 umi build

#### 第一个组件

略。

#### 使用 Ant Design 组件

一般项目中需要安装 antd:

    $ npm install antd --save

> 在 umi 中，你可以通过在插件集 umi-plugin-react 中配置 antd 打开 antd 插件，antd 插件会帮你引入 antd 并实现按需编译。

(关键是这个按需编译，就是说没用到的组件不会被打包)

    // config/config.js
    export default {
      plugins: [
        ['umi-plugin-react', {
          antd: true
        }],
      ],
      // ...
    }

组件的使用:

    import { Card } from 'antd';

    export default () => {
      const style = {
        width: '400px',
        margin: '30px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        border: '1px solid #e8e8e8',
      };

      return (
        <Card style={style} actions={[<a>操作一</a>, <a>操作二</a>]}>
          <Card.Meta
            avatar={<img 
              alt=""
              style={{ width: '64px', height: '64px', borderRadius: '32px' }}
              src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"
            />}
            title="Alipay"
            description="在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。"
          />
        </Card>
      );
    }

#### 受控与非受控组件

略。

### 第二章 - 布局与路由

#### 基本布局

布局，使用了 props.children。

在 src 目录下创建 layout 目录，创建 layout/index.js:

    import { Component } from 'react';
    import { Layout } from 'antd';

    // Header, Footer, Sider, Content组件在Layout组件模块下
    const { Header, Footer, Sider, Content } = Layout;

    class BasicLayout extends Component {
      render() {
        return (
          <Layout>
            <Sider>Sider</Sider>
            <Layout>
              <Header>Header</Header>
              <Content>{this.props.children}</Content>
              <Footer>Footer</Footer>
            </Layout>
          </Layout>
        )
      }
    }

    export default BasicLayout;

给 layout 添加样式，略。

配置路由，让所有 pages 都使用此 layout，即 page 作为 layout 的 children。

    // config/config.js
    routes: [{
      path: '/',
      component: '../layout',
      routes: [
        {
          path: 'helloworld',
          component: './HelloWorld'
        },
      ]
    }],

#### 侧边导航

在 layout 中 Sider 中使用 Menu/SubMenu/Menu.Item 组件。

#### 路由配置

前面已讲述，详略。

路由的跳转，使用 Link 组件。

### 第三章 - 小试牛刀

#### 使用 model

引入 dva。

一般项目中使用 dva 需要安装:

    $ npm install dva --save

> 在 umi 中，你可以通过在插件集 umi-plugin-react 中配置 dva 打开 dva 插件。

    // config/config.js
    export default {
      plugins: [
        ['umi-plugin-react', {
          antd: true,
          dva: true,
        }],
      ],
      // ...
    }

dva 已熟悉使用，详略。dva 的核心是 model，贴一个示例:

    const todos: Model = {
      namespace: 'todoList',

      state: [],

      effects: {
        *query({ _ }, { put, call }) {
          const rsp = yield call(queryTodoListFromServer);
          const todoList = rsp.data;
          yield put({ type: 'save', payload: todoList });
        },
      },

      reducers: {
        save(state, { payload: todoList }) {
          return [...state, todoList];
        },
      },
    }

要注意的是，在自己项目中单独使用 dva 时需要手动调用 `app.model(todos)` 注册，在 umi 中只需定义所需的 model，它会自动被注册。

#### 搭建基于 model 的卡片列表页面

详略，已熟悉。稍与平时使用有点不同的就是，它使用 @connect 这种 ES7 的语法。

    import React, { Component } from 'react';
    import { Card ,Button } from 'antd';
    import { connect } from 'dva';

    const namespace = 'puzzlecards';

    const mapStateToProps = (state) => {
      const cardList = state[namespace].data;
      return {
        cardList,
      };
    };

    const mapDispatchToProps = (dispatch) => {
      return {
        onClickAdd: (newCard) => {
          const action = {
            type: `${namespace}/addNewCard`,
            payload: newCard,
          };
          dispatch(action);
        },
      };
    };

    @connect(mapStateToProps, mapDispatchToProps)
    export default class PuzzleCardsPage extends Component {
      ...

#### 在 model 中请求服务器端数据

Effect 和 Generator function

    // dva model
    export default {
      namespace: 'some_namespace',
      state: {},
      effects: { // 定义 effects 成员
        'someEffect': function*() {},
        'someOtherEffect': function*() {},
        // ...
      },
      reducers: {
        // ...
      },
    }

> 对于视图层来讲，其实并不会感知 effect 和 reducer 的区别。视图层只是通过 action 描述想做什么，至于这个 action 之后是直接被 reducer 处理还是通过 effect 再到 reducer，视图层并不感知，也不应该关心。这样我们就做到了**数据逻辑和视图逻辑的分离处理**。

> 一个 generator function 在执行时有**两方**。一方是 generator function 本身，另一方是 generator function 的句柄持有者，而这一般都是框架所持有。我们姑且称这个句柄为 genStub。当框架调用 genStub.next() 时，generator function 会执行到下一个 yield 然后暂停，并把 yield 后面表达式的计算值返还给框架，同时把程序执行权交给框架。框架拿到值后做处理，比如就是异步处理，处理结束拿到结果，再次调用 genStub.next()，返还值给 generator function 同时驱动它恢复执行。当恢复执行时，你可以认为**返回的处理结果会整体替换 `yield <expression>`**，然后程序继续执行到下一个 yield。

其余略。

跨域问题:

> 发送 ajax 请求的是你的浏览器，所谓 User Agent，而「跨域」的限制 仅仅在浏览器和服务器之间。我们不能强制远程服务器都像例子中那样允许「跨域」请求，所以我们能做的就是不要使用浏览器发送请求。所以在前端开发中，一种常见的规避跨域的方法就是：把 ajax 请求发送到你的本地开发服务器，然后本地开发服务器再把 ajax 请求转发到远端去，从网络拓扑上看本地开发服务器起着「反向代理」的作用。本地服务器和远端服务器是「服务器和服务器间的通信」，就不存在跨域问题了。

umi 支持本地代理，配置的方法是在 config/config.js 中增加 proxy 字段，比如:

    routes: [
    // ...
    ],

    proxy: {
      '/dev': {
        target: 'https://08ad1pao69.execute-api.us-east-1.amazonaws.com',
        changeOrigin: true,
      },
    },

配置的含义是如果以 `/dev` 开头的请求，

> 配置的含义是：去往本地服务器 localhost:8000 的 ajax 调用中，如果是以 `/dev` 开头的，那么就转发到远端的 `https://08ad1pao69.execute-api.us-east-1.amazonaws.com` 服务器当中，`/dev` 也会保留在转发地址中。

> 比如，`localhost:8000/dev/random_joke` 就会被本地服务器转发到 `https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke`

所以原来在代码中直接访问 `https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke` 的地方改成访问 `/dev/random_joke` 就不会有跨域的问题了。

#### 模拟服务端数据

umi 内置 mock 功能，创建与 src 同级的 mock 目录后自动生效。(疑问: 那怎么取消呢，不让它自动生效。)

详略。


### 第四章 - 复杂页面

表格，表单，图表...

表单值得看一下，项目中还是经常用得到的。需要时再回来看。

### 第五章 - 进阶功能

#### 自定义样式

    .
    └── src
        └── pages
            ├── index.jsx
            └── styles.css

    // index.jsx
    import myStyles from './styles.css';
    export default () => {
      return (
        <div className={myStyles.hello}>Hello World</div>
      );
    };

使用了 CSS Modules。

> webpack 实现 CSS module 的原理

> 在现代 web 开发中，服务器并不能直接使用我们写的 JS CSS HMTL 文件。事实上，我们按照规范写出代码，输入给编译工具 (transpiler) ，它最终把代码转换/打包，输出成浏览器可以使用的 JS CSS HTML。在多年的社区沉淀后，脱颖而出的是诸如 webpack 这样的工具，这类编译工具又称为 module bundler。webpack 允许我们用 import/export (ES6) 或者 require/module.exports (CommonJs) 这样的语法来书写我们的 JS 代码，它甚至允许我们在 js 里面 import 一个 CSS 文件。注意：如果脱离了 webpack 的语境，这么写当然是会引起语法错误的。

> 在现代 web 开发中，我们的运行时代码强耦合了编译时工具，强耦合换来的是传统 web 开发所不可企及的新能力。对于 webpack，当我们每次写了 import A from B 的时候，我们其实是声明了一个A 对于 B 的依赖。当在 a.js 中写入 import styles from a.css 后，webpack 就可以把这个依赖翻译成：每当 a.js 被使用时，保证生成一个 style 标签，里面嵌入 a.css 的内容。同时 webpack 给予我们另一个能力：不同类型文件间可以信息传递。webpack 把 a.css 中的类名根据规则编译成为全局唯一的字符串，传递给 a.js 使用，于是手工维持的命名规则就可以自动生成。

> 注意：很多 CSS 选择器是不会被 CSS Modules 处理的，比如 body、div、a 这样的 HTML 标签名就不会。我们推荐如果要定义局部 css 样式/动画，只使用 class 或 @keyframe。

(oh, shit...but make sense，解决办法就是在 css 文件中不使用 tag，只使用 class)

##### CSS modules 与 Less 语法一起使用

antd 也是使用了 less。

目录结构:

    .
    └── src
        └── pages
            ├── css-modules-with-less
            │   ├── index.jsx
            │   └── styles.less
            ├── index.jsx
            └── styles.css

定义 less 文件:

    // styles.less
    @grey-color: rgba(0, 0, 0, .25);

    .hello {
      font-size: 32px;
      font-weight: bold;
      color: #30b767;
      .deleted {
        text-decoration: line-through;
        background-color: @grey-color;
      }
    }

使用:

    // index.jsx
    import styles from './styles.less';

    export default () => {
      return (
        <div className={styles.hello}>
          <span className={styles.deleted}>Hello World</span>
        </div>
      );
    };

##### 在 CSS modules 中覆盖 antd 样式

> 全局唯一带来的特性就是样式不会被覆盖，但是我们有时就是想做样式覆盖。

解决办法，使用 `:global()` 声明此 class name 不能被改名。示例:

    .override-ant-btn {
      :global(.ant-btn) {
        border-radius: 16px;
      }
    }

使用:

    import styles from './styles.less';
    import { Button } from 'antd';

    export default () => {
      return (
        <div>
          <p>
            <span className={styles['override-ant-btn']}>
              <Button>圆角样式按妞</Button>
            </span>
          </p>
          <p>
            <Button>antd 原始按钮</Button>
          </p>
        </div>
      );
    };

> 最后强调，global 不应该被滥用，特别地我们建议：若想在某个文件中覆盖 antd 样式，请加上一个类似 `.override-ant-btn` 的类包裹住 global 修饰的名称，以避免全局样式声明分散在项目各处。

##### 更换 antd 主题

> 前面章节我们讲过如何覆盖某个页面中 antd 的样式，有时候我们想要「批量修改」 antd 的样式，这就需要利用 less 提供的一个能力：modifyVars。简单地讲，antd 在使用 less 定义样式时，使用了大量的变量声明。这些变量的定义在编译期是可以被工具识别并修改的。

在 umi 中可以通过修改配置文件的 theme 字段来实现:

    // config/config.js or .umirc.js
    export default {
      // 若已有配置
      outputPath: "./build",

      // 加入 theme 定义
      theme: {
        "@primary-color": "#30b767", // 绿色
      }
    }

##### 更改全局样式

在 umi 中，有一个专门的 global.less 文件来让我们配置全局样式，这个文件不会被 CSS modules 处理。这个文件放在 src 根目录，和 page 目录同级。

    .
    └── src
        ├── global.less
        └── pages
            ├── css-modules-with-antd
            │   ├── index.jsx
            │   └── styles.less
            ├── css-modules-with-less
            │   ├── index.jsx
            │   └── styles.less
            ├── index.jsx
            └── styles.css

示例内容:

    p {
      margin: 0;
    }
    .ant-btn {
      box-shadow: 0 3px 7px rgba(0, 0, 0, .5);
    }

#### 上传与下载

这一小节总结得很好，详略。需要时再看。可以尝试一下那个 Upload 组件。

#### 国际化

暂略。

#### React 的生命周期

略，需要时再看。

#### 权限

略，这篇比较水。

#### 单元测试

jest，暂略。

#### 使用 TypeScript

略。tsconfig.json 和 tslint.json 的配置可以拿来参考。

> 在 umi 中内置了 TypeScript 的 Loader，你可以直接新建 .tsx 或者 .ts 文件来写 TypeScript 代码。

    const Hello: React.SFC<{ name: string }> = ({ name }) => (
      <div>Hello,{name}</div>
    );
