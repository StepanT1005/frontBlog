import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import client from "@/api/api";
import { useMediaQuery } from "@mui/material";
import { TagsBlock } from "../TagsBlock/tags-block";
import { CommentsBlock } from "../CommentsBlock/comments-block";

export const Sidebar = () => {
  const [tags, setTags] = useState({ items: [], isLoading: true });
  const [commentaries, setCommentaries] = useState({
    items: [],
    isLoading: true,
  });

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (!isMobile) {
      const fetchData = async () => {
        try {
          const tagsResponse = await client.get("/posts/getLastTags");
          setTags({ items: tagsResponse.data, isLoading: false });
        } catch (error) {
          console.error("Error fetching last tags:", error);
          setTags({ items: [], isLoading: false });
        }

        try {
          const commentariesResponse = await client.get(
            "/comments/getLastComments"
          );
          setCommentaries({
            items: commentariesResponse.data,
            isLoading: false,
          });
        } catch (error) {
          console.error("Error fetching last commentaries:", error);
          setCommentaries({ items: [], isLoading: false });
        }
      };

      fetchData();
    }
  }, [isMobile]);
  if (isMobile) {
    return null;
  }
  return (
    <Grid item xs={4}>
      <TagsBlock items={tags.items} isLoading={tags.isLoading} />
      <CommentsBlock
        items={commentaries.items}
        isLoading={commentaries.isLoading}
        isHomePage={true}
      />
    </Grid>
  );
};
