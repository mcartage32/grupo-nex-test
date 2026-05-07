import { Table, DatePicker } from "antd";
import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import type { Dayjs } from "dayjs";
import { getReservationColumns } from "../components/ReservationColumns";
import { GET_ALL_RESERVATIONS } from "../graphql/queries";
import { useReturnBook } from "@/features/books/hooks/useReturnBook";
import type {
  IAllReservationsResponse,
  IAllReservationsVariables,
} from "../interfaces/reservations";

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

  const { handleReturnBook, returning } = useReturnBook({
    refetch,
    currentPage,
    pageSize,
    dateRange,
  });

  const columns = getReservationColumns({
    currentPage,
    pageSize,
    onReturnBook: handleReturnBook,
    loadingReturn: returning,
  });

  return (
    <div className="w-full px-4 md:px-8 py-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 md:p-6">
        <h2
          className="text-xl md:text-2xl font-semibold text-center mb-6"
          break-words
        >
          Reservas
        </h2>
        <div className="flex flex-col items-center mb-4">
          <label className="mb-2 text-sm font-medium text-gray-700 break-words">
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
