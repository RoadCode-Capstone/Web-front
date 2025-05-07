import React from "react";
import styles from "../styles/register-style.module.css";

export const Register: React.FC = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className={styles.title}>회원가입</h1>
        <div className={styles.inputGroup}>
          <input
            type="text"
            className={styles.input}
            placeholder="이메일을 입력하세요"
          />
          <input
            type="password"
            className={styles.input}
            placeholder="비밀번호를 입력하세요"
          />
          <input
            type="password"
            className={styles.input}
            placeholder="비밀번호를 한 번 더 입력하세요"
          />
          <input
            type="text"
            className={styles.input}
            placeholder="사용할 닉네임을 입력하세요"
          />
        </div>
        <a href="#" className={`${styles.caption} ${styles.forgetPassword}`}>
          비밀번호를 잊어버리셨습니까?
        </a>
        <input
          type="submit"
          className={styles.submit}
          value="로그인"
        />
      </form>
    </div>
  );
};
