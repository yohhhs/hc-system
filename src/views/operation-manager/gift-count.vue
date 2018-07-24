<template>
  <div class="gift-count">
    <query-wrapper @userQuery="queryList">
      <Input class="query-item" v-model="queryArgs.keyword" placeholder="用户姓名/营业部名称"/>
    </query-wrapper>
    <Table :columns="tableColumns" :loading="tableLoading" :data="tableData"
           @on-selection-change="tableSelectChange"></Table>
    <Page style="margin-top: 20px;text-align: center;" :current="pageNo" :total="total" show-elevator
          @on-change='changePage'></Page>
  </div>
</template>
<script>
  import queryWrapper from '@/components/query-wrapper'
  import {table, page} from '@/common/js/mixins'
  import { giftCount } from '@/api/request'

  export default {
    data () {
      return {
        tableColumns: [
          {
            title: '用户姓名',
            key: ''
          },
          {
            title: '所属营业部',
            key: ''
          },
          {
            title: '礼品名称',
            key: ''
          },
          {
            title: '已派送',
            key: ''
          },
          {
            title: '待派送',
            key: ''
          },
          {
            title: '操作',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    margin: '5px'
                  },
                  on: {
                    click: () => {

                    }
                  }
                }, '查看派送明细')
              ])
            }
          }
        ]
      }
    },
    components: {
      queryWrapper
    },
    mixins: [table, page],
    methods: {
      getGiftList () {

      },
      changePage (no) {
        this.pageNo = no
        this.getGiftList()
      }
    }
  }
</script>
<style lang="less">
</style>
