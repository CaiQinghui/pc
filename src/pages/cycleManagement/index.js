import React, { useState } from 'react';
// import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Popconfirm,
  Table,
  Card,
  Cascader,
  Alert,
  Modal,
  Select,
  DatePicker
} from 'antd';
import Icon from '@shein-components/Icon'
import { Button } from 'shineout'
import Status from '../../components/status';
import moment from 'moment';
import './index.scss';

const DebriefingScoring = () => {
  const [modalVisible, setModalVisible] = useState(0)
  const [newDatas, setNewDatas] = useState([])
  const { RangePicker } = DatePicker;
  const { Option } = Select

  const data = []
  for (let i = 0; i < 200; i++) {
    data.push({
      key: i,
      id: i + 1,
      cycleName: `2022年三季度O类岗员工职位晋升${i}`,
      time: '2021-06-01 ~ 2021-06-15',
      statu: <Status status='efficient' key={`${i}`} />,
      founder: [<span className='surname' key={`${i}`}>詹</span>, `詹军希${i}`],
      creation: '2021-06-01 15:00',
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

  const [dataSource, setDataSource] = useState(data)
  const [count, setCount] = useState(dataSource.length)

  const defaultColumns = [
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
      // render: (_, record) =>
      //   dataSource.length >= 1 ? (
      //     <Popconfirm
      //       title="确定要删除吗?"
      //       okText="确定"
      //       cancelText="取消"
      //       onConfirm={() => handleDelete(record.key)}>
      //       <a>删除</a>
      //     </Popconfirm>
      //   ) : null,
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="确定要删除吗?"
            okText="确定"
            cancelText="取消"
            onConfirm={() => handleEdit(record.key)}>
            <a>编辑</a>
          </Popconfirm>
        ) : null,
    },
  ];

  //新增
  const handleAdd = (fieldsValue) => {
    const rangeValue = fieldsValue['startToEnd'];
    const values = {
      ...fieldsValue,
      'cycleName': fieldsValue['cycleName'],
      'start': rangeValue[0].format('YYYY-MM-DD'),
      'end': rangeValue[1].format('YYYY-MM-DD'),
      'statu': fieldsValue['statu'],
      'founder': fieldsValue['founder'],
    };
    const newData = {
      key: count,
      id: count + 1,
      cycleName: `${values.cycleName}`,
      time: `${values.start} ~ ${values.end}`,
      statu: <Status status={`${values.statu}`} key={`${count}`} />,
      founder: [<span className='surname' key={`${count}`}>詹</span>, `${values.founder}`],
      creation: moment().format('YYYY-MM-DD HH:mm'),
    }
    setDataSource([...dataSource, newData])
    setCount(count + 1)
    setModalVisible(0)
  };

  //删除
  const handleDelete = (key) => {
    console.log(dataSource.filter((item) => item.key === key));
    const newData = dataSource.filter((item) => item.key !== key)
    setDataSource(newData)
  };

  //编辑
  const handleEdit = (key) => {
    const newData = dataSource.filter((item) => item.key === key)
    console.log(newData);
    setNewDatas(newData)
    setModalVisible(2)
  }

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    }
  })

  const totalData = (total) => `共 ${total} 项数据`
  return (
    <>
      <Card
        bordered={false}
        style={{
          width: '100%',
          marginBottom: 16,
          borderRadius: 5,
        }}
      >
        <Alert
          message="晋升开始前，先建一个周期，后续数据才可以关联到这个晋升周期"
          type="warning"
          style={{
            height: 50
          }}
          showIcon
          closable
        />
      </Card>
      <Card
        bordered={false}
        style={{
          borderRadius: 5,
          marginBottom: 16,
        }}
      >
        <Form
          style={{ paddingBottom: '12px' }}>
          <div className='header'>
            <div className='left'>
              <Button
                type="primary"
                onClick={() => {
                  setModalVisible(1)
                }}
              >
                新增
              </Button>
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
          title='新增'
          destroyOnClose
          open={modalVisible === 1}
          onCancel={() => setModalVisible(0)}
        >
          <Form
            name="add"
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 15,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            onFinish={handleAdd}
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
              <Input placeholder='请输入' />
            </Form.Item>

            <Form.Item
              label="起止时间"
              name="startToEnd"
              rules={[
                {
                  type: 'array',
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
                  message: '请选择状态',
                },
              ]}
            >
              <Select
                placeholder="请选择"
                style={{
                  width: 120,
                }}
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
                  message: '请输入创建人',
                },
              ]}
            >
              <Input placeholder='请输入' />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                xs: {
                  span: 24,
                  offset: 0,
                },
                sm: {
                  span: 16,
                  offset: 8,
                },
              }}
            >
              <Button type="primary" onClick={() => setModalVisible(0)}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                确认
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title='编辑'
          destroyOnClose
          open={modalVisible === 2}
          onCancel={() => setModalVisible(3)}
        >
          <Form
            name="edit"
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 15,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            onFinish={handleAdd}
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
              <Input placeholder='请输入' />
            </Form.Item>

            <Form.Item
              label="起止时间"
              name="startToEnd"
              rules={[
                {
                  type: 'array',
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
                  message: '请选择状态',
                },
              ]}
            >
              <Select
                placeholder="请选择"
                style={{
                  width: 120,
                }}
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
                  message: '请输入创建人',
                },
              ]}
            >
              <Input placeholder='请输入' />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                xs: {
                  span: 24,
                  offset: 0,
                },
                sm: {
                  span: 16,
                  offset: 8,
                },
              }}
            >
              <Button type="primary" onClick={() => setModalVisible(0)}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                确认
              </Button>
            </Form.Item>
          </Form>
        </Modal>



        <Table
          className='table'
          dataSource={dataSource}
          columns={columns}
          pagination={{
            showTotal: totalData,
            pageSizeOptions: [10, 20, 30, 50, 100],
            showSizeChanger: true,
            locale: { items_per_page: '/ 页', }

          }}
        />
      </Card>
    </>
  );
};
export default DebriefingScoring;