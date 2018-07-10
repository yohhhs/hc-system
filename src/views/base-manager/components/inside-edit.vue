<template>
  <div class="inside-edit">
    <div class="modal-input-item">
      <p class="label">内勤账号</p>
      <div style="width: 350px">
        <Input type="text" long v-model.trim="companyName" placeholder="请输入内勤账号" />
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">登录密码</p>
      <div style="width: 350px">
        <Input type="password" long v-model.trim="companyName" placeholder="请输入登录密码" />
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">姓名</p>
      <div style="width: 350px">
        <Input type="text" long v-model.trim="companyName" placeholder="请输入姓名" />
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">手机号码</p>
      <div style="width: 350px">
        <Input type="text" long v-model.trim="companyName" placeholder="请输入手机号" />
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">所属公司</p>
      <div style="width: 350px">
        <Input type="text" long v-model.trim="companyName" placeholder="请输入手机号" />
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">所属营业部</p>
      <div style="width: 350px">
        <Table :columns="tableColumns" :loading="tableLoading" :data="tableData" @on-selection-change="tableSelectChange"></Table>
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">用户状态</p>
      <div style="width: 350px">
        <Select style="width: 180px;margin-right: 10px" v-model="status" :label-in-value="true" placeholder="选择内勤状态" @on-change="provinceChange">
          <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </div>
    </div>
  </div>
</template>

<script>
  import {message, table} from '@/common/js/mixins'

  export default {
    name: "inside-edit",
    props: {
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
        account: '',
        password: '',
        insideMemberName: '',
        mobile: '',
        companyId: '',
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
        ]
      }
    },
    mixins: [message],
    created () {
      if (isWrite) {
        this.account = this.detail.account
        this.password = this.detail.password
        this.insideMemberName = this.detail.insideMemberName
        this.mobile = this.detail.mobile
        this.companyId = this.detail.companyId
        this.saleDepartmentIds = this.detail.saleDepartmentIds
        this.status = this.detail.status
      }
    },
    methods: {
      returnData() {
        if (this.account === '') {
          this.warningInfo('请输入账号')
          return false
        }
        if (this.password === '') {
          this.warningInfo('请输入密码')
          return false
        }
        if (this.insideMemberName === '') {
          this.warningInfo('请输入内勤人员姓名')
          return false
        }
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
