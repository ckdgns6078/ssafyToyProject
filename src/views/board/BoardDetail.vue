<template>
  <v-container fluid class="detail-container">
    <TopBar />
    <div class="detail-card">
      <v-card class="mx-auto" elevation="2">
        <v-card-title class="detail-title">
          <span>{{ post.title }}</span>
          <div class="action-buttons">
            <v-btn color="indigo" @click="editPost">수정</v-btn>
            <v-btn color="grey" @click="goBack">뒤로가기</v-btn>
          </div>
        </v-card-title>
        <v-card-subtitle class="detail-subtitle">
          <span class="author">{{ post.author }}</span>
          <span class="date">{{ post.createdAt }}</span>
          <span class="view-count">{{ post.views }} 조회</span>
        </v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text class="detail-content">
          <div v-html="post.content"></div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="comment-section">
          <h3>댓글 작성</h3>
          <div class="comment-input">
            <v-text-field v-model="newComment" placeholder="댓글을 입력하세요"></v-text-field>
            <v-btn color="primary" @click="addComment">등록</v-btn>
          </div>
          <h3>댓글</h3>
          <v-list>
            <v-list-item-group>
              <v-list-item v-for="(comment, index) in comments" :key="comment.id">
                <v-list-item-content>
                  <v-list-item-title>
                    <span>{{ comment.author }}</span>
                    <span class="comment-date">{{ comment.createdAt }}</span>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <div class="comment-content">{{ comment.content }}</div>
                    <div class="comment-actions">
                      <v-btn
                        v-if="comment.replies.length > 0 || comment.replying"
                        text
                        @click="toggleReplies(comment.id)"
                      >
                        {{ comment.repliesVisible ? "숨기기" : "더보기" }}
                      </v-btn>
                    </div>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <!-- 대댓글 입력 필드 -->
                <div class="reply-input">
                  <v-text-field
                    v-model="comment.replyContent"
                    placeholder="대댓글을 입력하세요"
                  ></v-text-field>
                  <v-btn color="success" @click="addReply(comment.id)">등록</v-btn>
                </div>
                <!-- 대댓글 목록 -->
                <div v-if="comment.repliesVisible" class="replies">
                  <div class="reply" v-for="reply in comment.replies" :key="reply.id">
                    <div class="reply-content">
                      <span> [ {{ reply.author }} ]&nbsp;&nbsp;&nbsp;</span>
                      <span class="reply-date">{{ reply.createdAt }}</span>
                      <div>{{ reply.content }}</div>
                    </div>
                  </div>
                </div>
                <!-- 댓글 사이에 가로줄 추가 -->
                <v-divider v-if="index < comments.length - 1"></v-divider>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import TopBar from "../../components/TopBar.vue";

export default defineComponent({
  name: "PostDetailView",
  components: {
    TopBar,
  },
  data() {
    return {
      post: {
        id : "",
        title: "",
        author: "",
        createdAt: "",
        views: 0,
        content: "",
      },
      comments: [
        {
          id: "",
          author: "",
          createdAt: "",
          content: "",
          replying: false,
          replyContent: "",
          repliesVisible: false,
          replies: [],
        },
      ],
      newComment: "",
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },


    //게시글 수정
    async editPost() {
      
      const response = await this.$rest.modifyCheck(this.post.author);
      if(response){
        console.log("똑같음");
        this.$router.push({
        name: "modify",
        query: { articleno: this.post.id },
      });
      }else{
        alert("본인의 게시물만 수정이 가능합니다.");
      }
      /**
       * id가 맞는지 검사한다.
       * id가 일치하면 수정 페이지로 이동한다.
       * id가 다를 경우 aleart 창을 띄운다.
       */





    },
    deletePost() {
      console.log("게시글 삭제");
    },
    // 일반 댓글 작성
    async addComment() {

      //article_no 필요
      //
      if (this.newComment.trim() === ""){
        return;
      } 
      const response =  await this.$rest.addComment(this.post.id , this.newComment , this);
      location.reload();
    
    },

    toggleReply(commentId) {
      const comment = this.comments.find((c) => c.id === commentId);
      comment.replying = !comment.replying;
    },
    toggleReplies(commentId) {
      const comment = this.comments.find((c) => c.id === commentId);
      comment.repliesVisible = !comment.repliesVisible;
    },

    //대댓글 작성
    async addReply(commentId) {
      
      const comment = this.comments.find((c) => c.id === commentId);

      const response = await this.$rest.addChildComment(this.post.id , comment.id , comment.replyContent);
      location.reload();

      //comment로 전송하고 데이터를 추가한다.
      //함수 호출 구문 추가



      if (comment.replyContent.trim() === "") return;

      const replyComment = {
        id: comment.replies.length + 1,
        author: "내 이름",
        createdAt: new Date().toISOString().slice(0, 10),
        content: comment.replyContent,
      };
      comment.replies.push(replyComment);
      comment.replyContent = "";
      comment.replying = false;
    },

    async getBordDetail() {
      const articleno = this.$route.query.articleno;
      const response = await this.$rest.boardDetail(articleno);
      // 게시글 데이터 할당
      this.post.id = response.id;
      this.post.title = response.title;
      this.post.author = response.author;
      this.post.createdAt = response.createdAt;
      this.post.views = response.hit;
      this.post.content = response.content;

      this.comments = response.comments.map(comment => {
        return {
          id: comment.id, // 댓글 ID
          author: comment.commentUserId, // 댓글 작성자
          createdAt: comment.commentRegisterTime, // 댓글 등록 시간
          content: comment.commentContent, // 댓글 내용
          replying: false, // 대댓글 입력 여부 초기화
          replyContent: "", // 대댓글 내용 초기화
          repliesVisible: false, // 대댓글 보기 여부 초기화
          replies: comment.replies ? comment.replies.map(child => ({
            id: child.id, // 자식 댓글 ID
            author: child.author, // 자식 댓글 작성자
            content: child.content, // 자식 댓글 내용
            createdAt: child.createdAt // 자식 댓글 등록 시간
          })) : [], // 자식 댓글이 있을 경우 정제하여 포함
        };
      });
    },
  },
  mounted() {
    this.getBordDetail();
  },
});
</script>

<style scoped>
.detail-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding-top: 5vh;
}

.detail-card {
  width: 100%;
  max-width: 900px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.detail-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 2rem;
  color: #333;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.detail-subtitle {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
}

.comment-date {
  margin: 0 10px;
}

.detail-content {
  font-size: 1rem;
  line-height: 1.6;
  padding: 16px;
  min-height: 300px;
}

.comment-section {
  padding: 16px;
}

.comment-input {
  display: flex;
  margin-bottom: 20px;
}

.comment-input .v-text-field {
  flex-grow: 1;
  margin-right: 10px;
}

.reply-input {
  display: flex;
  margin-top: 10px;
}

.reply-input .v-text-field {
  flex-grow: 1;
  margin-right: 10px;
}

.replies {
  margin-left: 20px;
  border-left: 1px solid #dcdcdc;
  padding-left: 10px;
}

.reply-content {
  margin: 5px 0;
  color: #444;
}

.comment-content {
  margin-top: 10px; /* 댓글 제목과 내용 사이의 간격 */
}

.comment-actions {
  display: flex;
  justify-content: flex-start; /* 버튼들을 왼쪽 정렬 */
  gap: 10px; /* 버튼 간의 간격 */
  margin-top: 5px; /* 버튼과 댓글 내용 사이의 간격 */
}

.v-list-item {
  margin-bottom: 15px; /* 댓글 사이의 간격 */
}
</style>
