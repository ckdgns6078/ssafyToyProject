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
      console.log("로그인 응답 데이터:", response.data); // 서버에서 반환된 데이터 확인

      const { accessToken, refreshToken } = response.data;
      console.log(accessToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      console.log("accessToken 저장됨:", localStorage.getItem("accessToken"));
      console.log("refreshToken 저장됨:", localStorage.getItem("refreshToken"));
      
      vm.$router.push({ name: "board" });
      console.log("response : ", response.data);
      console.log("resonse 성공");
    }
  } catch (error) {
    console.log("로그인 요청 중 실패 ", error);
  }
};

/**
 * 사용자 정보 가져오기
 */
const getUserInfo = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("토큰이 없습니다. 다시 로그인해주세요.");
      return null;
    }

    const response = await axios.get(`${BASE_URL}/user/info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("사용자 정보 요청 중 오류 발생:", error);
    return null;
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

/**
 * 회원가입
 */



/**
 * 마이페이지 수정
 */

const updateUserInfo = async (updateData, vm) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("토큰이 없습니다. 다시 로그인해주세요.");
    }

    const response = await axios.put(`${BASE_URL}/user/updateMember`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("updateUser", response);
    if (response.status === 200) {
      console.log("회원 정보가 성공적으로 수정되었습니다.");
      vm.$router.push({ name: "mypage" });
    }
  } catch (error) {
    console.error("회원 정보 수정 중 오류 발생:", error);
    throw error; // 오류가 발생한 경우 상위 메소드에서 잡히도록 예외를 다시 던짐
  }
};

const deleteUserInfo = async (vm) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("토큰이 없습니다. 다시 로그인해주세요.");
    }

    const response = await axios.delete(`${BASE_URL}/user/deleteMember`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    if(response.status === 200) { 
      console.log("회원 탈퇴 완료!")
      vm.$router.push({ name: "home" });

    }
  } catch (error) {
    console.error("회원 삭제 중 오류 발생:", error);
    throw error;
  }
};

/**
 *
 */


export default { 
  login,
  getUserInfo,
  updateUserInfo,
  deleteUserInfo,
};