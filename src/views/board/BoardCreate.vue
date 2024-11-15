<template>
  <v-container fluid class="write-container">
    <TopBar />
    <v-card class="write-card mx-auto" elevation="2">
      <v-card-title>
        <h2>게시글 작성</h2>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <!-- 제목 레이블과 입력란 -->
          <v-col cols="2">
            <label class="text-large">제목</label>
          </v-col>
          <v-col cols="10">
            <v-text-field
              v-model="post.title"
              label="제목을 입력하세요"
              outlined
              required
              hide-details="auto"
              class="text-large"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-divider class="my-4"></v-divider>

        <v-row>
          <!-- 내용 레이블과 입력란 -->
          <v-col cols="2">
            <label class="text-large">내용</label>
          </v-col>
          <v-col cols="10">
            <v-textarea
              v-model="post.content"
              label="내용을 입력하세요"
              outlined
              auto-grow
              rows="25"
              required
              hide-details="auto"
              class="text-large"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>

      <!-- 버튼을 v-card 아래쪽에 가운데 정렬 -->
      <v-card-actions class="justify-center">
        <v-btn color="#1976D2" dark @click="submitPost" class="button-large">작성 완료</v-btn>
        <v-btn color="#9E9E9E" dark @click="goBack" class="button-large">취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import TopBar from "../../components/TopBar.vue";

export default defineComponent({
  name: "PostWriteView",
  components: {
    TopBar,
  },
  data() {
    return {
      post: {
        title: "",
        content: "",
      },
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async submitPost() {
      if (this.post.title.trim() === "" || this.post.content.trim() === "") {
        alert("제목과 내용을 모두 입력해주세요.");
        return;
      }

      const response = await this.$rest.boardCreate(this.post, this);

      if (response == "fail") {
        alert("게시글 저장 중 오류가 발생하였습니다.");
      } else {
      }

      /**
       * 데이터가 저장이 되었을때 alert 창을 띄우고 새로고침을 한다
       * retrun 받은 값으로 이동을 시킨다.
       */

      console.log("작성된 게시글:", this.post);
    },
  },
});
</script>

<style scoped>
.write-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding-top: 5vh;
}

.write-card {
  width: 100%;
  max-width: 1500px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
}

.text-large {
  font-size: 18px; /* 텍스트 크기 증가 */
}

.button-large {
  width: 150px;
  height: 50px;
  font-size: 16px;
}

.my-4 {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
