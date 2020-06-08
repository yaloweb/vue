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

                            <hr>

                            <div class="row small-padding mt-4">
                                <div class="col-12">
                                    <div class="h5">Данные страховки</div>
                                </div>
                                <div class="col-12">
                                    <fg-input type="text"
                                              label="Номер страховки"
                                              placeholder="012345678901"
                                              v-model="user.insurance.number"
                                              :disabled="disabled.profile">
                                    </fg-input>
                                    <el-upload action="#"
                                               :file-list="user.insurance.imageUrl"
                                               list-type="picture-card"
                                               :auto-upload="false"
                                               :on-preview="handlePictureCardPreview"
                                               :on-change="uploadImg"
                                               :on-remove="handleRemoveImg"
                                               :disabled="disabled.profile">
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                    <div class="el-upload__tip" slot="tip">jpg сканы страховки</div>
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
                <v-tab title="Биометрические данные">
                    <div class="py-4">
                        <form>
                            <div class="h5">Цифровая копия ДНК</div>
                            <el-upload action="#"
                                       class="upload-demo"
                                       drag
                                       :on-remove="handleRemoveFile"
                                       :file-list="user.dna.files"
                                       multiple>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">Перетащите архив сюда или<br><em>нажмите для загрузки</em>
                                </div>
                                <div class="el-upload__tip" slot="tip">zip/rar/tar архив</div>
                            </el-upload>

                            <hr>

                            <div class="mt-4">
                                <div class="h5">Образец голоса</div>
                            </div>

                            <mini-audio :src="user.voice.url"></mini-audio>
                            <el-upload action="#"
                                       class="upload-voice"
                                       :on-remove="handleRemoveFile"
                                       :file-list="user.voice.files"
                                       :thumbnail-mode="false"
                                       list-type="picture">
                                <l-button size="small" type="success">Нажмите для загрузки</l-button>
                                <div slot="tip" class="el-upload__tip">mp3 аудио-файл</div>
                            </el-upload>

                        </form>
                    </div>
                </v-tab>
                <v-tab title="Контакты">
                    <div class="py-4">
                        <div class="contacts">
                            <div class="h5">Контакты близких людей</div>
                            <div v-for="(contact, index) in user.contacts"
                                 class="d-flex">
                                <div class="left-contact">
                                    <div class="row small-padding">
                                        <div class="col-lg-4">
                                            <div class="select-group">
                                                <label>Кем приходится</label>
                                                <el-select size="large"
                                                           class="w-100"
                                                           placeholder="Выберите из списка"
                                                           v-model="contact.who">
                                                    <el-option v-for="option in contactsType"
                                                               :value="option.value"
                                                               :label="option.label"
                                                               :key="option.label">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <fg-input type="text"
                                                      label="ФИО"
                                                      placeholder="Введите ФИО"
                                                      v-model="contact.name">
                                            </fg-input>
                                        </div>
                                        <div class="col-lg-4">
                                            <fg-input type="text"
                                                      label="Телефон"
                                                      placeholder="+7 919 919-99-99"
                                                      v-model="contact.phone"
                                                      :mask="{mask: '+7 999 999-99-99', greedy: true}">
                                            </fg-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="right-contact">
                                    <el-tooltip class="item"
                                                effect="dark"
                                                content="Удалить"
                                                placement="top">
                                        <l-button type="danger"
                                                  class="btn-icon btn-icon-custom"
                                                  @click="user.contacts.splice(index, 1)">
                                            <i class="nc-icon nc-simple-remove"></i>
                                        </l-button>
                                    </el-tooltip>
                                </div>
                            </div>
                            <l-button type="primary mt-3"
                                      @click="addContact">Добавить контакт
                            </l-button>
                        </div>

                        <hr>

                        <div class="beneficiaries mt-4">
                            <div class="h5">Данные о выгодоприобретателях</div>
                            <div v-for="(beneficiarie, index) in user.beneficiaries"
                                 class="d-flex">
                                <div class="left-contact">
                                    <div class="row small-padding">
                                        <div class="col-lg-4">
                                            <div class="select-group">
                                                <label>Тип лица</label>
                                                <el-select size="large"
                                                           class="w-100"
                                                           placeholder="Выберите из списка"
                                                           v-model="beneficiarie.type">
                                                    <el-option v-for="option in beneficiariesType"
                                                               :value="option.value"
                                                               :label="option.label"
                                                               :key="option.label">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <fg-input type="text"
                                                      :label="beneficiarie.type == 1 ? 'ФИО' : 'Название организации'"
                                                      :placeholder="beneficiarie.type == 1 ? 'Введите ФИО' : 'ООО Company'"
                                                      v-model="beneficiarie.name">
                                            </fg-input>
                                        </div>
                                        <div class="col-lg-4">
                                            <fg-input type="text"
                                                      label="Телефон"
                                                      placeholder="+7 919 919-99-99"
                                                      v-model="beneficiarie.phone"
                                                      :mask="{mask: '+7 999 999-99-99', greedy: true}">
                                            </fg-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="right-contact">
                                    <el-tooltip class="item"
                                                effect="dark"
                                                content="Удалить"
                                                placement="top">
                                        <l-button type="danger"
                                                  class="btn-icon btn-icon-custom"
                                                  @click="user.beneficiaries.splice(index, 1)">
                                            <i class="nc-icon nc-simple-remove"></i>
                                        </l-button>
                                    </el-tooltip>
                                </div>
                            </div>
                            <l-button type="primary mt-3"
                                      @click="addBeneficiarie">Добавить выгодоприобретателя
                            </l-button>
                        </div>

                    </div>
                </v-tab>
                <v-tab title="Дополнительная информация">
                    <div class="py-4">
                        <div class="h5">Дополнительная информация</div>

                        <div class="row small-padding">
                            <div class="col-md-4">
                                <fg-input type="text"
                                          label="Дата рождения"
                                          placeholder="дд/мм/гггг"
                                          v-model="user.birthDay"
                                          :mask="{alias: 'date'}"
                                          :disabled="disabled.profile">
                                </fg-input>
                            </div>
                            <div class="col-md-4">
                                <fg-input type="text"
                                          label="Место рождения"
                                          placeholder="Россия, г.Москва"
                                          v-model="user.birthPlace"
                                          :disabled="disabled.profile">
                                </fg-input>
                            </div>
                            <div class="col-md-4">
                                <fg-input type="text"
                                          label="Фактический адрес проживания"
                                          placeholder="г.Казань, ул.Пушкина, д.7, кв. 36"
                                          v-model="user.address"
                                          :disabled="disabled.profile">
                                </fg-input>
                            </div>
                            <div class="col-md-4">
                                <div class="select-group">
                                    <label>Религия</label>
                                    <el-select size="large"
                                               class="w-100"
                                               placeholder="Выберите из списка"
                                               v-model="user.religion"
                                               :disabled="disabled.profile">
                                        <el-option v-for="religion in religions"
                                                   :value="religion.id"
                                                   :label="religion.name"
                                                   :key="religion.name">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="select-group">
                                    <label>Место захоронения</label>
                                    <el-select size="large"
                                               class="w-100"
                                               placeholder="Выберите из списка"
                                               v-model="user.burialPlace"
                                               :disabled="disabled.profile">
                                        <el-option v-for="burialPlace in burialPlaces"
                                                   :value="burialPlace.id"
                                                   :label="burialPlace.name"
                                                   :key="burialPlace.name">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="select-group">
                                    <label>Обряд</label>
                                    <el-select size="large"
                                               class="w-100"
                                               placeholder="Выберите из списка"
                                               v-model="user.rite"
                                               :disabled="disabled.profile">
                                        <el-option v-for="rite in rites"
                                                   :value="rite.id"
                                                   :label="rite.name"
                                                   :key="rite.name">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="col-md-6">

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

                    </div>

                </v-tab>
            </vue-tabs>
        </card>
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
    data() {
      return {
        user: {
          name: 'Ольга',
          surname: 'Бодрова',
          middleName: 'Владимировна',
          phone: '+7 919 919-99-99',
          email: 'mail@mail.ru',
          birthDay: '02/01/1967',
          birthPlace: 'Россия, г.Москва',
          address: 'г.Казань, ул.Пушкина, д.7, кв 36',
          religion: 1,
          burialPlace: 1,
          rite: 1,
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
          },
          insurance: {
            number: '15962561',
            imageUrl: [{
              url: 'static/img/passport.jpg'
            }]
          },
          dna: {
            files: [
              {
                url: 'static/files/dna.rar',
                name: 'Цифровая копия ДНК'
              }
            ]
          },
          voice: {
            url: 'static/files/voice.mp3',
            files: [
              {
                url: 'static/files/voice.mp3',
                name: 'Образец голоса.mp3'
              }
            ]
          },
          contacts: [
            {
              who: 1,
              name: 'Иванова Наталья Терентьева',
              phone: '+ 7 919 919-99-99'
            }
          ],
          beneficiaries: [
            {
              type: 1,
              name: 'Бордрова Татьяна Владимировна',
              phone: '+7 919 919-99-99'
            }
          ]
        },
        contactsType: [
          {value: 1, label: 'Мать'},
          {value: 2, label: 'Отец'},
          {value: 3, label: 'Бабушка'},
          {value: 4, label: 'Дедушка'},
          {value: 5, label: 'Брат'},
          {value: 6, label: 'Сестра'},
          {value: 7, label: 'Друг'},
        ],
        beneficiariesType: [
          {value: 1, label: 'Физическое лицо'},
          {value: 2, label: 'Юридическое лицо'},
        ],
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
        ],
        burialPlaces: [
          {id: 1, name: 'Арское кладбище'},
          {id: 2, name: 'Ново-Татарское кладбище'},
          {id: 3, name: 'Самосыровское кладбище'},
        ],
        rites: [
          {id: 1, name: 'Обряд воздушного погребения'},
          {id: 2, name: 'Обряд воздушного погребения'},
          {id: 3, name: 'Обряд воздушного погребения'},
        ],
        disabled: {
          profile: true
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

    .tab-content {
        flex-direction: column;
    }

    .vueAudioBetter {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }

</style>
