import React from "react";
import styles from "../styles/passwordFinding.module.css";

export const PasswordFinding: React.FC = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className={styles.title}>비밀번호 찾기</h1>

        <div className={styles.input_form}>
          <input
            type="text"
            className={styles.input}
            placeholder="이메일을 입력하세요"
          />
          <button type="button" className={styles.buttonYellow}>
            인증번호 발송
          </button>

          <input
            type="text"
            className={styles.input}
            placeholder="인증번호를 입력하세요"
          />
          <div className={styles.timer}>2:59</div>
        </div>

        <span className={styles.caption_left}>인증번호가 틀렸습니다</span>

        <button type="submit" className={styles.submit}>
          확인
        </button>
      </form>
    </div>
  );
};
