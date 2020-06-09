<template>
<div>
    <div class="h2">Мои услуги</div>
    <card>
        <div class="my-service-item">
            <div class="service-info-main">
                <div class="service-info-img">
                    <img :src="service.imgUrl" :alt="service.name">
                </div>
                <div class="service-info-main-text">
                    <div class="h3">{{service.name}}</div>
                    <p>{{service.description}}</p>
                </div>
            </div>
            <hr>
            <div class="my-service-item-body">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="h5">Перечень оказываемых услуг</div>
                        <ol class="custom-ol">
                            <li v-for="serviceListItem in service.serviceList">{{serviceListItem}}</li>
                        </ol>
                    </div>
                    <div class="col-lg-6">
                        <div class="my-additional-services">
                            <div class="h5">Дополнительные подключенные услуги</div>
                            <div class="row">
                                <div v-for="additionalService in service.additionalServices"
                                        class="col-lg-6">
                                    <div class="additional-service">
                                        <div class="h6">{{additionalService.name}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </card>
</div>
</template>
<script>

  export default {
    data() {
      return {
        service: {
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
          ],
          additionalServices: [
            {
              name: 'Дополнительная услуга #1',
              price: 20000,
            },
            {
              name: 'Дополнительная услуга #2',
              price: 25000
            },
            {
              name: 'Дополнительная услуга #3',
              price: 30000
            },
            {
              name: 'Дополнительная услуга #4',
              price: 35000
            },
            {
              name: 'Дополнительная услуга #5',
              price: 40000
            },
            {
              name: 'Дополнительная услуга #6',
              price: 45000
            },
          ]
        },
      }
    },
    methods: {
    }
  }

</script>
<style>

</style>
