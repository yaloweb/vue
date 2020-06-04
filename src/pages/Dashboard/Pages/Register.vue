<template>
    <auth-layout pageClass="login-page">
        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-sm-8">
                <fade-render-transition>
                    <card>
                        <div slot="header">
                            <h3 class="card-title text-center">Регистрация</h3>
                        </div>
                        <form @submit.prevent="onRegisterSubmit">
                            <div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <fg-input label="Имя"
                                                  placeholder="Введите Ваше имя"
                                                  type="text"
                                                  v-model="formData.name">
                                        </fg-input>
                                    </div>
                                    <div class="col-md-4">
                                        <fg-input label="Фамилия"
                                                  placeholder="Введите Вашу фамилию"
                                                  type="text"
                                                  v-model="formData.surname">
                                        </fg-input>
                                    </div>
                                    <div class="col-md-4">
                                        <fg-input label="Отчество"
                                                  placeholder="Введите Ваше Отчество"
                                                  type="text"
                                                  v-model="formData.middleName">
                                        </fg-input>
                                    </div>
                                </div>
                                <fg-input label="Email"
                                          placeholder="Введите email"
                                          type="email"
                                          v-model="formData.email">

                                </fg-input>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <fg-input label="Пароль"
                                                  type="password"
                                                  placeholder="Введите пароль"
                                                  v-model="formData.password">
                                        </fg-input>
                                    </div>
                                    <div class="col-lg-6">
                                        <fg-input label="Подтвердите пароль"
                                                  type="password"
                                                  placeholder="Подтвердите пароль"
                                                  v-model="passwordRepeat">
                                        </fg-input>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <button type="submit"
                                        class="btn btn-fill btn-info btn-round btn-wd ">
                                    Зарегистрироваться
                                </button>
                            </div>
                        </form>
                    </card>
                </fade-render-transition>
            </div>
        </div>
    </auth-layout>
</template>
<script>
  import {FadeRenderTransition} from 'src/components/index'
  import AuthLayout from './AuthLayout.vue'

  export default {
    components: {
      FadeRenderTransition,
      AuthLayout
    },
    data() {
      return {
        formData: {
          name: 'Равиль',
          surname: 'Нагаев',
          middleName: 'Ринатович',
          email: 'whiteravil@yandex.ru',
          password: '123456'
        },
        passwordRepeat: ''
      }
    },
    methods: {
      toggleNavbar() {
        document.body.classList.toggle('nav-open')
      },
      closeMenu() {
        document.body.classList.remove('nav-open')
        document.body.classList.remove('off-canvas-sidebar')
      },
      async onRegisterSubmit() {
        try {
            await this.$store.dispatch('register', this.formData)
        }
        catch (e) {
        }
      },
    },
    beforeDestroy() {
      this.closeMenu()
    }
  }
</script>
<style>
</style>
