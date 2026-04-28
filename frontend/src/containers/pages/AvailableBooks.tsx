import type { ColumnsType } from "antd/es/table";
import { Button, Table } from "antd";
import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_AVAILABLE_BOOKS } from "@/graphql/queries";
import type {
  IBook,
  IGetAvailableBooksResponse,
  IGetAvailableBooksVariables,
} from "@/interfaces";
import CreateReservationModal from "./CreateReservationModal";

const AvailableBooks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedBook, setSelectedBook] = useState("");
  const [openCreateReservationModal, setOpenReservationModal] = useState(false);

  const { data, loading } = useQuery<
    IGetAvailableBooksResponse,
    IGetAvailableBooksVariables
  >(GET_AVAILABLE_BOOKS, {
    variables: {
      page: currentPage,
      limit: pageSize,
    },
    fetchPolicy: "cache-and-network",
  });

  const columns: ColumnsType<IBook> = [
    {
      title: "#",
      key: "index",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Autor",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => {
            setSelectedBook(record.id);
            setOpenReservationModal(true);
          }}
        >
          Reservar
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="card-table">
        <h2 className="leads-form-title">Libros disponibles</h2>
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
          scroll={{ x: 300 }}
        />
      </div>
      <CreateReservationModal
        open={openCreateReservationModal}
        onClose={() => setOpenReservationModal(false)}
        selectedBook={selectedBook}
      />
    </>
  );
};

export default AvailableBooks;
