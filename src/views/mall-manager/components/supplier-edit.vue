<template>
    <div class="supplier-edit">
      <p>*号为必填项</p>
      <div class="modal-input-item">
        <p class="label">供应商名称 *</p>
        <div style="width: 350px">
          <Input type="text" long v-model="supplierName" placeholder="请输入机构名称" />
        </div>
      </div>
      <div class="modal-input-item">
        <p class="label">供应商对接人 *</p>
        <div style="width: 350px">
          <Input type="text" long v-model="supplierMemberName" placeholder="请输入机构名称" />
        </div>
      </div>
      <div class="modal-input-item">
        <p class="label">对接人电话 *</p>
        <div style="width: 350px">
          <Input type="text" long v-model="mobile" placeholder="请输入机构名称" />
        </div>
      </div>
      <div class="modal-input-item">
        <p class="label">备注</p>
        <div style="width: 350px">
          <Input type="textarea" :rows="4" long v-model="remark" placeholder="请输入机构名称" />
        </div>
      </div>
    </div>
</template>
<script>
  import { message } from '@/common/js/mixins'

  export default {
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
        supplierName: '',
        supplierMemberName: '',
        mobile: '',
        remark: ''
      }
    },
    mixins: [message],
    created () {
      if (this.isWrite) {
        this.supplierName = this.detail.supplierName
        this.supplierMemberName = this.detail.supplierMemberName
        this.mobile = this.detail.mobile
        this.remark = this.detail.remark
      }
    },
    methods: {
      returnData () {
        if (this.supplierName === '') {
          this.warningInfo('请输入供应商名称')
          return false
        }
        if (this.supplierMemberName === '') {
          this.warningInfo('请输入供应商对接人名称')
          return false
        }
        if (this.mobile === '') {
          this.warningInfo('请输入对接人电话')
          return false
        }
        return {
          supplierName: this.supplierName,
          supplierMemberName: this.supplierMemberName,
          mobile: this.mobile,
          remark: this.remark
        }
      }
    }
  }
</script>
<style lang="less" scope>
</style>
