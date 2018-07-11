<template>
    <div class="base-goods">
      <query-wrapper @userQuery="queryClick">
        <Input class="query-item" v-model.trim="queryArgs.keyWord" type="text" placeholder="商品ID/商品名称/供应商名称" clearable/>
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
      <Upload
        :withCredentials="true"
        action="https://www.topasst.com/cms/file/uploadFile">
        <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
      </Upload>
      <btn-wrapper @btnClick="btnClick"></btn-wrapper>
      <Table :columns="tableColumns" :loading="tableLoading" :data="tableData" @on-selection-change="tableSelectChange"></Table>
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
        selectIds: [],
        brandList: [],
        supplierList: [],
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
        },
        tableColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '商品ID',
            key: 'goodsId'
          },
          {
            title: '商品名称',
            key: 'goodsName'
          },
          {
            title: '品牌',
            key: 'brandName'
          },
          {
            title: '采购成本',
            key: 'buyCost'
          },
          {
            title: '供应商',
            key: 'supplierName'
          },
          {
            title: '状态',
            render: (h, params) => {
              return h('div', params.row.goodsState === 0 ? '下架' : '上架')
            }
          },
          {
            title: '商品添加时间',
            key: 'createTimeStr'
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
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    margin: '5px'
                  },
                  on: {
                    click: () => {

                    }
                  }
                }, '编辑')
              ])
            }
          }
        ]
      }
    },
    components: {
      queryWrapper,
      btnWrapper
    },
    mixins: [table, message, addModal, writeModal, page],
    created () {
      this.getBrandList()
      this.getGoodsList()
    },
    methods: {
      getGoodsList () {
        baseGoods.getGoodsList({
          pageSize: 10,
          pageNo: this.pageNo,
          ...this.queryArgs
        }).then(data => {
          if (data !== 'isError') {
            this.tableData = data.list
            this.total = data.total
          }
        })
      },
      getSupplierList () {
        baseGoods.getSupplierList({
          pageSize: 100000,
          pageNo: 1
        }).then(data => {
          if (data !== 'isError') {
            this.supplierList = data.list
          }
        })
      },
      getBrandList () {
        baseGoods.getBrandList().then(data => {
          if (data !== 'isError') {
            this.brandList = data
          }
        })
      },
      changePage (no) {
        this.pageNo = no
        this.getGoodsList()
      },
      btnClick () {},
      queryClick () {
        this.pageNo = 1
        this.getGoodsList()
      },
      queryStartTimeChange (time) {
        this.queryArgs.addStartTime =time
      },
      queryEndTimeChange (time) {
        this.queryArgs.addEndTime =time
      },
      btnClick (handleName) {
        switch (handleName) {
          case '新增基础商品':
            this.openAddModal()
            break
          case '上架商品':
            this.updateStatus(1)
            break
          case '下架商品':
            this.updateStatus(0)
            break
        }
      } ,
      updateStatus (goodsState) {
        if (this.selectIds.length === 0) {
          return this.warningInfo('请选择操作对象')
        }
        baseGoods.updateGoodsStatus({
          goodsId: this.selectIds.toString(),
          goodsState
        }).then(data => {
          if (data !== 'isError') {
            this.successInfo('更新成功')
            this.getGoodsList()
          }
        })
      },
      tableSelectChange (selection) {
        let ids = []
        selection.forEach(item => {
          ids.push(item.goodsId)
        })
        this.selectIds = ids
      }
    }
  }
</script>
<style lang="less">
</style>
