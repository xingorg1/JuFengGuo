// component/test/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    setTestFun(){
      console.log(12)
      this.triggerEvent('testfun',{name: 'test component数据'},{name: 2});
    }
  }
})
