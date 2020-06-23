<template>
  <div>
    <h5 class="text-center">Заполните персональные данные</h5>
    <div class="row small-padding">
      <div class="col-md-4">
        <fg-input type="text"
                  label="Имя"
                  name="Имя"
                  placeholder="Ваше имя"
                  v-validate="modelValidations.name"
                  :error="getError('Имя')"
                  v-model="user.name">
        </fg-input>
      </div>
      <div class="col-md-4">
        <fg-input type="text"
                  label="Фамилия"
                  name="Фамилия"
                  placeholder="Ваша фамилия"
                  v-validate="modelValidations.surname"
                  :error="getError('Фамилия')"
                  v-model="user.surname">
        </fg-input>
      </div>
      <div class="col-md-4">
        <fg-input type="text"
                  label="Отчество"
                  placeholder="Ваше отчество"
                  v-model="user.middleName">
        </fg-input>
      </div>
      <div class="col-md-6">
        <fg-input type="text"
                  label="Телефон"
                  name="Телефон"
                  placeholder="+7 919 919-99-99"
                  v-model="user.phone"
                  :mask="{mask: '+7 999 999-99-99', greedy: true}"
                  v-validate="modelValidations.phone"
                  :error="getError('Телефон')">
        </fg-input>
      </div>
      <div class="col-md-6">
        <fg-input type="email"
                  label="Email"
                  placeholder="Ваш Email"
                  name="Почта"
                  v-model="user.email"
                  v-validate="modelValidations.email"
                  :error="getError('Почта')">
        </fg-input>
      </div>
    </div>
  </div>
</template>
<script>

  import {Upload, Dialog, Collapse, CollapseItem, Select, Option, Tooltip} from 'element-ui'

  export default {
    components: {
      [Upload.name]: Upload,
      [Dialog.name]: Dialog,
      [Collapse.name]: Collapse,
      [CollapseItem.name]: CollapseItem,
      [Select.name]: Select,
      [Option.name]: Option,
      [Tooltip.name]: Tooltip,
    },
    data () {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        user: {
          name: '',
          surname: '',
          middleName: '',
          phone: '',
          email: '',
          passport: {
            series: '',
            number: '',
            date: '',
            who: '',
            imageUrl: []
          },
          snils: {
            number: '',
            imageUrl: []
          },
          inn: {
            number: '',
            imageUrl: []
          },
          internationalPassport: {
            number: '',
            date: '',
            imageUrl: []
          },
          insurance: {
            number: '',
            imageUrl: []
          },
        },
        modelValidations: {
          name: {
            required: true
          },
          surname: {
            required: true
          },
          email: {
            required: true,
            email: true
          },
          phone: {
            required: true
          },
          passport: {
            series: {
              required: true
            },
            number: {
              required: true
            },
            date: {
              required: true
            },
            who: {
              required: true
            },
          }
        }
      }
    },
    methods: {
      getError (fieldName) {
        let error = this.errors.first(fieldName)
        return error
      },
      validate () {
        return this.$validator.validateAll().then(res => {
          this.$emit('on-validated', res, this.model)
          return res
        })
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleRemoveImg(file, fileList) {
        console.log(fileList);
      },
      uploadImg(file, fileList) {
        console.log(fileList)
      },
      handleRemoveFile(file, fileList) {
        console.log(fileList)
      },
      addContact() {
        this.user.contacts.push({
          who: '',
          name: '',
          phone: ''
        })
      },
      addBeneficiarie() {
        this.user.beneficiaries.push({
          type: 1,
          name: '',
          phone: ''
        })
      },
    }
  }
</script>
<style>
</style>
