import { SmileOutlined, WarningOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, notification, Select } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../contexts/PostContext";
import { Post } from "../Dashboard";

const { Option } = Select;
type Props = {
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  isCreate: boolean;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  postEdit?: Post;
};

export interface PostValues {
  _id: string;
  title: string;
  description: string;
  url: string;
  status: string;
}

const openNotification = (success: boolean, message: string) => {
  notification.open({
    message: success ? "Success" : "Failed",
    duration: 2,
    description: message,
    icon: success ? (
      <SmileOutlined style={{ color: "#108ee9" }} />
    ) : (
      <WarningOutlined style={{ color: "#ff1e16" }} />
    ),
  });
};

const FormPost = ({
  isEdit,
  setIsEdit,
  isCreate,
  setIsCreate,
  postEdit,
}: Props) => {
  const { addPost, updatedPost } = useContext(PostContext);
  const [form] = Form.useForm();

  // const [formVal, setFormVal] = useState({
  //   _id: "",
  //   title: "",
  //   description: "",
  //   status: "",
  //   url: "",
  // });

  useEffect(() => {
    if (isEdit && postEdit) {
      form.setFieldsValue({
        _id: postEdit._id,
        title: postEdit.title,
        description: postEdit.description,
        status: postEdit.status,
        url: postEdit.url,
      });
    }
    if (isCreate) {
      form.setFieldsValue({
        _id: "",
        title: "",
        description: "",
        status: "",
        url: "",
      });
    }
  }, [form, postEdit, isCreate, isEdit]);

  const onFinish = async (values: PostValues) => {
    if (isCreate) {
      const { success, message } = await addPost(values);
      openNotification(success, message);
    }
    if (isEdit && postEdit) {
      values = { ...values, _id: postEdit._id };
      const { success, message } = await updatedPost(values);
      openNotification(success, message);
    }
    setIsEdit(false);
    setIsCreate(false);
    form.resetFields();
  };

  const onCancel = () => {
    form.resetFields();
    setIsEdit(false);
    setIsCreate(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    setIsEdit(false);
    setIsCreate(false);
    form.resetFields();
  };

  return (
    <Modal
      title={isEdit ? "Edit" : "Create"}
      visible={isEdit || isCreate}
      footer={null}
      onCancel={onCancel}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input your title" }]}
        >
          <Input defaultValue={isEdit ? postEdit?.title : undefined} />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input defaultValue={isEdit ? postEdit?.description : undefined} />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select
            defaultValue={isEdit ? postEdit?.status : undefined}
            style={{ width: "100%" }}
          >
            <Option value="TO LEARN">TO LEARN</Option>
            <Option value="LEARNING">LEARNING</Option>
            <Option value="LEARNED">LEARNED</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Url" name="url">
          <Input defaultValue={isEdit ? postEdit?.url : undefined} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormPost;
