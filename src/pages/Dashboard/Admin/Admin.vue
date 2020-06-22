<template>
    <div class="admin-panel">

        <div class="h2">Кабинет администратора</div>

        <card title="Данные клиентов, доступные мененджеру для изменения">

            <div class="d-flex flex-wrap">

                <div v-for="field in userInfo"
                     class="mr-4">
                    <fg-input>
                        <checkbox v-model="field.active"
                                  name="subscribe">{{translate[field.name]}} [{{field.name}}]
                        </checkbox>
                    </fg-input>
                </div>

            </div>

        </card>

    </div>
</template>

<script>
  import {Select, Option} from 'element-ui'
  import {Checkbox} from 'src/components/index'

  export default {
    components: {
      [Select.name]: Select,
      [Option.name]: Option,
      Checkbox
    },
    data() {
      return {
        userInfo: [
          {
            name: 'name',
            active: true
          },
          {
            name: 'phone',
            active: true
          },
          {
            name: 'email',
            active: true
          },
          {
            name: 'birthDay',
            active: false
          },
          {
            name: 'passport',
            active: false
          },
          {
            name: 'snils',
            active: false
          },
          {
            name: 'inn',
            active: false
          },
          {
            name: 'address',
            active: false
          },
          {
            name: 'internationalPassport',
            active: false
          },
          {
            name: 'insurance',
            active: false
          },
        ],
        translate: {
          'name': 'Имя',
          'phone': 'Телефон',
          'email': 'Почта',
          'birthDay': 'Дата рождения',
          'passport': 'Паспорт',
          'snils': 'СНИЛС',
          'inn': 'ИНН',
          'address': 'Адрес',
          'internationalPassport': 'Загранпаспорт',
          'insurance': 'Страховка',
        }
      }
    },
    methods: {
    }
  }
</script>
