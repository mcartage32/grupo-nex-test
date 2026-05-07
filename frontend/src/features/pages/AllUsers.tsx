import type { ColumnsType } from "antd/es/table";
import { Button, Table, Tag } from "antd";
import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_USERS_PAGINATED } from "@/graphql/queries/users";
import type {
  IUser,
  IFindAllUsersResponse,
  IFindAllUsersVariables,
} from "@/interfaces";
import CreateUserModal from "../../components/users/CreateUserModal";

const AllUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);

  const { data, loading } = useQuery<
    IFindAllUsersResponse,
    IFindAllUsersVariables
  >(GET_ALL_USERS_PAGINATED, {
    variables: {
      page: currentPage,
      limit: pageSize,
    },
    fetchPolicy: "cache-and-network",
  });

  const columns: ColumnsType<IUser> = [
    {
      title: "#",
      key: "index",
      align: "center",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Estado",
      dataIndex: "isBanned",
      key: "isBanned",
      align: "center",
      render: (isBanned: boolean) => (
        <Tag color={isBanned ? "red" : "green"}>
          {isBanned ? "Bloqueado" : "Activo"}
        </Tag>
      ),
    },
  ];

  return (
    <>
      <div className="w-full px-4 md:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-6 break-words">
            Usuarios
          </h2>
          <div className="flex flex-col sm:flex-row sm:justify-end mb-4">
            <Button
              type="primary"
              className="w-full sm:w-auto min-w-[50px]"
              onClick={() => setOpenCreateUserModal(true)}
            >
              Crear usuario
            </Button>
          </div>
          <Table
            dataSource={data?.findAllUsers?.data}
            columns={columns}
            rowKey="id"
            loading={loading}
            locale={{ emptyText: "No hay usuarios registrados" }}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: data?.findAllUsers?.total || 0,
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
      <CreateUserModal
        open={openCreateUserModal}
        onClose={() => setOpenCreateUserModal(false)}
      />
    </>
  );
};

export default AllUsers;
