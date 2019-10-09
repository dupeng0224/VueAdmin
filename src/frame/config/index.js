import Cookroom from './cookroom'
import Enterprise from './enterprise'
import Grade from './grade'
import SourceTrace from './sourcetrace'
import Supervise from './supervise'
import Nav from './nav'
import Animate from './animate'
import packageJSON from '../../../package'
import logo from '../../assets/logo.png'
import { traverse } from '../utils/util'

function getCount (array) {
  let count = 0
  traverse(array, false, function (item) {
    if (!(item.children && item.children.length > 0)) {
      ++count
    }
  })
  return count
}

export default {
  info: {
    copyright: `星云网络 前端开发部 出品 @ 2019 [ v${packageJSON.version} ]`,
    logo: logo,
    title: `智慧监管平台 v${packageJSON.version.split('-')[0]}`
  },
  cookroom: {
    items: Cookroom,
    count: getCount(Cookroom)
  },
  enterprise: {
    items: Enterprise,
    count: getCount(Enterprise)
  },
  grade: {
    items: Grade,
    count: getCount(Grade)
  },
  sourcetrace: {
    items: SourceTrace,
    count: getCount(SourceTrace)
  },
  supervise: {
    items: Supervise,
    count: getCount(Supervise)
  },
  nav: {
    items: Nav,
    count: getCount(Nav)
  },
  animate: Animate
}
