<template>
  <v-container fluid class="center-container">
    <TopBar />
    <div class="center-card">
      <v-card class="mx-auto" elevation="1" max-width="800">
        <v-card-title class="py-5 title-container">
          <v-img src="../assets/login-icon.png" max-width="50" class="mr-3" />
          <!-- 로그인 아이콘 이미지 추가 -->
          <span class="board-title">로그인</span>
          <!-- "로그인" 텍스트 추가 -->
        </v-card-title>

        <v-card-text>
          <div class="text-subtitle-2 font-weight-black mb-1">Log in to your account</div>

          <v-text-field label="Email" variant="outlined" single-line></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            variant="outlined"
            single-line
          ></v-text-field>

          <v-btn
            :disabled="loading"
            :loading="loading"
            class="text-none mb-4"
            color="indigo-darken-3"
            size="x-large"
            variant="flat"
            block
            @click="handleLogin"
          >
            Log In
          </v-btn>

          <v-btn
            class="text-none mb-4"
            color="grey-lighten-3"
            size="x-large"
            variant="flat"
            block
            @click="goToRegister"
          >
            Sign Up
          </v-btn>

          <v-btn
            class="text-none"
            color="grey-lighten-3"
            size="x-large"
            variant="flat"
            block
            @click="cancel"
          >
            Cancel
          </v-btn>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";

// Components
import TopBar from "../components/TopBar.vue";

export default defineComponent({
  name: "TopBarView",

  components: {
    TopBar,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    handleLogin() {
      // 로그인 로직 추가
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        // 로그인 성공 또는 실패 처리
      }, 2000); // 예시로 2초 대기 후 로딩 해제
    },
    goToRegister() {
      // 회원가입 페이지로 이동하는 로직
      this.$router.push({ name: "RegisterView" }); // 라우터를 사용해 회원가입 페이지로 이동
    },
    cancel() {
      // 취소 로직 추가
      // 예: 메인 페이지로 돌아가기
      this.$router.push({ name: "HomeView" }); // 예시로 홈 화면으로 이동
    },
  },
});
</script>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 세로 가운데에서 약간 위로 조정 */
  height: 100vh;
  padding-top: 10vh; /* 화면 상단에서 약간 내려오도록 추가 */
}

.center-card {
  width: 100%;
  max-width: 800px;
}

.title-container {
  display: flex;
  align-items: center; /* 이미지와 텍스트가 수평으로 정렬되도록 설정 */
}

.board-title {
  font-weight: 900; /* 제목 글씨를 더 굵게 설정 */
  font-size: 2rem; /* 제목의 글자 크기 조정 */
  text-align: center;
}

.text-none {
  text-decoration: none;
}

.mb-4 {
  margin-bottom: 1rem;
}

.py-5 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.mr-3 {
  margin-right: 1rem; /* 이미지와 텍스트 사이의 간격 추가 */
}
</style>
