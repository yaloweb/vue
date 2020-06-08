<template>
  <card class="card-user">
    <div slot="image">
      <img src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
           alt="...">
    </div>
    <div>
      <div class="author">
        <img class="avatar border-gray" src="static/img/default-avatar.png" alt="...">
        <h4 class="title">Ольга Владимировна
          <br>
          <a href="#">
            <small>mail@mail.ru</small>
          </a>
        </h4>
      </div>
      <p class="description text-center">
        <span>
          "Телефон:<br>
          +7 919 919-99-99
        </span>
      </p>
    </div>
  </card>
</template>
<script>
  export default {}
</script>
<style>
  .card-user {
    position: sticky;
    top: 15px;
  }
</style>
