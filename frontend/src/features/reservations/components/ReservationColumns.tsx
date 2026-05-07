import type { ColumnsType } from "antd/es/table";
import { Button, Tag } from "antd";
import type { IReservation } from "../interfaces/reservations";

interface ColumnsProps {
  currentPage: number;
  pageSize: number;
  onReturnBook?: (id: string) => void;
  loadingReturn?: boolean;
}

export const getReservationColumns = ({
  currentPage,
  pageSize,
  onReturnBook,
  loadingReturn,
}: ColumnsProps): ColumnsType<IReservation> => [
  {
    title: "#",
    key: "index",
    align: "center",
    render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
  },
  {
    title: "Libro",
    key: "book",
    align: "center",
    render: (_, record) => record.book.title,
  },
  {
    title: "Autor",
    key: "author",
    align: "center",
    render: (_, record) => record.book.author,
  },
  {
    title: "Usuario",
    key: "user",
    align: "center",
    render: (_, record) => record.user.name,
  },
  {
    title: "Email",
    key: "email",
    align: "center",
    render: (_, record) => record.user.email,
  },
  {
    title: "Fecha reserva",
    key: "reservationDate",
    align: "center",
    render: (_, record) => record.reservationDate.toString().split("T")[0],
  },
  {
    title: "Fecha devolución",
    key: "returnDate",
    align: "center",
    render: (_, record) => record.returnDate.toString().split("T")[0],
  },
  {
    title: "Estado de la reserva",
    key: "status",
    align: "center",
    render: (_, record) => {
      if (record.returned) return <Tag color="green">Devuelto</Tag>;
      if (record.isLate) return <Tag color="red">Atrasado</Tag>;
      return <Tag color="blue">Activo</Tag>;
    },
  },
  {
    title: "Días restantes",
    key: "daysLeft",
    align: "center",
    render: (_, record) => (record.daysLeft < 0 ? "-" : record.daysLeft),
  },
  {
    title: "Días de retraso",
    key: "lateDays",
    align: "center",
    render: (_, record) => (record.lateDays > 0 ? record.lateDays : "-"),
  },
  {
    title: "Acciones",
    key: "actions",
    align: "center",
    render: (_, record) => (
      <Button
        type="primary"
        danger={record.returned}
        disabled={record.returned}
        loading={loadingReturn}
        onClick={() => onReturnBook?.(record.id)}
      >
        {record.returned ? "Ya devuelto" : "Retornar libro"}
      </Button>
    ),
  },
];
