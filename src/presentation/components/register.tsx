import React from "react";
import styles from "../styles/register-style.module.css";

export const Register: React.FC = () => {

  //TODO
  //1. 이메일 값에 따른 caption 수정: 사용할 수 있는 ID입니다 || 이미 가입된 이메일입니다
  //2. 비밀번호 값에 따른 caption 수정: 사용할 수 있는 비밀번호입니다 || 특수문자가 포함되어야 합니다
  //3. 비밀번호 한번 더 입력 했을 때 틀렸을 경우에만 caption 출력
  //4. 중복되는 닉네임 입력 시에만 caption 출력
  
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
          <span className={styles.caption_left}>사용할 수 있는 ID입니다</span>
          <input
            type="password"
            className={styles.input}
            placeholder="비밀번호를 입력하세요"
          />
          <span className={styles.caption_left}>사용할 수 있는 비밀번호입니다</span>
          <input
            type="password"
            className={styles.input}
            placeholder="비밀번호를 한 번 더 입력하세요"
          />
          <span className={styles.caption_left}>일치하지 않는 비밀번호입니다</span>
          <input
            type="text"
            className={styles.input}
            placeholder="사용할 닉네임을 입력하세요"
          />
          <span className={styles.caption_left}>중복되는 닉네임입니다</span>
        </div>
        <input
          type="submit"
          className={styles.submit}
          value="로그인"
        />
      </form>
    </div>
  );
};
