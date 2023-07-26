import { FaCalendarAlt, FaCalendarPlus, FaCalendarCheck } from "react-icons/fa";

export { tabs };

const tabs = [
  {
    id: 1,
    title: "All",
    icon: <FaCalendarAlt />,
  },
  {
    id: 2,
    title: "Todo",
    icon: <FaCalendarPlus />,
  },
  {
    id: 3,
    title: "Done",
    icon: <FaCalendarCheck />,
  },
];
