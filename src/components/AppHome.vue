<template>
  <div>
    <img width="50px" alt="Webpack" src="../images/favicon.png" />
    <input type="text" placeholder="Ваше имя" v-model="name" />
    <input type="text" placeholder="и фамилия" v-model="lastname" />
    <button @click="_post">Проверить JSON</button>
    <p class="result" v-for="name in employees">
      {{ name.name }}, {{ name.lastname }}
    </p>
    -
    {{ employees }}
  </div>
</template>

<script>
export default {
  name: "AppHome",
  data() {
    return {
      employees: [],
      name: "",
      lastname: ""
    };
  },
  mounted() {
    this._get();
  },
  methods: {
    async _get() {
      try {
        const response = await fetch("/assets/data.json");
        this.employees = await response.json();
      } catch (error) {
        console.error(error);
      }
    },
    async _post() {
      try {
        const response = await fetch("/assets/save.php", {
          method: "POST",
          body: JSON.stringify({ name: this.name, lastname: this.lastname }),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        this.employees = await response.json();
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped></style>
