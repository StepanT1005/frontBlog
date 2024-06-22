import styles from "./user-info.module.scss";
import { DEFAULT_AVATAR } from "@/api/api";
import { Avatar } from "@mui/material";

type UserInfoProps = {
  avatarUrl?: string;
  username: string;
};

export const UserInfo = (props: UserInfoProps) => {
  const { avatarUrl, username } = props;
  return (
    <div className={styles.root}>
      <Avatar alt={username} src={avatarUrl || DEFAULT_AVATAR} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{username}</span>
      </div>
    </div>
  );
};
