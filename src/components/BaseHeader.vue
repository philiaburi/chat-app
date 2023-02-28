<template>
  <v-app-bar app elevation="0" color="#FF914D" dark>
    <v-toolbar-title style="font-weight: 800">Vaindersチャット</v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- ログインしている時に表示するコンテンツ -->
    <v-menu left bottom v-if="isLogin">
      <template v-slot:activator="{ on, attrs }">
        <!-- v-avatarをクリックしたら、メニューが表示されるようにしています。 -->
        <v-avatar color="white" dark size="46" v-bind="attrs" v-on="on">
          <span class="text-h5" style="color: #ff914d">
            <!-- ここで最初の一文字だけ切り取って表示しています -->
            {{ userName.slice(0, 1) || "" }}
          </span>
        </v-avatar>
      </template>
      <v-list>
        <!-- ユーザー名表示 -->
        <v-list-item>
          <v-list-item-title>{{ userName }}</v-list-item-title>
        </v-list-item>
        <!-- ログアウトボタン -->
        <v-list-item @click="logout">
          <v-list-item-title>ログアウト</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- ログインしていない時に表示させている -->
    <div v-else>
      <v-btn text class="mr-1" color="white" dark href="/signup" small>
        サインアップ
      </v-btn>
      <v-btn color="white" dark href="/login" small>
        <span style="color: #ff914d">ログイン</span>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { auth } from "../plugins/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
export default {
  data() {
    return {
      isLogin: false,
      userName: "",
    };
  },
  created() {
    // ログインしているか判定する
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // ログインしている場合
        this.isLogin = true;
        this.userName = user.email;
      } else {
        // ログインしていない場合
        this.isLogin = false;
        this.userName = "";
      }
    });
  },
  methods: {
    // HomeView.vueからlogout関数をコピペ
    async logout() {
      try {
        this.loading = true;
        await signOut(auth);
        // ログアウトした後、ログインページに遷移しています。
        this.$router.push("/login");
      } catch (error) {
        alert(`エラー ${error}`);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
