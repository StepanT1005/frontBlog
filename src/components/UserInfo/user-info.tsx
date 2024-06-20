import styles from "./user-ifno.module.scss";

type UserInfoProps = {
  avatarUrl?: string;
  username: string;
  additionalText: string;
};

export const UserInfo = (props: UserInfoProps) => {
  const { avatarUrl, username, additionalText } = props;

  const finalAvatarUrl = avatarUrl || "/noavatar.png";

  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={finalAvatarUrl}
        alt={username}
        onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) =>
          (event.currentTarget.src = "/noavatar.png")
        }
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{username}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
