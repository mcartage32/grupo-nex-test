import { Menu } from "antd";
import { VscDashboard } from "react-icons/vsc";
import { CiCalendarDate } from "react-icons/ci";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTE } from "@/constants";

interface Props {
  selectedKey: string;
  setSelectedKey: (key: string) => void;
}

export default function MenuSider({ selectedKey, setSelectedKey }: Props) {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKey(key);
    switch (key) {
      case "1":
        navigate(PUBLIC_ROUTE.HOME);
        break;
      case "2":
        navigate(PUBLIC_ROUTE.USERS);
        break;
      case "3":
        navigate(PUBLIC_ROUTE.RESERVATIONS_GENERAL);
        break;
      case "4":
        break;
    }
  };

  return (
    <Menu
      mode="inline"
      style={{
        background: "transparent",
        borderRight: "none",
      }}
      selectedKeys={[selectedKey]}
      onClick={handleMenuClick}
      items={[
        {
          key: "1",
          icon: <VscDashboard size={22} />,
          label: "Dashboard",
        },
        {
          key: "2",
          icon: <CiCalendarDate size={22} />,
          label: "Citas",
        },
        {
          key: "3",
          icon: <HiOutlineDocumentReport size={18} />,
          label: "Reportes",
        },
        {
          key: "4",
          icon: <TbLogout size={18} />,
          label: "Cerrar sesión",
        },
      ]}
    />
  );
}
