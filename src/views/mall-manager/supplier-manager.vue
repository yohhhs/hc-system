<template>
  <div class="supplier-manager">
    <query-wrapper @userQuery="queryList">
      <Input class="query-item" v-model="queryArgs.name" placeholder="供应商名称" />
    </query-wrapper>
    <btn-wrapper @btnClick="btnClick"></btn-wrapper>
    <Table :columns="tableColumns" :loading="tableLoading" :data="tableData" @on-selection-change="tableSelectChange"></Table>
    <Page style="margin-top: 20px;text-align: center;" :current="pageNo" :total="total" show-elevator @on-change='changePage'></Page>
    <Modal
      v-model="addModal.isShow"
      :mask-closable="false"
      title="添加供应商">
      <supplier-edit v-if="addModal.isShow" ref="addEdit"></supplier-edit>
      <div slot="footer">
        <Button type="primary" size="large" long :loading="addModal.loading"  @click="addConfirm">确定</Button>
      </div>
    </Modal>
    <Modal
      v-model="writeModal.isShow"
      :mask-closable="false"
      title="修改供应商">
      <supplier-edit v-if="writeModal.isShow" ref="writeEdit" :detail="supplierDetail" :isWrite="true"></supplier-edit>
      <div slot="footer">
        <Button type="primary" size="large" long :loading="writeModal.loading"  @click="writeConfirm">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import queryWrapper from '@/components/query-wrapper'
  import btnWrapper from '@/components/btn-wrapper'
  import supplierEdit from './components/supplier-edit'
  import { message, table, page, writeModal, addModal } from '@/common/js/mixins'
  import { supplierManager } from '@/api/request'

  export default {
    data () {
      return {
        supplierDetail: null,
        currentId: '',
        deleteIds: [],
        queryArgs: {
          name: ''
        },
        tableColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '供应商ID',
            key: 'supplierId'
          },
          {
            title: '供应商名称',
            key: 'supplierName'
          },
          {
            title: '供应商对接人',
            key: 'supplierMemberName'
          },
          {
            title: '联系电话',
            key: 'mobile'
          },
          {
            title: '备注',
            key: 'remark'
          },
          {
            title: '操作',
            render: (h, params) => {
              return h('div', [
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
                      this.currentId = params.row.supplierId
                      this.supplierDetail = params.row
                      this.openWriteModal()
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
      btnWrapper,
      supplierEdit
    },
    mixins: [message, table, page, writeModal, addModal],
    created () {
      this.getSupplierList()
    },
    methods: {
      getSupplierList () {
        this.openTableLoading()
        supplierManager.getSupplierList({
          pageSize: 10,
          pageNo: this.pageNo,
          ...this.queryArgs
        }).then(data => {
          this.closeTableLoading()
          if (data !== 'isError') {
            this.tableData = data.list
            this.total = data.total
          }
        })
      },
      queryList () {
        this.pageNo = 1
        this.getSupplierList()
      },
      btnClick (handleName) {
        switch (handleName) {
          case '添加供应商':
            this.openAddModal()
            break
          case '删除':
            if (this.deleteIds.length === 0) {
              return this.warningInfo('请选择删除对象')
            }
            this.$Modal.confirm({
              content: '确定要删除吗？',
              loading: true,
              onOk: () => {
                supplierManager.deleteSupplier({
                  supplierId: this.deleteIds.toString()
                }).then(data => {
                  if (data !== 'isError') {
                    this.correctPageNo(this.deleteIds.length)
                    this.getSupplierList()
                    this.successInfo('删除成功')
                    this.deleteIds = []
                  }
                  this.$Modal.remove()
                })
              }
            })
            break
        }
      },
      tableSelectChange (selection) {
        let ids = []
        selection.forEach(item => {
          ids.push(item.supplierId)
        })
        this.deleteIds = ids
      },
      queryList () {
        this.pageNo = 1
        this.getSupplierList()
      },
      changePage (no) {
        this.pageNo = no
        this.getSupplierList()
      },
      addConfirm () {
        let returnData = this.$refs.addEdit.returnData()
        if (returnData) {
          this.openAddLoading()
          supplierManager.addSupplier({
            ...returnData
          }).then(data => {
            this.closeAddLoading()
            if (data !== 'isError') {
              this.successInfo('添加成功')
              this.getSupplierList()
              this.closeAddModal()
            }
          })
        }
      },
      writeConfirm () {
        let returnData = this.$refs.writeEdit.returnData()
        if (returnData) {
          this.openWriteLoading()
          supplierManager.addSupplier({
            supplierId: this.currentId,
            ...returnData
        }).then(data => {
            this.closeWriteLoading()
          if (data !== 'isError') {
            this.successInfo('添加成功')
            this.getSupplierList()
            this.closeWriteModal()
          }
        })
        }
      }
    }
  }
</script>
<style lang="less">
</style>
