<template>
    <div>

        <div class="d-flex mb-3 mt-4 align-items-center justify-content-between">
            <div class="h2 m-0">Регионы</div>
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
                      empty-text="Нет регионов"
                      border>
                <el-table-column v-for="column in tableColumns"
                                 :min-width="column.minWidth"
                                 :prop="column.prop"
                                 :label="column.label"
                                 :sortable="column.sortable"/>
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
                    <p class="card-category">Показаны с {{from + 1}} по {{to}} из {{total}} регионов</p>
                </div>
                <l-pagination class="pagination-no-border"
                              v-model="pagination.currentPage"
                              :per-page="pagination.perPage"
                              :total="pagination.total">
                </l-pagination>
            </div>
        </card>

        <el-dialog :visible.sync="changeModals"
                   title="Изменить данные региона">
            <div class="group-row">
                <fg-input label="Название"
                          v-model="changeRegion.name"/>
                <l-button type="success">Изменить</l-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="addDialog"
                   title="Добавить регион">
            <form @submit.prevent="addNewRegion">
                <div class="group-row">
                    <fg-input label="Название"
                              v-model="newRegion.name"/>
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
        regions: [
          {id: 1, name: 'Москва'},
          {id: 2, name: 'Санкт-Петербург'},
          {id: 3, name: 'Казань'},
        ],
        tableColumns: [
          {
            prop: 'name',
            label: 'Название',
            sortable: true,
            minWidth: 150
          }
        ],
        pagination: {
          perPage: 50,
          currentPage: 1,
          perPageOptions: [50, 75, 100],
          total: 0
        },
        propsToSearch: ['name'],
        fuseSearch: null,
        searchQuery: '',
        changeModals: false,
        addDialog: false,
        changeRegion: '',
        newRegion: {
          name: ''
        },
      }
    },
    computed: {
      queriedData() {
        let result = this.regions
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
        this.pagination.total = this.regions.length
        return this.regions.length
      },
    },
    methods: {
      openChangeModal(row) {
        this.changeModals = true
        this.changeRegion = row
      },
      deleteUser(row) {
        let confirmResult = confirm(`Вы действительно хотите удалить регион ${row.name}`)
      },
      showAddDialog() {
        this.addDialog = true
      },
      addNewRegion() {
        this.regions.push({
          id: this.regions.length++,
          name: this.newRegion.name
        })
        this.addDialog = false
        this.newRegion.name = ''
      }
    },
    mounted() {
      this.fuseSearch = new Fuse(
        this.regions,
        {
          keys: ['name', 'email'],
          threshold: 0.2
        }
      )
    }
  }
</script>