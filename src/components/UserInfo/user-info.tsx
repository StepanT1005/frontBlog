import styles from "./user-info.module.scss";
import { BASE_URL, DEFAULT_AVATAR } from "@/api/api";
import { Avatar } from "@mui/material";

type UserInfoProps = {
  avatarUrl?: string;
  username: string;
};

export const UserInfo = (props: UserInfoProps) => {
  const { avatarUrl, username } = props;
  const avatarLink = avatarUrl ? `${BASE_URL}${avatarUrl}` : DEFAULT_AVATAR;
  return (
    <div className={styles.root}>
      <Avatar alt={username} src={avatarLink} />

      <div className={styles.userDetails}>
        <span className={styles.userName}>{username}</span>
      </div>
    </div>
  );
};
