import { Modal, Form, Input, Button } from "antd";
import { useMutation } from "@apollo/client/react";
import { createNotification } from "@/components/common/NotificationCustom";
import { noOnlySpaces } from "@/validators/formValidators";
import { CREATE_BOOK } from "../graphql/mutations";
import { GET_ALL_BOOKS } from "../graphql/queries";
import type {
  ICreateBookResponse,
  ICreateBookVariables,
} from "../interfaces/books";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateBookModal({ open, onClose }: Props) {
  const [form] = Form.useForm();

  const [createBook, { loading }] = useMutation<
    ICreateBookResponse,
    ICreateBookVariables
  >(CREATE_BOOK, {
    refetchQueries: [
      {
        query: GET_ALL_BOOKS,
        variables: { page: 1, limit: 5 },
      },
    ],
  });

  const handleSubmit = (values: { title: string; author: string }) => {
    createBook({
      variables: {
        data: {
          title: values.title.trim(),
          author: values.author.trim(),
        },
      },
      onCompleted: () => {
        createNotification.success({
          title: "Libro creado",
          description: "El libro se creó correctamente",
        });

        form.resetFields();
        onClose();
      },
      onError: () => {
        createNotification.error({
          title: "Error",
          description: "No se pudo crear el libro",
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
        <div className="text-center text-lg font-semibold">Crear Libro</div>
      }
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Título"
          name="title"
          rules={[
            {
              required: true,
              message: "El título es obligatorio",
            },
            noOnlySpaces("El título no puede contener solo espacios"),
          ]}
        >
          <Input placeholder="Ingrese el título" />
        </Form.Item>

        <Form.Item
          label="Autor"
          name="author"
          rules={[
            {
              required: true,
              message: "El autor es obligatorio",
            },
            noOnlySpaces("El autor no puede contener solo espacios"),
          ]}
        >
          <Input placeholder="Ingrese el autor" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={loading}>
          Crear libro
        </Button>
      </Form>
    </Modal>
  );
}
