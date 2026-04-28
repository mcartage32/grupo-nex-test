import type { ColumnsType } from "antd/es/table";
import { Button, Table, Tag, DatePicker } from "antd";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_ALL_RESERVATIONS, RETURN_BOOK } from "@/graphql/queries";
import type {
  IReservation,
  IAllReservationsResponse,
  IAllReservationsVariables,
} from "@/interfaces";
import type { Dayjs } from "dayjs";
import { createNotification } from "@/components/NotificationCustom";

const AllReservations = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);

  const { data, loading, refetch } = useQuery<
    IAllReservationsResponse,
    IAllReservationsVariables
  >(GET_ALL_RESERVATIONS, {
    variables: {
      page: currentPage,
      limit: pageSize,
      filter: {
        startDate: undefined,
        endDate: undefined,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  const [returnBook, { loading: returning }] = useMutation(RETURN_BOOK);

  const handleReturnBook = (id: string) => {
    returnBook({
      variables: {
        id,
      },
      onCompleted: () => {
        createNotification.success({
          title: "Libro retornado",
          description: "El libro fue devuelto correctamente",
        });

        refetch({
          page: currentPage,
          limit: pageSize,
          filter: {
            startDate: dateRange?.[0]?.toISOString(),
            endDate: dateRange?.[1]?.toISOString(),
          },
        });
      },
      onError: () => {
        createNotification.error({
          title: "Error",
          description: "No se pudo retornar el libro",
        });
      },
    });
  };

  const columns: ColumnsType<IReservation> = [
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
      dataIndex: "reservationDate",
      key: "reservationDate",
      align: "center",
      render: (date: string) => date.toString().split("T")[0],
    },
    {
      title: "Fecha devolución",
      dataIndex: "returnDate",
      key: "returnDate",
      align: "center",
      render: (date: string) => date.toString().split("T")[0],
    },
    {
      title: "Estado",
      key: "status",
      align: "center",
      render: (_, record) => {
        if (record.returned) {
          return <Tag color="green">Devuelto</Tag>;
        }

        if (record.isLate) {
          return <Tag color="red">Atrasado</Tag>;
        }

        return <Tag color="blue">Activo</Tag>;
      },
    },
    {
      title: "Días restantes",
      dataIndex: "daysLeft",
      key: "daysLeft",
      align: "center",
      render: (value: number) => (value < 0 ? "-" : value),
    },
    {
      title: "Días de retraso",
      dataIndex: "lateDays",
      key: "lateDays",
      align: "center",
      render: (value: number) => (value > 0 ? value : "-"),
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
          loading={returning}
          onClick={() => handleReturnBook(record.id)}
        >
          {record.returned ? "Ya devuelto" : "Retornar libro"}
        </Button>
      ),
    },
  ];

  return (
    <div className="w-full px-4 md:px-8 py-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-6">
          Reservas
        </h2>
        <div className="flex flex-col items-center mb-4">
          <label className="mb-2 text-sm font-medium text-gray-700">
            Filtrar por fecha de reserva
          </label>
          <DatePicker.RangePicker
            onChange={(dates) => {
              setDateRange(dates);
              refetch({
                page: 1,
                limit: pageSize,
                filter: {
                  startDate: dates?.[0]?.toISOString(),
                  endDate: dates?.[1]?.toISOString(),
                },
              });
              setCurrentPage(1);
            }}
          />
        </div>
        <Table
          dataSource={data?.allReservations?.data}
          columns={columns}
          rowKey="id"
          loading={loading}
          locale={{ emptyText: "No hay reservas registradas" }}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: data?.allReservations?.total || 0,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
            onShowSizeChange: (_, size) => {
              setPageSize(size);
              setCurrentPage(1);

              refetch({
                page: 1,
                limit: size,
                filter: {
                  startDate: dateRange?.[0]?.toISOString(),
                  endDate: dateRange?.[1]?.toISOString(),
                },
              });
            },
            onChange: (page) => {
              setCurrentPage(page);
              refetch({
                page,
                limit: pageSize,
                filter: {
                  startDate: dateRange?.[0]?.toISOString(),
                  endDate: dateRange?.[1]?.toISOString(),
                },
              });
            },
          }}
          scroll={{
            y: "calc(100vh - 300px)",
            x: "max-content",
          }}
        />
      </div>
    </div>
  );
};

export default AllReservations;
