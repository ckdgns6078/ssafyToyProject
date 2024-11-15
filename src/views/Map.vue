<template>
  <div class="container">
    <!-- 사이드바 -->
    <div class="sidebar">
      <div class="search-container">
        <!-- 시도/구군 셀렉트 박스 -->
        <div class="location-select">
          <select class="select-box">
            <option value="seoul">서울</option>
            <option value="busan">부산</option>
            <option value="daegu">대구</option>
          </select>
          <select class="select-box">
            <option value="gu1">구1</option>
            <option value="gu2">구2</option>
            <option value="gu3">구3</option>
          </select>
        </div>

        <!-- 검색창과 버튼 -->
        <div class="search-bar">
          <input type="text" placeholder="장소를 검색하세요" class="search-input" />
          <button class="search-btn">
            <i class="fas fa-search"></i>
            <!-- 돋보기 아이콘 -->
          </button>
        </div>
      </div>

      <!-- 더미 데이터 리스트 (스크롤 가능) -->
      <div class="search-results">
        <li v-for="(item, index) in dummyData" :key="index">
          <div class="apartment">
            <span class="apartment-name">{{ item.name }}</span>
            <div class="address">
              <p><strong>옛 주소:</strong> {{ item.oldAddress }}</p>
              <p><strong>신 주소:</strong> {{ item.newAddress }}</p>
              <p><strong>거래 일자:</strong> {{ item.transactionDate }}</p>
            </div>
          </div>
        </li>
      </div>
    </div>

    <!-- 메인 콘텐츠 (지도 영역) -->
    <div class="main-content">
      <TopBar />
      <!-- 지도가 들어갈 위치 -->
      <div id="map" class="map-placeholder"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import TopBar from "../components/TopBar.vue";

export default defineComponent({
  name: "TopBarView",

  components: {
    TopBar,
  },

  data() {
    return {
      dummyData: [
        {
          name: "아파트1",
          oldAddress: "경기도 화성시 기산동",
          newAddress: "경기도 화성시 기산동(신주소)",
          transactionDate: "2024-01-01",
        },
        {
          name: "아파트2",
          oldAddress: "서울시 강남구 역삼동",
          newAddress: "서울시 강남구 역삼동(신주소)",
          transactionDate: "2023-12-15",
        },
        {
          name: "아파트3",
          oldAddress: "부산시 부산진구 부전동",
          newAddress: "부산시 부산진구 부전동(신주소)",
          transactionDate: "2024-03-10",
        },
        {
          name: "아파트4",
          oldAddress: "대구시 중구 동성로",
          newAddress: "대구시 중구 동성로(신주소)",
          transactionDate: "2024-02-22",
        },
        {
          name: "아파트5",
          oldAddress: "인천시 연수구 송도동",
          newAddress: "인천시 연수구 송도동(신주소)",
          transactionDate: "2024-04-05",
        },
      ],
    };
  },

  mounted() {
    // 카카오 맵 API 로드 후 지도를 초기화하는 코드
  },

  methods: {},
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

.container {
  display: flex;
  height: 100vh; /* 화면 높이를 100%로 설정 */
}

.sidebar {
  width: 400px; /* 사이드바 너비 조정 */
  background-color: #f8f9fa;
  padding: 30px 20px; /* 사이드바 안에 패딩 추가 */
  height: 100%; /* 사이드바의 높이를 100%로 설정 */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* 내용이 넘치면 스크롤이 생김 */
}

.search-container {
  margin-bottom: 30px; /* TopBar와 간격을 넓게 설정 */
}

.location-select {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.select-box {
  width: 48%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: url("https://img.icons8.com/ios-filled/50/000000/triangle.png") no-repeat right center;
  background-size: 12px;
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-btn {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 12px 20px; /* 버튼 크기 키우기 */
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-btn:hover {
  background-color: #0056b3;
}

.search-btn i {
  font-size: 18px;
}

.search-results {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: calc(100% - 180px); /* 사이드바 상단 부분을 제외한 나머지 영역을 확장 */
  overflow-y: auto; /* 스크롤 생기도록 */
}

.search-results li {
  padding: 12px 0;
  border-bottom: 1px solid #eaeaea;
  cursor: pointer;
}

.search-results li:hover {
  background-color: #f1f1f1;
}

.apartment {
  padding: 10px;
}

.apartment-name {
  font-size: 18px; /* 아파트 명 크기 키우기 */
  font-weight: bold;
}

.address p {
  font-size: 14px; /* 주소와 거래 일자 크기 줄이기 */
  margin: 5px 0;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #e9ecef;
  height: 100%; /* 메인 콘텐츠의 높이를 100%로 설정 */
}

.map-placeholder {
  width: 100%;
  height: 100%; /* 지도 영역의 높이 설정 */
  background-color: #d1d1d1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  font-size: 18px;
  border-radius: 8px;
}
</style>
