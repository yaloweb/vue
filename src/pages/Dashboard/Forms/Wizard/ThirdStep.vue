<template>
    <div>
        <h5 class="text-center">Пожалуйста напишите ваши предпочтения</h5>

        <div class="row small-padding">
            <div class="col-12">
                <fg-input label="Предпочтения">
                    <el-input type="textarea"
                              autosize
                              placeholder="Напишите Ваши предпочтения"
                              v-model="user.preferences">
                    </el-input>
                </fg-input>
            </div>
        </div>

    </div>
</template>
<script>

  export default {
    data() {
      return {
        user: {
          preferences: ''
        },
      }
    },
    methods: {
    }
  }
</script>
<style>
</style>
