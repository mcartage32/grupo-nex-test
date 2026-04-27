import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTE } from "@/constants";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa";
import { LuUserRoundCheck } from "react-icons/lu";
import { LuNotebookPen } from "react-icons/lu";

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
        navigate(PUBLIC_ROUTE.BOOKS);
        break;
      case "5":
        navigate(PUBLIC_ROUTE.RESERVATIONS_BY_USER);
        break;
      case "6":
        navigate(PUBLIC_ROUTE.RESERVATIONS_BY_BOOK);
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
          icon: <IoHomeOutline size={22} />,
          label: "Home",
        },
        {
          key: "2",
          icon: <FaRegUser size={22} />,
          label: "Usuarios",
        },
        {
          key: "3",
          icon: <FaBook size={18} />,
          label: "Libros",
        },
        {
          key: "4",
          icon: <FaRegCalendarCheck size={18} />,
          label: "Reservas",
          children: [
            {
              key: "5",
              icon: <LuUserRoundCheck size={18} />,
              label: "Por usuario",
            },
            {
              key: "6",
              icon: <LuNotebookPen size={18} />,
              label: "Por libro",
            },
          ],
        },
      ]}
    />
  );
}
