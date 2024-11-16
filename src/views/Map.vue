<template>
  <div class="container">
    <!-- 사이드바 -->
    <div class="sidebar">
      <div class="search-container">
        <!-- 시도/구군 셀렉트 박스 -->
        <div class="location-select">
          <select class="select-box" v-model="sido" @change="sidoChange">
            <option value="서울특별시">서울특별시</option>
                            <option value="부산광역시">부산광역시</option>
                            <option value="대구광역시">대구광역시</option>
                            <option value="인천광역시">인천광역시</option>
                            <option value="광주광역시">광주광역시</option>
                            <option value="대전광역시">대전광역시</option>
                            <option value="울산광역시">울산광역시</option>
                            <option value="세종특별자치시">세종특별자치시</option>
                            <option value="경기도">경기도</option>
                            <option value="강원도">강원도</option>
                            <option value="충청북도">충청북도</option>
                            <option value="충청남도">충청남도</option>
                            <option value="전라북도">전라북도</option>
                            <option value="전라남도">전라남도</option>
                            <option value="경상남도">경상남도</option>
                            <option value="제주특별자치도">제주특별자치도</option>
          </select>
          <select class="select-box">
            <!-- guList에서 gugun 속성만 뿌리기 -->
            <option v-for="(gu, index) in guList" :key="index" :value="gu.gugun">
              {{ gu.gugun }}
            </option>
          </select>

          <!-- <select class="select-box">
            <option value="gu1">구1</option>
            <option value="gu2">구2</option>
            <option value="gu3">구3</option>
          </select> -->
        </div>

        <!-- 검색창과 버튼 -->
        <div class="search-bar">
          <input type="text" v-model="searchText" placeholder="장소를 검색하세요" class="search-input" />
          <button class="search-btn" @click="search">
            <i class="fas fa-search"></i>
            <!-- 돋보기 아이콘 -->
          </button>
        </div>
      </div>

      <!-- 더미 데이터 리스트 (스크롤 가능) -->
      <div class="search-results">
        <li v-for="(item, index) in aptInfo" :key="index" @click="moveMap(item)">
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
      <div id="map" ref="mapContainer" class="map-placeholder"></div>
      <!-- <div ref="mapContainer" style="width:100%; height: 70vh;"></div> -->
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import TopBar from "../components/TopBar.vue";

const serviceKey = process.env.VUE_APP_KAKAO_MAP_API_KEY;
const mapContainer = ref(null);






export default defineComponent({
  name: "TopBarView",

  components: {
    TopBar,
  },

  data() {
    return {
      sido:'',
      searchText:"",
      aptInfo: [],
      guList:[],
    };
  },

  mounted() {
    this.loadKakaoMap(); // 로드 시 지도 초기화
  },

  methods: {
    
    //시도 변경 event
    async sidoChange(){
      console.log("this.sido : " , this.sido);
      const response = await this.$rest.getGugun(this.sido);

      //response 값으로 guList 할당하기 코드추가필요
      this.guList = response;
      
    },

    //시도를 기반으로 구군을 가져오는 코드
    searchSido(){
      const response = this.$rest.searchSido(this.sido);
    },

    //검색어 입력해서 검색하는 코드
    search(){
      let response;
      if(this.searchText.trim()===""){
        console.log("null");
        response= this.$rest.searchAll(this.sido);
        this.aptInfo = response;
      }else{
        response = this.$rest.searchName(this.search);
        this.aptInfo = response;
      }
      addMarcker();
    },
    


    //마커 추가하는 코드
    addMarcker(){
      const map = this.map;

      this.aptInfo.forEach(item=>{
        const position = new window.kakao.maps.LatLng(item.latitude, item.longitude);
        const marker = new window.kakao.maps.Marker({
          position : position,
          title : item.aptName
        });
        marker.setMap(map);
      })
    },

    //사이드바 클릭 시 화면을 이동시켜주는 함수
    moveMap(item){
      const position = new window.kakao.maps.LatLng(item.latitude, item.longitude);
      this.map.setCenter(position);
    },

    // 카카오 맵 API 로드
    loadKakaoMap() {
      console.log("map 실행완료!!!!!!!!!");
      const container = this.$refs.mapContainer;
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${serviceKey}&autoload=false`;
      document.head.appendChild(script);
      
      
      script.onload = () => {
        window.kakao.maps.load(() => {
          const options = {
            center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 중심 좌표
            level: 3,
            maxLevel: 5,
          };

          const map = new window.kakao.maps.Map(container, options); // this.$refs.mapContainer로 직접 참조

          const markerPosition = new window.kakao.maps.LatLng(37.5665, 126.9780);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition, // 마커 위치
          });
          
          // 지도에 마커 추가
          marker.setMap(map);


        });
      };
    },
  },
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
  height: 100%; /* 명시적인 높이 지정 */
  /* background-color: #d1d1d1; */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  font-size: 18px;
  border-radius: 8px;
}
</style>
