import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { Table, Select, DatePicker } from "antd";
import type { Dayjs } from "dayjs";
import { getReservationColumns } from "../components/ReservationColumns";
import { ALL_BOOKS_WITHOUT_PAGINATION } from "@/features/books/graphql/queries";
import { RESERVATIONS_BY_BOOK } from "../graphql/queries";
import { useReturnBook } from "@/features/books/hooks/useReturnBook";
import type {
  IBooksWithoutPaginationResponse,
  IReservationsByBookResponse,
  IReservationsByBookVariables,
} from "@/features/books/interfaces/books";

const ReservationByBook = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);

  const { data: booksData } = useQuery<IBooksWithoutPaginationResponse>(
    ALL_BOOKS_WITHOUT_PAGINATION,
    { fetchPolicy: "cache-and-network" },
  );

  const bookOptions =
    booksData?.booksWithoutPagination.map((book) => ({
      label: `${book.title} - ${book.author}`,
      value: book.id,
    })) || [];

  const { data, loading, refetch } = useQuery<
    IReservationsByBookResponse,
    IReservationsByBookVariables
  >(RESERVATIONS_BY_BOOK, {
    variables: {
      bookId: selectedBook,
      page: currentPage,
      limit: pageSize,
      filter: {
        startDate: undefined,
        endDate: undefined,
      },
    },
    skip: !selectedBook,
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
          Reservas por libro
        </h2>
        <div className="flex justify-center mb-4">
          <Select
            placeholder="Selecciona un libro"
            options={bookOptions}
            style={{ width: 350 }}
            showSearch={{
              optionFilterProp: "label",
              filterOption: (input, option) =>
                (option?.label ?? "")
                  .toString()
                  .toLowerCase()
                  .includes(input.toLowerCase()),
            }}
            onChange={(value) => {
              setSelectedBook(value);
              setCurrentPage(1);
              refetch({
                bookId: value,
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
        <div className="flex flex-col items-center mb-4">
          <label className="mb-2 text-sm font-medium text-gray-700">
            Filtrar por fecha de reserva
          </label>
          <DatePicker.RangePicker
            onChange={(dates) => {
              setDateRange(dates);
              if (!selectedBook) return;
              refetch({
                bookId: selectedBook,
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
          dataSource={data?.reservationsByBook?.data}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize,
            total: data?.reservationsByBook?.total || 0,
            onChange: (page) => {
              setCurrentPage(page);
              refetch({
                bookId: selectedBook,
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
                bookId: selectedBook,
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

export default ReservationByBook;
