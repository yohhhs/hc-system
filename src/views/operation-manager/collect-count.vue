<template>
  <div class="collect-count">
    <div v-show="!lookDetail">
      <Table :columns="tableColumns" :loading="tableLoading" :data="tableData"></Table>
      <Page style="margin-top: 20px;text-align: center;" :current="pageNo" :total="total" show-elevator
            @on-change='changePage'></Page>
    </div>
    <Modal
      v-model="lookModal"
      width="1000"
      :mask-closable="false"
      title="营业部订购明细">
      <div>
        <p></p>
        <p></p>
      </div>
      <ul>
        <li>
          <p>
            <span></span>
            <span></span>
          </p>
          <Table :columns="tableColumns" :loading="tableLoading" :data="tableData"></Table>
        </li>

      </ul>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
  import {table, page} from '@/common/js/mixins'
  import {collectCount} from '@/api/request'

  export default {
    data () {
      return {
        lookModal: true,
        lookDetail: false,

        tableColumns: [
          {
            title: '集采商品id',
            key: 'purchaseGoodsId'
          },
          {
            title: '基础商品名称',
            key: 'purchaseGoodsId'
          },
          {
            title: '商品售价',
            key: 'salePrice'
          },
          {
            title: '商品发布时间',
            key: ''
          },
          {
            title: '集采到期时间',
            key: 'purchaseEndTime'
          },
          {
            title: '起订量',
            key: 'purchaseMinCount'
          },
          {
            title: '关联营业部数量',
            key: 'saleDepartmentCount'
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
                      collectCount.getGoodsCountDetail({
                        purchaseGoodsId: params.row.purchaseGoodsId
                      })
                    }
                  }
                }, '查看订购明细')
              ])
            }
          }
        ]
      }
    },
    mixins: [table, page],
    created () {
      this.getOrderList()
    },
    methods: {
      getOrderList () {
        this.openTableLoading()
        collectCount.getPurchaseGoodsCountList({
          pageNo: this.pageNo,
          pageSize: 10
        }).then(data => {
          this.closeTableLoading()
          if (data !== 'isError') {
            this.tableData = data.list
            this.total = data.total
          }
        }).catch(err => {
          this.closeTableLoading()
        })
      },
      changePage (no) {
        this.pageNo = no
        this.getOrderList()
      }
    }
  }
</script>
<style lang="less">
</style>
