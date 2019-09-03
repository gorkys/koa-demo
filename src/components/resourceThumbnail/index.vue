<template>
  <div
    :style="style"
    class="resourceBox"
    @click="clickSelect"
    @mousedown="elementDown"
    @dragstart.stop.prevent>
    <label v-if="selectedStatus" class="item-status-label">
      <i class="el-icon-check"/>
    </label>
    <div v-if="isAction" class="action">
      <span v-if="isEdit" @click="editResource"><i class="el-icon-edit"/></span>
      <span @click="delResource"><i class="el-icon-delete"/></span>
    </div>
    <div class="imgBox">
      <img :src="thumbnail">
    </div>
    <p>{{ resourceName }}</p>
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {},
  props: {
    marginRight: {
      type: Number,
      default: 30
    },
    marginBottom: {
      type: Number,
      default: 25
    },
    marginLeft: {
      type: Number,
      default: 30
    },
    thumbnail: {
      type: String,
      default: 'http://adv.realtoptv.com:8083/image/091359iyk7dbg69q8gxfag.jpg'
    }, // 缩略图地址
    original: {
      type: String,
      default: ''
    }, // 原图地址
    resourceName: {
      type: String,
      default: '无'
    },
    itemData: {
      type: Object,
      default: () => {
        return {}
      }
    }, // 原始数据
    isClick: {
      type: Boolean,
      default: true
    }, // 是否支持单击操作
    isAction: {
      type: Boolean,
      default: false
    }, // 是否显示操作按钮
    isEdit: {
      type: Boolean,
      default: false
    }, // 是否显示编辑按钮
    radioStatus: {
      type: Boolean,
      default: false
    }, // 选中状态
    selectType: {
      type: String,
      default: 'checkBox'
    } // 'checkBox'多选 'radio' 单选
  },
  data() {
    return {
      checkBoxStatus: false
    }
  },
  computed: {
    style: function() {
      return {
        marginRight: this.marginRight + 'px',
        marginBottom: this.marginBottom + 'px',
        marginLeft: this.marginLeft + 'px',
        backgroundColor: this.selectedStatus ? '#ebebeb' : ''
      }
    },
    selectedStatus: function() {
      return this.selectType === 'checkBox' ? this.checkBoxStatus : this.radioStatus
    }
  },
  watch: {},
  mounted() {
  },
  methods: {
    clickSelect() {
      if (this.isClick) {
        if (this.selectType === 'checkBox') {
          this.checkBoxStatus = !this.checkBoxStatus
          this.$emit('select', this.itemData, this.checkBoxStatus)
        } else {
          this.$emit('select', this.itemData, this.itemData.id)
        }
      }
    },
    elementDown(e) {
      this.$emit('elementDown', e, this.itemData)
    },
    editResource() {
      this.$emit('editResource', this.itemData)
    },
    delResource() {
      this.$emit('delResource', this.itemData)
    },
    closeSelect() {
      this.checkBoxStatus = false
    } // 恢复选择状态,使用方法this.$refs.***.forEach(item=>{item.closeSelect()})
  }
}
</script>

<style scoped lang="sass">
  .resourceBox
    display: inline-block
    width: 170px
    height: 180px
    overflow: hidden
    cursor: pointer
    padding: 10px 15px
    border-radius: 5px
    position: relative
    &:hover
      background-color: #ebebeb !important
      .action
        display: block
        span
          &:hover
            color: red

    .action
      position: absolute
      display: none
      right: 15px
      padding: 5px
      background-color: rgba(63, 158, 255, 0.6)
      border-radius: 0 0 0 10px
      span
        padding: 5px
        color: white
    .imgBox
      width: 140px
      height: 130px
      display: flex
      justify-content: center
      align-items: center
      background-color: white
      border: 1px solid #e7e7e7
      img
        max-width: 120px
        max-height: 120px
    p
      min-width: 20px
      margin-top: 10px
      text-align: center
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap

  .item-status-label
    display: block
    position: absolute
    right: -15px
    top: -7px
    width: 46px
    height: 26px
    background: #13ce66
    text-align: center
    transform: rotate(45deg)
    box-shadow: 0 1px 1px #ccc
    i
      font-size: 12px
      margin-top: 12px
      transform: rotate(-45deg)
      color: white
</style>
