<template>
  <div class="base-goods-edit">
    <div class="modal-input-item">
      <p class="label">商品名称</p>
      <div style="width: 350px">
        <Input type="text" long v-model.trim="goodsName" placeholder="请输入商品名称" />
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">商品品牌</p>
      <div style="width: 350px">
        <Select v-model="brandId" placeholder="选择商品品牌">
          <Option v-for="item in brandList" :value="item.id" :key="item.goodsId">{{ item.goodsName }}</Option>
        </Select>
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">所属供应商</p>
      <div style="width: 350px">
        <Select v-model="supplierId" placeholder="选择供应商">
          <Option v-for="item in goodsList" :value="item.id" :key="item.goodsId">{{ item.goodsName }}</Option>
        </Select>
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">采购成本</p>
      <div style="width: 350px">
        <InputNumber :min="0" v-model="buyCost"></InputNumber>
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">商品状态</p>
      <div style="width: 350px">
        <Select v-model="goodsState" placeholder="选择商品状态">
          <Option v-for="item in goodsStatusList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">商品缩略图</p>
      <div style="width: 350px">

      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">商品详情图片</p>
      <div style="width: 350px">

      </div>
    </div>
  </div>
</template>

<script>
  import {message} from '@/common/js/mixins'

  export default {
    name: "base-goods-edit",
    props: {
      isWrite: {
        type: Boolean,
        default: false
      },
      brandList: {
        type: Array,
        default: () => []
      },
      supplierList: {
        type: Array,
        default: () => []
      },
      detail: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      return {
        goodsName: '',
        brandId: '',
        supplierId: '',
        buyCost: 0,
        goodsState: '',
        description: '',
        imageListStr: '',
        goodsStatusList: [
          {
            id: 1,
            name: '上架'
          },
          {
            id: 0,
            name: '下架'
          }
        ]
      }
    },
    mixins: [message],
    created () {
      if (this.isWrite) {
        this.goodsName = this.detail.goodsName
        this.brandId = this.detail.brandId
        this.supplierId = this.detail.supplierId
        this.buyCost = this.detail.buyCost
        this.goodsState = this.detail.goodsState
      }
    },
    methods: {
      returnData () {
        if (this.goodsName === '') {
          this.warningInfo('商品名称')
          return false
        }
        if (this.brandId === '') {
          this.warningInfo('请选择品牌')
          return false
        }
        if (this.supplierId === '') {
          this.warningInfo('请选择供应商')
          return false
        }
        return {
          goodsName: this.goodsName
        }
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
