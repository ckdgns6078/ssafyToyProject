<template>
  <v-container fluid class="detail-container">
    <TopBar />
    <div class="detail-card">
      <v-card class="mx-auto" elevation="2">
        <v-card-title class="detail-title">
          <span>{{ post.title }}</span>
          <div class="action-buttons">
            <v-btn color="indigo" @click="editPost">수정</v-btn>
            <v-btn color="red" @click="deletePost">삭제</v-btn>
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
            <v-text-field
              v-model="newComment"
              placeholder="댓글을 입력하세요"
            ></v-text-field>
            <v-btn color="primary" @click="addComment">등록</v-btn>
          </div>
          <h3>댓글</h3>
          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="(comment, index) in comments"
                :key="comment.id"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    <span>{{ comment.author }}</span>
                    <span class="comment-date">{{ comment.createdAt }}</span>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <div class="comment-content">{{ comment.content }}</div>
                    <div class="comment-actions">
                      <v-btn text @click="toggleReply(comment.id)"
                        >대댓글</v-btn
                      >
                      <v-btn
                        v-if="comment.replies.length > 0"
                        text
                        @click="toggleReplies(comment.id)"
                      >
                        {{ comment.repliesVisible ? "숨기기" : "더보기" }}
                      </v-btn>
                    </div>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <div v-if="comment.replying" class="reply-input">
                  <v-text-field
                    v-model="comment.replyContent"
                    placeholder="대댓글을 입력하세요"
                  ></v-text-field>
                  <v-btn color="success" @click="addReply(comment.id)"
                    >등록</v-btn
                  >
                </div>
                <div v-if="comment.repliesVisible" class="replies">
                  <div
                    class="reply"
                    v-for="reply in comment.replies"
                    :key="reply.id"
                  >
                    <div class="reply-content">
                      <span>{{ reply.author }}</span>
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
        title: "게시글 제목",
        author: "작성자 이름",
        createdAt: "2024-11-05",
        views: 123,
        content: "<p>여기에 게시글 내용을 작성합니다.</p>",
      },
      comments: [
        {
          id: 1,
          author: "댓글 작성자 1",
          createdAt: "2024-11-05",
          content: "첫 번째 댓글 내용입니다.",
          replying: false,
          replyContent: "",
          repliesVisible: false,
          replies: [
            {
              id: 1,
              author: "대댓글 작성자 1",
              createdAt: "2024-11-05",
              content: "첫 번째 대댓글 내용입니다.",
            },
          ],
        },
        {
          id: 2,
          author: "댓글 작성자 2",
          createdAt: "2024-11-05",
          content: "두 번째 댓글 내용입니다.",
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
    editPost() {
      console.log("게시글 수정 페이지로 이동");
    },
    deletePost() {
      console.log("게시글 삭제");
    },
    addComment() {
      if (this.newComment.trim() === "") return;
      const newCommentObj = {
        id: this.comments.length + 1,
        author: "내 이름",
        createdAt: new Date().toISOString().slice(0, 10),
        content: this.newComment,
        replying: false,
        replyContent: "",
        repliesVisible: false,
        replies: [],
      };
      this.comments.push(newCommentObj);
      this.newComment = "";
    },
    toggleReply(commentId) {
      const comment = this.comments.find((c) => c.id === commentId);
      comment.replying = !comment.replying;
    },
    toggleReplies(commentId) {
      const comment = this.comments.find((c) => c.id === commentId);
      comment.repliesVisible = !comment.repliesVisible;
    },
    addReply(commentId) {
      const comment = this.comments.find((c) => c.id === commentId);
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
