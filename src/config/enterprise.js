export default [
  {
    'path': '/enterprise/worksheet',
    'text': '我的工单',
    'icon': 'iconfont icon-radio-off'
  },
  {
    'path': '/enterprise/information',
    'text': '主体概况',
    'icon': 'iconfont icon-radio-off',
    'children': [
      {
        'path': '/enterprise/information/report',
        'text': '统计分析'
      }
    ]
  },
  {
    'path': '/enterprise/shop',
    'text': '生产主体',
    'icon': 'iconfont icon-radio-off',
    'children': [
      {
        'path': '/enterprise/shop/report',
        'text': '统计分析'
      },
      {
        'path': '/enterprise/shop/information',
        'text': '生产主体档案'
      },
      {
        'path': '/enterprise/shop/add',
        'text': '生产主体录入'
      },
      {
        'path': '/enterprise/shop/edit',
        'text': '编辑审核'
      },
      {
        'path': '/enterprise/shop/import',
        'text': '生产主体导入'
      }
    ]
  },
  {
    'path': '/enterprise/school',
    'text': '餐饮主体',
    'icon': 'iconfont icon-radio-off',
    'children': [
      {
        'path': '/enterprise/school/report',
        'text': '统计分析'
      },
      {
        'path': '/enterprise/school/information',
        'text': '流通主体档案'
      },
      {
        'path': '/enterprise/school/add',
        'text': '流通主体录入'
      },
      {
        'path': '/enterprise/school/edit',
        'text': '编辑审核'
      },
      {
        'path': '/enterprise/school/import',
        'text': '流通主体导入'
      }
    ]
  }
]
