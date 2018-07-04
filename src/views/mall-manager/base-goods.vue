<template>
    <div class="base-goods">
      <query-wrapper @userQuery="queryClick">
        <Input class="query-item" v-model.trim="queryArgs.keyWord" type="text" placeholder="关键字搜索" clearable/>
        <DatePicker
          class="query-item"
          type="datetime"
          placeholder="开始时间"
          clearable
          @on-change="queryStartTimeChange"></DatePicker>
        <DatePicker
          class="query-item"
          type="datetime" placeholder="结束时间"
          clearable
          @on-change="queryEndTimeChange"></DatePicker>
        <Select  class="query-item" placeholder="商品状态" v-model="queryArgs.goodsState" clearable>
          <Option v-for="item in staticData.goodsType" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        <Select  class="query-item" placeholder="品牌" v-model="queryArgs.brandId" clearable>
          <Option v-for="item in brandList" :value="item.infoId" :key="item.infoId">{{ item.infoValue }}</Option>
        </Select>
      </query-wrapper>
      <btn-wrapper @btnClick="btnClick"></btn-wrapper>
      <Table :columns="tableColumns" :loading="tableLoading" :data="tableData"></Table>
      <Page style="margin-top: 20px;text-align: center;" :current="pageNo" :total="total" show-elevator @on-change='changePage'></Page>
    </div>
</template>
<script>
  import queryWrapper from '@/components/query-wrapper'
  import btnWrapper from '@/components/btn-wrapper'
  import { table, message, addModal, writeModal, page } from '@/common/js/mixins'
  import { baseGoods } from '@/api/request'

  export default {
    data () {
      return {
        queryArgs: {
          keyword: '',
          addStartTime: '',
          addEndTime: '',
          goodsState: '',
          brandId: ''
        },
        brandList: [],
        staticData: {
          goodsType: [
            {
              id: 0,
              name: '下架'
            },
            {
              id: 1,
              name: '上架'
            }
          ]
        }
      }
    },
    components: {
      queryWrapper,
      btnWrapper
    },
    mixins: [table, message, addModal, writeModal, page],
    created () {
      this.getBrandList()
    },
    methods: {
      getGoodsList () {},
      getBrandList () {
        baseGoods.getBrandList().then(data => {
          if (data !== 'isError') {
            this.brandList = data
          }
        })
      },
      changePage (no) {
        this.pageNo = no
      },
      btnClick () {},
      queryClick () {},
      queryStartTimeChange (time) {
        this.queryArgs.addStartTime =time
      },
      queryEndTimeChange (time) {
        this.queryArgs.addEndTime =time
      }
    }
  }
</script>
<style lang="less">
</style>
