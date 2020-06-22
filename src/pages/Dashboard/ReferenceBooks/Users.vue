<template>
    <div>

        <div class="h2">Пользователи</div>

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
            </div>
            <div class="mt-2 text-right">
                <l-button type="success">Изменить</l-button>
            </div>
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
            password: '1q2w3e4r5t'
          },
          {
            id: 2,
            name: 'Жмышенко Иван Алексеевич',
            email: 'jimhan@mail.ru',
            password: 'asdfgh'
          },
          {
            id: 3,
            name: 'Курдюков Сулейман Ихтихнахович',
            email: 'suleiman@mail.ru',
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
        propsToSearch: ['name', 'email'],
        fuseSearch: null,
        searchQuery: '',
        changeUser: {},
        changeModals: false,
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
    },
    mounted() {
      let userPromise = new Promise((resolve, reject) => {
        this.users.forEach((user, index) => {
          user.canChange = false
          index == this.users.length - 1 ? resolve() : null
        })
      })
      userPromise.then(() => {
        this.fuseSearch = new Fuse(
          this.users,
          {
            keys: ['name', 'email'],
            threshold: 0.2
          }
        )
      })
    }
  }
</script>