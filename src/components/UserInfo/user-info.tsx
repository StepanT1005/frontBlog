import { useState } from "react";
import styles from "./user-ifno.module.scss";

type UserInfoProps = {
  avatarUrl?: string;
  username: string;
  additionalText: string;
};

export const UserInfo = (props: UserInfoProps) => {
  const { avatarUrl, username, additionalText } = props;
  const [imgSrc, setImgSrc] = useState(avatarUrl || "/noavatar.png");

  const handleError = () => {
    if (imgSrc !== "/noavatar.png") {
      setImgSrc("/noavatar.png");
    }
  };

  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={imgSrc}
        alt={username}
        onError={handleError}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{username}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
