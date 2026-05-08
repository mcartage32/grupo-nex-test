import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_AVAILABLE_BOOKS } from "../graphql/queries";
import type {
  IGetAvailableBooksResponse,
  IGetAvailableBooksVariables,
} from "../interfaces/books";

export const useAvailableBooks = () => {
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

  const handleOpenReservationModal = (bookId: string) => {
    setSelectedBook(bookId);
    setOpenReservationModal(true);
  };

  return {
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
  };
};
