import { useMutation } from "@apollo/client/react";
import { RETURN_BOOK } from "@/graphql/queries";
import { createNotification } from "@/components/NotificationCustom";

interface UseReturnBookProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refetch: (params: any) => void;
  currentPage: number;
  pageSize: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dateRange: [any, any] | null;
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
