import { uniqueId } from "lodash";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
import {
  IconPoint,
  IconDashboard,
  IconFile,
  IconUsers,
  IconLockOpen,
  IconSettings,
  IconBell,
  IconApps,
  IconServer,
  IconNotebook,
  IconSchool,
  IconServerCog,
  IconTableOptions,
  IconFileCertificate,
  IconBriefcase,
  IconFolderBolt,
  IconFolderOpen,
  IconFolderOff,
  IconFolder,
} from "@tabler/icons-react";
import { SidebarBooksIcon } from "@/components/Icons";
import { MenuCodeEnum, MenuNameEnum } from "@/utils/Constants";

export const LatestMenuItems: MenuitemsType[] = [
  {
    id: uniqueId(),
    title: "Exam Management",
    icon: IconFile,
    href: "/Exam-Management",
    code: "exam-management",
    orderNumber: 2,
  },
  {
    id: uniqueId(),
    title: "Create Exam",
    icon: IconNotebook,
    href: "/acj-exam/create-acj-exam",
    code: "create-exam",
    orderNumber: 1,
  },
  
];
