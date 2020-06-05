<template>
  <div class="row">
    <div class="col-12">
      <div class="h2">Личный кабинет</div>
    </div>
    <div class="col-lg-8 col-md-7">
      <edit-profile-form>

      </edit-profile-form>
    </div>
    <div class="col-lg-4 col-md-5">
      <user-card>

      </user-card>
    </div>
  </div>
</template>
<script>
  import EditProfileForm from './UserProfile/EditProfileForm.vue'
  import UserCard from './UserProfile/UserCard.vue'

  export default {
    components: {
      EditProfileForm,
      UserCard
    }
  }

</script>
<style>

</style>
