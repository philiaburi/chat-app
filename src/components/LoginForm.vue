<template>
  <div class="d-flex flex-column">
    <h2 class="text-center mb-4">ログイン</h2>
    <v-card elevation="2" max-width="500" class="mx-auto py-12 px-2">
      <v-container>
        <v-row dense>
          <v-col> </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="email"
              dense
              label="メールアドレス"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              dense
              label="パスワード"
              outlined
              type="password"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn
              :loading="loading"
              depressed
              color="#FF914D"
              block
              dark
              @click="login"
            >
              ログイン
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { auth } from "../plugins/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
    return {
      loading: false,
      email: "",
      password: "",
    };
  },
  methods: {
    //ログインボタンクリック時のイベント
    async login() {
      try {
        this.loading = true;
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push("/");
      } catch (error) {
        alert(`エラー ${error}`);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
