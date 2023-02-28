<template>
  <v-card elevation="0">
    <v-list>
      <v-list-item
        v-for="(item, index) in filterUsers"
        :key="index"
        @click="goToRoom(item.id)"
      >
        <v-list-item-content>
          <v-list-item-title class="text-start">{{
            item.name
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { db } from "../plugins/firebase";
import { collection, onSnapshot } from "firebase/firestore";
export default {
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.setUsers();
  },
  computed: {
    filterUsers() {
      return this.users.filter((item) => item.id !== this.userId);
    },
  },
  methods: {
    setUsers() {
      const collectionRef = collection(db, "users");
      onSnapshot(collectionRef, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.users.push({
            id: doc.id,
            name: doc.data().name,
            email: doc.data().email,
          });
        });
      });
    },
    goToRoom(status) {
      this.$emit("goToChatRoom", status);
    },
  },
};
</script>
