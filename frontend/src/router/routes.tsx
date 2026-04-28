import { PUBLIC_ROUTE } from "@/constants";
import { lazy } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const AllUsers = lazy(() => import("@/containers/pages/AllUsers"));
// eslint-disable-next-line react-refresh/only-export-components
const AllBooks = lazy(() => import("@/containers/pages/AllBooks"));
// eslint-disable-next-line react-refresh/only-export-components
const AllReservations = lazy(
  () => import("@/containers/pages/AllReservations"),
);
// eslint-disable-next-line react-refresh/only-export-components
const ReservationByUser = lazy(
  () => import("@/containers/pages/ReservationByUser"),
);
// eslint-disable-next-line react-refresh/only-export-components
const ReservationByBook = lazy(
  () => import("@/containers/pages/ReservationByBook"),
);

// Rutas públicas
export const publicRoutes: {
  path: string;
  component: React.FC;
  children?: {
    path: string;
    component: React.FC;
  }[];
}[] = [
  {
    path: PUBLIC_ROUTE.USERS,
    component: AllUsers,
  },
  {
    path: PUBLIC_ROUTE.BOOKS,
    component: AllBooks,
  },
  {
    path: PUBLIC_ROUTE.RESERVATIONS_GENERAL,
    component: AllReservations,
  },
  {
    path: PUBLIC_ROUTE.RESERVATIONS_BY_USER,
    component: ReservationByUser,
  },
  {
    path: PUBLIC_ROUTE.RESERVATIONS_BY_BOOK,
    component: ReservationByBook,
  },

  //   {
  //     path: PRIVATE_ROUTE.PROSPECTS,
  //     component: ProspectManagement,
  //     children: [
  //       {
  //         path: PRIVATE_ROUTE.PROSPECTS_DELETION_MODAL,
  //         component: ProspectDeletionModal,
  //       },
  //       {
  //         path: PRIVATE_ROUTE.PROSPECTS_DISCARD_MODAL,
  //         component: ProspectDiscardModal,
  //       },
  //     ],
  //   },
  //   {
  //     path: PRIVATE_ROUTE.CONFIGURATION,
  //     component: ConfigurationComponent,
  //     permission: PERMISSIONS.SETTINGS,
  //     children: [
  //       {
  //         path: ':url',
  //         component: MasterTableSwitch
  //       }
  //     ]
  //   },
];
