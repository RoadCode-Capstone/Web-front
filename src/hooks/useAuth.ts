export const useAuth = () => {
  const isLoggedIn = !!sessionStorage.getItem("jwt"); // 예시: 토큰 존재 여부
  return { isLoggedIn };
};
