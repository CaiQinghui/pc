import React, { useEffect } from 'react'
import {
  Form,
  Modal,
  Input,
  Select,
  DatePicker,
} from 'antd'
import moment from 'moment'

const noop = () => { };
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
}

const EditorModal = (props) => {
  const [form] = Form.useForm()
  const { RangePicker } = DatePicker

  const {
    visible,
    record,
    handleOk = noop,
    handleCancel = noop,
    afterClose,
    isNew,
  } = props

  const options = [
    {
      value: '有效',
    },
    {
      value: '无效',
    }
  ]

  useEffect(() => {
    if (visible === 2) {
      const time = [moment(record.startToEnd[0], ['YYYY-MM-DD']), moment(record.startToEnd[2], ['YYYY-MM-DD'])]
      form.setFieldsValue({
        cycleName: record.cycleName,
        statu: record.statu,
        founder: record.founder,
        startToEnd: time,
      })
    } else {
      form.resetFields()
    }
  })

  const onOk = () => {
    const fieldsValue = form.getFieldsValue()
    const rangeValue = fieldsValue['startToEnd']
    const values = {
      'start': rangeValue[0].format('YYYY-MM-DD'),
      'end': rangeValue[1].format('YYYY-MM-DD'),
    }
    const newData = {
      cycleName: fieldsValue.cycleName,
      startToEnd: [`${values.start}`, ' ~ ', `${values.end}`],
      statu: fieldsValue.statu,
      founder: fieldsValue.founder,
    }
    handleOk({ ...record, ...newData })
  }

  return (
    <Modal
      title={visible === 1 ? '新增' : '编辑'}
      open={visible === 1 || visible === 2}
      onOk={onOk}
      onCancel={handleCancel}
      cancelText="取消"
      okText="确定"
      afterClose={afterClose}
      forceRender={true}
      destroyOnClose={false}
    >
      <Form {...formItemLayout} form={form}>
        <Form.Item
          label="周期名称"
          name="cycleName"
          rules={[
            {
              required: true,
              message: '请输入周期名称'
            }
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
              message: '请选择起止时间'
            }
          ]}
        >
          {/* <ConfigProvider locale={zh_CN}> */}
          <RangePicker
          // placeholder={["开始时间", "结束时间"]}
          />
          {/* </ConfigProvider> */}

        </Form.Item>
        <Form.Item
          label="状态"
          name="statu"
          rules={[
            {
              required: true,
              message: '请选择状态'
            }
          ]}
        >
          <Select
            placeholder="请选择"
            showArrow
            style={{
              width: 120
            }}
            options={options}
          />
        </Form.Item>
        <Form.Item
          label="创建人"
          name="founder"
          rules={[
            {
              required: true,
              message: '请输入创建人',
            }
          ]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditorModal