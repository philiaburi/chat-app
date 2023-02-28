<template>
  <div class="home">
    <v-row justify="center">
      <v-col class="text-center" cols="12" lg="4">
        <h2 class="pb-2">チャットアプリ</h2>
        <h4 class="subheading">名前: {{ name }}</h4>
        <h4 class="subheading">メールアドレス:{{ email }}</h4>
        <div class="mt-4">
          <UserList :userId="userId" @goToChatRoom="goToChatRoom"></UserList>
        </div>
      </v-col>
      <v-col lg="8">
        <ChatRoom
          :userId="userId"
          :userName="name"
          :talkUserId="selectUserId"
        ></ChatRoom>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import { auth, db } from "../plugins/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import UserList from "../components/UserList.vue";
import ChatRoom from "../components/ChatRoom.vue";

export default {
  name: "HomeView",
  components: { UserList, ChatRoom },
  data() {
    return {
      loading: false,
      isShowChatRoom: false,
      userId: "",
      name: "",
      email: "",
      selectUserId: "",
    };
  },
  async created() {
    const user = await this.getUser();
    //ユーザー情報がないときは、処理を抜ける
    if (!user) return;
    const docRef = doc(db, "users", user.uid);
    onSnapshot(docRef, (doc) => {
      const data = doc.data();
      if (!data) return;
      this.userId = doc.id;
      this.name = data.name;
      this.email = data.email;
    });
  },
  methods: {
    async getUser() {
      return await new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          if (user) resolve(user);
          else reject(null);
        });
      });
    },
    goToChatRoom(selectUserId) {
      this.selectUserId = selectUserId;
      this.isShowChatRoom = true;
    },
  },
};
</script>
