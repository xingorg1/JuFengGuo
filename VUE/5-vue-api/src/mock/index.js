import Mock, { Random } from 'mockjs'
import urls from './urls'
let {log} = console,
  params = Mock.mock({ // 数据池
    'fixedTableData|10': [{ // 图表过滤所需数据
      'name': '@cname',
      'date': '@date',
      'province': '@province',
      'city': '@city',
      'address': '@county(true) @ctitle() @natural(1000,9999) 号',
      'zip': '@zip'
    }]
})
log(Random.date(), params)
Mock.setup({
  timeout: '200-600'
})
Mock.mock(urls.fixedTableData.url, urls.fixedTableData.type, params.fixedTableData) // 请求该接口时，拦截请求并返回对应数据