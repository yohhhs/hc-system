<template>
    <div class="organize-manager">
      <btn-wrapper @btnClick="btnClick"></btn-wrapper>
      <div class="organize-wrapper">
        <Tree :data="organizeData"  :load-data="loadData" :render="renderContent"></Tree>
      </div>
      <Modal
        v-model="addModal.isShow"
        :mask-closable="false"
        width="800"
        title="添加">
          <organize-edit v-if="addModal.isShow" ref='addEdit' :organizeList="organizeList"></organize-edit>
          <div slot="footer">
            <Button type="primary" size="large" long :loading="addModal.loading"  @click="addConfirm">确定</Button>
           </div>
      </Modal>
      <!--<Modal
        v-model="writeModal.isShow"
        :mask-closable="false"
        title="修改">
        <organize-edit v-if="addModal.isShow" ref='addEdit' :organizeList="organizeList" :isWrite="true"></organize-edit>
        <div slot="footer">
          <Button type="primary" size="large" long :loading="writeModal.loading"  @click="writeConfirm">确定</Button>
        </div>
      </Modal>-->
    </div>
</template>
<script>
  import btnWrapper from '@/components/btn-wrapper'
  import organizeEdit from './components/organize-edit'
  import { organizeManager } from '@/api/request'
  import {message, addModal, writeModal} from '@/common/js/mixins'

  export default {
    data () {
      return {
        organizeList: [],
        organizeData: [],
        buttonProps: {
          type: 'ghost',
          size: 'small',
        }
      }
    },
    components: {
      btnWrapper,
      organizeEdit
    },
    mixins: [message, addModal, writeModal],
    created () {
      this.getOrganizeList()
    },
    methods: {
      getOrganizeList () {
        organizeManager.getOrganizeUserList({
          pageNo: 1,
          pageSize: 100
        }).then(data => {
          if (data !== 'isError') {
            this.organizeList = data.list
            this.getInitOranizeData()
          }
        })
      },
      btnClick (handleName) {
        switch (handleName) {
          case '新增分公司':
            this.openAddModal()
            break
          case '新增市级子公司':
            break
          case '新增运营部':
            break
        }
      },
      writeConfirm () {

      },
      addConfirm () {
        let returnData = this.$refs.addEdit.returnData()
        if (returnData) {
          organizeManager.addCompany({
            ...returnData
          }).then(data => {
            if (data !== 'isError') {
              this.successInfo('添加成功')
              this.closeAddModal()
            }
          })
        }
      },
      renderContent(h, {root, node, data}) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%',
            fontSize: '14px'
          }
        }, [
          h('span', [
            h('span', data.title)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '32px'
            }
          }, [
            h('Button', {
              props: {
                type: 'warning',
                size: 'small'
              },
              style: {
                marginRight: '8px'
              },
              on: {
                click: () => {
                  this.writeItem(data)
                }
              }
            }, '添加子公司'),
            h('Button', {
              props: {
                type: 'warning',
                size: 'small'
              },
              style: {
                marginRight: '8px'
              },
              on: {
                click: () => {
                  this.writeItem(data)
                }
              }
            }, '添加营业部'),
            h('Button', {
              props: {
                type: 'warning',
                size: 'small'
              },
              style: {
                marginRight: '8px'
              },
              on: {
                click: () => {
                  this.writeItem(data)
                }
              }
            }, '编辑'),
            h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              on: {
                click: () => {
                  this.remove(root, node, data)
                }
              }
            }, '删除')
          ])
        ]);
      },
      topRenderContent (h, {root, node, data}) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%',
            fontSize: '14px'
          }
        }, [
          h('span', [
            h('span', data.title)
          ])
        ])
      },
      writeItem(data) {
        console.log(data.dd)
        data.title = 1
        const children = data.children || [];
        children.push({
          title: 'appended node',
          expand: true
        });
        this.$set(data, 'children', children);
      },
      remove(root, node, data) {
        console.log(root)
        return
        const parentKey = root.find(el => el === node).parent;
        const parent = root.find(el => el.nodeKey === parentKey).node;
        const index = parent.children.indexOf(data);
        parent.children.splice(index, 1);
      },
      loadData (item, callback) {
        let organizeId = ''
        let parentId = ''
        let isTop = false
        if (item.data.companyId) {
          parentId = item.data.companyId
        } else {
          isTop = true
          organizeId = item.data.organizeId
          parentId = 0
        }
        let children = []
        organizeManager.companyList({
          organizeId,
          parentId
        }).then(data => {
          if (data !== 'isError') {
            data.forEach(item => {
              children.push(
                {
                  title: item.companyName,
                  loading: false,
                  data: item,
                  children: []
                }
              )
            })
          }
          if (!isTop) {
            organizeManager.getSaleDepartmentList({
              companyId: item.data.companyId
            }).then(data => {
              if (data !== 'isError') {
                data.forEach(item => {
                  children.push(
                    {
                      title: item.saleDepartmentName,
                      loading: false,
                      data: item
                    }
                  )
                })
                if (children.length === 0) {
                  this.warningInfo('没有相关数据')
                }
                callback(children)
              }
            })
          } else {
            if (children.length === 0) {
              this.warningInfo('没有相关数据')
            }
            callback(children)
          }
        })
      },
      getInitOranizeData () {
        let init = []
        this.organizeList.forEach(item => {
          init.push(
            {
              title: item.organizeName,
              loading: false,
              data: item,
              render: this.topRenderContent,
              children: []
            }
          )
        })
        this.organizeData = init
      }
    }
  }
</script>
<style lang="less">
  .organize-wrapper {
    padding: 10px;
    font-size: 16px;
    background-color: #fff;
  }
</style>
