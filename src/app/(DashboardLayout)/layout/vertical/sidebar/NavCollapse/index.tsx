import React, { useEffect } from "react";

import { useState } from "react";
import { useSelector } from "@/store/hooks";
import { usePathname, useRouter } from "next/navigation";

// mui imports
import {
  ListItemIcon,
  ListItemButton,
  Collapse,
  styled,
  ListItemText,
  useTheme,
  useMediaQuery,
  Theme,
} from "@mui/material";

// custom imports
import NavItem from "../NavItem";

// plugins
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { AppState } from "@/store/store";
import { isNull } from "lodash";
import { Stack, bgcolor, color, fontSize, lineHeight } from "@mui/system";

type NavGroupProps = {
  [x: string]: any;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: any;
};

interface NavCollapseProps {
  menu: NavGroupProps;
  level: number;
  pathWithoutLastPart: any;
  pathDirect: any;
  hideMenu: any;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

// FC Component For Dropdown Menu
export default function NavCollapse({
  menu,
  level,
  pathWithoutLastPart,
  pathDirect,
  hideMenu,
  onClick,
}: NavCollapseProps) {
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  const customizer = useSelector((state: AppState) => state.customizer);
  const Icon = menu?.icon;
  const theme = useTheme();
  const pathname = usePathname();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const menuIcon =
    level > 1 ? (
      <Icon stroke={1.5} size="1rem" />
    ) : (
      <Icon stroke={1.5} size="1.3rem" />
    );

  const handleClick = () => {
    if (level === 1) {
      setOpen(!open);
    } else {
      router.push(menu.href);
    }
  };
  // menu collapse for sub-levels
  React.useEffect(() => {
    setOpen(false);
    menu?.children?.forEach((item: any) => {
      if (item?.href === pathname) {
        setOpen(true);
      }
      item.children?.forEach((childItem: any) => {
        if (childItem?.href === pathname) {
          setOpen(true);
        }
      });
    });
  }, [pathname, menu.children]);

  const ListItemStyled = styled(ListItemButton)(() => ({
    marginBottom: "2px",
    padding: "8px 10px",
    paddingLeft: hideMenu ? "10px" : level > 2 ? `${level * 15}px` : "10px",
    backgroundColor: open && level < 2 ? theme.palette.secondary.main : "",
    whiteSpace: "nowrap",
    "&:hover": {
      backgroundColor:
        pathname.includes(menu.href) || open
          ? level === 1
            ? theme.palette.secondary.main
            : "transparent"
          : level === 2
          ? "transparent"
          : theme.palette.secondary.main,
      color:
        pathname.includes(menu.href) || (open && level === 1)
          ? theme.palette.mode === "light"
            ? "#FFF"
            : "#000"
          : level === 2
          ? theme.palette.secondary.main
          : theme.palette.mode === "light"
          ? "#FFF"
          : "#000",
      "& svg path": {
        stroke: `${
          open && theme.palette.mode === "light"
            ? "#FFFFFF"
            : theme.palette.mode === "dark"
            ? "#000"
            : "#FFF"
        }`,
      },
    },
    color:
      open && level < 2
        ? theme.palette.mode === "light"
          ? "#FFF"
          : "#000"
        : `inherit` && level > 1 && open
        ? theme.palette.text.secondary
        : theme.palette.text.secondary,

    borderRadius: `${customizer.borderRadius}px`,
    "& .MuiTypography-root": {
      fontSize: (open && level === 1) || level < 2 ? "14px" : "14px",
      lineHeight: "1.0125rem",
      fontWeight: (open && level === 1) || level < 2 ? 500 : 400,
    },
    "& svg path": {
      stroke: `${
        open && theme.palette.mode === "light"
          ? "#FFFFFF"
          : open && theme.palette.mode === "dark"
          ? "#000"
          : theme.palette.mode === "dark"
          ? "#FFF"
          : "#2a3547"
      }`,
    },
    "&.active-tab": {
      color: theme.palette.mode === "light" ? "#FFF" : "#000",
      background: theme.palette.secondary.main,
      "& svg path": {
        stroke: theme.palette.mode === "light" ? "#FFFFFF" : "#000",
      },
    },
  }));

  useEffect(() => {
    {
      (!customizer.isSidebarHover || customizer.isCollapse) && setOpen(false);
    }
    // console.log("hover", customizer.isSidebarHover);
  }, [customizer.isCollapse, customizer.isSidebarHover]);

  // If Menu has Children
  const submenus = menu.children?.map((item: any) => {
    if (item.children) {
      return (
        <NavCollapse
          key={item?.id}
          menu={item}
          level={level + 1}
          pathWithoutLastPart={pathWithoutLastPart}
          pathDirect={pathDirect}
          hideMenu={hideMenu}
          onClick={onClick}
        />
      );
    } else {
      return (
        <NavItem
          key={item.id}
          item={item}
          level={level + 1}
          pathDirect={pathDirect}
          hideMenu={hideMenu}
          onClick={lgDown ? onClick : isNull}
        />
      );
    }
  });

  return (
    <>
      <ListItemStyled
        onClick={!customizer.isCollapse ? handleClick : undefined}
        selected={pathWithoutLastPart === menu.href}
        key={menu?.id}
        className={menu.href === pathname ? "active-tab" : ""}
      >
        <ListItemIcon
          sx={{
            minWidth: "36px",
            p: "3px 0",
            color: "inherit",
          }}
        >
          {level === 1 && menuIcon}
        </ListItemIcon>
        <ListItemText color="inherit">
          {hideMenu ? "" : <>{t(`${menu.title}`)}</>}
        </ListItemText>
        {level === 1 ? (
          !open ? (
            <IconChevronDown size="1rem" />
          ) : (
            <IconChevronUp size="1rem" />
          )
        ) : (
          ""
        )}
      </ListItemStyled>
      {level === 1 && (
        <Collapse in={open} timeout="auto">
          {submenus}
        </Collapse>
      )}
      {level === 2 && <Stack>{submenus}</Stack>}
    </>
  );
}
