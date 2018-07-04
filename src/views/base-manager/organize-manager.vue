<template>
    <div class="organize-manager">
      <btn-wrapper @btnClick="btnClick"></btn-wrapper>
    </div>
</template>
<script>
  import btnWrapper from '@/components/btn-wrapper'

  export default {
    components: {
      btnWrapper
    },
    methods: {
      btnClick (handleName) {
        switch (handleName) {
          case '新增省级分公司':
            break
          case '新增市级子公司':
            break
          case '新增运营部':
            break
        }
      }
    }
  }
</script>
<style lang="less">
</style>
