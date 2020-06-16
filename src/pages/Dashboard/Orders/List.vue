<template>
    <div class="orders">

        <div class="h2">Заявки</div>

        <card class="filter-card">
            <div class="filter-row">
                <div class="row small-padding">
                    <div class="col-lg-4">
                        <div class="select-group">
                            <label>Город</label>
                            <el-select size="large"
                                       class="w-100"
                                       placeholder="Выберите из списка"
                                       v-model="citySearch">
                                <el-option v-for="citiesItem in cities"
                                           :value="citiesItem.id"
                                           :label="citiesItem.name">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="select-group">
                            <label>Статус</label>
                            <el-select size="large"
                                       class="w-100"
                                       placeholder="Выберите из списка"
                                       v-model="statusSearch">
                                <el-option v-for="statusesItem in statuses"
                                           :value="statusesItem.id"
                                           :label="statusesItem.name">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="select-group">
                            <label>Цена</label>
                            <el-select size="large"
                                       class="w-100"
                                       placeholder="Выберите из списка"
                                       v-model="pricesSearch">
                                <el-option v-for="pricesItem in prices"
                                           :value="pricesItem.id"
                                           :label="convertPrice(pricesItem)">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="view-types">
                    <div :class="[{'active': viewTypeList1}, 'view-types-item view-list']"
                         @click="changeViewType(1)">
                        <span></span>
                    </div>
                    <div :class="[{'active': viewTypeList2}, 'view-types-item view-grid']"
                         @click="changeViewType(2)">
                        <span></span>
                    </div>
                </div>
            </div>
        </card>

        <card v-show="viewTypeList1"
              title="Список заявок">
            <div class="row">
                <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
                    <el-select
                            class="select-default mb-3"
                            style="width: 200px"
                            v-model="pagination.perPage"
                            placeholder="Per page">
                        <el-option
                                class="select-default"
                                v-for="item in pagination.perPageOptions"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                    <form class="search-form" @submit.prevent>
                        <fg-input type="text"
                                  v-model="searchQuery"
                                  placeholder="Поиск по ключевым словам..."/>
                        <button class="search-button btn"><i class="nc-icon nc-zoom-split"></i></button>
                    </form>
                </div>
                <div class="col-sm-12">
                    <div class="table-overflow-visible table-scroll">
                        <el-table :stripe="true"
                                  style="width: 100%;"
                                  :data="queriedData"
                                  empty-text="Заявок нет"
                                  border>
                            <el-table-column v-for="column in tableColumns"
                                             :min-width="column.minWidth"
                                             :prop="column.prop"
                                             :label="column.label"
                                             :sortable="column.sortable">
                                <template slot-scope="props">
                                    <div v-if="column.prop == 'statusName'"
                                         :class="statusColor(props.row['status'])">
                                        {{props.row[column.prop]}}
                                    </div>
                                    <div v-else>{{props.row[column.prop]}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column v-if="tableData.length > 0"
                                             width="70">
                                <template slot="header" slot-scope="scope">
                                    <div class="add-column">
                                        <drop-down position="right">
                                            <i slot="title" class="nc-icon nc-simple-add"></i>
                                            <template v-for="additionalFiltersItem in additionalFilters">
                                                <a href="#"
                                                   :class="[{'dropdown-active': additionalFiltersItem.added}, 'dropdown-item']"
                                                   @click.prevent="addAdditionalFilters(additionalFiltersItem)">{{additionalFiltersItem.label}}</a>
                                            </template>
                                        </drop-down>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div slot="footer" class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
                <div class="">
                    <p class="card-category">Показаны с {{from + 1}} по {{to}} из {{total}} заявок</p>
                </div>
                <l-pagination class="pagination-no-border"
                              v-model="pagination.currentPage"
                              :per-page="pagination.perPage"
                              :total="pagination.total">
                </l-pagination>
            </div>
        </card>

        <card v-show="viewTypeList2"
              title="Список заявок">

            <div class="orders-drag-row">
                <div v-for="draggableListItem in draggableList"
                     class="orders-drag-col">
                    <div class="h5">{{draggableListItem.statusName}}</div>
                    <draggable class="list-group"
                               :list="draggableListItem.list"
                               group="people"
                               @change="dragChanged">
                        <div class="list-group-item"
                             v-for="element in draggableListItem.list">
                            <div class="drag-card">
                                <div class="h6">{{element.name}}</div>
                                <div class="drag-card-info"><i class="fa fa-phone"></i> {{element.phone}}</div>
                                <div class="drag-card-info"><i class="fa fa-map-marker"></i> {{element.city}}</div>
                                <div class="drag-card-info"><i class="fa fa-money"></i> {{element.price}} руб.</div>
                            </div>
                        </div>
                    </draggable>
                </div>
            </div>

        </card>

    </div>
</template>

<script>

  import {Table, TableColumn, Select, Option} from 'element-ui'
  import {Pagination as LPagination} from 'src/components/index'
  import Fuse from 'fuse.js'
  import draggable from 'vuedraggable'

  export default {
    components: {
      LPagination,
      [Select.name]: Select,
      [Option.name]: Option,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      draggable
    },
    data() {
      return {
        viewTypeList1: true,
        viewTypeList2: false,
        citySearch: 0,
        statusSearch: 0,
        pricesSearch: 0,
        cities: [
          {id: 0, name: 'Все', searchText: ''},
          {id: 1, name: 'Москва', searchText: 'Москва'},
          {id: 2, name: 'Санкт-Петербург', searchText: 'Санкт-Петербург'},
          {id: 3, name: 'Казань', searchText: 'Казань'},
        ],
        statuses: [
          {id: 0, name: 'Все', searchText: ''},
          {id: 1, name: 'Новая', searchText: 'Новая'},
          {id: 2, name: 'Анкета заполнена', searchText: 'Анкета заполнена'},
          {id: 3, name: 'Анкета подтверждена', searchText: 'Анкета подтверждена'},
          {id: 4, name: 'Оформлено', searchText: 'Оформлено'},
          {id: 5, name: 'Отказано', searchText: 'Отказано'},
        ],
        prices: [
          {id: 0, from: 0, to: Infinity},
          {id: 1, from: 0, to: 50000},
          {id: 2, from: 50000, to: 150000},
          {id: 3, from: 150000, to: Infinity},
        ],
        pagination: {
          perPage: 10,
          currentPage: 1,
          perPageOptions: [10, 25, 50],
          total: 0
        },
        propsToSearch: ['name', 'email', 'age'],
        tableColumns: [
          {
            prop: 'name',
            label: 'ФИО',
            sortable: true,
            minWidth: 150
          },
          {
            prop: 'phone',
            label: 'Телефон',
            sortable: true,
            minWidth: 100
          },
          {
            prop: 'statusName',
            label: 'Статус',
            sortable: true,
            minWidth: 120
          },
          {
            prop: 'price',
            label: 'Цена',
            minWidth: 120,
            sortable: true,
          }
        ],
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
          },
          {
            "id": 30,
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
            "id": 31,
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
            "id": 32,
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
            "id": 33,
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
            "id": 34,
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
            "id": 35,
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
            "id": 36,
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
            "id": 37,
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
            "id": 38,
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
            "id": 39,
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
            "id": 40,
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
            "id": 41,
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
            "id": 42,
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
            "id": 43,
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
            "id": 44,
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
            "id": 45,
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
            "id": 46,
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
            "id": 47,
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
            "id": 48,
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
            "id": 49,
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
            "id": 50,
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
            "id": 51,
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
            "id": 52,
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
            "id": 53,
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
            "id": 54,
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
            "id": 55,
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
            "id": 56,
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
            "id": 57,
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
            "id": 58,
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
            "id": 59,
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
            "id": 60,
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
            "id": 61,
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
            "id": 62,
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
            "id": 63,
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
            "id": 64,
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
            "id": 65,
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
            "id": 66,
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
            "id": 67,
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
            "id": 68,
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
            "id": 69,
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
            "id": 70,
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
            "id": 71,
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
            "id": 72,
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
            "id": 73,
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
            "id": 74,
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
            "id": 75,
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
            "id": 76,
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
            "id": 77,
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
            "id": 78,
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
            "id": 79,
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
            "id": 80,
            "name": "Карманов Семен Михайлович",
            "phone": "+7 919 919-99-99",
            "status": 3,
            "price": 250000,
            "city": "Санкт-Петербург",
            "birthDay": "15/05/1976",
            "religion": "Индуизм",
            "statusName": "Анкета подтверждена"
          }
        ],
        fuseSearch: null,
        searchQuery: '',
        additionalFilters: [
          {name: 'city', label: 'Город', added: false},
          {name: 'birthDay', label: 'Дата рождения', added: false},
          {name: 'religion', label: 'Религия', added: false}
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
      }
    },
    computed: {
      pagedData() {
        return this.tableData.slice(this.from, this.to)
      },
      queriedData() {
        let result = this.tableData
        if (this.searchQuery !== '') {
          result = this.fuseSearch.search(this.searchQuery)
        }
        if (this.citySearch !== 0) {
          this.cities.forEach(city => {
            if (city.id == this.citySearch) {
              result = result.filter(item => {
                return item.city == city.name
              })
            }
          })
        }
        if (this.statusSearch !== 0) {
          result = result.filter(item => {
            return item.status == this.statusSearch
          })
        }
        if (this.prices !== 0) {
          result = result.filter(item => {
            return (item.price >= this.prices[this.pricesSearch].from && item.price < this.prices[this.pricesSearch].to)
          })
        }
        this.pagination.total = result.length
        return result.slice(this.from, this.to)
      },
      to() {
        let highBound = this.from + this.pagination.perPage
        if (this.total < highBound) {
          highBound = this.total
        }
        return highBound
      },
      from() {
        return this.pagination.perPage * (this.pagination.currentPage - 1)
      },
      total() {
        this.pagination.total = this.tableData.length
        return this.tableData.length
      },
      draggableList() {
        let draggableArray = []
        this.statuses.forEach(status => {
          if (status.id != 0) {
            let statusArray = []
            this.queriedData.forEach(tableItem => {
              if (tableItem.status == status.id) {
                statusArray.push(tableItem)
              }
            })
            draggableArray.push({
              statusId: status.id,
              statusName: status.name,
              list: statusArray
            })
          }
        })
        return draggableArray
      },
    },
    methods: {
      convertPrice(item) {
        if (item.from == 0 && item.to == Infinity) {
          return 'Все'
        }
        else if (item.to != Infinity) {
          return `От ${item.from}р. до ${item.to}р.`
        }
        else if (item.from != 0 && item.to == Infinity) {
          return `От ${item.from}`
        }
      },
      statusColor(item) {
        switch (item) {
          case 1:
            return 'text-info'
          case 2:
            return 'text-primary'
          case 3:
            return 'text-warning'
          case 4:
            return 'text-success'
          case 5:
            return 'text-danger'
        }
      },
      changeViewType(type) {
        if (type == 1) {
          if (this.viewTypeList1 == false) {
            this.viewTypeList1 = true
            this.viewTypeList2 = false
            this.pagination.perPage = this.pagination.perPageOptions[0]
          }
        }
        else if (type == 2) {
          if (this.viewTypeList2 == false) {
            this.viewTypeList2 = true
            this.viewTypeList1 = false
            this.pagination.perPage = this.tableData.length
          }
        }
      },
      addAdditionalFilters(item) {
        let canAdd = true
        this.tableColumns.forEach(tableItem => {
          tableItem.prop == item.name ? canAdd = false : false
        })
        if (canAdd == true) {
          item.added = true
          let sortable = () => {
            if (item.name == 'religion' || item.name == 'city') {
              return true
            }
            else {
              return false
            }
          }
          this.tableColumns.push({
            prop: item.name,
            label: item.label,
            sortable: sortable()
          })
        }
        else {
          item.added = false
          this.tableColumns.forEach((tableItem, tableItemIndex) => {
            tableItem.prop == item.name ? this.tableColumns.splice(tableItemIndex, 1) : false
          })
        }
      },
      dragChanged(e) {
        if (e.added != undefined) {
          let personElement = e.added.element
          this.draggableList.forEach(dragItem => {
            dragItem.list.forEach(listItem => {
              if (personElement.id == listItem.id) {
                this.statuses.forEach(statusItem => {
                  if (statusItem.id == dragItem.statusId) {
                    personElement.status = dragItem.statusId
                    personElement.statusName = dragItem.statusName
                  }
                })
                return false
              }
            })
          })
        }
      }
    },
    mounted() {
      this.fuseSearch = new Fuse(
        this.tableData,
        {
          keys: ['name', 'statusName', 'city', 'religion', 'price'],
          threshold: 0.2
        }
      )
      this.tableData.forEach(item => {
        item.price.toString()
        this.statuses.forEach(status => {
          if (status.id == item.status) {
            item.statusName = status.name
          }
        })
        this.religions.forEach(religion => {
          if (religion.id == item.religion) {
            item.religion = religion.name
          }
        })
      })
    }
  }

</script>

<style>
    .flip-list-move {
        transition: transform 0.5s;
    }
</style>