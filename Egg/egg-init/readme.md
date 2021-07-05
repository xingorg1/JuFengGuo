# egg

## 问题
1. middleware和plugin的区别是什么？就像webpack中，loader和plugin的区别？

## 学习点
1. 注意：在插件还没发布前，可以通过 npm link 的方式进行本地测试，具体参见 [npm-link]。

[npm-link]: https://docs.npmjs.com/cli/v7/commands/npm-link

2. 沉淀到框架: 抽象出一个适合团队业务场景的框架
<details>
重复上述的过程，很快我们会积累了好几个插件和配置，并且我们会发现，在团队的大部分项目中，都会用到这些插件。

此时，就可以考虑抽象出一个适合团队业务场景的框架。
</details>

3. egg的优势
<details>
 一步步框架演进：这得益于 Egg 强大的插件机制、代码的共建，以及复用和下沉

 当在新项目中抽象出的插件，下沉集成到框架后，其他项目只需要简单的重新 npm install 下就可以使用上，对整个团队的效率有极大的提升。
</details>