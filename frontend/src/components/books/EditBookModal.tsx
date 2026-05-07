import { Modal, Form, Input, Button } from "antd";
import { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { BOOK_DETAIL, UPDATE_BOOK, GET_ALL_BOOKS } from "@/graphql/queries";
import type { IBookDetailResponse, IBookDetailVariables } from "@/interfaces";
import { createNotification } from "@/components/common/NotificationCustom";
import LoaderPage from "@/components/common/LoaderPage";

interface Props {
  open: boolean;
  onClose: () => void;
  bookId: string;
}

export default function EditBookModal({ open, onClose, bookId }: Props) {
  const [form] = Form.useForm();

  const { data, loading: loadingDetail } = useQuery<
    IBookDetailResponse,
    IBookDetailVariables
  >(BOOK_DETAIL, {
    variables: { id: bookId },
    skip: !bookId,
    fetchPolicy: "network-only",
  });

  const [updateBook, { loading }] = useMutation(UPDATE_BOOK, {
    refetchQueries: [
      {
        query: GET_ALL_BOOKS,
        variables: { page: 1, limit: 5 },
      },
    ],
  });

  const handleSubmit = (values: { title: string; author: string }) => {
    updateBook({
      variables: {
        data: {
          id: bookId,
          title: values.title,
          author: values.author,
        },
      },
      onCompleted: () => {
        createNotification.success({
          title: "Libro actualizado",
          description: "El libro se actualizó correctamente",
        });

        form.resetFields();
        onClose();
      },
      onError: () => {
        createNotification.error({
          title: "Error",
          description: "No se pudo actualizar el libro",
        });
      },
    });
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (data?.book && open) {
      form.setFieldsValue({
        title: data.book.title,
        author: data.book.author,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, open]);

  if (loadingDetail) return <LoaderPage />;

  return (
    <Modal
      destroyOnHidden
      open={open}
      onCancel={handleClose}
      footer={null}
      title={
        <div className="text-center text-lg font-semibold">Editar Libro</div>
      }
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Título"
          name="title"
          rules={[{ required: true, message: "El título es obligatorio" }]}
        >
          <Input placeholder="Ingrese el título" />
        </Form.Item>

        <Form.Item
          label="Autor"
          name="author"
          rules={[{ required: true, message: "El autor es obligatorio" }]}
        >
          <Input placeholder="Ingrese el autor" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={loading}>
          Actualizar libro
        </Button>
      </Form>
    </Modal>
  );
}
