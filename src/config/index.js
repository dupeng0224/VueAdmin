import Cookroom from './cookroom'
import Enterprise from './enterprise'
import Grade from './grade'
import SourceTrace from './sourcetrace'
import Supervise from './supervise'
import packageJSON from '../../package'
import logo from '../assets/logo.png'
import user from '../assets/user.png'

export default {
  info: {
    copyright: `星云网络 出品 @ 2019 [ v${packageJSON.version} ]`,
    logo: logo,
    title: `智慧监管平台 v${packageJSON.version.split('-')[0]}`,
    user: user
  },
  nav: [
    { text: '主体管理', code: 'enterprise', id: '/enterprise/worksheet', icon: 'iconfont el-icon-location', items: Enterprise },
    { text: '监管系统', code: 'supervise', id: '/supervise/information', icon: 'iconfont icon-target', items: Supervise },
    { text: '阳光厨房', code: 'cookroom', id: '/cookroom/information', icon: 'iconfont icon-flask', items: Cookroom },
    { text: '溯源监管', code: 'sourcetrace', id: '/sourcetrace/information', icon: 'iconfont icon-flask', items: SourceTrace },
    { text: '等级评定', code: 'grade', id: '/grade/information', icon: 'iconfont icon-flask', items: Grade }
  ]
}
