<template>
  <v-container fluid class="center-container">
    <TopBar />
    <div class="center-card">
      <v-card class="mx-auto" elevation="1" max-width="800">
        <v-card-title class="py-5 title-container">
          <v-img src="../assets/img/login-icon.png" max-width="80" class="mr-3" />
          <!-- 로그인 아이콘 이미지 추가 -->
          <span class="board-title">로그인</span>
          <!-- "로그인" 텍스트 추가 -->
        </v-card-title>

        <v-card-text>
          <div class="text-subtitle-2 font-weight-black mb-4"></div>

          <!-- ID 레이블 -->
          <div class="input-label">ID</div>
          <v-text-field
            v-model="userId"
            label="ID"
            variant="outlined"
            single-line
            class="mb-4"
          ></v-text-field>

          <!-- PW 레이블 -->
          <div class="input-label">PW</div>
          <v-text-field
            v-model="userPwd"
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
import TopBar from "../components/TopBar.vue";
import axios from "axios"; // axios를 import

export default defineComponent({
  name: "TopBarView",

  components: {
    TopBar,
  },

  data() {
    return {
      loading: false,
      userId: "", // ID 입력값
      userPwd: "", // PW 입력값
    };
  },

  methods: {
    async handleLogin() {
      if (!this.userId || !this.userPwd) {
        alert("아이디와 비밀번호를 입력해주세요.");
        return;
      }

      this.loading = true;
      console.log(this.$rest);
      await this.$rest.login(this.userId, this.userPwd, this);
      this.loadiong = false;
    },

    goToRegister() {
      // 회원가입 페이지로 이동
      this.$router.push({ name: "join" });
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

.input-label {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.font-bold {
  font-weight: 900;
}
</style>
