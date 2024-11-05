<template>
  <v-app-bar app class="topbar">
    <v-toolbar-title style="min-width: 200px">
      <!-- 최소 너비 설정 -->
      <v-img src="../assets/img/logo1.png" width="200" height="80" />
      <!-- 고정된 너비와 높이 설정 -->
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <div class="button-container">
      <v-btn class="flex-button" text @click="goToMap">Map</v-btn>
      <v-btn class="flex-button" text @click="goToBoard">게시판</v-btn>
      <v-btn class="flex-button" text @click="goToMyPage">마이페이지</v-btn>
    </div>

    <v-spacer></v-spacer>

    <v-btn icon @click="showUserInfo">
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">사용자 정보</v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>이름: 사용자 이름</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>이메일: user@example.com</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    goToMap() {
      this.$router.push({ name: "map" });
    },
    goToBoard() {
      this.$router.push({ name: "board" });
    },
    goToMyPage() {
      // 마이페이지로 이동하는 로직을 추가합니다.
    },
    showUserInfo() {
      // 사용자 정보를 보여주는 로직을 추가합니다.
    },
  },
};
</script>

<style scoped>
.topbar {
  height: 80px; /* TopBar 높이 설정 (필요에 따라 조정) */
  overflow: visible; /* 자식 요소가 잘리지 않도록 설정 */
}

.button-container {
  display: flex;
  flex-grow: 30; /* 버튼 컨테이너의 flex-grow를 1로 조정 */
  justify-content: space-evenly; /* 버튼 간의 간격을 균등하게 배치 */
}

.flex-button {
  min-width: 120px; /* 버튼의 최소 너비 설정 (필요에 따라 조정) */
  font-size: 1.5rem; /* 글자 크기 설정 */
  padding: 10px 20px; /* 버튼의 패딩 조정 */
  transition: background-color 0.3s ease; /* 배경색 변경에 애니메이션 추가 */
}

/* 마우스 오버 및 클릭 시 배경색 변경 */
.flex-button:hover,
.flex-button:focus {
  background-color: rgba(0, 0, 0, 0.1); /* 마우스 오버 시 배경색 변경 */
}
</style>
