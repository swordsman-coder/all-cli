#### all-cli 目前集成了react、vue、koa、express、小程序的项目模板,模板项目目前处于beta版本,中间有很多需要更改和优化的地方

> * react是基于create-react-app官方模板进行的二次开发
> * vue是基于vue-cli 2官方模板进行的二次开发
> * mina 小程序 暂时使用的美团开源的mpvue 后续会出更新
> * koa2,express 暂时使用的官方模板 后续会出更新

#### 安装
> * Node.js (>=8.x, 10.x preferred), npm version 4+ and Git

```
yarn add all-cli global
or
npm i all-cli -g
```

#### 使用
```
all init [params] [name]
```
> params: vue react express koa2 mina(小程序mpvue)
> 
> name: 放置项目的文件夹名字

#### 示例
```
all init vue demo
生成文件夹为demo的vue项目

all init react my-app
生成文件夹为my-app的react项目
```
>  生成项目后 npm i/yarn安装依赖即可
具体操作后期会在具体项目的readme中补全
