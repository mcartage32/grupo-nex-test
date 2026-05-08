import type { ColumnsType } from "antd/es/table";
import type { IBookWithAvailability } from "../interfaces/books";
import { Button, Popconfirm, Space, Table, Tag, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAllBooks } from "../hooks/useAllBooks";
import CreateBookModal from "../components/CreateBookModal";
import EditBookModal from "../components/EditBookModal";

const AllBooks = () => {
  const {
    data,
    loading,
    deleting,
    currentPage,
    pageSize,
    setCurrentPage,
    setPageSize,
    selectedBookId,
    openCreateBookModal,
    setOpenCreateBookModal,
    openEditBookModal,
    setOpenEditBookModal,
    openEditModal,
    handleDeleteBook,
  } = useAllBooks();

  const columns: ColumnsType<IBookWithAvailability> = [
    {
      title: "#",
      key: "index",
      align: "center",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
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
      title: "Disponible",
      dataIndex: "isAvailable",
      key: "isAvailable",
      align: "center",
      render: (value: boolean) =>
        value ? <Tag color="green">Sí</Tag> : <Tag color="red">No</Tag>,
    },
    {
      title: "Acciones",
      key: "actions",
      align: "center",
      render: (_, record) => {
        return record.isAvailable ? (
          <Space size="middle">
            <Tooltip title="Editar">
              <EditOutlined
                style={{ color: "#1677ff", cursor: "pointer", fontSize: 18 }}
                onClick={() => openEditModal(record.id)}
              />
            </Tooltip>
            <Popconfirm
              title="¿Eliminar libro?"
              description="Esta acción no se puede deshacer"
              onConfirm={() => handleDeleteBook(record.id)}
              okText="Sí"
              cancelText="No"
            >
              <Tooltip title="Eliminar">
                <DeleteOutlined
                  style={{
                    color: "#ff4d4f",
                    cursor: deleting ? "not-allowed" : "pointer",
                    fontSize: 18,
                    opacity: deleting ? 0.5 : 1,
                  }}
                />
              </Tooltip>
            </Popconfirm>
          </Space>
        ) : null;
      },
    },
  ];

  return (
    <>
      <div className="w-full px-4 md:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-6 break-words">
            Todos los libros
          </h2>
          <div className="flex justify-end mb-4">
            <Button
              type="primary"
              className="w-full sm:w-auto min-w-[50px]"
              onClick={() => setOpenCreateBookModal(true)}
            >
              Crear libro
            </Button>
          </div>
          <Table
            dataSource={data?.findAllBooks?.data}
            columns={columns}
            rowKey="id"
            loading={loading}
            locale={{ emptyText: "No hay libros registrados" }}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: data?.findAllBooks?.total || 0,
              onChange: (page) => setCurrentPage(page),
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20", "50"],
              onShowSizeChange: (_, size) => {
                setPageSize(size);
                setCurrentPage(1);
              },
            }}
            scroll={{
              y: "calc(100vh - 300px)",
              x: "max-content",
            }}
          />
        </div>
      </div>
      <CreateBookModal
        open={openCreateBookModal}
        onClose={() => setOpenCreateBookModal(false)}
      />
      <EditBookModal
        open={openEditBookModal}
        onClose={() => setOpenEditBookModal(false)}
        bookId={selectedBookId}
      />
    </>
  );
};

export default AllBooks;
