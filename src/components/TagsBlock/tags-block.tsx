import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
} from "@mui/material/";

import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import { SideBlock } from "../SideBlock/side-block";

type TagsBlockProps = {
  items: string[];
  isLoading: boolean;
};

export const TagsBlock = (props: TagsBlockProps) => {
  const { items, isLoading } = props;
  return (
    <SideBlock title="Tags">
      <List>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TagIcon />
                  </ListItemIcon>
                  <Skeleton width={100} />
                </ListItemButton>
              </ListItem>
            ))
          : items?.map((name) => (
              <ListItem key={name} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TagIcon />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
      </List>
    </SideBlock>
  );
};
