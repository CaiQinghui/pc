// import { Empty } from "antd"

// function DebriefingRole() {
//   return (
//     <Empty description='述职角色设置' style={{ height: 700 }} />
//   )
// }

// export default DebriefingRole

import React, { useState } from 'react';
import 'antd/dist/antd.css';
// import './index.css';
import { Button } from 'shineout'
import { Form, Modal, Input, InputNumber, DatePicker, Popconfirm, Table, Typography, Select } from 'antd';
import Status from '../../components/status';
import moment from 'moment';

const App = () => {
  const { RangePicker } = DatePicker;
  const { Option } = Select
  const dateFormatList = ['YYYY-MM-DD', 'YYYY-MM-DD'];
  const originData = [];
  for (let i = 0; i < 100; i++) {
    originData.push({
      key: i.toString(),
      name: `Edrward ${i}`,
      age: 32,
      time: '2021-06-01',
      statu: <Status status='efficient' key={`${i}`} />,
      founder: [<span className='surname' key={`${i}`}>詹</span>, `詹军希${i}`],
      // found: '[founder, founder1]'
    });
  }
  const [modalVisible, setModalVisible] = useState(false)
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    // const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Modal
            title='编辑'
            destroyOnClose
            open={modalVisible}
            onCancel={() => (setModalVisible(false), cancel)}
            onOk={() => save(record.key)}
          >
            <Form form={form} component={false}>

              <Form.Item
                label="周期名称"
                name="name"
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
                name="time"
                rules={[
                  {
                    // type: 'array',
                    required: true,
                    message: '请选择起止时间',
                  },
                ]}
              >
                {/* <RangePicker
                  placeholder={["开始时间", "结束时间"]}
                  // defaultValue={time}
                  value={record.time}
                // format="YYYY-MM-DD"
                /> */}
                {/* <DatePicker /> */}
                <Input />
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
                {/* <Select
                  placeholder="请选择"
                  style={{
                    width: 120,
                  }}
                >
                  <Option value="efficient">有效</Option>
                  <Option value="invalid">无效</Option>
                </Select> */}
                <Input />
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
            </Form>
          </Modal>
        ) : (
          children
        )}
      </td>
    );
  };
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: record.name,
      age: record.age,
      statu: record.statu,
      time: moment(record.time, 'YYYY-MM-DD',),
      founder: record.founder,
      // ...record,
    });
    setEditingKey(record.key);
    setModalVisible(true)
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: '状态',
      dataIndex: 'statu',
      width: 100,
    },
    {
      title: 'time',
      dataIndex: 'time',
      width: '40%',
      editable: true,
    },
    {
      title: '创建人',
      dataIndex: 'founder',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        // return editable ? (
        //   <span>
        //     <Typography.Link
        //       onClick={() => save(record.key)}
        //       style={{
        //         marginRight: 8,
        //       }}
        //     >
        //       Save
        //     </Typography.Link>
        //     <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
        //       <a>Cancel</a>
        //     </Popconfirm>
        //   </span>
        // ) : (
        //   <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
        //     Edit
        //   </Typography.Link>
        // );
        return (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            编辑
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Table
      components={{
        body: {
          cell: EditableCell,
        },
      }}
      bordered
      dataSource={data}
      columns={mergedColumns}
      rowClassName="editable-row"
      pagination={{
        onChange: cancel,
      }}
    />
  );
};
export default App;