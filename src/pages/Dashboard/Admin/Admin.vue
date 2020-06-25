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

        <card>
            <div class="d-flex mb-4 align-items-center justify-content-between">
                <div class="h4 m-0">Поля для заполнения анкеты</div>
                <l-button type="success"
                          class="m-0"
                          @click="addStepModal">Добавить шаг</l-button>
            </div>
            <card v-for="(step, stepIndex) in steps"
                  class="form-step">
                <div class="h5 mt-0">Шаг {{stepIndex+1}} - {{step.name}}</div>
                <div v-for="(stepItem, stepItemIndex) in step.fields"
                     class="form-model-item">
                    <div class="form-model-item-nmb">{{stepItemIndex+1}}</div>
                    <div class="form-model-item-body">
                        <div class="h5"><strong>{{stepItem.label}}</strong></div>
                        <div class="mb-2">Элемент формы: <strong>{{stepItem.model}}</strong></div>
                        <div class="mb-2">Тип элемента: <strong>{{stepItem.modelType}}</strong></div>
                        <div class="mb-2">Аттрибут [name]: <strong>{{stepItem.modelName}}</strong></div>
                        <div class="mb-2">Аттрибут [placeholder]: <strong>{{stepItem.placeholder}}</strong></div>
                        <div class="mb-2">Маска для заполнения: <strong>{{stepItem.mask !== '' ? stepItem.mask : '-'}}</strong></div>
                        <div class="mb-2">Обязательный для заполнения: <strong>{{stepItem.required ? 'Да' : 'Нет'}}</strong></div>
                    </div>
                    <div class="form-model-item-btns">
                        <l-button type="primary" @click="editField(stepItem)">Редактировать</l-button>
                        <l-button type="danger" @click="deleteField(stepItem, step.name)">Удалить</l-button>
                    </div>
                </div>
                <div class="text-right pt-3">
                    <l-button type="info"
                              @click="addNewField(step.name)">Добавить новое поле</l-button>
                </div>
            </card>
        </card>

        <card title="Гистограмма" subTitle="Статистика заявок">
            <div id="chartViews" class="ct-chart"></div>
        </card>

        <el-dialog :visible.sync="modals.stepModal"
                    title="Добавить шаг для анкеты">
            <form>
                <div class="group-row">
                    <fg-input label="Название шага"
                              v-model="newStep.name"></fg-input>
                    <l-button type="success" nativeType="submit">Добавить</l-button>
                </div>
            </form>
        </el-dialog>

        <el-dialog :visible.sync="modals.newField"
                   :title="`Добавить поле для шага '${activeStep}'`">
            <form>
                <div class="row small-padding">
                    <div class="col-lg-3">
                        <fg-input label="Название поля"
                                  v-model="newField.label"></fg-input>
                    </div>
                    <div class="col-lg-3">
                        <div class="select-group">
                            <label>Элемент формы</label>
                            <el-select size="large"
                                       class="w-100"
                                       placeholder="Выберите из списка"
                                       v-model="newField.model">
                                <el-option v-for="option in modelTypes"
                                           :value="option"
                                           :label="option">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="select-group">
                            <label>Тип элемента</label>
                            <el-select size="large"
                                       class="w-100"
                                       placeholder="Выберите из списка"
                                       v-model="newField.modelType">
                                <el-option v-for="option in fieldTypes"
                                           :value="option"
                                           :label="option">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <fg-input label="Аттрибут [name]"
                                  v-model="newField.modelName"></fg-input>
                    </div>
                    <div class="col-lg-3">
                        <fg-input label="Аттрибут [placeholder]"
                                  v-model="newField.placeholder"></fg-input>
                    </div>
                    <div class="col-lg-3">
                        <fg-input label="Маска для заполнения"
                                  v-model="newField.mask"></fg-input>
                    </div>
                    <div class="col-lg-3">
                        <div class="select-group">
                            <label>Обязательный для заполнения</label>
                            <el-select size="large"
                                       class="w-100"
                                       placeholder="Выберите из списка"
                                       v-model="newField.required">
                                <el-option :value="true" label="Да" />
                                <el-option :value="false" label="Нет" />
                            </el-select>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group submit-field">
                            <l-button type="success" class="w-100">Добавить</l-button>
                        </div>
                    </div>
                </div>
            </form>
        </el-dialog>

        <el-dialog :visible.sync="modals.editField"
                   :title="`Редактировать поле '${activeField}'`">
            <form>
                <div class="row small-padding">
                    <div class="col-lg-3">
                        <fg-input label="Название поля"
                                  v-model="editFieldItem.label"></fg-input>
                    </div>
                    <div class="col-lg-3">
                        <div class="select-group">
                            <label>Элемент формы</label>
                            <el-select size="large"
                                       class="w-100"
                                       placeholder="Выберите из списка"
                                       v-model="editFieldItem.model">
                                <el-option v-for="option in modelTypes"
                                           :value="option"
                                           :label="option">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="select-group">
                            <label>Тип элемента</label>
                            <el-select size="large"
                                       class="w-100"
                                       placeholder="Выберите из списка"
                                       v-model="editFieldItem.modelType">
                                <el-option v-for="option in fieldTypes"
                                           :value="option"
                                           :label="option">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <fg-input label="Аттрибут [name]"
                                  v-model="editFieldItem.modelName"></fg-input>
                    </div>
                    <div class="col-lg-3">
                        <fg-input label="Аттрибут [placeholder]"
                                  v-model="editFieldItem.placeholder"></fg-input>
                    </div>
                    <div class="col-lg-3">
                        <fg-input label="Маска для заполнения"
                                  v-model="editFieldItem.mask"></fg-input>
                    </div>
                    <div class="col-lg-3">
                        <div class="select-group">
                            <label>Обязательный для заполнения</label>
                            <el-select size="large"
                                       class="w-100"
                                       placeholder="Выберите из списка"
                                       v-model="editFieldItem.required">
                                <el-option :value="true" label="Да" />
                                <el-option :value="false" label="Нет" />
                            </el-select>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group submit-field">
                            <l-button type="success" class="w-100">Добавить</l-button>
                        </div>
                    </div>
                </div>
            </form>
        </el-dialog>

    </div>
