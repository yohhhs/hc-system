<template>
  <div class="deal-count">
    <!--<query-wrapper @userQuery="queryList">-->
      <!--<Input class="query-item" v-model="queryArgs.keyword" placeholder="商品名称/活动名称" />-->
    <!--</query-wrapper>-->
    <Table :columns="tableColumns" :loading="tableLoading" :data="tableData" @on-selection-change="tableSelectChange"></Table>
    <Page style="margin-top: 20px;text-align: center;" :current="pageNo" :total="total" show-elevator @on-change='changePage'></Page>
  </div>
</template>
<script>
  import queryWrapper from '@/components/query-wrapper'
  import {table, page} from '@/common/js/mixins'

  export default {
    data () {
      return {
        tableColumns: [
          {
            title: '营业部名称',
            key: ''
          },
          {
            title: '所属机构',
            key: ''
          },
          {
            title: '所属分公司',
            key: ''
          },
          {
            title: '总交易金额',
            key: ''
          },
          {
            title: '当月交易金额',
            key: ''
          },
          {
            title: '总订单数',
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
                }, '查看月度交易金额')
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
      getDealList () {
      },
      changePage (no) {
        this.pageNo = no
        this.getDealList()
      }
    }
  }
</script>
<style lang="less">
</style>
