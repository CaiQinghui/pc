import React, { useEffect } from 'react'
import {
  Form,
  Modal,
  Input,
  Select,
  DatePicker
} from 'antd'
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
    if (visible) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  }, [visible])

  const onOk = () => {
    const values = form.getFieldsValue();
    handleOk({ ...record, ...values });
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
          {/* <RangePicker
            placeholder={["开始时间", "结束时间"]}
            {...form('date', {
              initialValue: [record.startToEnd[0], record.startToEnd[2]]
            })}
          /> */}
          <Input placeholder='请输入' />
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