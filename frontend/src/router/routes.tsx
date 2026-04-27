import { PUBLIC_ROUTE } from "@/constants";
//import { lazy } from "react";

// const Login = lazy(() => import("@/containers/pages/auth/Login"));
// const Dashboard = lazy(() => import("@/containers/pages/dashboard"));
// const Appointments = lazy(() => import("@/containers/pages/appointments"));
// const Reports = lazy(() => import("@/containers/pages/reports"));

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
    component: () => <div>Usuarios</div>,
  },
  {
    path: PUBLIC_ROUTE.BOOKS,
    component: () => <div>Libros</div>,
  },
  {
    path: PUBLIC_ROUTE.RESERVATIONS_BY_USER,
    component: () => <div>Reservas por Usuario</div>,
  },
  {
    path: PUBLIC_ROUTE.RESERVATIONS_BY_BOOK,
    component: () => <div>Reservas por Libro</div>,
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
