<template>
  <div>
    <!-- 상단 바 컴포넌트 -->
    <TopBar />

    <main class="board-container">
      <h2 class="board-title">게시글 목록</h2>
      <div class="filter-container">
        <div class="radio-group">
          <label>
            <input type="radio" value="all" v-model="postType" @change="handleRadioChange" />
            전체
          </label>
          <label>
            <input type="radio" value="broker" v-model="postType" @change="handleRadioChange" />
            공인중개사
          </label>
          <label>
            <input type="radio" value="general" v-model="postType" @change="handleRadioChange" />
            일반사용자
          </label>
        </div>
        <div class="search-container">
          <select v-model="searchOption" class="search-select">
            <option value="author">작성자</option>
            <option value="title">제목</option>
            <option value="author_title">작성자+제목</option>
          </select>
          <input
            type="text"
            v-model="searchTerm"
            placeholder="검색어 입력..."
            class="search-input"
          />
          <button class="search-button" @click="searchBoardList">
            <img
              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20'><path fill='black' d='M21.71 20.29l-4.39-4.39c1.5-2.03 2.39-4.56 2.39-7.29C19.71 3.4 16.31 0 12 0S4.29 3.4 4.29 8.29c0 4.88 3.9 8.79 8.79 8.79 2.73 0 5.26-.89 7.29-2.39l4.39 4.39c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41zM12 15.2c-3.88 0-7.2-3.32-7.2-7.2 0-3.88 3.32-7.2 7.2-7.2 3.88 0 7.2 3.32 7.2 7.2 0 3.88-3.32 7.2-7.2 7.2z'/></svg>"
            />
          </button>
        </div>
      </div>
      <table class="board-table">
        <thead>
          <tr>
            <th class="num-column">번호</th>
            <th class="title-column">제목</th>
            <th class="author-column">작성자</th>
            <th class="type-column">분류</th>
            <th class="date-column">작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in filteredPosts" :key="post.id">
            <td>{{ post.id }}</td>
            <td>
              <router-link :to="'/boardDetail?articleno=' + post.id">{{ post.title }}</router-link>
            </td>
            <td>{{ post.author }}</td>
            <td>{{ post.type === "broker" ? "공인중개사" : "일반사용자" }}</td>
            <td>{{ post.date }}</td>
          </tr>
        </tbody>
      </table>

      <!-- 게시글 작성 버튼 -->
      <div class="write-button-container">
        <button @click="writePost" class="write-button">게시글 작성</button>
      </div>
    </main>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import TopBar from "../../components/TopBar.vue";
import axios from "axios";

export default defineComponent({
  components: {
    TopBar, // TopBar 컴포넌트 등록
  },
  data() {
    return {
      searchTerm: "", // 검색어
      searchOption: "author", // 기본 선택 옵션
      postType: "all", // 기본 선택 라디오 버튼
      posts: [],
    };
  },
  computed: {
    filteredPosts() {
      return this.posts.filter((post) => {
        if (this.postType === "broker" && post.type !== "broker") {
          return false; // 공인중개사 글 필터링
        } else if (this.postType === "general" && post.type !== "general") {
          return false; // 일반사용자 글 필터링
        }
        // if (this.searchOption === "author") {
        //   return post.author.includes(this.searchTerm);
        // } else if (this.searchOption === "title") {
        //   return post.title.includes(this.searchTerm);
        // } else if (this.searchOption === "author_title") {
        //   return post.author.includes(this.searchTerm) || post.title.includes(this.searchTerm);
        // }
        return true;
      });
    },
  },
  methods: {
    async handleBoardList() {
      // 페이지 ?page 값 받기 없으면 1로 선언
      const pageNum = this.$route.query.page || 1;
      const response = await this.$rest.boardAll(pageNum);
      console.log("handle response  :" + response);

      if (response && Array.isArray(response.posts)) {
        this.posts = response.posts;
        console.log("posts : ", this.posts);
      } else {
        this.posts = [];
      }
    },

    writePost() {
      // 게시글 작성 페이지로 이동
      this.$router.push("/boardcreate");
    },

    // 검색
    async searchBoardList() {
      if(this.searchTerm.trim()===""){
        alert("검색어를 입력해주세요");
        return;
      }

      let response;

      if(this.searchOption === "author"){
        response = await this.$rest.searchAuthor(this.searchTerm);
      }else if(this.seachOption ==="title"){
        response = await this.$rest.searchTitle(this.searchTerm);
      }else{
        response = await this.$rest.searchAll(this.searchTerm);        
      }

      if (response && Array.isArray(response.posts)) {
        this.posts = response.posts;
        console.log("posts : ", this.posts);
      } else {
        this.posts = [];
      }

    },

    handleRadioChange() {
      // 라디오 버튼 선택 시 게시글 리스트를 필터링
      this.filteredPosts;
    },
  },
  mounted() {
    this.handleBoardList();
  },
});
</script>

<style scoped>
.board-container {
  padding: 20px;
  margin-top: 40px; /* TopBar와의 간격 조정 */
}

.board-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center; /* 수직 정렬을 중앙으로 */
  margin-bottom: 20px; /* 검색바와 테이블 사이 여백 추가 */
}

.radio-group {
  display: flex;
  align-items: center; /* 라디오 버튼을 수직 중앙에 정렬 */
}

.radio-group label {
  margin-right: 15px; /* 라디오 버튼 간 간격 */
}

.search-container {
  display: flex;
  align-items: center; /* 수직 정렬을 중앙으로 */
  justify-content: flex-end; /* 요소를 오른쪽 끝으로 이동 */
}

.search-select {
  margin-right: 10px;
  padding: 8px; /* 패딩 추가 */
  border: 1px solid #ddd; /* 테두리 추가 */
  border-radius: 4px; /* 모서리 둥글게 */
}

.search-input {
  padding: 8px;
  width: 300px; /* 검색창 너비 조정 */
  border: 1px solid #ddd; /* 테두리 추가 */
  border-radius: 4px; /* 모서리 둥글게 */
}

.search-button {
  border: 1px solid #ddd;
  border-radius: 4px; /* 모서리 둥글게 */
  background-color: #fff;
  padding: 8px; /* 버튼 패딩 조정 */
  cursor: pointer;
}

.search-button img {
  vertical-align: middle;
}

.board-table {
  width: 100%;
  border-collapse: collapse;
}

.board-table th,
.board-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.num-column {
  width: 5%;
}

.type-column {
  width: 10%;
}

.title-column {
  width: 45%;
}

.author-column {
  width: 15%;
}

.date-column {
  width: 15%;
}

.write-button-container {
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  margin-top: 20px;
}

.write-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.write-button:hover {
  background-color: #0056b3;
}
</style>
