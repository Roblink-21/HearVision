import React from "react";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import translateMessage from "../utils/translateMessage";
import { formItemLayout } from "../utils/formLayout";

const LoginPage = () => {
    let history = useHistory();

    const onFinish = async ({ email, password }) => {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(
                email,
                password
            );
            // Signed in
            const user = userCredential.user;
            console.log("user", user);
            history.push("/tareas");
        } catch (error) {
            const errorCode = error.code;
            console.log("errorCode", errorCode);
            message.error(translateMessage(errorCode));
        }
    };

    return (
        <div>
            <Form
                {...formItemLayout}
                name="login"
                className="login-form"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Correo electrónico"
                    name="email"
                    rules={[
                        { required: true, message: "Ingresa tu correo electrónico" },
                        {
                            type: "email",
                            message: "Ingresa un correo válido",
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Contraseña"
                    rules={[{ required: true, message: "Ingresa tu contraseña" }]}
                >
                    <Input.Password prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item>
                    <a href="">Olvidé mi contraseña</a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Iniciar sesión
                    </Button>
                </Form.Item>

                <Form.Item>
                    ¿Aún no tienes una cuenta?{" "}
                    <Link to="/registro">Regístrate ahora!</Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginPage;