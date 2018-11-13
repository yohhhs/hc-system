<template>
  <div class="home">
    <ul class="card-list">
      <li class="list-item">
        <div class="card-wrapper">
          <div class="icon-wrapper" style="background-color: #2b85e4">
            <Icon size="36" color="#fff" type="ios-add-circle"/>
          </div>
          <div class="content-wrapper">
            <p class="content-number">{{topData.todayNewMemberCount}}</p>
            <p class="content-name">新增用户</p>
          </div>
        </div>
      </li>
      <li class="list-item">
        <div class="card-wrapper">
          <div class="icon-wrapper" style="background-color: rgb(25, 190, 107)">
            <Icon size="36" color="#fff" type="md-people"/>
          </div>
          <div class="content-wrapper">
            <p class="content-number">{{topData.totalMemberCount}}</p>
            <p class="content-name">总用户量</p>
          </div>
        </div>
      </li>
      <li class="list-item">
        <div class="card-wrapper">
          <div class="icon-wrapper" style="background-color: rgb(255, 153, 0)">
            <Icon size="36" color="#fff" type="ios-alert"/>
          </div>
          <div class="content-wrapper">
            <p class="content-number">{{topData.noOrderMemberCount}}</p>
            <p class="content-name">未下单</p>
          </div>
        </div>
      </li>
      <li class="list-item">
        <div class="card-wrapper">
          <div class="icon-wrapper" style="background-color: rgb(237, 63, 20)">
            <Icon size="36" color="#fff" type="md-checkmark-circle"/>
          </div>
          <div class="content-wrapper">
            <p class="content-number">{{topData.oneOrderMemberCount}}</p>
            <p class="content-name">一次下单</p>
          </div>
        </div>
      </li>
      <li class="list-item">
        <div class="card-wrapper">
          <div class="icon-wrapper" style="background-color: rgb(228, 108, 187)">
            <Icon size="36" color="#fff" type="md-done-all"/>
          </div>
          <div class="content-wrapper">
            <p class="content-number">{{topData.passTwoOrderMemberCount}}</p>
            <p class="content-name">两次及以上</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import {home} from '@/api/request'

  export default {
    data() {
      return {
        topData: {
          todayNewMemberCount: 0,
          totalMemberCount: 0,
          noOrderMemberCount: 0,
          oneOrderMemberCount: 0,
          passTwoOrderMemberCount: 0
        }
      }
    },
    created() {
      this.getOrderCount()
    },
    methods: {
      getOrderCount() {
        home.getMemberAndOrderCount().then(data => {
          if (data !== 'isError') {
            for (let k in this.topData) {
              this.topData[k] = data[k]
            }
          }
        })
      }
    }
  }
</script>
<style lang="less">
  .card-list {
    display: flex;
    justify-content: space-between;
    list-style: none;
    .list-item {
      width: 18.5%;
      height: 110px;
      border-radius: 4px;
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .1);
      background-color: #fff;
      overflow: hidden;
    }
  }

  .card-wrapper {
    display: flex;
    align-content: stretch;
    height: 100%;
    .icon-wrapper {
      flex-basis: 64px;
      flex-shrink: 0;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 64px;
      height: 100%;
    }
    .content-wrapper {
      padding: 10px 0;
      flex: 1;
      display: inline-flex;
      flex-direction: column;
      justify-content: space-around;
      text-align: center;
      color: #515a6e;
      .content-number {
        font-size: 40px;
      }
      .content-name {
        font-size: 14px;
      }
    }
  }
</style>
