<template>
  <div class="inside-user">
    <query-wrapper @userQuery="queryList">
      <Input class="query-item" v-model="insideMemberName" placeholder="请输入名字" />
    </query-wrapper>
    <btn-wrapper @btnClick="btnClick"></btn-wrapper>
    <Table :columns="tableColumns" :loading="tableLoading" :data="tableData" @on-selection-change="tableSelectChange"></Table>
    <Page style="margin-top: 20px;text-align: center;" :current="pageNo" :total="total" show-elevator @on-change='changePage'></Page>
    <Modal
      v-model="addModal.isShow"
      :mask-closable="false"
      width="800"
      title="添加">
      <inside-edit v-if="addModal.isShow" ref="addEdit" :orgList="orgList"></inside-edit>
      <div slot="footer">
        <Button type="primary" size="large" long :loading="addModal.loading"  @click="addConfirm">确定</Button>
      </div>
    </Modal>
    <Modal
      v-model="writeModal.isShow"
      :mask-closable="false"
      width="800"
      title="修改">
      <inside-edit v-if="writeModal.isShow" ref="writeEdit" :isWrite="true" :detail="detail"></inside-edit>
      <div slot="footer">
        <Button type="primary" size="large" long :loading="writeModal.loading"  @click="writeConfirm">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import queryWrapper from '@/components/query-wrapper'
  import btnWrapper from '@/components/btn-wrapper'
  import insideEdit from './components/inside-edit'
  import { message, table, page, addModal, writeModal } from '@/common/js/mixins'
  import { insideUser } from '@/api/request'

  export default {
    data () {
      return {
        orgList: [],
        detail: null,
        selectIds: [],
        insideMemberName: '',
        tableColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '用户名',
            key: 'account'
          },
          {
            title: '姓名',
            key: 'insideMemberName'
          },
          {
            title: '手机号码',
            key: 'mobile'
          },
          {
            title: '所属分公司',
            key: 'companyName'
          },
          {
            title: '所属营业部',
            key: 'saleDepartmentName'
          },
          {
            title: '账户状态',
            render: (h, params) => {
              return h('div', params.row.status === 0 ? '锁定' : '激活')
            }
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
                      this.detail = params.row
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
      insideEdit
    },
    mixins: [message, table, page, addModal, writeModal],
    created () {
      this.getInsideUser()
      this.getOrgList()
    },
    methods: {
      getOrgList () {
        insideUser.getOrganizeUserList({
          pageSize: 1000,
          pageNo: 1
        }).then(data => {
          if (data !== 'isError') {
            this.orgList = data.list
          }
        })
      },
      getInsideUser () {
        this.openTableLoading()
        insideUser.getInsideList({
          pageSize: 10,
          pageNo: this.pageNo,
          insideMemberName: this.insideMemberName
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
        this.getInsideUser()
      },
      changePage (no) {
        this.pageNo = no
        this.getInsideUser()
      },
      btnClick (handleName) {
        switch (handleName) {
          case '新增内勤人员':
            this.openAddModal()
            break
          case '激活':
            if (this.selectIds.length === 0) {
              return this.warningInfo('请选择操作对象')
            }
            this.updateStatus(1)
            break
          case '锁定':
            if (this.selectIds.length === 0) {
              return this.warningInfo('请选择操作对象')
            }
            this.updateStatus(0)
            break
          case '删除':
            if (this.selectIds.length === 0) {
              return this.warningInfo('请选择操作对象')
            }
            break
        }
      },
      tableSelectChange (selection) {
        let ids = []
        selection.forEach(item => {
          ids.push(item.insideMemberId)
        })
        this.selectIds = ids
      },
      updateStatus (status) {
        insideUser.updateInsideStatus({
          insideMemberId: this.selectIds.toString(),
          status
        }).then(data => {
          if (data !== 'isError') {
            this.successInfo('更新状态成功')
            this.getInsideUser()
          }
        })
      },
      addConfirm () {
        let returnData = this.$refs.addEdit.returnData()
        if (returnData) {
          this.openAddLoading()
          insideUser.addInside({
            ...returnData
          }).then(data => {
            this.closeAddLoading()
            if (data !== 'isError') {
              this.successInfo('添加成功')
              this.getInsideUser()
              this.closeAddModal()
            }
          })
        }
      },
      writeConfirm () {
        let returnData = this.$refs.writeEdit.returnData()
        if (returnData) {
          this.openWriteLoading()
          insideUser.updateInside({
            insideMemberId: this.detail.insideMemberId,
            ...returnData
          }).then(data => {
            this.closeWriteLoading()
            if (data !== 'isError') {
              this.successInfo('修改成功')
              this.getInsideUser()
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
