// import { Empty } from "antd"

// function DebriefingRole() {
//   return (
//     <Empty description='述职角色设置' style={{ height: 700 }} />
//   )
// }

// export default DebriefingRole

import { Card, Alert, Form, Cascader, Modal, Input, DatePicker, Select } from 'antd';
import { Table } from 'tdesign-react';
import { Button } from 'shineout'
import Icon from '@shein-components/Icon'
import Status from '../../components/status'
import './index.scss'
import React, { useState } from 'react';

const DebriefingRole = () => {

  const { RangePicker } = DatePicker;

  const { Option } = Select

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: '序号',
      colKey: 'id',
      width: 60,
    },
    {
      title: '周期名称',
      colKey: 'cycleName',
      width: 280,
    },
    {
      title: '起止时间',
      colKey: 'time',
      width: 280,
    },
    {
      title: '状态',
      colKey: 'statu',
      width: 100,
    },
    {
      title: '创建人',
      colKey: 'founder',
      width: 150,
    },
    {
      title: '创建时间',
      colKey: 'creation',
      width: 200,
    },
    {
      title: '操作',
      colKey: 'operate',
      width: 120
    },
  ]
  const data = [];
  for (let i = 0; i < 200; i++) {
    data.push({
      key: i,
      id: i + 1,
      cycleName: `2022年三季度O类岗员工职位晋升${i}`,
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
    <div className="site-card-border-less-wrapper">
      <Card
        // title="Card title"
        bordered={false}
        style={{
          width: '100%',
          marginBottom: 16,
          borderRadius: 5
          // padding: 16,
        }}
      >
        <Alert
          message="晋升开始前，先建一个周期，后续数据才可以关联到这个晋升周期"
          type="warning"
          style={{
            // margin: '15px 26px',
            height: 50
          }}
          showIcon
          closable
        />
      </Card>
      <Card
        bordered={false}
        style={{
          // width: 300,
          borderRadius: 5,
          marginBottom: 16,
        }}
      >
        <Form
          style={{ paddingBottom: '12px' }}>
          <div className='header'>
            <div className='left'>
              <Button type="primary" onClick={showModal}>新增</Button>
            </div>
            <div className='right'>
              <Cascader className='options' options={options} placeholder="请选择" />
              <Button text>
                <Icon name="xpand-up-and-down" style={{ color: '#646464', fontSize: 18 }} />
              </Button>
            </div>
          </div>
        </Form>

        <Modal
          title="新增"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="周期名称"
              name="cycleName"
              rules={[
                {
                  required: true,
                  message: '请输入周期名称',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="起止时间"
              name="startToEnd"
              rules={[
                {
                  required: true,
                  message: '请选择起止时间',
                },
              ]}
            >
              <RangePicker placeholder={["开始时间", "结束时间"]} />
            </Form.Item>

            <Form.Item
              label="状态"
              name="statu"
              rules={[
                {
                  required: true,
                  message: '请输入名字',
                },
              ]}
            >
              <Select
                // defaultValue="efficient"
                placeholder="请选择"
                style={{
                  width: 120,
                }}
              // onChange={handleChange}
              >
                <Option value="efficient">有效</Option>
                <Option value="invalid">无效</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="创建人"
              name="founder"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input />
            </Form.Item>


          </Form>
        </Modal>

        <Table
          data={data}
          columns={columns}
          rowKey="index"
          pagination={{
            defaultCurrent: 1,
            defaultPageSize: 10,
            total: data.length,
            pageSizeOptions: [10, 20, 30, 50, 100]
          }}
        />
      </Card>
    </div>
  )
}
export default DebriefingRole;