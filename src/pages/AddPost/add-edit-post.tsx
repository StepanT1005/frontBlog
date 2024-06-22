import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { TextField, Paper, Button } from "@mui/material/";
import SimpleMDE from "react-simplemde-editor";
import { useParams, useNavigate, Navigate, Link } from "react-router-dom";
import client, { BASE_URL } from "@/api/api";
import "easymde/dist/easymde.min.css";
import styles from "./add-post.module.scss";
import {
  useAppDispatch,
  useAppSelector,
  clearPostData,
  fetchPost,
  getIsAuth,
} from "@/redux";

const AddEditPost = () => {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector(getIsAuth);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>();

  const { postData } = useAppSelector((state) => state.post);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onChange = useCallback((value: string) => {
    setText(value);
  }, []);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPost(postId));
    } else {
      dispatch(clearPostData());
    }
  }, [dispatch, postId]);

  useEffect(() => {
    if (postData) {
      setTitle(postData.title);
      setText(postData.text);
      setTags(postData.tags.join(" "));
      setImageUrl(postData.imageUrl);
    } else {
      setTitle("");
      setText("");
      setTags("");
      setImageUrl("");
    }
  }, [postData]);

  const handleChangeFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await client.post("/upload", formData);

      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert("Error uploading file");
    }
  };

  const onSubmit = async () => {
    try {
      const fields = { title, text, imageUrl, tags: tags.split(" ") };
      const response = postId
        ? await client.patch(`/posts/${postId}`, fields)
        : await client.post("/posts", fields);
      navigate(`/posts/${response.data._id}`);
    } catch (error) {
      console.warn(error);
      alert("Error creating post");
    }
  };
  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Enter text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: postId || "new-post",
      },
    }),
    [postId]
  );

  if (!isAuth) return <Navigate to="/" replace />;

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current?.click()}
        variant="outlined"
        size="large"
      >
        Upload Photo
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={() => setImageUrl(null)}
          >
            Remove
          </Button>
          <img
            className={styles.image}
            src={`${BASE_URL}/${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}{" "}
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Article Title..."
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags"
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {postId ? "Save" : "Publish"}
        </Button>
        <Link to="/">
          <Button size="large">Cancel</Button>
        </Link>
      </div>
    </Paper>
  );
};

export default AddEditPost;
