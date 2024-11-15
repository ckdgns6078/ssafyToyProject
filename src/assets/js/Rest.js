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

export default { login, boardAll, boardAgent, boardUser, searchWriter, boardCreate, boardDetail };
