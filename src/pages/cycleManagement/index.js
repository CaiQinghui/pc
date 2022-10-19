import React, { useState } from 'react'
import {
  Table,
  Layout,
  Form,
  Cascader,
  Alert
} from 'antd'
import Icon from '@shein-components/Icon'
import { Button } from 'shineout'
import './index.scss'
import Status from '../../components/status'

function CycleManagement() {
  const { Header, Content } = Layout;
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      width: 60,
    },
    {
      title: '周期名称',
      dataIndex: 'cycleName',
      width: 280,
    },
    {
      title: '起止时间',
      dataIndex: 'time',
      width: 280,
    },
    {
      title: '状态',
      dataIndex: 'statu',
      width: 100,
    },
    {
      title: '创建人',
      dataIndex: 'founder',
      width: 150,
    },
    {
      title: '创建时间',
      dataIndex: 'creation',
      width: 200,
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 120
    },
  ]
  const dataTotal = total => `共 ${total} 项数据`

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      id: i + 1,
      cycleName: '2022年三季度O类岗员工职位晋升详细',
      time: '2021-06-01 ~ 2021-06-15',
      statu: <Status status='efficient' />,
      founder: [<span className='surname' key={`${i}`}>詹</span>, `詹军希${i}`],
      creation: '2021-06-01 15:00',
      operate: <Button text type="primary">编辑</Button>,
    });
  }

  const options = [
    {
      value: 'name1',
      label: 'name1',
    },
    {
      value: 'name2',
      label: 'name2',
    },
  ]

  return (
    <>
      <Layout>
        <Header
          className='alert'
          style={{
            background: '#fff',
            marginBottom: 15,
            borderRadius: 5,
            height: 80,
            padding: 0
          }}
        >
          <Alert
            message="晋升开始前，先建一个周期，后续数据才可以关联到这个晋升周期"
            type="warning"
            style={{
              margin: '15px 26px',
              height: 50
            }}
            showIcon
            closable
          />
        </Header>
        <Content
          className='content'
          style={{
            borderRadius: 5,
            backgroundColor: '#fff'
          }}
        >
          <Form>
            <div className='header'>
              <div className='left'>
                <Button type="primary" >新增</Button>
              </div>
              <div className='right'>
                <Cascader className='options' options={options} placeholder="请选择" />
                <Button text>
                  <Icon name="xpand-up-and-down" style={{ color: '#646464', fontSize: 18 }} />
                </Button>
              </div>
            </div>
          </Form>

          <Table
            className='table'
            columns={columns}
            dataSource={data}
            pagination={{
              showTotal: dataTotal,
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: [10, 20, 30, 50, 100],
            }}
            scroll={{ y: 400 }}
            style={{ padding: ' 0 16px' }}
          >
          </Table>
        </Content>
      </Layout >
    </>
  )
}

export default CycleManagement