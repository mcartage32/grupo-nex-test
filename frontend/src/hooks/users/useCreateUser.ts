import { useMutation } from "@apollo/client/react";
import { CREATE_USER, GET_ALL_USERS_PAGINATED } from "@/graphql/queries/users";
import { createNotification } from "@/components/common/NotificationCustom";
import type { ICreateUserResponse, ICreateUserVariables } from "@/interfaces";

interface Props {
  onSuccess?: () => void;
}

export const useCreateUser = ({ onSuccess }: Props = {}) => {
  const [createUser, { loading }] = useMutation<
    ICreateUserResponse,
    ICreateUserVariables
  >(CREATE_USER, {
    refetchQueries: [
      {
        query: GET_ALL_USERS_PAGINATED,
        variables: {
          page: 1,
          limit: 5,
        },
      },
    ],
  });

  const handleCreateUser = (values: { name: string; email: string }) => {
    createUser({
      variables: {
        data: values,
      },
      onCompleted: () => {
        createNotification.success({
          title: "Usuario creado",
          description: "El usuario se creó correctamente",
        });
        onSuccess?.();
      },
      onError: () => {
        createNotification.error({
          title: "Error",
          description: "No se pudo crear el usuario",
        });
      },
    });
  };

  return {
    handleCreateUser,
    creating: loading,
  };
};
