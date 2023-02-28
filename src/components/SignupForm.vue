<template>
  <div class="d-flex flex-column">
    <h2 class="text-center mb-4">サインアップ</h2>
    <v-card elevation="2" max-width="500" class="mx-auto py-12 px-2">
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              v-model="name"
              dense
              label="ユーザー名"
              outlined
            ></v-text-field>
          </v-col>
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
              depressed
              block
              dark
              color="#FF914D"
              @click="singup"
              :loading="loading"
            >
              サインアップ
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { auth, db } from "../plugins/firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      loading: false,
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    //サインアップボタンクリック時のイベント
    async singup() {
      try {
        this.loading = true;
        const { user } = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );

        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, {
          name: this.name,
          email: this.email,
        });
        // ユーザー情報
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
