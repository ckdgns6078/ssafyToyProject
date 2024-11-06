<template>
  <div>
    <!-- 상단 바 컴포넌트 -->
    <TopBar />

    <main class="board-container">
      <h2 class="board-title">게시글 목록</h2>
      <div class="filter-container">
        <div class="radio-group">
          <label>
            <input type="radio" value="all" v-model="postType" checked />
            전체
          </label>
          <label>
            <input type="radio" value="broker" v-model="postType" />
            공인중개사
          </label>
          <label>
            <input type="radio" value="general" v-model="postType" />
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
          <button class="search-button">
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
              <router-link :to="'/boardDetail?id=' + post.id">{{ post.title }}</router-link>
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

export default defineComponent({
  components: {
    TopBar, // TopBar 컴포넌트 등록
  },
  data() {
    return {
      searchTerm: "", // 검색어
      searchOption: "author", // 기본 선택 옵션
      postType: "all", // 기본 선택 라디오 버튼
      posts: [
        {
          id: 1,
          title: "첫 번째 게시글",
          author: "홍길동",
          date: "2024-11-01",
          type: "broker", // 공인중개사
        },
        {
          id: 2,
          title: "두 번째 게시글",
          author: "이순신",
          date: "2024-11-02",
          type: "general", // 일반사용자
        },
        {
          id: 3,
          title: "세 번째 게시글",
          author: "강감찬",
          date: "2024-11-03",
          type: "broker", // 공인중개사
        },
        {
          id: 4,
          title: "네 번째 게시글",
          author: "김유신",
          date: "2024-11-04",
          type: "general", // 일반사용자
        },
        {
          id: 5,
          title: "다섯 번째 게시글",
          author: "이몽룡",
          date: "2024-11-05",
          type: "broker", // 공인중개사
        },
        {
          id: 6,
          title: "여섯 번째 게시글",
          author: "성춘향",
          date: "2024-11-06",
          type: "general", // 일반사용자
        },
        {
          id: 7,
          title: "일곱 번째 게시글",
          author: "장보고",
          date: "2024-11-07",
          type: "broker", // 공인중개사
        },
        {
          id: 8,
          title: "여덟 번째 게시글",
          author: "황진이",
          date: "2024-11-08",
          type: "general", // 일반사용자
        },
        {
          id: 9,
          title: "아홉 번째 게시글",
          author: "김소월",
          date: "2024-11-09",
          type: "broker", // 공인중개사
        },
        {
          id: 10,
          title: "열 번째 게시글",
          author: "이육사",
          date: "2024-11-10",
          type: "general", // 일반사용자
        },
      ],
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
        if (this.searchOption === "author") {
          return post.author.includes(this.searchTerm);
        } else if (this.searchOption === "title") {
          return post.title.includes(this.searchTerm);
        } else if (this.searchOption === "author_title") {
          return post.author.includes(this.searchTerm) || post.title.includes(this.searchTerm);
        }
        return true;
      });
    },
  },
  methods: {
    writePost() {
      // 게시글 작성 페이지로 이동
      this.$router.push("/boardcreate");
    },
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
