import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import { Transition, Segment, Label, Button } from 'semantic-ui-react'
import marked from 'marked'

import Quote from '../components/quote'
import Loading from '../components/loading'

import config from '../config'
const { duration } = config

const colors = [
  'red', 'orange', 'yellow', 'olive', 'green', 'teal',
  'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black',
]

const Container = styled.div`
  margin: 0 auto;
  @media (max-width: 900px) {
    width: 96%;
  }
`

const Wapper = styled.div`
  padding: 16px;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23);
  background: rgba(255, 255, 255, .6);
`

const StyledSegment = styled(Segment)`
  background: rgba(255, 255, 255, .4)!important;
  transition: all 0.25s ease 0s, transform 0.5s cubic-bezier( 0.6, 0.2, 0.1, 1 ) 0s, opacity 0.5s cubic-bezier( 0.6, 0.2, 0.1, 1 ) 0s!important;
  &:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,.19), 0 6px 6px rgba(0,0,0,.23)!important;
    transform: translateY(-4px);
  }
`

const ShuoShuoItem = styled.div`
  margin-top: 10px;
  p {
    line-height: 1.8;
  }
`

const Pagination = styled.div`
  margin-top: 10px;
  text-align: center;
  button {
    background: rgba(255, 255, 255, .6)!important;
    &:hover {
      box-shadow: 0 0 40px #999 inset!important;
    }
  }
`

class ShuoShuo extends PureComponent {
  componentDidMount() {
    // 获取说说总数
    this.props.dispatch({
      type: 'site/queryShuoShuoTotal',
    })
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'site/reset',
      payload: {
        shuoshuoLoading: true,
        shuoshuoHasMore: true,
        shuoshuoTotal: 0,
        shuoshuoPage: 0,
        myShuoShuo: [],
      }
    })
  }

  // 前一页
  prev = () => {
    this.props.dispatch({
      type: 'site/queryShuoShuo',
      payload: {
        queryType: 'prev',
      }
    })
  }

  // 后一页
  next = () => {
    this.props.dispatch({
      type: 'site/queryShuoShuo',
      payload: {
        queryType: 'next',
      }
    })
  }

  onHide = () => {
    this.props.dispatch({
      type: 'site/update',
      payload: {
        shuoshuoOnHide: true,
      }
    })
  }

  renderShuoShuo = (myShuoShuo) => {
    if (myShuoShuo && myShuoShuo.length > 0) {
      const shuoshuoList = myShuoShuo.map((o) => {
        const date = o.created_at.slice(0, 10)
        const color = colors[Math.floor(Math.random() * colors.length)]
        return (
          <StyledSegment key={o.id} raised color={color}>
            <Label as='a' color={color} ribbon>{date}</Label>
            <ShuoShuoItem dangerouslySetInnerHTML={{ __html: marked(o.body) }} />
          </StyledSegment>
        )
      })
      return shuoshuoList
    }
  }

  render() {
    const { shuoshuoOnHide, shuoshuoLoading, myShuoShuo, shuoshuoTotal, shuoshuoPage, shuoshuoPageSize } = this.props
    const maxPage = Math.ceil(shuoshuoTotal / shuoshuoPageSize)
    const text = '欲言又止，止言又欲'
    return (
      <Container>
        <Transition visible={!shuoshuoLoading} animation='drop' duration={duration} onHide={this.onHide}>
          <Wapper>
            <Quote text={text} />
            <div>
              {this.renderShuoShuo(myShuoShuo)}
            </div>
            <Pagination>
              <Button.Group>
                <Button disabled={shuoshuoPage <= 1} onClick={this.prev}>上一页</Button>
                <Button.Or text={shuoshuoPage} />
                <Button disabled={shuoshuoPage >= maxPage} onClick={this.next}>下一页</Button>
              </Button.Group>
            </Pagination>
          </Wapper>
        </Transition>
        {(!myShuoShuo || myShuoShuo.length === 0 || shuoshuoOnHide) &&
          <Loading />
        }
      </Container>
    )
  }
}

export default connect(({ site }) => ({ ...site }))(ShuoShuo)