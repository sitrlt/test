import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { saveFormData } from '../redux/actions';
import {useNavigate} from "react-router-dom"; // 假设你有一个action来保存表单数据

const ForgotPasswordPage: React.FC = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [countdown, setCountdown] = useState(0);
    const [canSendCode, setCanSendCode] = useState(true);
    const navigate = useNavigate(); // 获取导航函数

    const handleFinish = (values: any) => {
        console.log('找回密码信息:', values);
        dispatch(saveFormData(values)); // 保存表单数据到Redux和localStorage
        message.success('密码已重置，请使用新密码登录！');
    };

    const handleSendCode = () => {
        if (countdown > 0 || !canSendCode) return;
        const phoneRegex = /^1[3-9]\d{9}$/;
        const values = form.getFieldsValue();
        const phoneNumber = values.phoneNumber;
        if (!phoneRegex.test(phoneNumber)) {
            message.error('请输入有效的手机号');
            return;
        }
        setCountdown(30);
        setCanSendCode(false);
        // 模拟发送验证码
        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
            if (countdown === 0) {
                clearInterval(interval);
                setCanSendCode(true);
            }
        }, 1000);
        message.success('验证码已发送');
    };

    const handleSwitchToLogin = () => {
        navigate('/login');

    };

    const handleSwitchToRegister = () => {
        navigate('/register');

    };

    return (
        <div style={{padding: '20px', maxWidth: 400, margin: '50px auto' ,boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',}}>
            <h2 style={{ textAlign: 'center' }}>找回密码</h2>
            <Form
                form={form}
                onFinish={handleFinish}
                initialValues={{ phoneNumber: '', newPassword: '', code: '' }}
            >
                <Form.Item
                    name="phoneNumber"
                    rules={[
                        { required: true, message: '请输入手机号!' },
                        { pattern: /^1[3-9]\d{9}$/, message: '手机号必须是以1开头的11位数字!' }
                    ]}
                >
                    <Input placeholder="请输入手机号" style={{borderRadius: '1px'}}/>
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    rules={[
                        { required: true, message: '请输入新密码!' },
                        { min: 6, message: '密码长度至少为6位!' },
                        { pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,}/, message: '密码必须包含至少1个大写字母，1个小写字母，1个数字，1个特殊字符' }
                    ]}
                >
                    <Input.Password placeholder="请输入新密码" style={{borderRadius: '1px'}}/>
                </Form.Item>

                <Form.Item>
                    <Input.Group compact>
                        <Form.Item
                            name="code"
                            rules={[
                                { required: true, message: '请输入验证码!' },
                                { pattern: /^\d{6}$/, message: '验证码必须是6位数字!' }
                            ]}
                            style={{ width: '60%' }}
                        >
                            <Input placeholder="请输入验证码" style={{borderRadius: '1px'}}/>
                        </Form.Item>
                        <Form.Item style={{ width: '40%' }}>
                            <Button
                                style={{borderRadius: '1px',backgroundColor:'#1890ff'}}
                                type="primary"
                                disabled={countdown > 0 || !canSendCode}
                                onClick={handleSendCode}
                            >
                                {countdown > 0 ? `${countdown}s后重新获取` : '获取验证码'}
                            </Button>
                        </Form.Item>
                    </Input.Group>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' ,borderRadius: '2px',backgroundColor:'#1890ff'}}>
                        确定
                    </Button>
                </Form.Item>
                <Form.Item style={{ textAlign: 'center', marginTop: '10px' }}>
                    <a onClick={handleSwitchToLogin} style={{ marginRight: '210px' ,color:'#1890ff'}}>立刻登录</a>
                    <span>没有账号？<a onClick={handleSwitchToRegister} style={{color:'#1890ff' }}>快速注册</a></span>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ForgotPasswordPage;