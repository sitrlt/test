import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { saveFormData } from '../redux/actions';
import {useNavigate} from "react-router-dom";

// 定义表单值的类型
type FormValues = {
    username: string;
    phoneNumber: string;
    code: string;
    password: string;
};

const RegisterPage: React.FC = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm<FormValues>(); // 获取表单实例，并指定表单值的类型
    const [countdown, setCountdown] = useState(0);
    const [canSendCode, setCanSendCode] = useState(true); // 默认可以发送验证码
    const navigate = useNavigate(); // 获取导航函数

    const handleFinish = (values: FormValues) => {
        console.log('注册信息:', values);
        dispatch(saveFormData(values)); // 保存表单数据到Redux和localStorage
        message.success('注册成功！');
    };

    const handleSendCode = () => {
        if (countdown > 0 || !canSendCode) return;
        const phoneRegex = /^1[3-9]\d{9}$/;
        // 获取表单值
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

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    const handleSwitchToLogin = () => {
        navigate('/login');
    };

    return (
        <div style={{padding: '20px', maxWidth: 400, margin: '50px auto' ,boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',}}>
            <h2 style={{ textAlign: 'center' }}>用户注册</h2>
            <Form
                form={form}
                onFinish={handleFinish}
                initialValues={{ username: '', phoneNumber: '', code: '', password: '' }}
            >
                <Form.Item
                    name="username"
                    rules={[
                        { required: true, message: '请输入用户名!' },
                        { max: 6, message: '用户名不能超过6位!' },
                        { pattern: /^[a-zA-Z0-9]*$/, message: '用户名只能包含数字和字母!' }
                    ]}
                >
                    <Input placeholder="请输入用户名" style={{borderRadius: '1px'}} />
                </Form.Item>

                <Form.Item
                    name="phoneNumber"
                    rules={[
                        { required: true, message: '请输入手机号!' },
                        { pattern: /^1[3-9]\d{9}$/, message: '手机号必须是以1开头的11位数字!' }
                    ]}
                >
                    <Input placeholder="请输入手机号"  style={{borderRadius: '1px'}}/>
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

                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: '请输入密码!' },
                        { min: 6, message: '密码长度至少为6位!' },
                        { pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,}/, message: '密码必须包含至少1个大写字母，1个小写字母，1个数字，1个特殊字符' }
                    ]}
                >
                    <Input.Password placeholder="请输入密码" style={{borderRadius: '1px'}} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%',borderRadius: '2px' ,backgroundColor:'#1890ff'}}>
                        立刻注册
                    </Button>
                </Form.Item>
                <Form.Item style={{ textAlign: 'center', marginTop: '10px' }}>
                    <a onClick={handleForgotPassword} style={{ marginRight: '206px',color:'#1890ff' }}>忘记密码</a>
                    <span>已有账号？<a onClick={handleSwitchToLogin} style={{color:'#1890ff' }}>马上登录</a></span>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegisterPage;