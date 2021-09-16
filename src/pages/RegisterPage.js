import React from "react";
import { Button, Form, Input, message } from "antd";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import translateMessage from "../utils/translateMessage";
import { Link } from "react-router-dom";
import { formItemLayout, tailFormItemLayout } from "../utils/formLayout";

const RegisterPage = () => {
    const [form] = Form.useForm();

    const onFinish = async ({ email, password, name }) => {
        // console.log("values", values);

        try {
            const userCredential = await auth.createUserWithEmailAndPassword(
                email,
                password
            );
            // Signed in
            const user = userCredential.user;
            console.log("user", user);
            await db.ref(`users/${user.uid}`).set({
                id: user.uid,
                name,
                email,
            });

            message.success("Usuario registrado correctamente");
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("errorCode", errorCode);
            console.log("errorMessage", errorMessage);
            message.error(translateMessage(errorCode));
        }
    };

    return (
        <div>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="name"
                    label="Nombre"
                    tooltip="Cuéntanos como te llamas."
                    rules={[
                        {
                            required: true,
                            message: "Ingresa tu nombre",
                            whitespace: true,
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Correo electrónico"
                    rules={[
                        {
                            type: "email",
                            message: "Ingresa un correo válido",
                        },
                        {
                            required: true,
                            message: "Este campo es obligatorio",
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Contraseña"
                    rules={[
                        {
                            required: true,
                            message: "Ingresa tu contraseña",
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirmar contraseña"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Confirma tu contraseña",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("Las contraseñas no coinciden")
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Registrarme
                    </Button>
                </Form.Item>

                <Form.Item>
                    ¿Ya tienes una cuenta? <Link to="/iniciar-sesion">Inicia sesión</Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegisterPage;