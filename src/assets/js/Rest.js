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
const boardAll = async (pageNum) => {
  try {
    // 쿼리 파라미터로 페이지 번호를 전달
    const response = await axios.get(BASE_URL + "/article/list", {
      params: {
        pgno: pageNum, // 여기에서 'pgno'는 서버에서 요구하는 파라미터 이름입니다.
      },
    });

    if (response.status === 200) {
      console.log("response : ", response.data.articles);
      const formattedData = response.data.articles.map((post) => ({
        id: post.articleNo, // articleNo -> id
        content: post.content,
        views: post.hit, // hit -> views
        createdAt: post.registerTime, // registerTime -> createdAt
        title: post.subject, // subject -> title
        authorId: post.userId, // userId -> authorId
        author: post.userName, // userName -> author
        type: post.type ?? "general", // type 필드가 없다면 기본값 설정
        date: post.registerTime.split(" ")[0], // 날짜를 'YYYY-MM-DD' 형식으로 분리
      }));
      return { posts: formattedData };
    }
  } catch (error) {
    console.log("boardAll 실패", error);
  }
};

// 사용자의 토큰을 통해서 id를 찾는 코드
const getUserId = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.post(BASE_URL + "URL 경로", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("userID " + response.data.userId);
    return response.data.userId;
  } catch (error) {
    console.log("getUserId error : ".error);
  }
};

// board 신규 create 코드
const boardCreate = async (post, vm) => {
  try {
    //userId 값 받기
    // const userId = getUserId();
    const userId = "test";
    console.log("post : ", post.title);
    console.log("post : ", post.content);
    const response = await axios.post(BASE_URL + "/article/write", {
      userId: userId,
      subject: post.title,
      content: post.content,
    });

    if (response.status === 200) {
      console.log("response : ", response.data);

      vm.$router.push({
        name: "boardDetail",
        query: { articleno: response.data },
      });
    }
  } catch (error) {
    console.log("저장 실패 ", error);
    return "fail";
  }
};

// 게시글 정보 확인하는 곳
const boardDetail = async (articleno) => {
  try {
    const response = await axios.post(BASE_URL + "/article/view", {
      articleno: articleno,
    });

    const data = response.data.article;

    // title: "게시글 제목",
    //     author: "작성자 이름",
    //     createdAt: "2024-11-05",
    //     views: 123,
    //     content: "<p>여기에 게시글 내용을 작성합니다.</p>",
    // const board [
    //   title : data.,
    //   author,
    //   createAt,
    //   views,
    //   content,

    // ]

    if (response.status === 200) {
      console.log("성공");
      return;
    }
  } catch (error) {
    console.log("boardDetail error : ", error);
  }
};

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


/**
 * 회원 탈퇴
 */
const deleteUserInfo = async (vm) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("토큰이 없습니다. 다시 로그인해주세요.");
    }

    const response = await axios.delete(`${BASE_URL}/user/deleteMember`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      console.log("회원 탈퇴 완료!");
      vm.$router.push({ name: "home" });
    }
  } catch (error) {
    console.error("회원 삭제 중 오류 발생:", error);
    throw error;
  }
};

/**
 * 토큰 만료 확인 함수
 */
const isTokenExpired = (token) => {
  if(!token) return true;
  const payload = JSON.parse(atob(token.split(".")[1]));
  console.log("playload", payload);
  return payload.exp * 1000 < Date.now();
}

/**
 * 강제 로그아웃 함수
 */
const forceLogout = (vm) => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  vm.$router.push({ name: "home" });
};

/**
 * Access Token 및 Refresh Token 확인 및 갱신
 */
const validateAndRefreshToken = async (vm) => {
  let accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  // Access Token 만료 확인
  if (!accessToken || isTokenExpired(accessToken)) {
    if (!refreshToken || isTokenExpired(refreshToken)) {
      // Refresh Token도 만료 -> 강제 로그아웃
      console.error("Refresh Token이 만료되었습니다. 로그아웃합니다.");
      forceLogout(vm);
      return false;
    }

    try {
      // Refresh Token을 사용하여 Access Token 재발급
      const response = await axios.post(`${BASE_URL}/user/refresh`, { refreshToken });
      accessToken = response.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
      forceLogout();
      return false;
    }
  }

  return true;
};

export default {
  boardAll,
  getUserInfo,
  login,
  getUserId,
  boardCreate,
  boardDetail,
  updateUserInfo,
  validateAndRefreshToken,
};
