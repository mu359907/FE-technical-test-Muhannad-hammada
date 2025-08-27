"use client";
import React from "react";
import { Grid, Typography, Breadcrumbs, Theme, useTheme } from "@mui/material";
import NextLink from "next/link";

import breadcrumbImg from "public/images/breadcrumb/ChatBc.png";
import { IconChevronRight } from "@tabler/icons-react";

interface BreadCrumbType {
  subtitle?: string;
  items?: any[];
  title: string;
  children?: JSX.Element;
}

const Breadcrumb = ({ subtitle, items, title, children }: BreadCrumbType) => {
  const theme = useTheme();
  return (
    <Grid
      container
      sx={{
        mt: "36px",
        mb: "28px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Grid item xs={12} sm={12} lg={8}>
        <Breadcrumbs
          separator={
            <IconChevronRight size="16" style={{ color: "#99ABB4" }} />
          }
          sx={{
            alignItems: "center",
            mb: items ? "8px" : "",
            [`& .MuiBreadcrumbs-separator`]: {
              marginLeft: 0.25,
              marginRight: 0.25,
              mt: "5px",
            },
          }}
          aria-label="breadcrumb"
        >
          {items
            ? items.map((item) => (
                <div key={item.title}>
                  {item.to ? (
                    <NextLink href={item.to} passHref>
                      <Typography
                        sx={{
                          color: theme.palette.secondary.subTextColor,
                          transition: "0.1s ease-in",
                          "&:hover": {
                            color: theme.palette.primary.main,
                          },
                        }}
                        variant="paragraph3"
                      >
                        {item.title}
                      </Typography>
                    </NextLink>
                  ) : (
                    <Typography
                      color={theme.palette.primary.main}
                      variant="paragraph3"
                    >
                      {item.title}
                    </Typography>
                  )}
                </div>
              ))
            : ""}
        </Breadcrumbs>
        <Typography variant="h4" color={theme.palette.text.primary}>
          {title}
        </Typography>
        {subtitle && (
          <Typography
            color="textSecondary"
            variant="h6"
            fontWeight={400}
            sx={{
              opacity: 0.4,
            }}
            mt={0.8}
            mb={0}
          >
            {subtitle}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Breadcrumb;
