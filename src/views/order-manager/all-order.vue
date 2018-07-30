<template>
  <div class="all-order">
    <query-wrapper @userQuery="queryList">
      <Input class="query-item" v-model="queryArgs.keyword" placeholder="用户姓名/商品名称" />
      <DatePicker
        class="query-item"
        type="datetime" placeholder="下单开始时间"
        clearable @on-change="orderStartChange"></DatePicker>
      <DatePicker
        class="query-item"
        type="datetime" placeholder="下单结束时间"
        clearable @on-change="orderEndChange"></DatePicker>
      <DatePicker
        class="query-item"
        type="datetime" placeholder="支付开始时间"
        clearable @on-change="payStartChange"></DatePicker>
      <DatePicker
        class="query-item"
        type="datetime" placeholder="支付结束时间"
        clearable @on-change="payEndChange"></DatePicker>
      <Select class="query-item" v-model="queryArgs.orderState" placeholder="请选择订单状态">
        <Option v-for="item in orderStatusList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
    </query-wrapper>
    <btn-wrapper @btnClick="btnClick"></btn-wrapper>
    <Table :columns="tableColumns" :loading="tableLoading" :data="tableData" @on-selection-change="tableSelectChange"></Table>
    <Page style="margin-top: 20px;text-align: center;" :current="pageNo" :total="total" show-elevator @on-change='changePage'></Page>
    <Modal
      v-model="lookModal"
      :mask-closable="false"
      title="查看订单详情">
      <order-edit v-if="lookModal" :detail="currentDetail"></order-edit>
      <div slot="footer">
      </div>
    </Modal>
    <Modal
      v-model="uploadModal"
      :mask-closable="false"
      width="300"
      title="导入订单">
      <div style="text-align: center">
        <Upload :on-success="uploadSuccess" :format="['xls']" action="https://www.topasst.com/cms/purchaseOrder/addPurchaseOrder" :on-format-error="formatHandle">
          <Button style="width: 200px" type="ghost" icon="ios-cloud-upload-outline">导入订单</Button>
        </Upload>
      </div>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>
<script>
  import queryWrapper from '@/components/query-wrapper'
  import btnWrapper from '@/components/btn-wrapper'
  import orderEdit from './components/order-edit'
  import { message, table, page } from '@/common/js/mixins'
  import { allOrder } from '@/api/request'

  export default {
    data () {
      return {
        uploadModal: false,
        currentDetail: null,
        lookModal: false,
        selectIds: [],
        queryArgs: {
          keyword: '',
          addStartTime: '',
          addEndTime: '',
          payStartTime: '',
          payEndTime: '',
          orderState: ''
        },
        orderStatusList: [
          {
            id: 1,
            name: '待支付'
          },
          {
            id: 2,
            name: '待发货'
          },
          {
            id: 3,
            name: '待收货'
          },
          {
            id: 4,
            name: '已收货'
          },
          {
            id: 9,
            name: '取消'
          }
        ],
        tableColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '订单编号',
            key: 'purchaseOrderNumber'
          },
          {
            title: '集采商品编号',
            key: 'purchaseGoodsNumber'
          },
          {
            title: '用户',
            key: 'agentMemberName'
          },
          {
            title: '营业部',
            key: 'saleDepartmentName'
          },
          {
            title: '订单状态',
            render: (h, params) => {
              let status = ''
              switch (params.row.orderState) {
                case 1:
                  status = '待支付'
                  break
                case 2:
                  status = '待发货'
                  break
                case 3:
                  status = '待收货'
                  break
                case 4:
                  status = '已收货'
                  break
                case 9:
                  status = '取消'
                  break
              }
              return h('div', status)
            }
          },
          {
            title: '订单金额',
            render: (h, params) => {
              return h('div', params.row.goodsCount * params.row.salePrice)
            }
          },
          {
            title: '商品名称',
            key: 'goodsName'
          },
          {
            title: '数量',
            key: 'goodsCount'
          },
          {
            title: '支付方式',
            render: (h, params) => {
              return h('div', params.row.payType === 1 ? '线上' : '线下')
            }
          },
          {
            title: '下单时间',
            key: 'createTimeStr'
          },
          {
            title: '支付时间',
            key: 'payTime'
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
                      allOrder.orderDetail({
                        purchaseOrderId: params.row.purchaseOrderId
                      }).then(data => {
                        if (data !== 'isError') {
                          this.currentDetail = data
                          this.lookModal = true
                        }
                      })
                    }
                  }
                }, '查看')
              ])
            }
          }
        ]
      }
    },
    components: {
      btnWrapper,
      queryWrapper,
      orderEdit
    },
    mixins: [message, table, page],
    created () {
      this.getAllOrder()
    },
    methods: {
      getAllOrder () {
        this.openTableLoading()
        allOrder.getOrderList({
          pageNo: this.pageNo,
          pageSize: 10,
          ...this.queryArgs
        }).then(data => {
          this.closeTableLoading()
          if (data !== 'isError') {
            this.tableData = data.list
            this.total = data.total
          }
        })
      },
      tableSelectChange (selection) {
        let ids = []
        selection.forEach(item => {
          ids.push(item.purchaseOrderId)
      })
        this.selectIds = ids
      },
      btnClick (handleName) {
        switch (handleName) {
          case '强制关闭':
            if (this.selectIds.length === 0) {
              return this.warningInfo('请选择操作对象')
            }
            this.$Modal.confirm({
              content: '确定要关闭吗？',
              loading: true,
              onOk: () => {
                allOrder.closeOrder({
                  purchaseOrderId: this.selectIds.toString()
                }).then(data => {
                  if (data !== 'isError') {
                    this.successInfo('关闭成功')
                    this.getAllOrder()
                  }
                    this.$Modal.remove()
                })
              }
            })
            break
          case '下载订单模板':
            window.location.href = 'https://www.topasst.com/excelFile/order_mode.xls'
            break
          case '导入订单':
            this.uploadModal = true
            break
        }
      },
      queryList () {
        this.pageNo = 1
        this.getAllOrder()
      },
      changePage (no) {
        this.pageNo = no
        this.getAllOrder()
      },
      orderStartChange (time) {
        this.addStartTime = time
      },
      orderEndChange (time) {
        this.addEndTime = time
      },
      payStartChange (time) {
        this.payStartTime = time
      },
      payEndChange (time) {
        this.payEndTime = time
      },
      uploadSuccess (res) {
        if (res.statusCode == 200) {
          this.successInfo('导入成功')
        } else if (res.statusCode == 412) {
          window.location.href = res.data
        }
        this.getAllOrder()
      },
      formatHandle () {
        this.warningInfo('文件格式不正确')
      }
    }
  }
</script>
<style lang="less">
</style>
