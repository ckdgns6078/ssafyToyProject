<template>
  <v-container fluid class="center-container">
    <TopBar />
    <div class="center-card">
      <v-card class="mx-auto" elevation="1" max-width="800">
        <v-card-title class="py-5 title-container">
          <v-img src="../../assets/img/login-icon.png" max-width="80" class="mr-3" />
          <span class="board-title">마이 페이지</span>
        </v-card-title>

        <v-card-text>
          <div class="text-subtitle-2 font-weight-black mb-4"></div>

          <!-- 이름 입력 -->
          <div class="input-label">이름</div>
          <v-text-field
            v-model="userName"
            label="이름"
            variant="outlined"
            single-line
            class="mb-4 full-width"
          ></v-text-field>

          <!-- 아이디 입력 (readonly) -->
          <div class="input-label">아이디</div>
          <v-text-field
            v-model="userId"
            label="아이디"
            variant="outlined"
            single-line
            class="mb-4 full-width"
            readonly
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

          <!-- 사용자 유형 -->
          <div class="input-label">사용자 유형</div>
          <v-text-field
            v-model="userTypeText"
            label="사용자 유형"
            variant="outlined"
            single-line
            class="mb-4 full-width"
            readonly
          ></v-text-field>

          <!-- 공인중개사 정보 입력 -->
          <div v-if="userType === 2" class="mb-4">
            <div class="input-label">부동산 이름</div>
            <v-text-field
              v-model="homeName"
              label="부동산 이름"
              variant="outlined"
              single-line
              class="full-width"
            ></v-text-field>

            <div class="input-label">부동산 주소</div>
            <v-text-field
              v-model="homeAddress"
              label="부동산 주소"
              variant="outlined"
              single-line
              class="full-width"
            ></v-text-field>

            <div class="input-label">전화번호</div>
            <v-text-field
              v-model="phone"
              label="전화번호"
              variant="outlined"
              single-line
              class="full-width"
            ></v-text-field>
          </div>

          <!-- 이메일 입력 -->
          <div class="input-label">이메일</div>
          <div class="email-domain-container">
            <v-text-field
              v-model="emailId"
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
              @click="handleUpdate"
            >
              회원 수정
            </v-btn>

            <v-btn
              class="text-none full-width"
              color="indigo-darken-3"
              size="large"
              variant="flat"
              @click="handleDelete"
            >
              회원 탈퇴
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
import Rest from "../../assets/js/Rest";

export default defineComponent({
  name: "MyPage",
  components: {
    TopBar,
  },
  data() {
    return {
      userId: "", // 사용자 아이디
      userName: "", // 이름
      password: "", // 비밀번호
      userType: "", // 사용자 유형 (1: 일반인, 2: 공인중개사)
      userTypeText: "", // 사용자 유형 텍스트
      homeName: "", // 부동산 이름
      homeAddress: "", // 부동산 주소
      phone: "", // 전화번호
      emailId: "", // 이메일 아이디
      emailDomain: "", // 이메일 도메인
    };
  },
  async created() {
    await this.loadUserInfo();
  },
  methods: {
    async loadUserInfo() {
      try {
        const userInfo = await Rest.getUserInfo();
        if (userInfo) {
          this.userId = userInfo.userId;
          this.userName = userInfo.userName;
          this.userType = userInfo.type;
          this.userTypeText = userInfo.type === 1 ? "일반인" : "공인중개사";
          this.emailId = userInfo.emailId;
          this.emailDomain = userInfo.emailDomain;
          if (userInfo.type === 2) {
            this.homeName = userInfo.homeName;
            this.homeAddress = userInfo.homeAddress;
            this.phone = userInfo.phone;
          }
        }
      } catch (error) {
        console.error("사용자 정보 로드 중 오류:", error);
      }
    },
    async handleUpdate() {
      try {
        const updateData = {
          userId: this.userId,
          userName: this.userName,
          userPwd: this.password,
          type: this.userType,
          emailId: this.emailId,
          emailDomain: this.emailDomain,
          homeName: this.userType === 2 ? this.homeName : null,
          homeAddress: this.userType === 2 ? this.homeAddress : null,
          phone: this.userType === 2 ? this.phone : null,
        };
        await this.$rest.updateUserInfo(updateData, this);
        alert("회원 정보가 성공적으로 수정되었습니다.");
      } catch (error) {
        console.error("회원 정보 수정 중 오류:", error);
        alert("회원 정보 수정에 실패했습니다. 다시 시도해 주세요.");
      }
    },

    async handleDelete() {
      try {
        await this.$rest.deleteUserInfo(this);
        alert("회원 탈퇴가 완료되었습니다.")
      } catch (error) {
        console.error("회원 탈퇴 중 오류:", error);
        alert("회원 탈퇴에 실패했습니다. 다시 시도해 주세요.");
      }
    }
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
  flex: 1;
  margin-right: 0.5rem;
}

.button-group .v-btn:last-child {
  margin-right: 0;
}

.email-domain-container {
  display: flex;
  align-items: center;
}

.email-input {
  flex: 1;
  margin-right: 1rem;
}

.domain-select {
  width: auto;
}
</style>
