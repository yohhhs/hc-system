<template>
  <div class="inside-edit">
    <div class="modal-input-item">
      <p class="label">内勤账号</p>
      <div style="width: 350px">
        <Input type="text" long v-model.trim="account" placeholder="请输入内勤账号" />
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">登录密码</p>
      <div style="width: 350px">
        <Input type="password" long v-model.trim="password" placeholder="请输入登录密码" />
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">姓名</p>
      <div style="width: 350px">
        <Input type="text" long v-model.trim="insideMemberName" placeholder="请输入姓名" />
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">手机号码</p>
      <div style="width: 350px">
        <Input type="text" long v-model.trim="mobile" placeholder="请输入手机号" />
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">所属公司</p>
      <div v-if="!isWrite">
        <Select style="width: 180px;margin: 0 15px 15px 0" v-model="currentOrganizeId" placeholder="请选择机构" @on-change="orgChange">
          <Option v-for="item in orgList" :value="item.organizeId" :key="item.organizeId">{{ item.organizeName }}</Option>
        </Select>
        <template v-for="(company, index) in companyLists">
          <Select style="width: 180px;margin: 0 15px 15px 0" v-model="company.companyId" placeholder="请选择公司" @on-change="companyChange(index)">
            <Option v-for="item in company.data" :value="item.companyId" :key="item.companyId">{{ item.companyName }}</Option>
          </Select>
        </template>
      </div>
      <div v-else>
        {{companyName}}
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">所属营业部</p>
      <div>
        <Table :columns="tableColumns" :loading="tableLoading" :data="tableData" @on-selection-change="tableSelectChange"></Table>
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">用户状态</p>
      <div style="width: 350px">
        <Select style="width: 180px;margin-right: 10px" v-model="status" placeholder="选择内勤状态">
          <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </div>
    </div>
  </div>
</template>

<script>
  import {message, table} from '@/common/js/mixins'
  import { companyList, getSaleDepartmentList, getInsideSaleList } from '@/api/request'

  export default {
    name: "inside-edit",
    props: {
      orgList: {
        type: Array,
        default: () => []
      },
      isWrite: {
        type: Boolean,
        default: false
      },
      detail: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      return {
        companyName: '',
        currentOrganizeId: '',
        currentCompanyId: '',
        companyLists: [],
        account: '',
        password: '',
        insideMemberName: '',
        mobile: '',
        saleDepartmentIds: '',
        status: 1,
        statusList: [
          {
            id: 1,
            name: '激活'
          },
          {
            id: 0,
            name: '锁定'
          }
        ],
        tableColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '营业部名称',
            key: 'saleDepartmentName'
          },
          {
            title: '营业部地址',
            render: (h, params) => {
              let row = params.row
              return h('div', `${row.provinceName} ${row.cityName} ${row.districtCode} ${row.addressDetail}`)
            }
          }
        ]
      }
    },
    mixins: [message, table],
    created () {
      if (this.isWrite) {
        this.account = this.detail.account
        this.insideMemberName = this.detail.insideMemberName
        this.mobile = this.detail.mobile
        this.currentCompanyId = this.detail.companyId
        this.companyName = this.detail.companyName
        this.saleDepartmentIds = this.detail.saleDepartmentIds
        this.status = this.detail.status
        this.getSaleList(this.detail.companyId)
      }
    },
    methods: {
      orgChange (id) {
        this.currentCompanyId = ''
        this.companyLists = []
        companyList({
          organizeId: this.currentOrganizeId,
          parentId: 0
        }).then(data => {
          if (data !== 'isError') {
            if (data.length === 0) {
              this.warningInfo('没有下级子公司')
            } else {
              this.companyLists.push({
                companyId: '',
                data: data
              })
            }
          }
        })
      },
      companyChange (index) {
        this.saleDepartmentIds = ''
        let maxLen = this.companyLists.length - 1
        let parentId = this.currentCompanyId = this.companyLists[index].companyId
        if (maxLen !== index) {
          this.companyLists.splice(index + 1, maxLen - index)
        }
        companyList({
          organizeId: this.currentOrganizeId,
          parentId: parentId
        }).then(data => {
          if (data !== 'isError') {
            if (data.length === 0) {
              this.warningInfo('没有下级子公司')
            } else {
              let companyData = {
                companyId: '',
                data: data
              }
              this.companyLists.push(companyData)
            }
          }
        })
        this.getSaleList(parentId)
      },
      getSaleList (id) {
        this.openTableLoading()
        getInsideSaleList({
          insideMemberId: this.detail ? this.detail.insideMemberId : '',
          companyId: id
        }).then(data => {
          this.closeTableLoading()
          if (data !== 'isError') {
            if (this.isWrite) {
              data.forEach(item => {
                if (this.saleDepartmentIds.indexOf(item.saleDepartmentId) > -1) {
                  item._checked = true
                }
              })
            }
            this.tableData = data
          }
        })
      },
      tableSelectChange (selection) {
        let ids = []
        selection.forEach(item => {
          ids.push(item.saleDepartmentId)
        })
        this.saleDepartmentIds = ids.toString()
      },
      returnData() {
        if (this.account === '') {
          this.warningInfo('请输入账号')
          return false
        }
        if (!this.isWrite && this.password === '') {
          this.warningInfo('请输入密码')
          return false
        }
        if (this.insideMemberName === '') {
          this.warningInfo('请输入内勤人员姓名')
          return false
        }
        if (this.mobile === '') {
          this.warningInfo('请输入手机号')
          return false
        }
        if (!this.isWrite && this.currentCompanyId === '') {
          this.warningInfo('请选择公司')
          return false
        }
        if (this.saleDepartmentIds === '') {
          this.warningInfo('请选择营业部')
          return false
        }
        return {
          account: this.account,
          password: this.password,
          insideMemberName: this.insideMemberName,
          mobile: this.mobile,
          companyId: this.currentCompanyId,
          saleDepartmentIds: this.saleDepartmentIds,
          status: this.status
        }
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
