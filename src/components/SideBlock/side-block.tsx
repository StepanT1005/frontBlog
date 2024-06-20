import React from "react";
import styles from "./side-block.module.scss";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

type SideBlockProps = {
  title: string;
  children: React.ReactNode;
};

export const SideBlock: React.FC<SideBlockProps> = (props) => {
  const { title, children } = props;

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography variant="h6" classes={{ root: styles.title }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};
