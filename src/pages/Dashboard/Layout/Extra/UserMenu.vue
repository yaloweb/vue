<template>
  <div class="user">
    <div class="photo">
      <img src="static/img/default-avatar.png" alt="avatar"/>
    </div>
    <div class="info">
      <a data-toggle="collapse" :aria-expanded="!isClosed" @click.stop="toggleMenu" href="#">
           <span v-if="$store.state.userType == 1">
             {{title}}
          </span>
          <span v-else-if="$store.state.userType == 2">
             Менеджер Алиса
          </span>
          <span v-else-if="$store.state.userType == 3">
             Администратор
          </span>
      </a>
      <div class="clearfix"></div>
    </div>
  </div>
</template>
<script>
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

  export default {
    components: {
      [CollapseTransition.name]: CollapseTransition
    },
    props: {
      title: {
        type: String,
        default: 'Ольга Владимировна'
      }
    },
    data () {
      return {
        isClosed: true
      }
    },
    methods: {
      toggleMenu () {
        this.isClosed = !this.isClosed
      }
    }
  }
</script>
<style>
  .collapsed {
    transition: opacity 1s;
  }
</style>
