import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { Table, Select, DatePicker } from "antd";
import type { Dayjs } from "dayjs";
import { getReservationColumns } from "../components/ReservationColumns";
import type { IGetAvailableUsersResponse } from "@/features/users/interfaces/users";
import { GET_AVAILABLE_USERS } from "@/features/users/graphql/queries";
import { RESERVATIONS_BY_USER } from "../graphql/queries";
import { useReturnBook } from "@/features/books/hooks/useReturnBook";
import type {
  IReservationsByUserResponse,
  IReservationsByUserVariables,
} from "../interfaces/reservations";

const ReservationByUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);

  const { data: usersData } = useQuery<IGetAvailableUsersResponse>(
    GET_AVAILABLE_USERS,
    { fetchPolicy: "cache-and-network" },
  );

  const userOptions =
    usersData?.availableUsers.map((user) => ({
      label: `${user.name} (${user.email})`,
      value: user.id,
    })) || [];

  const { data, loading, refetch } = useQuery<
    IReservationsByUserResponse,
    IReservationsByUserVariables
  >(RESERVATIONS_BY_USER, {
    variables: {
      userId: selectedUser,
      page: currentPage,
      limit: pageSize,
      filter: {
        startDate: undefined,
        endDate: undefined,
      },
    },
    skip: !selectedUser,
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
        <h2 className="text-xl font-semibold text-center mb-6">
          Reservas por usuario
        </h2>
        <div className="flex justify-center mb-4">
          <Select
            placeholder="Selecciona un usuario"
            options={userOptions}
            style={{ width: 300 }}
            showSearch={{
              optionFilterProp: "label",
              filterOption: (input, option) =>
                (option?.label ?? "")
                  .toString()
                  .toLowerCase()
                  .includes(input.toLowerCase()),
            }}
            onChange={(value) => {
              setSelectedUser(value);
              setCurrentPage(1);
              refetch({
                userId: value,
                page: 1,
                limit: pageSize,
                filter: {
                  startDate: dateRange?.[0]?.toISOString(),
                  endDate: dateRange?.[1]?.toISOString(),
                },
              });
            }}
          />
        </div>

        {/* FILTRO FECHA */}
        <div className="flex flex-col items-center mb-4">
          <label className="mb-2 text-sm font-medium text-gray-700">
            Filtrar por fecha de reserva
          </label>

          <DatePicker.RangePicker
            onChange={(dates) => {
              setDateRange(dates);

              if (!selectedUser) return;

              refetch({
                userId: selectedUser,
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
          dataSource={data?.reservationsByUser?.data}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize,
            total: data?.reservationsByUser?.total || 0,
            onChange: (page) => {
              setCurrentPage(page);
              refetch({
                userId: selectedUser,
                page,
                limit: pageSize,
                filter: {
                  startDate: dateRange?.[0]?.toISOString(),
                  endDate: dateRange?.[1]?.toISOString(),
                },
              });
            },
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

export default ReservationByUser;
