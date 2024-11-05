<template>
  <v-container fluid class="center-container">
    <TopBar />
    <div class="center-card">
      <v-card class="mx-auto" elevation="1" max-width="800">
        <v-card-title class="py-5 title-container">
          <v-img
            src="../assets/img/login-icon.png"
            max-width="80"
            class="mr-3"
          />
          <!-- 로그인 아이콘 이미지 추가 -->
          <span class="board-title">로그인</span>
          <!-- "로그인" 텍스트 추가 -->
        </v-card-title>

        <v-card-text>
          <div class="text-subtitle-2 font-weight-black mb-4"></div>

          <!-- ID 레이블 -->
          <div class="input-label">ID</div>
          <v-text-field
            label="ID"
            variant="outlined"
            single-line
            class="mb-4"
          ></v-text-field>

          <!-- PW 레이블 -->
          <div class="input-label">PW</div>
          <v-text-field
            label="Password"
            type="password"
            variant="outlined"
            single-line
            class="mb-5"
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
            로그인
          </v-btn>

          <v-btn
            class="text-none mb-4"
            color="grey-lighten-3"
            size="x-large"
            variant="flat"
            block
            @click="goToRegister"
          >
            회원가입
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
      this.$router.push({ name: "join" }); // 라우터를 사용해 회원가입 페이지로 이동
    },
  },
});
</script>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding-top: 10vh;
}

.center-card {
  width: 100%;
  max-width: 800px;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.board-title {
  font-weight: 900;
  font-size: 2rem;
  text-align: center;
}

.text-none {
  text-decoration: none;
}

.mb-4 {
  margin-bottom: 1.5rem;
}

.mb-5 {
  margin-bottom: 2rem;
}

.py-5 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.mr-3 {
  margin-right: 1rem;
}

/* ID와 PW 레이블 스타일 */
.input-label {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.font-bold {
  font-weight: 900; /* 텍스트를 더 굵게 설정 */
}
</style>
