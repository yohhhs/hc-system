<template>
  <div class="already-paid-report">
    <div class="count-money">
      <div class="count-item">
        <p class="count-name">当月已收入金额</p>
        <p class="count-price"><span style="font-weight: bold;">234234</span> 元</p>
      </div>
      <div class="count-item">
        <p class="count-name">总计收入金额</p>
        <p class="count-price"><span style="font-weight: bold;">234234</span> 元</p>
      </div>
    </div>
    <query-wrapper @userQuery="queryList">
      <Input class="query-item" v-model="queryArgs.keyword" placeholder="订单id/商品名称"/>
      <Select  class="query-item" placeholder="支付方式" v-model="queryArgs.payType" clearable>
        <Option v-for="item in payTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      <DatePicker
        class="query-item"
        type="datetime" placeholder="订单完成开始时间"
        clearable @on-change="orderStartChange"></DatePicker>
      <DatePicker
        class="query-item"
        type="datetime" placeholder="订单完成结束时间"
        clearable @on-change="orderEndChange"></DatePicker>
    </query-wrapper>
    <btn-wrapper @btnClick="btnClick"></btn-wrapper>
    <Table :columns="tableColumns" :loading="tableLoading" :data="tableData"></Table>
    <Page style="margin-top: 20px;text-align: center;" :current="pageNo" :total="total" show-elevator @on-change='changePage'></Page>
  </div>
</template>
<script>
  import queryWrapper from '@/components/query-wrapper'
  import btnWrapper from '@/components/btn-wrapper'
  import {table, page} from '@/common/js/mixins'

  export default {
    data() {
      return {
        queryArgs: {
          keyword: '',
          startTime: '',
          endTime: '',
          payType: ''
        },
        payTypeList: [
          {
            id: 1,
            name: '线上'
          },
          {
            id: 0,
            name: '线下'
          }
        ],
        tableColumns: [
          {
            title: '订单id',
            key: ''
          },
          {
            title: '订单商品',
            key: ''
          },
          {
            title: '采购数量',
            key: ''
          },
          {
            title: '订单金额',
            key: ''
          },
          {
            title: '下单时间',
            key: ''
          },
          {
            title: '订单完成时间',
            key: ''
          },
          {
            title: '支付方式',
            render: (h, params) => {
              return h('div', params.row.payType === 1 ? '线上' : '线下')
            }
          }
        ]
      }
    },
    components: {
      queryWrapper,
      btnWrapper
    },
    mixins: [table, page],
    methods: {
      getReportList () {
        alreadyPaid.getReportList({
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          ...this.queryArgs
        }).then(data => {
          if (data !== 'isError') {
            this.tableData = data.list
            this.total = data.total
          }
        })
      },
      orderStartChange(time) {
        this.queryArgs.startTime = time
      },
      orderEndChange(time) {
        this.queryArgs.endTime = time
      },
      btnClick(handleName) {

      },
      queryList () {
        this.pageNo = 1
        this.getReportList()
      },
      changePage(no) {
        this.pageNo = no
        this.getReportList()
      }
    }
  }
</script>
<style lang="less" scoped>
  .count-money {
    display: flex;
    padding: 15px 30px;
    border-bottom: 2px solid #ddd;
    background: #fff;
  }
  .count-item {
    margin-right: 20px;
    width: 200px;
    height: 80px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #ddd;
    color: #444;
    overflow: hidden;
    .count-name {
      margin-top: 15px;
      font-size: 14px;
    }
    .count-price {
      font-size: 16px;
    }
  }
</style>
