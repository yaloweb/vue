<template>
    <div>

        <div class="d-flex mb-3 mt-4 align-items-center justify-content-between">
            <div class="h2 m-0">Менеджеры</div>
            <l-button class="m-0"
                      type="primary"
                      @click="showAddDialog">Добавить
            </l-button>
        </div>

        <card>
            <div class="d-flex justify-content-center justify-content-sm-between flex-wrap">
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
                              placeholder="Поиск..."/>
                    <button class="search-button btn"><i class="nc-icon nc-zoom-split"></i></button>
                </form>
            </div>
            <el-table :stripe="true"
                      style="width: 100%;"
                      :data="queriedData"
                      empty-text="Нет пользователей"
                      border>
                <el-table-column v-for="column in tableColumns"
                                 :min-width="column.minWidth"
                                 :prop="column.prop"
                                 :label="column.label"
                                 :sortable="column.sortable"
                                 class-name="user-link-td">
                    <div class="user-link"
                         slot-scope="props"
                         @click="goToUserPage(props.row.id)">
                        {{props.row[column.prop]}}
                    </div>
                </el-table-column>
                <el-table-column width="80">
                    <template slot-scope="props">
                        <div class="d-flex justify-content-center">
                            <el-tooltip class="item" effect="dark" content="Редактировать" placement="top">
                                <a href="#"
                                   class="delete-user-btn text-success mr-2"
                                   @click.prevent="openChangeModal(props.row)">
                                    <i class="fa fa-pencil"></i>
                                </a>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="Удалить" placement="top">
                                <a href="#"
                                   class="delete-user-btn text-danger"
                                   @click.prevent="deleteUser(props.row)">
                                    <i class="fa fa-close"></i>
                                </a>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
                <div class="">
                    <p class="card-category">Показаны с {{from + 1}} по {{to}} из {{total}} пользователей</p>
                </div>
                <l-pagination class="pagination-no-border"
                              v-model="pagination.currentPage"
                              :per-page="pagination.perPage"
                              :total="pagination.total">
                </l-pagination>
            </div>
        </card>

        <el-dialog :visible.sync="changeModals"
                   title="Изменить данные пользователя">
            <div class="row small-padding">
                <div class="col-lg-4">
                    <fg-input label="ФИО"
                              v-model="changeUser.name"></fg-input>
                </div>
                <div class="col-lg-4">
                    <fg-input label="Почта"
                              v-model="changeUser.email"></fg-input>
                </div>
                <div class="col-lg-4">
                    <fg-input label="Пароль"
                              v-model="changeUser.password"></fg-input>
                </div>
                <div class="col-lg-4">
                    <div class="select-group">
                        <label>Регион</label>
                        <el-select size="large"
                                   class="w-100"
                                   placeholder="Выберите из списка"
                                   v-model="changeUser.region">
                            <el-option v-for="region in regions"
                                       :value="region.id"
                                       :label="region.name">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="mt-2 text-right">
                <l-button type="success">Изменить</l-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="addDialog"
                   title="Добавить менеджера">
            <form @submit.prevent="addNewManager">
                <div class="row small-padding">
                    <div class="col-lg-3">
                        <fg-input label="ФИО"
                                  v-model="newManager.name"
                                  placeholder="Напишите полное имя"/>
                    </div>
                    <div class="col-lg-3">
                        <div class="select-group">
                            <label>Регион</label>
                            <el-select class="w-100"
                                       v-model="newManager.region"
                                       placeholder="Выберите регион">
                                <el-option class="select-default"
                                           v-for="region in regions"
                                           :label="region.name"
                                           :value="region.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <fg-input type="email"
                                  label="Почта"
                                  v-model="newManager.email"
                                  placeholder="Напишите почту"/>
                    </div>
                    <div class="col-lg-3">
                        <fg-input label="Пароль"
                                  v-model="newManager.password"
                                  placeholder="Придумайте пароль"/>
                    </div>
                </div>
                <div class="text-right">
                    <l-button type="success">Добавить</l-button>
                </div>
            </form>
        </el-dialog>

    </div>
</template>

<script>
  import {Table, TableColumn, Select, Option, Tooltip, Dialog} from 'element-ui'
  import Fuse from 'fuse.js'
  import {Pagination as LPagination} from 'src/components/index'

  export default {
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Select.name]: Select,
      [Option.name]: Option,
      [Tooltip.name]: Tooltip,
      [Dialog.name]: Dialog,
      LPagination,
    },
    data() {
      return {
        users: [
          {
            id: 1,
            name: 'Петров Валерий Иванович',
            email: 'petron@mail.ru',
            region: 1,
            password: '1q2w3e4r5t'
          },
          {
            id: 2,
            name: 'Жмышенко Иван Алексеевич',
            email: 'jimhan@mail.ru',
            region: 2,
            password: 'asdfgh'
          },
          {
            id: 3,
            name: 'Курдюков Сулейман Ихтихнахович',
            email: 'suleiman@mail.ru',
            region: 3,
            password: 'poiuytrewq'
          },
        ],
        tableColumns: [
          {
            prop: 'name',
            label: 'ФИО',
            sortable: true,
            minWidth: 150
          },
          {
            prop: 'regionName',
            label: 'Регион',
            sortable: true,
            minWidth: 150
          },
          {
            prop: 'email',
            label: 'Почта (Логин)',
            sortable: true,
            minWidth: 150
          },
          {
            prop: 'password',
            label: 'Пароль',
            sortable: true,
            minWidth: 150
          },
        ],
        pagination: {
          perPage: 10,
          currentPage: 1,
          perPageOptions: [10, 25, 50],
          total: 0
        },
        propsToSearch: ['name', 'regionName', 'email'],
        fuseSearch: null,
        searchQuery: '',
        changeUser: {},
        changeModals: false,
        addDialog: false,
        regions: [
          {id: 1, name: 'Москва'},
          {id: 2, name: 'Санкт-Петербург'},
          {id: 3, name: 'Казань'},
        ],
        newManager: {
          name: '',
          region: '',
          email: '',
          password: ''
        }
      }
    },
    computed: {
      queriedData() {
        let result = this.users
        if (this.searchQuery !== '') {
          result = this.fuseSearch.search(this.searchQuery)
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
        this.pagination.total = this.users.length
        return this.users.length
      },
    },
    methods: {
      openChangeModal(user) {
        this.changeModals = true
        this.changeUser = user
      },
      deleteUser(user) {
        let alert = confirm(`Вы действительно хотите удалить пользователя ${user.name}`)
      },
      goToUserPage(id) {
        this.$router.push('/pages/user')
      },
      showAddDialog() {
        this.addDialog = true
      },
      addNewManager() {

      }
    },
    mounted() {
      let userPromise = new Promise((resolve, reject) => {
        this.users.forEach((user, index) => {
          user.canChange = false
          let regionName = this.regions.filter(region => region.id === user.region)
          user.regionName = regionName[0].name
          index == this.users.length - 1 ? resolve() : null
        })
      })
      userPromise.then(() => {
        this.fuseSearch = new Fuse(
          this.users,
          {
            keys: ['name', 'email', 'regionName'],
            threshold: 0.2
          }
        )
      })
    }
  }
</script>