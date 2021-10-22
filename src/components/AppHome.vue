<template>
  <div>
    <img width="50px" alt="Webpack" src="../images/favicon.png" />
    <input type="text" placeholder="Ваше имя" v-model="name" />
    <input type="text" placeholder="и фамилия" v-model="lastname" />
    <button @click="send">Проверить JSON</button>
    <p class="result" v-for="name in employees" :key="name">
      {{ name.name }}, {{ name.lastname }}
    </p>
  </div>
</template>

<script>
export default {
  name: "AppHome",
  data() {
    return {
      employees: [],
      name: "",
      lastname: "",
    };
  },
  mounted() {
    this.getEmployees();
  },
  methods: {
    send() {
      let xhr = new XMLHttpRequest();
      let url = "/assets/save.php";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      let data = JSON.stringify({ name: this.name, lastname: this.lastname });
      xhr.send(data);
    },
    signIn() {
      let data = JSON.stringify({
        name: this.name,
        lastname: this.lastname
      });
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://127.0.0.1:8000/api/v1/auth_token/token/login', false);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(data)
      if (xhr.status == 200) {
        localStorage.token = JSON.parse(xhr.responseText).auth_token
        this.auth = true
      }
    },
    del() {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://127.0.0.1:8000/api/v1/articles/list', false);
      xhr.send()
    },
    async getEmployees() {
      try {
        const response = await fetch("/assets/data.json");
        const data = await response.json();
        this.employees = data;
      } catch (error) {
        console.error(error);
      }
    },
    async addEmployee(employee) {
      try {
        const response = await fetch(
                "/assets/users.json",
                {
                  method: "POST",
                  body: JSON.stringify(employee),
                  headers: { "Content-type": "application/json; charset=UTF-8" }
                }
        );
        const data = await response.json();
        this.employees = [...this.employees, data];
        this.getEmployees();
      } catch (error) {
        console.error(error);
      }
    },
  }
};
</script>

<style scoped></style>
