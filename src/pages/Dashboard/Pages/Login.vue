<template>
  <auth-layout pageClass="login-page">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-lg-4 col-md-6 col-sm-8">
        <form @submit.prevent="submitHandler">
          <fade-render-transition>
            <card>
              <div slot="header">
                <h3 class="card-title text-center">Вход</h3>
              </div>
              <div>
                <fg-input label="Email"
                          placeholder="Введите email"
                          type="email"
                          v-model="formData.email">

                </fg-input>
                <fg-input label="Пароль"
                          type="password"
                          placeholder="Введите пароль"
                          v-model="formData.password">
                </fg-input>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-fill btn-info btn-round btn-wd ">Войти</button>
                <br>
                <div class="forgot">
                  <router-link to="/register" class="card-category">
                    Забыли ваш пароль?
                  </router-link>
                </div>
              </div>
            </card>
          </fade-render-transition>

        </form>
      </div>
    </div>
  </auth-layout>
</template>
<script>
  import { Checkbox as LCheckbox, FadeRenderTransition } from 'src/components/index'
  import AuthLayout from './AuthLayout.vue'
  export default {
    components: {
      LCheckbox,
      FadeRenderTransition,
      AuthLayout
    },
    data () {
      return {
        formData: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      toggleNavbar () {
        document.body.classList.toggle('nav-open')
      },
      closeMenu () {
        document.body.classList.remove('nav-open')
        document.body.classList.remove('off-canvas-sidebar')
      },
      async submitHandler() {
        try {
          await this.$store.dispatch('login', this.formData)
          this.$router.push('admin/overview')
        }
        catch (e) {}
      }
    },
    beforeDestroy () {
      this.closeMenu()
    }
  }
</script>
<style>
  .navbar-nav .nav-item p{
    line-height: inherit;
    margin-left: 5px;
  }
</style>
