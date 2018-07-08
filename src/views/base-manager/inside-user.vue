<template>
  <div class="inside-user">
    <query-wrapper @userQuery="queryList">
      <Input class="query-item" v-model="insideMemberName" placeholder="请输入名字" />
    </query-wrapper>
    <btn-wrapper @btnClick="btnClick"></btn-wrapper>
    <Table :columns="tableColumns" :loading="tableLoading" :data="tableData" @on-selection-change="tableSelectChange"></Table>
    <Page style="margin-top: 20px;text-align: center;" :current="pageNo" :total="total" show-elevator @on-change='changePage'></Page>
  </div>
</template>
<script>
  import queryWrapper from '@/components/query-wrapper'
  import btnWrapper from '@/components/btn-wrapper'
  import { message, table, page, addModal, writeModal } from '@/common/js/mixins'
  import { insideUser } from '@/api/request'

  export default {
    data () {
      return {
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
    mixins: [message, table, page, addModal, writeModal],
    created () {
      this.getInsideUser()
    },
    methods: {
      getInsideUser () {
        insideUser.getInsideList({
          pageSize: 10,
          pageNo: this.pageNo,
          insideMemberName: this.insideMemberName
        }).then(data => {
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
      }
    }
  }
</script>
<style lang="less">
</style>
