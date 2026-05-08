import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_ALL_BOOKS } from "../graphql/queries";
import { DELETE_BOOK } from "../graphql/mutations";
import { createNotification } from "@/components/common/NotificationCustom";
import type {
  IGetAllBooksResponse,
  IGetAllBooksVariables,
} from "../interfaces/books";

export const useAllBooks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [openCreateBookModal, setOpenCreateBookModal] = useState(false);
  const [openEditBookModal, setOpenEditBookModal] = useState(false);

  const { data, loading } = useQuery<
    IGetAllBooksResponse,
    IGetAllBooksVariables
  >(GET_ALL_BOOKS, {
    variables: {
      page: currentPage,
      limit: pageSize,
    },
    fetchPolicy: "cache-and-network",
  });

  const [deleteBook, { loading: deleting }] = useMutation(DELETE_BOOK, {
    refetchQueries: [
      {
        query: GET_ALL_BOOKS,
        variables: {
          page: currentPage,
          limit: pageSize,
        },
      },
    ],
  });

  const handleDeleteBook = (id: string) => {
    deleteBook({
      variables: { id },

      onCompleted: () => {
        createNotification.success({
          title: "Libro eliminado",
          description: "El libro se eliminó correctamente",
        });
      },

      onError: () => {
        createNotification.error({
          title: "Error",
          description: "No se pudo eliminar el libro",
        });
      },
    });
  };

  const openEditModal = (id: string) => {
    setSelectedBookId(id);
    setOpenEditBookModal(true);
  };

  return {
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
    handleDeleteBook,
    openEditModal,
  };
};
