import { useCreateUser } from "@/features/users/hooks";
import { noOnlySpaces } from "@/validators/formValidators";
import { Modal, Form, Input, Button } from "antd";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateUserModal({ open, onClose }: Props) {
  const [form] = Form.useForm();

  const { handleCreateUser, creating } = useCreateUser({
    onSuccess: () => {
      form.resetFields();
      onClose();
    },
  });

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={
        <div className="text-center text-lg font-semibold">Crear usuario</div>
      }
    >
      <Form layout="vertical" form={form} onFinish={handleCreateUser}>
        <Form.Item
          label="Nombre"
          name="name"
          rules={[
            {
              required: true,
              message: "El nombre es obligatorio",
            },
            noOnlySpaces("El nombre no puede contener solo espacios"),
          ]}
        >
          <Input placeholder="Ingrese el nombre" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "El email es obligatorio",
            },
            {
              type: "email",
              message: "Email inválido",
            },
            noOnlySpaces("El email no puede contener solo espacios"),
          ]}
        >
          <Input placeholder="Ingrese el email" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={creating}>
          Crear usuario
        </Button>
      </Form>
    </Modal>
  );
}
