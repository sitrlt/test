import React from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { saveFormData } from '../redux/actions';
import { useNavigate } from'react-router-dom';
const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // 获取导航函数
    const handleFinish = (values: any) => {
        console.log('Success:', values);
        dispatch(saveFormData(values)); // 保存表单数据到Redux和localStorage
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    const handleQuickRegister = () => {
        navigate('/register');
    };

    return (
        <div style={{ backgroundColor: '#fff', padding: '20px', width: '350px',height:'350px', margin: '116px auto',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  borderRadius: '1px' }}>
            <h2 style={{ textAlign: 'center' }}>登录</h2>
            <Form
                onFinish={handleFinish}
                initialValues={{ username: '', password: '' }}
                style={{ padding: '20px' }}
            >
                <Form.Item
                    name="username"
                    rules={[
                        { required: true, message: '请输入用户名!' },
                        { max: 6, message: '用户名不能超过6位!' },
                        { pattern: /^[a-zA-Z0-9]*$/, message: '用户名只能包含数字和字母!' }
                    ]}
                >
                    <Input placeholder="Username" style={{borderRadius: '1px'}}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: '请输入密码!' },
                        { min: 6, message: '密码长度至少为6位!' },
                        { pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,}/, message: '密码必须包含至少1个大写字母，1个小写字母，1个数字，1个特殊字符' }
                    ]}
                >
                    <Input.Password placeholder="Password" style={{borderRadius: '1px'}} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%',borderRadius: '2px',backgroundColor:'#1890ff' }}>
                        登录
                    </Button>
                </Form.Item>
                <Form.Item style={{ textAlign: 'center', marginTop: '10px' }}>
                    <a onClick={handleForgotPassword} style={{ marginRight: '128px',color:'#1890ff' }}>忘记密码</a>
                    <span>没有账号？<a onClick={handleQuickRegister} style={{color:'#1890ff' }}>快速注册</a></span>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginPage;