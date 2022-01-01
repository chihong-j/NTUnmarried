import React from 'react';
import { Modal, Form, Input } from 'antd';

const RegisterModal = ({ isVisible, onCreate, onCancel} ) => {
    const [form] = Form.useForm();
    const handleSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                form.resetFields();
                onCreate(values.name, values.passward);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }

    return (
        <Modal
            visible={isVisible}
            title="Create an User"
            okText="Sign Up"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={handleSubmit}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the username!',
                        },
                    ]}
                >
                    <Input autoFocus={true} onPressEnter={handleSubmit} />
                </Form.Item>
                <Form.Item
                    name="passward"
                    label="Passward"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the passward!',
                        },
                    ]}
                >
                    <Input autoFocus={true} onPressEnter={handleSubmit} />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default RegisterModal