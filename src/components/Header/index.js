import React, { PureComponent } from 'react'
import { connect } from 'dva'
import Link from 'umi/link'
import classNames from 'classnames/bind'

import { on } from '../../utils'
import styles from './index.less'
import config from '../../config'

const cx = classNames.bind(styles)
const { title, subtitle } = config

class Header extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      dropMenu: false
    }
  }

  componentDidMount() {
    this.bind()
  }

  // 绑定事件
  bind = () => {
    on(this.menuRef, 'mouseover', this.handleMouseOver)
  }

  // 监听: 菜单悬停并触发对话
  handleMouseOver = e => {
    let target
    if (e.target.tagName.toUpperCase() === 'LI') {
      target = e.target
    } else if (e.target.parentElement.tagName.toUpperCase() === 'LI') {
      target = e.target.parentElement
    } else {
      return
    }
    const menu = target.getAttribute('data-menu')
    if (this.menu === menu) return
    this.menu = menu
    let tips
    switch (menu) {
      case 'home':
        tips = '要回首页看看么~'
        break
      case 'archives':
        tips = '去看看主人的所有文章吧'
        break
      case 'categories':
        tips = '去看看主人的文章吧'
        break
      case 'tags':
        tips = '去看看主人的文章吧'
        break
      case 'mood':
        tips = '主人最近又在发什么牢骚呢'
        break
      case 'books':
        tips = '主人最近再读什么书呢'
        break
      case 'friends':
        tips = '去看看主人的小伙伴吧'
        break
      case 'about':
        tips = '想要了解更多关于主人的故事么'
        break
      default:
        return
    }
    this.props.dispatch({
      type: 'app/showTips',
      payload: { tips }
    })
  }

  // 移动端展开菜单
  toggleMenu = () => {
    this.setState({ dropMenu: !this.state.dropMenu })
  }

  render(props, { dropMenu }) {
    return (
      <div class={cx('container')}>
        <button style={{ top: dropMenu ? '0.8rem' : '0' }} onClick={this.toggleMenu}>
          <i class="icon">&#xf0ca;</i>
        </button>
        <div class={cx('inner')} style={{ padding: dropMenu ? '1.06rem 0 .24rem' : '.5rem 0' }}>
          <a class={cx('title')} href="/">
            {title}
          </a>
          <span class={cx('sub-title')}>{subtitle}</span>
          <ul ref={c => (this.menuRef = c)} class={cx('menu', dropMenu && 'dropMenu')}>
            <li data-menu="home">
              <Link to="/">
                <i class="icon">&#xf19c;</i>
                <span>首页</span>
              </Link>
            </li>
            <li data-menu="archives">
              <Link to="/archives">
                <i class="icon">&#xe800;</i>
                <span>归档</span>
              </Link>
            </li>
            <li data-menu="categories">
              <Link to="/categories">
                <i class="icon">&#xe802;</i>
                <span>分类</span>
              </Link>
            </li>
            <li data-menu="tags">
              <Link to="/tags">
                <i class="icon">&#xe803;</i>
                <span>标签</span>
              </Link>
            </li>
            <li data-menu="mood">
              <Link to="/mood">
                <i class="icon">&#xf27a;</i>
                <span>心情</span>
              </Link>
            </li>
            <li data-menu="books">
              <Link to="/books">
                <i class="icon">&#xe804;</i>
                <span>书单</span>
              </Link>
            </li>
            <li data-menu="friends">
              <Link to="/friends">
                <i class="icon">&#xf21e;</i>
                <span>友链</span>
              </Link>
            </li>
            <li data-menu="about">
              <Link to="/about">
                <i class="icon">&#xf299;</i>
                <span>关于</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default connect()(Header)
