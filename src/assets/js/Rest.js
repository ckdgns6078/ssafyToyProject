import axios from "axios";

const BASE_URL = "http://localhost:8080";
/**
 *   로그인
 */
const login = async (userId, userPwd, vm) => {
  try {
    const response = await axios.post(BASE_URL + "/user/login", {
      userId: userId,
      userPwd: userPwd,
    });

    if (response.status === 200) {
      vm.$router.push({ name: "board" });
      console.log("response : ", response.data);
      console.log("resonse 성공");
    }
  } catch (error) {
    console.log("로그인 요청 중 실패 ", error);
  }
};

/**
 * 전체 게시글
 */
const boardAll = () => {};

/**
 * 공인중개사 게시글
 */
const boardAgent = () => {};

/**
 * 일반사용자 게시글
 */
const boardUser = () => {};

/**
 * 작성자 검색
 */
const searchWriter = () => {};

/**
 * 제목 검색
 */
const searchTitle = () => {};

/**
 * 작성자 + 제목 검색
 */
const searchAll = () => {};

export default { login };
/**
 * 회원가입
 */

/**
 * 마이페이지 수정
 */

/**
 *
 */
