<template>
    <div>

        <div class="d-flex mt-4 mb-3 align-items-center justify-content-between">
            <div class="h2 m-0">Сертификаты</div>
            <l-button class="m-0"
                      type="primary"
                      @click="showAddDialog">Добавить
            </l-button>
        </div>
        <card v-for="sertificate in sertificates">
            <div class="d-flex">
                <div class="sertificate-images">
                    <img :src="sertificate.imgUrl" alt="">
                </div>
                <div class="sertificate-content">
                    <div class="h4">{{sertificate.name}}</div>
                    <p>{{sertificate.description}}</p>
                    <p>Цена: <strong>{{sertificate.price}} руб.</strong></p>
                </div>
                <div class="sertificate-additional">
                    <ol class="custom-ol">
                        <li v-for="listItem in sertificate.serviceList">{{listItem}}</li>
                    </ol>
                </div>
            </div>
            <div class="sertificate-change">
                <l-button type="info"
                          @click="changeSertDialog(sertificate)">Изменить</l-button>
            </div>
        </card>

        <el-dialog :visible.sync="modals.addNewSertificate"
                   title="Добавление сертификата">
            <div class="add-sert">
                <div class="upload-group">
                    <label>Изображение сертификата</label>
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/"
                               class="one-image-upload"
                               :show-file-list="false"
                               :on-preview="handlePictureCardPreview"
                               :on-success="handleAvatarSuccess">
                        <img v-if="newSertificate.imgUrl" :src="newSertificate.imgUrl">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </div>
                <div class="text-group">
                    <div class="d-flex">
                        <fg-input class="flex-grow-1 mr-2"
                                  label="Название"
                                  name="name"
                                  v-model="newSertificate.name"
                                  placeholder="Название сертификата"></fg-input>
                        <fg-input label="Цена (Руб)">
                            <el-input-number v-model="newSertificate.price"></el-input-number>
                        </fg-input>
                    </div>
                    <fg-input label="Описание">
                        <el-input name="description"
                                  v-model="newSertificate.description"
                                  type="textarea"
                                  :rows="6"
                                  placeholder="Описание сертификата">
                        </el-input>
                    </fg-input>
                    <fg-input label="Список услуг (Через Enter)">
                        <el-input name="serv-list"
                                  v-model="newSertificate.serviceList"
                                  type="textarea"
                                  autosize
                                  placeholder="Список услуг (Через Enter)">
                        </el-input>
                    </fg-input>
                </div>
            </div>
            <div class="add-sert-submit mt-3 text-right">
                <l-button type="success">Добавить сертификат</l-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="modals.changeSertificate"
                   title="Изменить данные сертификата">
            <div class="add-sert">
                <div class="upload-group">
                    <label>Изображение сертификата</label>
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/"
                               class="one-image-upload"
                               :show-file-list="false"
                               :on-preview="handlePictureCardPreview"
                               :on-success="handleAvatarSuccess">
                        <img v-if="changeSertificateItem.imgUrl" :src="changeSertificateItem.imgUrl">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </div>
                <div class="text-group">
                    <div class="d-flex">
                        <fg-input class="flex-grow-1 mr-2"
                                  label="Название"
                                  name="name"
                                  v-model="changeSertificateItem.name"
                                  placeholder="Название сертификата"></fg-input>
                        <fg-input label="Цена (Руб)">
                            <el-input-number v-model="changeSertificateItem.price"></el-input-number>
                        </fg-input>
                    </div>
                    <fg-input label="Описание">
                        <el-input name="description"
                                  v-model="changeSertificateItem.description"
                                  type="textarea"
                                  :rows="6"
                                  placeholder="Описание сертификата">
                        </el-input>
                    </fg-input>
                    <fg-input label="Список услуг (Через Enter)">
                        <el-input name="serv-list"
                                  v-model="changeSertificateItem.serviceList"
                                  type="textarea"
                                  autosize
                                  placeholder="Список услуг (Через Enter)">
                        </el-input>
                    </fg-input>
                </div>
            </div>
            <div class="add-sert-submit mt-3 text-right">
                <l-button type="success">Изменить сертификат</l-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
  import {Dialog, Upload} from 'element-ui'

  export default {
    components: {
      [Dialog.name]: Dialog,
      [Upload.name]: Upload,
    },
    data() {
      return {
        sertificates: [
          {
            name: 'Сертификат на оказание ритуальных услуг',
            price: 50000,
            imgUrl: 'static/img/service.jpg',
            description: 'Идейные соображения высшего порядка, а также рамки и место обучения кадров позволяет оценить значение позиций, занимаемых участниками в отношении поставленных задач. Задача организации, в особенности же реализация намеченных плановых заданий способствует подготовки и реализации соответствующий условий активизации. Равным образом постоянное информационно-пропагандистское обеспечение нашей деятельности играет важную роль в формировании соответствующий условий активизации.',
            serviceList: [
              'Место захоронения (Без выбора кладбища)',
              'Место захоронения (Без выбора кладбища)',
              'Место захоронения (Без выбора кладбища)',
              'Место захоронения (Без выбора кладбища)',
              'Место захоронения (Без выбора кладбища)',
              'Место захоронения (Без выбора кладбища)',
              'Место захоронения (Без выбора кладбища)',
              'Место захоронения (Без выбора кладбища)',
              'Место захоронения (Без выбора кладбища)',
              'Место захоронения (Без выбора кладбища)'
            ]
          },
          {
            name: 'Сертификат на оказание ритуальных услуг',
            price: 150000,
            imgUrl: 'static/img/service-2.jpg',
            description: 'Идейные соображения высшего порядка, а также рамки и место обучения кадров позволяет оценить значение позиций, занимаемых участниками в отношении поставленных задач. Задача организации, в особенности же реализация намеченных плановых заданий способствует подготовки и реализации соответствующий условий активизации. Равным образом постоянное информационно-пропагандистское обеспечение нашей деятельности играет важную роль в формировании соответствующий условий активизации.',
            serviceList: [
              'Место захоронения (Без выбора кладбища)',
              'Место захоронения (Без выбора кладбища)',
              'Место захоронения (Без выбора кладбища)',
              'Место захоронения (Без выбора кладбища)',
              'Место захоронения (Без выбора кладбища)',
              'Место захоронения (Без выбора кладбища)',
              'Место захоронения (Без выбора кладбища)',
              'Место захоронения (Без выбора кладбища)',
              'Место захоронения (Без выбора кладбища)',
              'Место захоронения (Без выбора кладбища)'
            ]
          },
        ],
        modals: {
          addNewSertificate: false,
          changeSertificate: false,
        },
        newSertificate: {
          name: '',
          price: '',
          description: '',
          imgUrl: '',
          serviceList: ''
        },
        changeSertificateItem: {}
      }
    },
    methods: {
      showAddDialog() {
        this.modals.addNewSertificate = true
      },
      changeSertDialog(item) {
        this.modals.changeSertificate = true
        this.changeSertificateItem = {
          name: item.name,
          price: item.price,
          description: item.description,
          imgUrl: item.imgUrl,
          serviceList: item.serviceList.join('\n')
        }
      },
      handleAvatarSuccess(res, file) {
        // this.newSertificate.imgUrl = URL.createObjectURL(file.raw)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  }
</script>