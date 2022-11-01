// import { Empty } from "antd"

// function DebriefingRole() {
//   return (
//     <Empty description='述职角色设置' style={{ height: 700 }} />
//   )
// }

// export default DebriefingRole

import React, { useState } from 'react'
import {
  Table,
  Card,
  Form,
  Alert,
  Cascader,
} from 'antd'
import { Tag, Button } from 'shineout'
import Icon from '@shein-components/Icon'
import { cloneDeep } from 'lodash'
import EditorModal from '../../components/editor-modal'
import moment from 'moment'
import './index.scss'

//数据
const tableData = [];
for (let i = 0; i < 202; i++) {
  if (i % 2 === 0) {
    tableData.push({
      key: i,
      id: i + 1,
      cycleName: `2022年三季度O类岗员工职位晋升${i}`,
      startToEnd: ['2021-06-01', ' ~ ', '2021-06-15'],
      statu: '有效',
      founder: `詹军希${i}`,
      creation: '2021-06-01 15:00',
    })
  } else {
    tableData.push({
      key: i,
      id: i + 1,
      cycleName: `2022年三季度O类晋升${i}`,
      startToEnd: ['2022-08-01', ' ~ ', '2022-09-15'],
      statu: '无效',
      founder: `赫东${i}`,
      creation: '2021-06-01 15:00',
    })
  }

}

function DebriefingRole() {
  const [editorModalVisible, setEditorModalVisible] = useState(0)
  const [record, setRecord] = useState(null)
  const [isNew, setIsNew] = useState(false)
  const [dataSource, setDataSource] = useState(tableData)

  //删除
  // const handleDel = (record) => {
  //   setDataSource(dataSource.filter((item) => item.key !== record.key));
  // };

  const showEditor = (record, isNew = false) => {
    // setEditorModalVisible(1)
    setIsNew(isNew)
    if (isNew) {
      setRecord({
        key: dataSource[dataSource.length - 1].key++,
        id: dataSource.length + 1,
        creation: moment().format('YYYY-MM-DD HH:mm'),
      })
    } else {
      setRecord(cloneDeep(record))
    }
  }

  const handleOkEditorModal = (data) => {
    if (isNew) {
      let newDataSource = [...dataSource, data];
      setDataSource(newDataSource);
    } else {
      const newDataSource = dataSource.map((item) => {
        if (item.key === data.key) {
          return { ...item, ...data }
        } else {
          return item
        }
      });
      setDataSource(newDataSource)
    }
    setEditorModalVisible(0)
  };


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

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      width: 60,
    },

    {
      title: '周期名称',
      dataIndex: 'cycleName',
      key: 'cycleName',
      width: 280,
    },

    {
      title: '起止时间',
      dataIndex: 'startToEnd',
      width: 280,
    },

    {
      title: '状态',
      key: 'statu',
      dataIndex: 'statu',
      width: 100,
      render: (statu) => {
        // console.log(statu);
        const type = (statu === '有效') ? 'success' : 'danger'
        return (
          <Tag type={type} key={statu} >
            {statu}
          </Tag >
        )
      }
    },

    {
      title: '创建人',
      dataIndex: 'founder',
      key: 'founder',
      width: 150,
      render: (founder) => (
        <>
          <Tag type='success' className='founder'>
            {founder[0]}
          </Tag>
          <span>{founder}</span>
        </>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'creation',
      width: 200,
    },
    {
      title: '操作',
      key: 'action',
      render: (record) => (
        <a onClick={() => (
          showEditor(record),
          setEditorModalVisible(2)
        )}>
          编辑
        </a>
      ),
    },
  ];

  const afterClose = () => {
    setRecord(null);
    setIsNew(false);
  };

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
                onClick={() => (
                  showEditor({}, true),
                  setEditorModalVisible(2)
                )}
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
        <Table
          columns={columns}
          dataSource={dataSource}
          className='table'
          pagination={{
            showTotal: totalData,
            pageSizeOptions: [10, 20, 30, 50, 100],
            showSizeChanger: true,
            locale: { items_per_page: '/ 页', }
          }}
        />
        <EditorModal
          visible={editorModalVisible}
          record={record}
          handleCancel={() => setEditorModalVisible(0)}
          handleOk={handleOkEditorModal}
          afterClose={afterClose}
          isNew={isNew}
        />
      </Card>
    </>
  );
}

export default DebriefingRole