</template>

<script>
  import {Select, Option, Dialog} from 'element-ui'
  import {Checkbox} from 'src/components/index'

  export default {
    components: {
      [Select.name]: Select,
      [Option.name]: Option,
      [Dialog.name]: Dialog,
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
        steps: [
          {
            name: 'Персональные данные',
            fields: [
              {
                label: 'Имя',
                model: 'input',
                modelType: 'text',
                modelName: 'name',
                placeholder: 'Ваше имя',
                mask: '',
                required: true
              },
              {
                label: 'Фамилия',
                model: 'input',
                modelType: 'text',
                modelName: 'surname',
                placeholder: 'Ваша фамилия',
                mask: '',
                required: true
              },
              {
                label: 'Отчество',
                model: 'input',
                modelType: 'text',
                modelName: 'middlename',
                placeholder: 'Ваше отчество',
                mask: '',
                required: false
              },
              {
                label: 'Телефон',
                model: 'input',
                modelType: 'text',
                modelName: 'phone',
                placeholder: 'Ваш телефон',
                mask: '+ 7 999 999-99-99',
                required: true
              },
              {
                label: 'Email',
                model: 'input',
                modelType: 'email',
                modelName: 'email',
                placeholder: 'Ваш email',
                mask: '',
                required: false
              }
            ],
          },
          {
            name: 'Дополнительные данные',
            fields: [
              {
                label: 'Год рождения',
                model: 'input',
                modelType: 'date',
                modelName: 'birthDay',
                placeholder: 'дд/мм/гггг',
                mask: '',
                required: true
              },
              {
                label: 'Адрес проживания',
                model: 'input',
                modelType: 'text',
                modelName: 'address',
                placeholder: 'Пример: г.Казань, ул.Пушкина, д.7, кв.31',
                mask: '',
                required: true
              },
              {
                label: 'Религия',
                model: 'select',
                modelType: 'text',
                modelName: 'religion',
                placeholder: 'Выберите из списка',
                mask: '',
                required: true,
              },
            ],
          },
          {
            name: 'Предпочтения',
            fields: [
              {
                label: 'Предпочтения',
                model: 'textarea',
                modelType: 'text',
                modelName: 'preferences',
                placeholder: 'Напишите Ваши предпочтения',
                mask: '',
                required: false
              }
            ]
          }
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
        },
        modals: {
          stepModal: false,
          newField: false,
          editField: false
        },
        newStep: {
          name: ''
        },
        activeStep: '',
        newField: {
          label: '',
          model: '',
          modelType: '',
          modelName: '',
          placeholder: '',
          mask: '',
          required: false
        },
        activeField: '',
        editFieldItem: {},
        modelTypes: ['input', 'textarea', 'select', 'checkbox', 'radio'],
        fieldTypes: ['text', 'email', 'date'],
        tableData: [
          {
            "id": 1,
            "name": "Лапенко Игорь Николаевич",
            "phone": "+7 919 919-99-99",
            "status": 1,
            "price": 40000,
            "city": "Москва",
            "birthDay": "25/05/1979",
            "religion": "Христианство",
            "statusName": "Новая"
          },
          {
            "id": 2,
            "name": "Бодрова Наталья Владимировна",
            "phone": "+7 919 919-99-99",
            "status": 2,
            "price": 150000,
            "city": "Казань",
            "birthDay": "15/12/1968",
            "religion": "Иудаизм",
            "statusName": "Анкета заполнена"
          },
          {
            "id": 3,
            "name": "Кулич Евгений Баженович",
            "phone": "+7 919 919-99-99",
            "status": 3,
            "price": 50000,
            "city": "Москва",
            "birthDay": "01/10/1982",
            "religion": "Христианство",
            "statusName": "Анкета подтверждена"
          },
          {
            "id": 4,
            "name": "Салахова Кристина Андреевна",
            "phone": "+7 919 919-99-99",
            "status": 4,
            "price": 110000,
            "city": "Санкт-Петербург",
            "birthDay": "5/05/1961",
            "religion": "Ислам",
            "statusName": "Оформлено"
          },
          {
            "id": 5,
            "name": "Попов Дмитрий Александрович",
            "phone": "+7 919 919-99-99",
            "status": 5,
            "price": 40000,
            "city": "Казань",
            "birthDay": "01/02/1959",
            "religion": "Буддизм",
            "statusName": "Отказано"
          },
          {
            "id": 6,
            "name": "Навальный Алексей Беларусович",
            "phone": "+7 919 919-99-99",
            "status": 1,
            "price": 250000,
            "city": "Казань",
            "birthDay": "21/04/1971",
            "religion": "Индуизм",
            "statusName": "Новая"
          },
          {
            "id": 7,
            "name": "Андреев Андрей Александрович",
            "phone": "+7 919 919-99-99",
            "status": 2,
            "price": 180000,
            "city": "Москва",
            "birthDay": "01/02/1940",
            "religion": "Ислам",
            "statusName": "Анкета заполнена"
          },
          {
            "id": 8,
            "name": "Карманов Семен Михайлович",
            "phone": "+7 919 919-99-99",
            "status": 3,
            "price": 250000,
            "city": "Санкт-Петербург",
            "birthDay": "15/05/1976",
            "religion": "Индуизм",
            "statusName": "Анкета подтверждена"
          },
          {
            "id": 9,
            "name": "Лапенко Игорь Николаевич",
            "phone": "+7 919 919-99-99",
            "status": 1,
            "price": 40000,
            "city": "Москва",
            "birthDay": "25/05/1979",
            "religion": "Христианство",
            "statusName": "Новая"
          },
          {
            "id": 10,
            "name": "Бодрова Наталья Владимировна",
            "phone": "+7 919 919-99-99",
            "status": 2,
            "price": 150000,
            "city": "Казань",
            "birthDay": "15/12/1968",
            "religion": "Иудаизм",
            "statusName": "Анкета заполнена"
          },
          {
            "id": 11,
            "name": "Кулич Евгений Баженович",
            "phone": "+7 919 919-99-99",
            "status": 3,
            "price": 50000,
            "city": "Москва",
            "birthDay": "01/10/1982",
            "religion": "Христианство",
            "statusName": "Анкета подтверждена"
          },
          {
            "id": 12,
            "name": "Салахова Кристина Андреевна",
            "phone": "+7 919 919-99-99",
            "status": 4,
            "price": 110000,
            "city": "Санкт-Петербург",
            "birthDay": "5/05/1961",
            "religion": "Ислам",
            "statusName": "Оформлено"
          },
          {
            "id": 13,
            "name": "Попов Дмитрий Александрович",
            "phone": "+7 919 919-99-99",
            "status": 5,
            "price": 80000,
            "city": "Казань",
            "birthDay": "01/02/1959",
            "religion": "Буддизм",
            "statusName": "Отказано"
          },
          {
            "id": 14,
            "name": "Навальный Алексей Беларусович",
            "phone": "+7 919 919-99-99",
            "status": 1,
            "price": 250000,
            "city": "Казань",
            "birthDay": "21/04/1971",
            "religion": "Индуизм",
            "statusName": "Новая"
          },
          {
            "id": 15,
            "name": "Андреев Андрей Александрович",
            "phone": "+7 919 919-99-99",
            "status": 2,
            "price": 180000,
            "city": "Москва",
            "birthDay": "01/02/1940",
            "religion": "Ислам",
            "statusName": "Анкета заполнена"
          },
          {
            "id": 16,
            "name": "Карманов Семен Михайлович",
            "phone": "+7 919 919-99-99",
            "status": 3,
            "price": 40000,
            "city": "Санкт-Петербург",
            "birthDay": "15/05/1976",
            "religion": "Индуизм",
            "statusName": "Анкета подтверждена"
          },
          {
            "id": 17,
            "name": "Лапенко Игорь Николаевич",
            "phone": "+7 919 919-99-99",
            "status": 1,
            "price": 100000,
            "city": "Москва",
            "birthDay": "25/05/1979",
            "religion": "Христианство",
            "statusName": "Новая"
          },
          {
            "id": 18,
            "name": "Бодрова Наталья Владимировна",
            "phone": "+7 919 919-99-99",
            "status": 2,
            "price": 150000,
            "city": "Казань",
            "birthDay": "15/12/1968",
            "religion": "Иудаизм",
            "statusName": "Анкета заполнена"
          },
          {
            "id": 19,
            "name": "Кулич Евгений Баженович",
            "phone": "+7 919 919-99-99",
            "status": 3,
            "price": 50000,
            "city": "Москва",
            "birthDay": "01/10/1982",
            "religion": "Христианство",
            "statusName": "Анкета подтверждена"
          },
          {
            "id": 20,
            "name": "Салахова Кристина Андреевна",
            "phone": "+7 919 919-99-99",
            "status": 4,
            "price": 110000,
            "city": "Санкт-Петербург",
            "birthDay": "5/05/1961",
            "religion": "Ислам",
            "statusName": "Оформлено"
          },
          {
            "id": 21,
            "name": "Попов Дмитрий Александрович",
            "phone": "+7 919 919-99-99",
            "status": 5,
            "price": 40000,
            "city": "Казань",
            "birthDay": "01/02/1959",
            "religion": "Буддизм",
            "statusName": "Отказано"
          },
          {
            "id": 22,
            "name": "Навальный Алексей Беларусович",
            "phone": "+7 919 919-99-99",
            "status": 1,
            "price": 250000,
            "city": "Казань",
            "birthDay": "21/04/1971",
            "religion": "Индуизм",
            "statusName": "Новая"
          },
          {
            "id": 23,
            "name": "Андреев Андрей Александрович",
            "phone": "+7 919 919-99-99",
            "status": 2,
            "price": 180000,
            "city": "Москва",
            "birthDay": "01/02/1940",
            "religion": "Ислам",
            "statusName": "Анкета заполнена"
          },
          {
            "id": 24,
            "name": "Карманов Семен Михайлович",
            "phone": "+7 919 919-99-99",
            "status": 3,
            "price": 250000,
            "city": "Санкт-Петербург",
            "birthDay": "15/05/1976",
            "religion": "Индуизм",
            "statusName": "Анкета подтверждена"
          },
          {
            "id": 25,
            "name": "Лапенко Игорь Николаевич",
            "phone": "+7 919 919-99-99",
            "status": 1,
            "price": 100000,
            "city": "Москва",
            "birthDay": "25/05/1979",
            "religion": "Христианство",
            "statusName": "Новая"
          },
          {
            "id": 26,
            "name": "Бодрова Наталья Владимировна",
            "phone": "+7 919 919-99-99",
            "status": 2,
            "price": 150000,
            "city": "Казань",
            "birthDay": "15/12/1968",
            "religion": "Иудаизм",
            "statusName": "Анкета заполнена"
          },
          {
            "id": 27,
            "name": "Кулич Евгений Баженович",
            "phone": "+7 919 919-99-99",
            "status": 3,
            "price": 50000,
            "city": "Москва",
            "birthDay": "01/10/1982",
            "religion": "Христианство",
            "statusName": "Анкета подтверждена"
          },
          {
            "id": 28,
            "name": "Салахова Кристина Андреевна",
            "phone": "+7 919 919-99-99",
            "status": 4,
            "price": 110000,
            "city": "Санкт-Петербург",
            "birthDay": "5/05/1961",
            "religion": "Ислам",
            "statusName": "Оформлено"
          },
          {
            "id": 29,
            "name": "Попов Дмитрий Александрович",
            "phone": "+7 919 919-99-99",
            "status": 5,
            "price": 80000,
            "city": "Казань",
            "birthDay": "01/02/1959",
            "religion": "Буддизм",
            "statusName": "Отказано"
          }
        ],
        chartistData: {
          labels: [],
          series: [[]]
        },
      }
    },
    methods: {
      addStepModal() {
        this.modals.stepModal = true
      },
      addNewField(stepName) {
        this.activeStep = stepName
        this.modals.newField = true
      },
      editField(field) {
        this.activeField = field.label
        this.modals.editField = true
        this.editFieldItem = field
      },
      deleteField(field, stepName) {
        let deleteConfirm = confirm(`Вы действительно хотите удалить поле ${field.label} из шага '${stepName}'`)
      },
      initChart () {
        const optionsViews = {
          seriesBarDistance: 10,
          classNames: {
            bar: 'ct-bar'
          },
          axisX: {
            showGrid: false
          },
          height: '250px'
        }
        const responsiveOptionsViews = [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc (value) {
                return value[0]
              }
            }
          }]
        ]
        this.$Chartist.Bar('#chartViews', this.chartistData, optionsViews, responsiveOptionsViews)
      }
    },
    async mounted() {
      let chartist = await import('chartist')
      this.$Chartist = chartist.default ? chartist.default : chartist;
      let dataPromise = new Promise(resolve => {
        this.tableData.forEach((item, index) => {
          this.chartistData.labels.push(index)
          this.chartistData.series[0].push(item.price)
          if ( this.tableData.length == index + 1 ) {
            resolve()
          }
        })
      })
      dataPromise.then(this.initChart)
    }
  }
</script>

<style>
    .submit-field {
        margin: 28px 0 0;
    }
    .submit-field .btn {
        height: 40px;
        margin: 0;
    }
</style>
