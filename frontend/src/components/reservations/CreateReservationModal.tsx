import { Modal, Form, DatePicker, Select, Button } from "antd";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  CREATE_RESERVATION,
  GET_AVAILABLE_USERS,
  GET_AVAILABLE_BOOKS,
} from "@/graphql/queries";
import { createNotification } from "@/components/common/NotificationCustom";
import type {
  ICreateReservationResponse,
  ICreateReservationVariables,
  IGetAvailableUsersResponse,
} from "@/interfaces";
import { API_ERROR_MESSAGES } from "@/constants/apiErrors";
import LoaderPage from "@/components/common/LoaderPage";
import dayjs from "dayjs";

interface Props {
  open: boolean;
  onClose: () => void;
  selectedBook: string;
}

export default function CreateReservationModal({
  open,
  onClose,
  selectedBook,
}: Props) {
  const [form] = Form.useForm();
  const { data, loading } = useQuery<IGetAvailableUsersResponse>(
    GET_AVAILABLE_USERS,
    {
      fetchPolicy: "cache-and-network",
    },
  );
  const userOptions =
    data?.availableUsers.map((user) => ({
      label: `${user.name} (${user.email})`,
      value: user.id,
    })) || [];

  const [createReservation, { loading: creating }] = useMutation<
    ICreateReservationResponse,
    ICreateReservationVariables
  >(CREATE_RESERVATION, {
    refetchQueries: [
      {
        query: GET_AVAILABLE_BOOKS,
        variables: {
          page: 1,
          limit: 5,
        },
      },
    ],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {
    createReservation({
      variables: {
        data: {
          userId: values.userId,
          bookId: selectedBook,
          reservationDate: values.reservationDate.format("YYYY-MM-DD"),
          returnDate: values.returnDate.format("YYYY-MM-DD"),
        },
      },
      onCompleted: () => {
        createNotification.success({
          title: "Reserva registrada",
          description: "La reserva del libro ha sido almacenada correctamente.",
        });
        form.resetFields();
        onClose();
      },

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        const backendMessage =
          error?.graphQLErrors?.[0]?.message || error?.message || "";

        const translatedMessage =
          API_ERROR_MESSAGES[backendMessage] ||
          "Ha ocurrido un error inesperado";

        createNotification.error({
          title: "Error al registrar la reserva",
          description: translatedMessage,
        });
      },
    });
  };

  if (loading) return <LoaderPage />;

  return (
    <Modal
      title={
        <div className="w-full text-center text-lg font-semibold">
          Crear reserva
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        {/* Usuario */}
        <Form.Item
          label="Usuario"
          name="userId"
          rules={[{ required: true, message: "Selecciona un usuario" }]}
        >
          <Select placeholder="Selecciona un usuario" options={userOptions} />
        </Form.Item>

        {/* Fecha reserva */}
        <Form.Item
          label="Fecha de reserva"
          name="reservationDate"
          rules={[{ required: true }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
            onChange={() => {
              form.setFieldsValue({ returnDate: null });
            }}
            allowClear
          />
        </Form.Item>

        {/* Fecha devolución */}
        <Form.Item
          label="Fecha de devolución"
          name="returnDate"
          rules={[{ required: true }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            disabledDate={(current) => {
              const reservationDate = form.getFieldValue("reservationDate");
              if (!reservationDate) {
                return current && current < dayjs().startOf("day");
              }
              return current && current <= reservationDate.startOf("day");
            }}
            allowClear
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={creating}>
          Crear reserva
        </Button>
      </Form>
    </Modal>
  );
}
