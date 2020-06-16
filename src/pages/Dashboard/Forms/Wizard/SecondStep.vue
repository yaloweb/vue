<template>
    <div>
        <h5 class="text-center">Пожалуйста заполните дополнительные данные</h5>

        <div class="row small-padding">
            <div class="col-md-4">
                <fg-input type="text"
                          label="Год рождения"
                          name="Год рождения"
                          placeholder="дд/мм/гггг"
                          v-validate="modelValidations.birthDay"
                          :error="getError('Год рождения')"
                          v-model="user.birthDay"
                          :mask="{alias: 'date'}">
                </fg-input>
            </div>
            <div class="col-md-4">
                <fg-input type="text"
                          label="Адрес проживания"
                          name="Адрес"
                          placeholder="Пример: г.Казань, ул.Пушкина, д.7, кв.31"
                          v-validate="modelValidations.name"
                          :error="getError('Адрес')"
                          v-model="user.name">
                </fg-input>
            </div>
            <div class="col-md-4">
                <div class="select-group">
                    <label>Религия</label>
                    <el-select size="large"
                               class="w-100"
                               placeholder="Выберите из списка"
                               v-model="user.religion">
                        <el-option v-for="religion in religions"
                                   :value="religion.id"
                                   :label="religion.name">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import {Select, Option} from 'element-ui'

  export default {
    components: {
      [Select.name]: Select,
      [Option.name]: Option
    },
    data() {
      return {
        user: {
          birthDay: '',
          address: '',
          religion: ''
        },
        modelValidations: {
          birthDay: {
            required: true
          },
          address: {
            required: true
          },
          religion: {
            required: true
          }
        },
        religions: [
          {id: 1, name: 'Христианство'},
          {id: 2, name: 'Ислам'},
          {id: 3, name: 'Буддизм'},
          {id: 4, name: 'Иудаизм'},
          {id: 5, name: 'Индуизм'},
          {id: 6, name: 'Сикхизм'},
          {id: 7, name: 'Конфуцианство'},
          {id: 8, name: 'Даосизм'},
          {id: 9, name: 'Джайнизм'},
          {id: 10, name: 'Синтоизм'},
          {id: 11, name: 'Зороастризм'},
        ]
      }
    },
    methods: {
      getError(fieldName) {
        return this.errors.first(fieldName)
      },
      validate() {
        return this.$validator.validateAll().then(res => {
          this.$emit('on-validated', res, this.model)
          return res
        })
      }
    }
  }
</script>
<style>
</style>
