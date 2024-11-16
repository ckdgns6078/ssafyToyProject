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
        // type: post.type ?? "general", // type 필드가 없다면 기본값 설정
        type: post.type === 1 ? "general" : post.type === 2 ? "broker" : "general",
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
    const userInfo = await getUserInfo();
    const userId = userInfo.userId;
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
    console.log("data : " , data);

    if (response.status === 200) {
      // 데이터 정제
      const formattedData = {
        id : data.articleNo,
        title: data.boardSubject,  // 게시글 번호 => 제목
        author: data.boardUserId, // 작성자 ID => 작성자
        content: data.content, // 게시글 내용
        createdAt: data.boardRegisterTime, // 게시글 등록 시간
        views: data.hit, // 조회수
        comments: data.comments.map(comment => {
          return {
            id: comment.commentId, // 댓글 ID
            commentUserId: comment.commentUserId, // 댓글 작성자 ID
            commentContent: comment.commentContent, // 댓글 내용
            commentRegisterTime: comment.commentRegisterTime, // 댓글 등록 시간
            replying: false, // 대댓글 입력 여부
            replyContent: "", // 대댓글 내용
            repliesVisible: false, // 대댓글 보기 여부
            replies: comment.childComments ? comment.childComments.map(child => ({
              id: child.commentId, // 자식 댓글 ID
              author: child.commentUserId, // 자식 댓글 작성자 ID
              content: child.commentContent, // 자식 댓글 내용
              createdAt: child.commentRegisterTime // 자식 댓글 등록 시간
            })) : [] // 자식 댓글이 있을 경우 정제하여 포함
          };
        }) 
      };
      return formattedData;
    }
    
  } catch (error) {
    console.log("boardDetail error : ", error);
  }
};

//댓글 추가
const addComment =  async(articleno , content , vm) =>{
  try{
    const userInfo = await getUserInfo();
    const userId = userInfo.userId;
    console.log("article : " ,articleno );
    console.log("content : " , content);
    const response = await axios.post(BASE_URL + "/article/addComment", {
      userId : userId,
      articleNo : articleno,
      content : content,
    });

    if(response.status === 200){
      console.log("새로고침 됩니다");
    }

  }catch(error){
    console.log("boardDetail Error" . error);
  }
}

//대댓글 추가
const addChildComment = async(articleNo , parentId , content) =>{
    console.log("childComment 실행됐음");
  try{
    const userInfo = await getUserInfo();
    const userId = userInfo.userId;

    const response = await axios.post(BASE_URL + "/article/addComment",{
      userId : userId,
      articleNo : articleNo,
      parentId : parentId,
      content : content,
    });
    
    if(response.status===200){
      console.log("추가 댓글 성공");
    }

  }catch(error){
    console.log("addChildComment ERROR" , error);
  }
}

//수정 페이지 이동 관련 검사
const modifyCheck = async(id) =>{
  const userInfo = await getUserInfo();
  const userId = userInfo.userId;
  console.log("id : " , id);
  console.log("user id : " , userId);
  return userId === id;  
};

const modifyData = async(articleNo) =>{
  try{
    const response = await axios.get(BASE_URL + "/article/getModifyData" , {
      params :{
        articleNo : articleNo
      }
    });
    
    if(response.status===200){
      console.log("success");
      return response.data;
    }

  }catch(error){
    console.log("modify get Data ERROR" , erro);
  }
}

const modifyBoard = async (articleNo , boardInfo, vm) =>{
  try{
    const response = await axios.put(BASE_URL + "/article/modify" , {
      articleNo : articleNo,
      subject : boardInfo.title,
      content : boardInfo.content,
    });
     
    if(response.status === 200){
      alert("게시물 수정 완료");
      vm.$router.push({
        name: "boardDetail",
        query: { articleno: articleNo },
      });
    }

  }catch(error){
    console.log("modifyBoard ERROR"  , error);
  }
}

/**
 * 공인중개사 게시글
 */
const search = () => {};

/**
 * 일반사용자 게시글
 */
const boardUser = () => {};

/**
 * 작성자 검색
 */
const searchAuthor = async (searchTerm) => {
  try{
    const response = await axios.get(BASE_URL + "/article/searchAuthor" , {
      params: {
        term : searchTerm,
      },
    });
    if(response.status===200){
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
  }catch(error){
    console.log("searchAuthor Error :" , error);
  }
};

/**
 * 제목 검색
 */
const searchTitle = async (searchTerm) => {
  try{
    const response = await axios.get(BASE_URL + "/article/searchTitle" , {
      params: {
        term : searchTerm,
      },
    });

    if(response.status===200){
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

  }catch(error){
    console.log("searchAuthor Error :" , error);
  }
};

/**
 * 작성자 + 제목 검색
 */
const searchAll = async (searchTerm) => {
  try{
    const response = await axios.get(BASE_URL + "/article/searchAll" , {
       params: {
        term : searchTerm,
      },
    });

    if(response.status===200){
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

  }catch(error){
    console.log("searchAuthor Error :" , error);
  }
};

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
 *
 */

export default {
  boardAll,
  getUserInfo,
  login,
  getUserId,
  boardCreate,
  boardDetail,
  updateUserInfo,
  addComment,
  addChildComment,
  modifyCheck,
  modifyData,
  modifyBoard,
  searchTitle,
  searchAuthor,
  searchAll
};
