<template>
  <div class="collect-edit">
    <div class="modal-input-item">
      <p class="label">基础商品</p>
      <div style="width: 350px">
        <Select v-model="goodsId" placeholder="选择商品">
          <Option v-for="item in goodsList" :value="item.id" :key="item.goodsId">{{ item.goodsName }}</Option>
        </Select>
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">市场价格（元）</p>
      <div style="width: 350px">
        <Input v-model="marketPrice" placeholder="请输入市场价格" />
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">商品售价（元）</p>
      <div style="width: 350px">
        <Input v-model="salePrice" placeholder="请输入商品售价" />
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">集采到期时间</p>
      <div style="width: 350px">
        <DatePicker
          style="width: 350px"
          type="datetime" placeholder="集采结到期时间"
          clearable=""></DatePicker>
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">关联活动</p>
      <div style="width: 350px">
        <Select v-model="activetyId" placeholder="选择关联活动">
          <Option v-for="item in activeList" :value="item.id" :key="item.goodsId">{{ item.goodsName }}</Option>
        </Select>
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">关联营业部</p>
      <div style="width: 350px">

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      activeList: {
        type: Array,
        default: () => []
      },
      goodsList: {
        type: Array,
        default: () => []
      },
      detail: {
        type: Object,
        default: () => {}
      },
      isWrite: {
        type: Boolean,
        default: false
      }
    },
    data () {
        return {
          goodsId: '',
          marketPrice: '',
          salePrice: '',
          purchaseEndTime: '',
          pruchaseMinCount: '',
          activetyId: '',
          saleDptIds: ''
        }
    },
    components: {},
    mixins: [],
    created () {
    },
    methods: {}
  }
</script>
<style lang="less" scope>
  .collect-edit {
    height: 500px;
    overflow: auto;
  }
</style>
