import React from "react";
import styles from "../styles/login-style.module.css";

export const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <form className={styles.form}>
        <h1 className={styles.title}>로그인</h1>
        <div className={styles.loginInput}>
          <input
            className={styles.input}
            type="text"
            placeholder="이메일을 입력하세요"
          />
          <input
            className={styles.input}
            type="password"
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <a href="#" className={`${styles.caption} ${styles.forgetPassword}`}>
          비밀번호를 잊어버리셨습니까?
        </a>
        <input
          type="submit"
          className={styles.loginSubmit}
          value="로그인"
        />
      </form>
    </div>
  );
};
