import { FC } from "react";
import { useSelector } from "@/store/hooks";
import Link from "next/link";
import { styled } from "@mui/material";
import { AppState } from "@/store/store";
import Image from "next/image";

const Logo = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: "42px",
    // width: customizer.isCollapse ? "40px" : "180px",
    width: customizer.isCollapse ? "120px" : "120px",
    overflow: "hidden",
    display: "block",
  }));

  if (customizer.activeDir === "ltr") {
    return (
      <LinkStyled
        href="/"
        sx={{
          "& img": {
            objectFit: "contain",
            height: "auto",
          },
        }}
      >
        {customizer.activeMode === "dark" ? (
          <Image
            src="/images/prep-x-logo.png"
            alt="logo"
            height={32}
            width={114}
            priority
            className="object-contain"
          />
        ) : (
          <Image
            src="/images/prep-x-logo.png"
            alt="logo"
            height={32}
            width={114}
            priority
            className="object-contain"
          />
        )}
      </LinkStyled>
    );
  }

  return (
    <LinkStyled href="/">
      {customizer.activeMode === "dark" ? (
        <Image
          src="/images/logos/light-rtl-logo.svg"
          alt="logo"
          height={40}
          width={109}
          priority
        />
      ) : (
        <Image
          src="/images/logos/light-logo-rtl.svg"
          alt="logo"
          height={40}
          width={109}
          priority
        />
      )}
    </LinkStyled>
  );
};

export default Logo;
