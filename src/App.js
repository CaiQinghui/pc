import React, { Suspense } from 'react'
import {
  Routes,
  Route,
  Link,
  useLocation
} from 'react-router-dom'
import {
  Layout,
  Menu,
  Popconfirm,
  Avatar
} from 'antd'
import { Button } from 'shineout'
import Icon from '@shein-components/Icon'
import { MenuOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import './App.scss'
import pages from './pages'



function App() {
  const { Header, Content, Sider } = Layout;
  const { pathname } = useLocation()
  const {
    GetLayout,
    CycleManagement,
    DebriefingScoring,
    DebriefingRole,
  } = pages

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem('晋升准备', 'g1', null, [
      getItem(<Link to='/cycleManagement'>晋升周期管理</Link >, '/cycleManagement', <MenuOutlined style={{ minWidth: '12px', fontSize: '12px' }} />),
      getItem(<Link to='/debriefingScoring'>述职评分表</Link>, '/debriefingScoring', <MenuUnfoldOutlined style={{ minWidth: '12px', fontSize: '12px' }} />),
      getItem(<Link to='/debriefingRole'>述职角色设置</Link>, '/debriefingRole', <MenuOutlined style={{ minWidth: '12px', fontSize: '12px' }} />)], 'group'
    ),
    getItem('晋升提名管理', 'g2', null, [
      getItem('晋级提名', '4', <MenuOutlined style={{ minWidth: '12px', fontSize: '12px' }} />),
      getItem('违纪', '5', <MenuOutlined style={{ minWidth: '12px', fontSize: '12px' }} />),
      getItem('产能', '6', <MenuOutlined style={{ minWidth: '12px', fontSize: '12px' }} />),
      getItem('异常罚单', '7', <MenuOutlined style={{ minWidth: '12px', fontSize: '12px' }} />),
      getItem('临时班长名单', '8', <MenuOutlined style={{ minWidth: '12px', fontSize: '12px' }} />),
      getItem('班长培养数据', '9', <MenuOutlined style={{ minWidth: '12px', fontSize: '12px' }} />),
      getItem('其他无法晋升的条件', '10', <MenuOutlined style={{ minWidth: '12px', fontSize: '12px' }} />),
      getItem('提名条件设置', '11', <MenuOutlined style={{ minWidth: '12px', fontSize: '12px' }} />)], 'group'),
    getItem('晋升管理', 'g3', null, [
      getItem('述职', '12', <MenuOutlined style={{ minWidth: '12px', fontSize: '12px' }} />),
      getItem('考试', '13', <MenuOutlined style={{ minWidth: '12px', fontSize: '12px' }} />),
      getItem('360调研', '14', <MenuOutlined style={{ minWidth: '12px', fontSize: '12px' }} />),], 'group')
  ]

  return (
    <>
      <Layout>
        <Sider
          width={240}
          theme="light"
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 1,
          }}
        >
          <div className="logo" style={{ background: '#fff' }}>
            <Link to='/'>S H E I N</Link>
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={pathname}
            items={items}
            style={{
              padding: '10px',
            }} />
        </Sider>
        <Layout
          className="site-layout"
          theme="light"
          style={{
            marginLeft: 240,
            minWidth: 1000
          }}
        >
          <Header
            className="site-layout-background"
            style={{
              position: 'fixed',
              zIndex: 1,
              width: '100%',
              padding: 0,
              background: '#fff'
            }}
          >
            <div className='left'>
              &nbsp;&nbsp;平台缩写
              <span className='platform-us'>&nbsp;&nbsp;platform name</span>
            </div>
            <div className='right'>
              <Button text>
                <Icon
                  name="more-lag"
                  style={{ color: '#646464', fontSize: 20, }}
                />
              </Button>
              <Button text>
                <Icon
                  name="message"
                  style={{ color: '#646464', fontSize: 20, }}
                />
              </Button>
              <div className="user-logout">
                <Popconfirm
                  placement="bottomRight"
                  title="是否确认退出？"
                  okText="退出"
                  cancelText="取消"
                >
                  <Avatar icon={<UserOutlined />} />
                </Popconfirm>
              </div>
            </div>
          </Header>
          <Content
            className="site-layout"
            style={{
              padding: '80px 15px 0',
              overflow: 'initial',
            }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route
                  path='/'
                  element={<GetLayout />}
                />
                <Route
                  path='cycleManagement'
                  element={<CycleManagement />}
                />
                <Route
                  path='debriefingScoring'
                  element={<DebriefingScoring />}
                />
                <Route
                  path='debriefingRole'
                  element={<DebriefingRole />}
                />
              </Routes>
            </Suspense>
          </Content>
        </Layout>
      </Layout >
    </>
  )

}

export default App;
