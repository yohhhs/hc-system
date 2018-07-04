<template>
    <div class="organize-item">
      <div class="open-children"></div>
      <div class="btn">
        <Button type="wraning" @click="update">编辑</Button>
        <Button type="error" @click="delete">删除</Button>
      </div>
    </div>
</template>
<script>
  export default {
    props: {
      item: {
        type: Object,
        default: () => {}
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
      update () {
        this.$emit('update')
      },
      delete () {
        this.$emit('delete')
      }
    }
  }
</script>
<style lang="less" scope>
  .organize-item {
    padding-left: 20px;
  }
</style>
