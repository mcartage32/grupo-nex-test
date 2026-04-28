import { Modal, Form, Input, Button } from "antd";
import { useMutation } from "@apollo/client/react";
import { CREATE_USER } from "@/graphql/queries/users";
import type { ICreateUserResponse, ICreateUserVariables } from "@/interfaces";
import { createNotification } from "@/components/NotificationCustom";
import { GET_ALL_USERS_PAGINATED } from "@/graphql/queries/users";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateUserModal({ open, onClose }: Props) {
  const [form] = Form.useForm();

  const [createUser, { loading }] = useMutation<
    ICreateUserResponse,
    ICreateUserVariables
  >(CREATE_USER, {
    refetchQueries: [
      {
        query: GET_ALL_USERS_PAGINATED,
        variables: { page: 1, limit: 5 },
      },
    ],
  });

  const handleSubmit = (values: { name: string; email: string }) => {
    createUser({
      variables: {
        data: {
          name: values.name,
          email: values.email,
        },
      },
      onCompleted: () => {
        createNotification.success({
          title: "Usuario creado",
          description: "El usuario se creó correctamente",
        });

        form.resetFields();
        onClose();
      },
      onError: () => {
        createNotification.error({
          title: "Error",
          description: "No se pudo crear el usuario",
        });
      },
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={
        <div className="text-center text-lg font-semibold">Crear usuario</div>
      }
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: "El nombre es obligatorio" }]}
        >
          <Input placeholder="Ingrese el nombre" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "El email es obligatorio" },
            { type: "email", message: "Email inválido" },
          ]}
        >
          <Input placeholder="Ingrese el email" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={loading}>
          Crear usuario
        </Button>
      </Form>
    </Modal>
  );
}
