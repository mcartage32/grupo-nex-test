import { useMutation } from "@apollo/client/react";
import { Dayjs } from "dayjs";
import { createNotification } from "@/components/common/NotificationCustom";
import { RETURN_BOOK } from "@/features/reservations/graphql/mutations";

interface RefetchParams {
  page: number;
  limit: number;
  filter: {
    startDate?: string;
    endDate?: string;
  };
}

interface UseReturnBookProps {
  refetch: (params: RefetchParams) => void;
  currentPage: number;
  pageSize: number;
  dateRange: [Dayjs | null, Dayjs | null] | null;
}

export const useReturnBook = ({
  refetch,
  currentPage,
  pageSize,
  dateRange,
}: UseReturnBookProps) => {
  const [returnBook, { loading }] = useMutation(RETURN_BOOK);

  const handleReturnBook = (id: string) => {
    returnBook({
      variables: { id },
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

  return {
    handleReturnBook,
    returning: loading,
  };
};
