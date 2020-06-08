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

    <hr>

    <div class="row small-padding mt-4">
      <div class="col-12">
        <div class="h5">Паспортные данные</div>
      </div>
      <div class="col-md-4">
        <div class="passport-form">
          <fg-input type="text"
                    label="Серия"
                    name="Серия паспорта"
                    placeholder="12 34"
                    class="passport-series"
                    v-model="user.passport.series"
                    :mask="{mask: '99 99', greedy: true}">
          </fg-input>
          <fg-input type="text"
                    label="Номер"
                    placeholder="123456"
                    class="passport-number"
                    v-model="user.passport.number"
                    :mask="{mask: '999999', greedy: true}">
          </fg-input>
        </div>
      </div>
      <div class="col-md-2">
        <fg-input type="text"
                  label="Дата выдачи"
                  placeholder="00/00"
                  class="passport-date"
                  v-model="user.passport.date"
                  :mask="{mask: '99/99', greedy: true}">
        </fg-input>
      </div>
      <div class="col-md-6">
        <fg-input type="text"
                  label="Кем выдан"
                  placeholder="МВД России по РТ"
                  class="passport-who"
                  v-model="user.passport.who">
        </fg-input>
      </div>
      <div class="col-12">
        <el-upload action="#"
                   :file-list="user.passport.imageUrl"
                   list-type="picture-card"
                   :auto-upload="false"
                   :on-preview="handlePictureCardPreview"
                   :on-change="uploadImg"
                   :on-remove="handleRemoveImg">
          <i class="el-icon-plus"></i>
        </el-upload>
        <div class="el-upload__tip" slot="tip">jpg сканы паспорта</div>
      </div>
    </div>

    <hr>

    <div class="row small-padding mt-4">
      <div class="col-md-6">
        <div class="h5">СНИЛС</div>
        <fg-input type="text"
                  label="Номер СНИЛС"
                  placeholder="123-456-789 00"
                  v-model="user.snils.number"
                  :mask="{mask: '999-999-999 99', greedy: true}">
        </fg-input>
        <div class="col-12">
          <el-upload action="#"
                     :file-list="user.snils.imageUrl"
                     list-type="picture-card"
                     :auto-upload="false"
                     :on-preview="handlePictureCardPreview"
                     :on-change="uploadImg"
                     :on-remove="handleRemoveImg">
            <i class="el-icon-plus"></i>
          </el-upload>
          <div class="el-upload__tip" slot="tip">jpg сканы СНИЛС</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="h5">ИНН</div>
        <fg-input type="text"
                  label="Номер ИНН"
                  placeholder="012345678901"
                  v-model="user.inn.number"
                  :mask="{mask: '999999999999', greedy: true}">
        </fg-input>
        <el-upload action="#"
                   :file-list="user.inn.imageUrl"
                   list-type="picture-card"
                   :auto-upload="false"
                   :on-preview="handlePictureCardPreview"
                   :on-change="uploadImg"
                   :on-remove="handleRemoveImg">
          <i class="el-icon-plus"></i>
        </el-upload>
        <div class="el-upload__tip" slot="tip">jpg сканы ИНН</div>
      </div>
    </div>

    <hr>

    <div class="row small-padding mt-4">
      <div class="col-12">
        <div class="h5">Данные загранпаспорта</div>
      </div>
      <div class="col-md-2">
        <fg-input type="text"
                  label="Номер документа"
                  placeholder="12 3456789"
                  v-model="user.internationalPassport.number"
                  :mask="{mask: '99 9999999', greedy: true}">
        </fg-input>
      </div>
      <div class="col-md-2">
        <fg-input type="text"
                  label="Действителен до"
                  placeholder="дд/мм/гггг"
                  v-model="user.internationalPassport.date"
                  :mask="{alias: 'date'}">
        </fg-input>
      </div>
      <div class="col-12">
        <el-upload action="#"
                   :file-list="user.internationalPassport.imageUrl"
                   list-type="picture-card"
                   :auto-upload="false"
                   :on-preview="handlePictureCardPreview"
                   :on-change="uploadImg"
                   :on-remove="handleRemoveImg">
          <i class="el-icon-plus"></i>
        </el-upload>
        <div class="el-upload__tip" slot="tip">jpg сканы загранпаспорта</div>
      </div>
    </div>

    <hr>

    <div class="row small-padding mt-4">
      <div class="col-12">
        <div class="h5">Данные страховки</div>
      </div>
      <div class="col-12">
        <fg-input type="text"
                  label="Номер страховки"
                  placeholder="012345678901"
                  v-model="user.insurance.number">
        </fg-input>
        <el-upload action="#"
                   :file-list="user.insurance.imageUrl"
                   list-type="picture-card"
                   :auto-upload="false"
                   :on-preview="handlePictureCardPreview"
                   :on-change="uploadImg"
                   :on-remove="handleRemoveImg">
          <i class="el-icon-plus"></i>
        </el-upload>
        <div class="el-upload__tip" slot="tip">jpg сканы страховки</div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
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
