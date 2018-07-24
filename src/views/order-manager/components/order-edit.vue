<template>
  <div class="order-edit">
    <div class="modal-input-item">
      <p class="label">订单编号</p>
      <div style="width: 350px">
        {{detail.purchaseOrderNumber}}
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">总订单id</p>
      <div style="width: 350px">
        {{detail.purchaseOrderId}}
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">用户openid</p>
      <div style="width: 350px">
        {{detail.openId}}
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">下单用户姓名</p>
      <div style="width: 350px">
        {{detail.agentMemberName}}
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">所属营业部</p>
      <div style="width: 350px">
        {{detail.saleDepartmentName}}
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">用户手机号码</p>
      <div style="width: 350px">
        {{detail.mobile}}
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">订单商品</p>
      <div style="width: 350px">
        {{detail.goodsName}}
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">商品数量</p>
      <div style="width: 350px">
        {{detail.goodsCount}}
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">商品单价</p>
      <div style="width: 350px">
        {{detail.salePrice}} 元
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">集采结束时间</p>
      <div style="width: 350px">
        {{detail.purchaseEndTime}}
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">下单时间</p>
      <div style="width: 350px">
        {{detail.createTimeStr}}
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">订单金额</p>
      <div style="width: 350px">
        {{detail.salePrice * detail.goodsCount}} 元
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">订单状态</p>
      <div style="width: 350px">
        {{orderStatus(detail.orderState)}}
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">支付方式</p>
      <div style="width: 350px">
        {{detail.payType === 1 ? '线上' : '线下'}}
      </div>
    </div>
    <div class="modal-input-item">
      <p class="label">支付时间</p>
      <div style="width: 350px">
        {{detail.payTime}}
      </div>
    </div>
    <template v-if="!isCancel">
      <div class="modal-input-item">
        <p class="label">收货人</p>
        <div style="width: 350px">
          {{detail.receiveMemberName}}
        </div>
      </div>
      <div class="modal-input-item">
        <p class="label">收货人电话</p>
        <div style="width: 350px">
          {{detail.receiveMobile}}
        </div>
      </div>
      <div class="modal-input-item">
        <p class="label">收获地址</p>
        <div style="width: 350px">
          {{detail.receiveAddress}}
        </div>
      </div>
      <template  v-if="detail.orderState === 3 || detail.orderState === 4">
        <div class="modal-input-item">
          <p class="label">发货时间</p>
          <div style="width: 350px">
            {{detail.sendTime}}
          </div>
        </div>
        <div class="modal-input-item">
          <p class="label">物流公司</p>
          <div style="width: 350px">
          </div>
        </div>
        <div class="modal-input-item">
          <p class="label">物流单号</p>
          <div style="width: 350px">
          </div>
        </div>
      </template>
      <div v-if="detail.orderState === 4" class="modal-input-item" >
        <p class="label">确认收货时间</p>
        <div style="width: 350px">
          {{detail.receiveTime}}
        </div>
      </div>
    </template>
    <template  v-if="detail.orderState === 9">
      <!--<div class="modal-input-item">-->
        <!--<p class="label">取消类别</p>-->
        <!--<div style="width: 350px">-->
        <!--</div>-->
      <!--</div>-->
      <div class="modal-input-item">
        <p class="label">取消时间</p>
        <div style="width: 350px">
          {{detail.cancelTime}}
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  export default {
    props: {
      detail: {
        type: Object,
        default: () => {}
      },
      isCancel: {
        type: Boolean,
        default: false
      }
    },
    data () {
        return {}
    },
    components: {},
    mixins: [],
    created () {
    },
    methods: {
      orderStatus (state) {
        let status = ''
        switch (state) {
          case 1:
            status = '待支付'
            break
          case 2:
            status = '待发货'
            break
          case 3:
            status = '待收货'
            break
          case 4:
            status = '已收货'
            break
          case 9:
            status = '取消'
            break
        }
        return status
      }
    }
  }
</script>
<style lang="less" scope>
  .order-edit {
    height: 600px;
    overflow: auto;
  }
</style>
