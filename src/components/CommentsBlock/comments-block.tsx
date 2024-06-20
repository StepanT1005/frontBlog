import React from "react";
import { SideBlock } from "../SideBlock/side-block";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  List,
  Skeleton,
} from "@mui/material/";
import { Link } from "react-router-dom";
import { Comment } from "@/redux";

type CommentsBlockProps = {
  items?: Comment[];
  isLoading?: boolean;
  isHomePage?: boolean;
};

export const CommentsBlock = (props: CommentsBlockProps) => {
  const { items = [], isLoading = true, isHomePage = false } = props;
  const skeletonItems = Array.from({ length: 5 }).map((_, index) => ({
    key: index,
    user: {
      username: "",
      avatarUrl: "",
    },
    content: "",
    post: "",
  }));

  const displayItems = isLoading ? skeletonItems : items;

  return (
    <SideBlock title="Comments">
      <List>
        {displayItems.map((obj, index) => (
          <React.Fragment key={obj?._id || index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj.user.username} src={obj.user.avatarUrl} />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : isHomePage ? (
                <Link to={`/posts/${obj.post}`}>
                  <ListItemText
                    primary={obj.user.username}
                    secondary={<>{obj.content}</>}
                    secondaryTypographyProps={{
                      variant: "caption",
                      noWrap: true,
                      style: {
                        width: "200px",
                      },
                    }}
                  />
                </Link>
              ) : (
                <ListItemText
                  primary={obj.user.username}
                  secondary={obj.content}
                  style={{ maxWidth: "fit-content", wordBreak: "break-all" }}
                />
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </SideBlock>
  );
};
