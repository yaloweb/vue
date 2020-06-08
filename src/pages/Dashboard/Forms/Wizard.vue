<template>
  <div>
    <div class="row d-flex justify-content-center">
      <div class="col-12">
        <div class="card card-wizard" id="wizardCard">
          <form-wizard shape="tab"
                       @on-complete="wizardComplete"
                       title="Анкета пользователя"
                       subtitle="Заполните анкету"
                       error-color="#FB404B"
                       color="#35495E">
            <tab-content title="Персональные данные"
                         class="col-12"
                         :before-change="() => validateStep('firstStep')"
                         icon="nc-icon nc-badge">
              <first-step ref="firstStep" @on-validated="onStepValidated"></first-step>
            </tab-content>

            <tab-content title="Дополнительные данные"
                         class="col-12"
                         :before-change="() => validateStep('secondStep')"
                         icon="nc-icon nc-notes">
              <second-step ref="secondStep" @on-validated="onStepValidated"></second-step>
            </tab-content>

            <tab-content title="Предпочтения"
                         class="col-12"
                         icon="nc-icon nc-chat-round">
              <third-step ref="thirdStep"></third-step>
            </tab-content>

            <tab-content title="Готово"
                         class="col-12"
                         icon="nc-icon nc-check-2">
              <div>
                <h2 class="text-center text-space">Вы успешно заполнили анкету
                  <br>
                  <br>
                  <p>Нажмите "Отправить" для отправки анкеты</p>
                </h2>
              </div>

            </tab-content>

            <button slot="prev" class="btn btn-default btn-fill btn-wd btn-back">Назад</button>
            <button slot="next" class="btn btn-default btn-fill btn-wd btn-next" @click="scrollToTop">Далее</button>
            <button slot="finish" class="btn btn-success btn-fill btn-wd">Отправить</button>
          </form-wizard>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  import FirstStep from './Wizard/FirstStep.vue'
  import SecondStep from './Wizard/SecondStep.vue'
  import ThirdStep from './Wizard/ThirdStep.vue'
  import swal from 'sweetalert2'

  export default {
    data () {
      return {
        wizardModel: {}
      }
    },
    components: {
      FormWizard,
      TabContent,
      FirstStep,
      SecondStep,
      ThirdStep
    },
    methods: {
      validateStep (ref) {
        return this.$refs[ref].validate()
      },
      onStepValidated (validated, model) {
        this.wizardModel = {...this.wizardModel, ...model}
      },
      wizardComplete () {
        swal('Успешно!', 'После просмотра анкеты с Вами свяжутся наши специалисты!', 'success')
      },
      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  }
</script>
<style lang="scss">
  .vue-form-wizard .wizard-icon-circle.tab_shape {
    background-color: #9A9A9A !important;
    color: white;
  }
  .vue-form-wizard .wizard-tab-content {
    display: flex; // to avoid horizontal scroll when animating
    .wizard-tab-container {
      display: block;
      animation: fadeIn 0.5s;
    }
  }
</style>
