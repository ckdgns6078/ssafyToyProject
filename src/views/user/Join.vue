<template>
  <v-container fluid class="center-container">
    <TopBar />
    <div class="center-card">
      <v-card class="mx-auto" elevation="1" max-width="800">
        <v-card-title class="py-5 title-container">
          <v-img
            src="../../assets/img/login-icon.png"
            max-width="80"
            class="mr-3"
          />
          <span class="board-title">회원가입</span>
        </v-card-title>

        <v-card-text>
          <div class="text-subtitle-2 font-weight-black mb-4"></div>

          <!-- 이름 입력 -->
          <div class="input-label">이름</div>
          <v-text-field
            v-model="name"
            label="이름"
            variant="outlined"
            single-line
            class="mb-4 full-width"
          ></v-text-field>

          <!-- 아이디 입력 -->
          <div class="input-label">아이디</div>
          <v-text-field
            v-model="username"
            label="아이디"
            variant="outlined"
            single-line
            class="mb-4 full-width"
          ></v-text-field>

          <!-- 비밀번호 입력 -->
          <div class="input-label">비밀번호</div>
          <v-text-field
            v-model="password"
            label="비밀번호"
            type="password"
            variant="outlined"
            single-line
            class="mb-4 full-width"
          ></v-text-field>

          <!-- 비밀번호 확인 입력 -->
          <div class="input-label">비밀번호 확인</div>
          <v-text-field
            v-model="confirmPassword"
            label="비밀번호 확인"
            type="password"
            variant="outlined"
            single-line
            class="mb-4 full-width"
          ></v-text-field>

          <!-- 사용자 유형 선택 -->
          <div class="input-label">사용자 유형</div>
          <div class="radio-group mb-4">
            <v-radio-group v-model="userType" row>
              <v-radio label="공인중개사" value="agent"></v-radio>
              <v-radio label="일반 사용자" value="user"></v-radio>
            </v-radio-group>
          </div>

          <!-- 공인중개사 정보 입력 -->
          <div v-if="userType === 'agent'" class="mb-4">
            <div class="input-label">부동산 이름</div>
            <v-text-field
              v-model="realEstateName"
              label="부동산 이름"
              variant="outlined"
              single-line
              class="full-width"
            ></v-text-field>

            <div class="input-label">부동산 주소</div>
            <v-text-field
              v-model="realEstateAddress"
              label="부동산 주소"
              variant="outlined"
              single-line
              class="full-width"
            ></v-text-field>

            <div class="input-label">전화번호</div>
            <v-text-field
              v-model="phoneNumber"
              label="전화번호"
              variant="outlined"
              single-line
              class="full-width"
            ></v-text-field>
          </div>

          <!-- 이메일 도메인 선택 -->
          <div class="input-label">이메일</div>
          <div class="email-domain-container">
            <v-text-field
              v-model="email"
              label="이메일"
              variant="outlined"
              single-line
              class="email-input"
            ></v-text-field>
            <v-select
              v-model="emailDomain"
              :items="['ssafy.com', 'google.com', 'naver.com', 'kakao.com']"
              label="도메인 선택"
              class="domain-select"
            ></v-select>
          </div>

          <!-- 버튼 그룹 -->
          <div class="button-group">
            <v-btn
              class="text-none full-width"
              color="indigo-darken-3"
              size="large"
              variant="flat"
              @click="handleRegister"
            >
              회원가입
            </v-btn>

            <v-btn
              class="text-none full-width"
              color="grey-lighten-3"
              size="large"
              variant="flat"
              @click="resetForm"
            >
              초기화
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import TopBar from "../../components/TopBar.vue";

export default defineComponent({
  name: "RegisterView",
  components: {
    TopBar,
  },
  data() {
    return {
      name: "", // 이름
      username: "", // 아이디
      password: "", // 비밀번호
      confirmPassword: "", // 비밀번호 확인
      userType: "", // 사용자 유형
      realEstateName: "", // 부동산 이름
      realEstateAddress: "", // 부동산 주소
      phoneNumber: "", // 전화번호
      email: "", // 이메일
      emailDomain: "", // 이메일 도메인
    };
  },
  methods: {
    handleRegister() {
      // 회원가입 로직 추가
    },
    resetForm() {
      // 모든 입력 필드를 빈 문자열로 초기화
      this.name = "";
      this.username = "";
      this.password = "";
      this.confirmPassword = "";
      this.userType = "";
      this.realEstateName = "";
      this.realEstateAddress = "";
      this.phoneNumber = "";
      this.email = "";
      this.emailDomain = "";
    },
  },
});
</script>

<style scoped>
/* 기존 스타일 유지 */
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

.input-label {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.full-width {
  width: 100%;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.button-group .v-btn {
  flex: 1; /* 버튼을 동일한 비율로 나누기 */
  margin-right: 0.5rem; /* 오른쪽 버튼과의 간격 */
}

.button-group .v-btn:last-child {
  margin-right: 0; /* 마지막 버튼은 간격 제거 */
}

.email-domain-container {
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 세로 정렬 */
}

.email-input {
  flex: 1; /* 이메일 입력 필드가 남은 공간을 모두 차지 */
  margin-right: 1rem; /* 이메일 입력과 도메인 선택 사이 간격 */
}

.domain-select {
  width: auto; /* 도메인 선택의 기본 너비 사용 */
}

.radio-group {
  display: flex; /* 가로 정렬을 위해 flex 사용 */
  gap: 1rem; /* 라디오 버튼 사이의 간격 조정 */
}
</style>
