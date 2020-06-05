<template>
    <div>
        <card>
            <vue-tabs value="Description">
                <v-tab title="Личные данные">
                    <div slot="header">
                        <h4 class="title">Личные данные</h4>
                    </div>
                    <div class="pb-4">
                        <form>
                            <div class="row small-padding">
                                <div class="col-md-4">
                                    <fg-input type="text"
                                              label="Имя"
                                              placeholder="Ваше имя"
                                              v-model="user.name"
                                              :disabled="disabled.profile">
                                    </fg-input>
                                </div>
                                <div class="col-md-4">
                                    <fg-input type="text"
                                              label="Фамилия"
                                              placeholder="Ваша фамилия"
                                              v-model="user.surname"
                                              :disabled="disabled.profile">
                                    </fg-input>
                                </div>
                                <div class="col-md-4">
                                    <fg-input type="text"
                                              label="Отчество"
                                              placeholder="Ваше отчество"
                                              v-model="user.middleName"
                                              :disabled="disabled.profile">
                                    </fg-input>
                                </div>
                                <div class="col-md-6">
                                    <fg-input type="text"
                                              label="Телефон"
                                              placeholder="+7 919 919-99-99"
                                              v-model="user.phone"
                                              :mask="{mask: '+7 999 999-99-99', greedy: true}"
                                              :disabled="disabled.profile">
                                    </fg-input>
                                </div>
                                <div class="col-md-6">
                                    <fg-input type="email"
                                              label="Email"
                                              placeholder="Ваш Email"
                                              v-model="user.email"
                                              :disabled="disabled.profile">
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
                                                  placeholder="12 34"
                                                  class="passport-series"
                                                  v-model="user.passport.series"
                                                  :mask="{mask: '99 99', greedy: true}"
                                                  :disabled="disabled.profile">
                                        </fg-input>
                                        <fg-input type="text"
                                                  label="Номер"
                                                  placeholder="123456"
                                                  class="passport-number"
                                                  v-model="user.passport.number"
                                                  :mask="{mask: '999999', greedy: true}"
                                                  :disabled="disabled.profile">
                                        </fg-input>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <fg-input type="text"
                                              label="Дата выдачи"
                                              placeholder="00/00"
                                              class="passport-date"
                                              v-model="user.passport.date"
                                              :mask="{mask: '99/99', greedy: true}"
                                              :disabled="disabled.profile">
                                    </fg-input>
                                </div>
                                <div class="col-md-6">
                                    <fg-input type="text"
                                              label="Кем выдан"
                                              placeholder="МВД России по РТ"
                                              class="passport-who"
                                              v-model="user.passport.who"
                                              :disabled="disabled.profile">
                                    </fg-input>
                                </div>
                                <div class="col-12">
                                    <el-upload action="#"
                                               :file-list="user.passport.imageUrl"
                                               list-type="picture-card"
                                               :auto-upload="false"
                                               :on-preview="handlePictureCardPreview"
                                               :on-change="uploadImg"
                                               :on-remove="handleRemoveImg"
                                               :disabled="disabled.profile">
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
                                              :disabled="disabled.profile"
                                              :mask="{mask: '999-999-999 99', greedy: true}">
                                    </fg-input>
                                    <div class="col-12">
                                        <el-upload action="#"
                                                   :file-list="user.snils.imageUrl"
                                                   list-type="picture-card"
                                                   :auto-upload="false"
                                                   :on-preview="handlePictureCardPreview"
                                                   :on-change="uploadImg"
                                                   :on-remove="handleRemoveImg"
                                                   :disabled="disabled.profile">
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
                                              :disabled="disabled.profile"
                                              :mask="{mask: '999999999999', greedy: true}">
                                    </fg-input>
                                    <el-upload action="#"
                                               :file-list="user.inn.imageUrl"
                                               list-type="picture-card"
                                               :auto-upload="false"
                                               :on-preview="handlePictureCardPreview"
                                               :on-change="uploadImg"
                                               :on-remove="handleRemoveImg"
                                               :disabled="disabled.profile">
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
                                              :mask="{mask: '99 9999999', greedy: true}"
                                              :disabled="disabled.profile">
                                    </fg-input>
                                </div>
                                <div class="col-md-2">
                                    <fg-input type="text"
                                              label="Действителен до"
                                              placeholder="дд/мм/гггг"
                                              v-model="user.internationalPassport.date"
                                              :mask="{alias: 'date'}"
                                              :disabled="disabled.profile">
                                    </fg-input>
                                </div>
                                <div class="col-12">
                                    <el-upload action="#"
                                               :file-list="user.internationalPassport.imageUrl"
                                               list-type="picture-card"
                                               :auto-upload="false"
                                               :on-preview="handlePictureCardPreview"
                                               :on-change="uploadImg"
                                               :on-remove="handleRemoveImg"
                                               :disabled="disabled.profile">
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                    <div class="el-upload__tip" slot="tip">jpg сканы загранпаспорта</div>
                                </div>
                            </div>

                            <div class="text-center mt-5">
                                <button v-if="disabled.profile"
                                        type="submit"
                                        class="btn btn-info btn-fill btn-wd"
                                        @click.prevent="disabled.profile = false">
                                    Изменить данные
                                </button>
                                <button v-if="!disabled.profile"
                                        type="submit"
                                        class="btn btn-success btn-fill btn-wd"
                                        @click.prevent="disabled.profile = true">
                                    Сохранить
                                </button>
                            </div>
                            <div class="clearfix"></div>
                        </form>
                    </div>
                </v-tab>
                <v-tab title="Загранпаспорт">
                    <p>We are Houses Inc., a group of architects and interior designers based in Chicago and operating for clients worldwide. We’ve been designing stunningly beautiful houses and making clients happy for years.</p>
                </v-tab>
                <v-tab title="Style">
                    <p>Explore a wide variety of styles, personalise your finishes, and let us design the perfect home for you. It's what we do best and you can see proof in the products and reviews below.</p>
                </v-tab>
                <v-tab title="Settings">
                    Explore a wide Houses Inc., a group of architects and interior designers based in Chicago and operating for clients worldwide. We’ve been designing stunningly beautiful houses and making clients happy for years.
                </v-tab>
            </vue-tabs>
        </card>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>

  import {Upload, Dialog, Collapse, CollapseItem} from 'element-ui'

  export default {
    components: {
      [Upload.name]: Upload,
      [Dialog.name]: Dialog,
      [Collapse.name]: Dialog,
      [CollapseItem.name]: Dialog,
    },
    data() {
      return {
        user: {
          name: 'Равиль',
          surname: 'Нагаев',
          middleName: 'Ринатович',
          phone: '+7 919 919-99-99',
          email: 'mail@mail.ru',
          passport: {
            series: '9212',
            number: '205421',
            date: '03/20',
            who: 'Отделом УФМС России по Республике Татарстан',
            imageUrl: [{
              url: 'static/img/passport.jpg'
            }]
          },
          snils: {
            number: '123-456-789 00',
            imageUrl: [{
              url: 'static/img/snils.jpg'
            }]
          },
          inn: {
            number: '012345678901',
            imageUrl: [{
              url: 'static/img/inn.jpg'
            }]
          },
          internationalPassport: {
            number: '12 3456789',
            date: '03/02/2025',
            imageUrl: [{
              url: 'static/img/passport.jpg'
            }]
          }
        },
        disabled: {
          profile: false
        },
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    methods: {
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleRemoveImg(file, fileList) {
        console.log(file, fileList);
      },
      uploadImg(file, fileList) {
        console.log(file)
        console.log(fileList)
      },
    }
  }

</script>
<style>
    .passport-form {
        display: flex;
    }

    .passport-series {
        margin-right: 5px;
        width: 100%;
        max-width: 65px;
    }

    .passport-number {
        flex-grow: 1;
        width: 100%;
    }
    .el-upload-list__item div {
        height: 100%;
    }
    .el-upload-list__item-thumbnail {
        object-fit: cover
    }
</style>
