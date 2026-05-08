import type { ColumnsType } from "antd/es/table";
import type { IBook } from "../interfaces/books";
import { useAvailableBooks } from "../hooks/useAvailableBooks";
import { Button, Table } from "antd";
import CreateReservationModal from "../../reservations/components/CreateReservationModal";

const AvailableBooks = () => {
  const {
    data,
    loading,
    currentPage,
    pageSize,
    setCurrentPage,
    setPageSize,
    selectedBook,
    openCreateReservationModal,
    setOpenReservationModal,
    handleOpenReservationModal,
  } = useAvailableBooks();

  const columns: ColumnsType<IBook> = [
    {
      title: "#",
      key: "index",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
      align: "center",
    },
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: "Autor",
      dataIndex: "author",
      key: "author",
      align: "center",
    },
    {
      title: "Acciones",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => {
            handleOpenReservationModal(record.id);
          }}
        >
          Reservar
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="w-full px-4 md:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 md:p-6">
          <div className="text-center mb-6 px-2">
            <h1 className="text-2xl md:text-3xl font-bold break-words">
              Bienvenido a OLECRAM
            </h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base break-words">
              Tu sistema de gestión de reservas de libros
            </p>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-6 break-words px-2">
            Libros disponibles
          </h2>
          <Table
            dataSource={data?.availableBooks?.data}
            columns={columns}
            rowKey="id"
            loading={loading}
            locale={{ emptyText: "No hay libros disponibles" }}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: data?.availableBooks?.total || 0,
              onChange: (page) => setCurrentPage(page),
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20", "50"],
              onShowSizeChange: (_, size) => {
                setPageSize(size);
                setCurrentPage(1);
              },
            }}
            scroll={{
              y: "calc(100vh - 360px)",
              x: "max-content",
            }}
          />
        </div>
        <CreateReservationModal
          open={openCreateReservationModal}
          onClose={() => setOpenReservationModal(false)}
          selectedBook={selectedBook}
        />
      </div>
    </>
  );
};

export default AvailableBooks;
