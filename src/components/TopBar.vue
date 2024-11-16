<template>
  <v-app-bar app class="topbar">
    <v-toolbar-title style="min-width: 200px">
      <!-- 로고를 클릭하면 홈 페이지로 이동 -->
      <v-img
        src="../assets/img/logo1.png"
        width="200"
        height="80"
        @click="handleLogoClick"
        style="cursor: pointer"
      />
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <div class="button-container">
      <v-btn class="flex-button" text @click="navigateTo('map')">Map</v-btn>
      <v-btn class="flex-button" text @click="navigateTo('board')">게시판</v-btn>
      <v-btn class="flex-button" text @click="navigateTo('mypage')">마이페이지</v-btn>
    </div>

    <v-spacer></v-spacer>

    <!-- 사용자 정보 아이콘 버튼 -->
    <v-btn v-if="isLoggedIn" icon ref="userInfoButton" @click="toggleUserInfoMenu">
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <v-menu
      v-if="isLoggedIn"
      v-model="isUserInfoMenuVisible"
      :close-on-content-click="true"
      :activator="$refs.userInfoButton"
      offset-y
    >
      <v-card>
        <v-list>
          <!-- 사용자 아이디 및 이름을 표시 -->
          <v-list-item>
            <v-list-item-title>아이디: {{ userId }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>이름: {{ userName }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>{{ userType }}</v-list-item-title>
          </v-list-item>
          <!-- 마이페이지 및 로그아웃 버튼 -->
          <v-list-item>
            <v-btn text @click="goToMyPage">마이페이지</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn color="primary" text @click="logout">로그아웃</v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { defineComponent } from "vue";
import Rest from "../assets/js/Rest";

export default defineComponent({
  name: "TopBar",
  data() {
    return {
      userId: "", // 사용자 아이디
      userName: "", // 사용자 이름
      userType: "", // 사용자 유형
      isLoggedIn: false, // 로그인 여부
      isUserInfoMenuVisible: false, // 사용자 정보 메뉴의 표시 여부
    };
  },
  created() {
    this.loadUserInfo();
  },
  methods: {
    async loadUserInfo() {
      // 서버에서 사용자 정보를 가져옴
      const userInfo = await Rest.getUserInfo(); // Rest 객체에서 getUserInfo 호출
      if (userInfo) {
        console.log("userInfo", userInfo);
        this.userId = userInfo.userId; // 사용자 아이디 설정
        this.userName = userInfo.userName; // 사용자 이름 설정
        this.userType = userInfo.type === 1 ? "일반인" : "공인중개사";
        this.isLoggedIn = true; // 로그인 상태 업데이트
      }
    },
    toggleUserInfoMenu() {
      this.isUserInfoMenuVisible = !this.isUserInfoMenuVisible;
    },
    async handleLogoClick() {
      // 로고 클릭 시 로그인 여부에 따라 페이지 이동 결정
      const isValid = await Rest.validateAndRefreshToken(this);
      if(isValid) {
        this.$router.push({ name: "board" });
      } else {
        this.$router.push({ name: "home" });
      }
 
    },
    async navigateTo(page) {
      const isValid = await Rest.validateAndRefreshToken(this);
      if(isValid){
        this.$router.push({ name: page });
      }
    },
    goToHome() {
      // 홈 페이지로 이동
      this.$router.push({ name: "home" });
    },
    goToMap() {
      this.$router.push({ name: "map" });
    },
    goToBoard() {
      this.$router.push({ name: "board" });
    },
    goToMyPage() {
      this.$router.push({ name: "mypage" });
    },
    logout() {
      // 로그아웃 시 로컬 스토리지에서 토큰 제거 및 상태 초기화
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      this.isLoggedIn = false;
      this.userId = "";
      this.userName = "";
      this.isUserInfoMenuVisible = false; // 사용자 정보 메뉴 닫기
      this.$router.push({ name: "home" });
    },
  },
});
</script>

<style scoped>
.topbar {
  height: 80px;
  overflow: visible;
}
.button-container {
  display: flex;
  flex-grow: 30;
  justify-content: space-evenly;
}
.flex-button {
  min-width: 120px;
  font-size: 1.5rem;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}
.flex-button:hover,
.flex-button:focus {
  background-color: rgba(0, 0, 0, 0.1);
}
.user-info {
  margin-right: 20px;
  font-size: 1.2rem;
}
</style>
