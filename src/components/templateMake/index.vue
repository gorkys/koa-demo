<template>
  <div id="templateMake">
    <el-row :gutter="10">
      <el-col :md="24" :lg="4">
        <!--<el-row class="infoRow">
          <el-card >
            <div slot="header">
              <h3>添加元素</h3>
            </div>
            <div class="operating">
              <div class="btn" title="背景" @click="addOther('bg')">
                <i class="iconfont icon-beijing"/><p>背景</p>
              </div>
              <div class="btn" title="图片" @click="addElement('image',true)">
                <i class="iconfont icon-tupian"/><p>图片</p>
              </div>
              <div :style="{cursor:hasVideo?'not-allowed':'pointer'}" class="btn" title="视频" @click="addElement('video',true)">
                <i
                  :style="{color:hasVideo?'rgb(195, 195, 195)':'#5ea2d3'}"
                  class="iconfont icon-shipin"
                  style="font-size: 34px;margin-left: -2px;"/><p>视频</p>
              </div>
              <div :style="{cursor:hasAudio?'not-allowed':'pointer'}" class="btn" title="音频" @click="addOther('audio')">
                <i
                  :style="{color:hasAudio?'rgb(195, 195, 195)':'#5ea2d3'}"
                  class="iconfont icon-yinle"/><p>音频</p>
              </div>
              <div class="btn" title="动态文本" @click="addElement('html',true)">
                <i class="iconfont icon-html" style="font-size: 31px"/><p>网页</p>
              </div>
              <div class="btn" title="文本" @click="addElement('text',false)">
                <i class="iconfont icon-txt"/><p>静态文本</p>
              </div>
              <div class="btn" title="动态文本" @click="addElement('scroll',false)">
                <i class="iconfont icon-danmushu" style="font-size: 35px;margin-left: -2px;"/><p>动态文本</p>
              </div>
            </div>
          </el-card>
        </el-row>-->
        <el-row class="infoRow">
          <el-card>
            <div slot="header">
              <h3>模板信息</h3>
            </div>
            <el-form ref="templateInfo" label-position="left" label-width="68px">
              <el-form-item label="模板名称">
                <el-input v-model="templateInfo.name" maxlength="10" size="mini" />
              </el-form-item>
              <el-form-item label="节目时长">
                <b>{{ templateInfo.programTime===0?'默认':`${templateInfo.programTime}秒` }}</b>
              </el-form-item>
              <el-form-item label="终端类型">
                <b>{{ templateInfo.terminalType }}</b>
              </el-form-item>
              <el-form-item label="分辨率">
                <el-input v-model="templateInfo.resolution" disabled size="mini" />
              </el-form-item>
            </el-form>
          </el-card>
        </el-row>
        <el-row class="infoRow">
          <el-card>
            <div slot="header">
              <h3>元素信息</h3>
            </div>
            <el-form ref="elementInfo" :model="elementInfo" label-position="left" label-width="70px">
              <el-form-item label="元素名称">
                <el-input v-model="elementInfo.name" disabled size="mini" />
              </el-form-item>
            </el-form>
          </el-card>
        </el-row>
        <el-row class="infoRow">
          <el-card>
            <div slot="header">
              <h3>参数信息</h3>
            </div>
            <el-form ref="paramsInfo" label-position="left" label-width="40px">
              <el-form-item label="X 轴">
                <el-input-number v-model.number="paramsInfo.x" :min="0" :disabled="zoomMode===1" :max="templateWidth" :precision="0" size="mini" style="width: 100%" @change="paramsChange" />
              </el-form-item>
              <el-form-item label="Y 轴">
                <el-input-number v-model.number="paramsInfo.y" :min="0" :disabled="zoomMode===1" :max="templateHeight" :precision="0" size="mini" style="width: 100%" @change="paramsChange" />
              </el-form-item>
              <el-form-item label="宽度">
                <el-input-number v-model.number="paramsInfo.w" :min="0" :disabled="zoomMode===1" :max="templateWidth" :precision="0" size="mini" style="width: 100%" @change="paramsChange" />
              </el-form-item>
              <el-form-item label="高度">
                <el-input-number v-model.number="paramsInfo.h" :min="0" :disabled="zoomMode===1" :max="templateHeight" :precision="0" size="mini" style="width: 100%" @change="paramsChange" />
              </el-form-item>
              <el-form-item label="层级">
                <el-input-number v-model.number="paramsInfo.z" :min="1" :max="999" size="mini" style="width: 100%" @change="paramsChange" />
              </el-form-item>
            </el-form>
            <!--<div v-if="zoomMode===0" style="margin-top: 5px"><b style="color: #F56C6C">提示</b><span style="color: #99a9bf"> : 调整大小与位置请选择"原始尺寸"</span></div>-->
          </el-card>
        </el-row>
      </el-col>
      <el-col :md="24" :lg="16">
        <el-card id="editBox" :body-style="{ maxWidth: clientWidth + 'px',maxHeight:'780px',backgroundColor:'#e4e4e4',overflow:proportion<1?'hidden':'auto',display: 'flex',justifyContent: 'center',alignItems: 'center'}">
          <div slot="header" style="display: flex;justify-content: space-between;align-items: center;">
            <div class="toolBox">
              <!--<span class="svg-container" title="添加背景" @click="addOther('bg')">
                <svg-icon icon-class="background" />
              </span>-->
              <span class="svg-container" title="添加图片" @click="addElement('image',[200,150])">
                <svg-icon icon-class="image" />
              </span>
              <span
                class="svg-container"
                title="添加视频"
                :style="{cursor:hasVideo?'not-allowed':'pointer',color:hasVideo?'rgb(195, 195, 195)':'#409EFF'}"
                @click="addElement('video',[200,150])"
              >
                <svg-icon icon-class="video" />
              </span>
              <!--<span
                class="svg-container"
                title="添加音频"
                :style="{cursor:hasAudio?'not-allowed':'pointer',color:hasAudio?'rgb(195, 195, 195)':'#409EFF'}"
                @click="addElement('audio',[50,50])"
              >
                <svg-icon icon-class="audio" />
              </span>-->
              <span class="svg-container" title="添加文字" @click="addElement('text',[200,40])">
                <svg-icon icon-class="text" />
              </span>
              <span class="svg-container" title="添加滚动文字" @click="addElement('scroll',[200,40])">
                <svg-icon icon-class="scroll" />
              </span>
              <el-divider direction="vertical" />
              <span class="svg-container" :title="locking?'锁定':'解锁'" @click="onLocking">
                <svg-icon v-if="locking" icon-class="lock" />
                <svg-icon v-else icon-class="unlock" />
              </span>
              <el-divider direction="vertical" />
              <span class="svg-container" title="预览节目">
                <svg-icon icon-class="preview" />
              </span>
              <span class="svg-container" title="保存" @click="screenshot">
                <svg-icon icon-class="save" />
              </span>
              <span class="svg-container" title="退出" @click="onClose">
                <svg-icon icon-class="backOut" />
              </span>
            </div>
            <!--<el-form label-width="80px" label-position="left">
              <el-form-item label="缩放模式">
                <el-radio-group v-model="zoomMode">
                  <el-radio :label="0">适应窗口</el-radio>
                  <el-radio :label="1">原始尺寸</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>-->
          </div>
          <div v-if="hackReset" id="editArea" :style="templateStyle" class="editArea">
            <vdr
              v-for="(item,index) in elements"
              :key="item.id"
              :parent="true"
              :x="item.x"
              :y="item.y"
              :w="item.width"
              :h="item.height"
              :z="item.zIndex"
              :snap="true"
              :scale-ratio="proportion"
              :snap-tolerance="5"
              :prevent-deactivation="true"
              :resizable="item.type!=='audio'? item.locking : false"
              :draggable="item.locking"
              :active="item.active"
              @activated="onActivated(item)"
              @resizestop="onResizstop(arguments, item)"
              @dragstop="onDragstop(arguments, item)"
              @resizing="onResizing"
              @dragging="onDragging"
            >
              <div :class="{[item.type]:true}">
                <img :src="item.setting.thumbnail" style="width: 100%;height: 100%"/>
                <div class="action">
                  <span v-if="item.type!=='bg'" @click="delElement(item.type,index)"><i class="el-icon-delete" /></span>
                </div>
              </div>
            </vdr>
          </div>
        </el-card>
      </el-col>
      <el-col :md="24" :lg="4">
        <el-row class="infoRow">
          <el-card>
            <div slot="header">
              <h3>操作</h3>
            </div>
            <!--图片-->
            <el-form v-show="typeSwitch==='image'|| typeSwitch==='audio'||typeSwitch==='video'" label-position="top" label-width="100px" size="small" class="table-expand-details">
              <el-form-item label="插入资源">
                <div v-show="settingForm.thumbnail !== ''" class="image-list">
                  <img :src="settingForm.thumbnail">
                  <span class="mask">
                    <i class="el-icon-delete" @click="delResource" />
                  </span>
                </div>
                <div v-show="settingForm.thumbnail === ''" class="addImage" @click="addResource">
                  <i class="el-icon-plus" />
                </div>
              </el-form-item>
              <el-form-item v-show="typeSwitch==='image'" label="切换效果">
                <el-select v-model="settingForm.switchEffects">
                  <el-option label="无效果" value="0" />
                </el-select>
              </el-form-item>
              <el-form-item v-show="typeSwitch==='image'" label="入场效果">
                <el-select v-model="settingForm.admissionEffect">
                  <el-option label="无效果" value="0" />
                </el-select>
              </el-form-item>
            </el-form>
            <!--文本与动态文本-->
            <el-form v-show="typeSwitch==='text'||typeSwitch==='scroll'" label-position="top" label-width="100px" size="small" class="table-expand-details">
              <el-form-item label="文本内容" prop="content">
                <el-input v-model="settingForm.textContent" />
              </el-form-item>
              <el-row>
                <el-col :md="8">
                  <el-form-item label="字体颜色" prop="color">
                    <el-color-picker v-model="settingForm.textColor" show-alpha color-format="rgb" />
                  </el-form-item>
                </el-col>
                <el-col :md="8" :offset="4">
                  <el-form-item label="背景颜色" prop="bgColor">
                    <el-color-picker v-model="settingForm.bgColor" show-alpha color-format="rgb" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :md="8">
                  <el-form-item label="字体样式">
                    <ul class="fontStyle">
                      <li :style="{ backgroundColor: settingForm.bold ? '#ebebeb' : '' }" @click="setFontStyleB"><svg-icon icon-class="bold" /></li>
                      <li :style="{ backgroundColor: settingForm.italic ? '#ebebeb' : '' }" @click="setFontStyleT"><svg-icon icon-class="italic" /></li>
                      <li :style="{ backgroundColor: settingForm.underline ? '#ebebeb' : '' }" @click="setFontStyleU"><svg-icon icon-class="underline" /></li>
                    </ul>
                  </el-form-item>
                </el-col>
                <el-col :md="8" :offset="4">
                  <el-form-item label="对齐方式" prop="align">
                    <ul class="alignStyle">
                      <li :style="{ backgroundColor: settingForm.align === 'left' ? '#ebebeb' : '' }" @click="setAlignStyle('left')"><svg-icon icon-class="align-left" /></li>
                      <li :style="{ backgroundColor: settingForm.align === 'center' ? '#ebebeb' : '' }" @click="setAlignStyle('center')"><svg-icon icon-class="align-center" /></li>
                      <li :style="{ backgroundColor: settingForm.align === 'right' ? '#ebebeb' : '' }" @click="setAlignStyle('right')"><svg-icon icon-class="align-right" /></li>
                    </ul>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item v-show="typeSwitch==='scroll'" label="滚动速度" prop="speed">
                <el-select v-model="settingForm.speed">
                  <el-option
                    v-for="item in speedList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item v-show="typeSwitch==='scroll'" label="滚动方向" prop="direction">
                <el-select v-model="settingForm.direction">
                  <el-option
                    v-for="item in directionList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="字体大小" prop="size">
                <el-select v-model="settingForm.fontSize" filterable>
                  <el-option
                    v-for="item in sizeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="字体类型" prop="font">
                <el-select v-model="settingForm.font">
                  <el-option
                    v-for="item in fontList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-form>
            <el-button v-show="typeSwitch!==''" type="primary" style="width: 100%;margin-top: 20px" size="small" @click="saveSetting">保存设置</el-button>
            <div style="text-align: center">
              <span v-show="typeSwitch===''" style="color: #b3b3b3">没有选择元素</span>
            </div>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog
      title="插入资源"
      :visible.sync="resourceDialog"
      :modal-append-to-body="false"
      :close-on-press-escape="false"
      width="50%"
    >
      <div style="padding: 20px 0;">
        <div id="resourceArea">
          <resource-thumbnail
            v-for="item of resourceList"
            :key="item.id"
            :thumbnail="item.thumbnail"
            :original="item.url"
            :resource-name="item.name"
            :item-data="item"
            :radio-status="item.id === selected"
            select-type="radio"
            @select="resourceSelect"
          />
        </div>
        <el-pagination
          :total="pageTotal"
          :page-size="pageSize"
          style="float: right;margin-top: 2rem"
          layout="total, prev, pager, next"
          @current-change="pageChange"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="confirmAdd">确 认</el-button>
      </span>
    </el-dialog> <!--加入音频与背景-->
  </div>
</template>

<script>
import vdr from 'vue-draggable-resizable-gorkys'
// import vdr from '@/components/vdr/components/vue-draggable-resizable'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
import html2canvas from 'html2canvas'
import resourceThumbnail from '@/components/resourceThumbnail'
import {
  getImage,
  getVideo,
  getAudio } from '@/api/resource'
import { addTemplate } from '@/api/template'
export default {
  name: 'Index',
  components: { vdr, resourceThumbnail },
  props: {
    operateType: {
      type: String,
      default: 'add'
    }, // 操作类型（可能值：add,edit）
    templateType: {
      type: String,
      default: 'system'
    },
    templateWidth: {
      type: Number,
      default: 900
    },
    templateHeight: {
      type: Number,
      default: 600
    },
    templateInfo: {
      type: Object,
      default: () => {
        return {}
      } // 模板信息
    },
    advSign: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      resourceList: [],
      selectedResourceInfo: [],
      pageSize: 8,
      pageNo: 1,
      pageTotal: 0,
      selected: '', // 单选

      elements: [],
      zIndex: 10,
      treeId: 0,
      hasVideo: false,
      hasAudio: false,
      hasBG: false,
      resourceDialog: false,
      imageCount: 1,
      textCount: 1,
      scrollCount: 1,
      htmlCount: 1,
      elementInfo: {
        name: ''
      }, // 元素信息
      paramsInfo: {
        id: '',
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        z: 0
      }, // 参数信息
      clientWidth: 1, // 编辑区宽度
      zoomMode: 0,
      hackReset: true,
      // 操作属性
      settingForm: {
        resourceAddress: '', // 资源地址
        thumbnail: '',
        switchEffects: '0', // 切换效果
        admissionEffect: '0', // 入场效果
        textContent: '', // 文本内容
        textColor: 'rgba(0, 0, 0, 1)', // 文本颜色
        bgColor: 'rgba(0, 0, 0, 0)', // 背景颜色
        bold: false, // 加粗
        italic: false, // 斜体
        underline: false, // 下滑线
        align: 'left', // 对齐方式
        speed: 1, // 滚动速度
        direction: 0, // 滚动方向
        fontSize: 16, // 文字大小
        font: 'SimHei' // 文本字体
      },
      fontForm: {},
      speedList: [
        {
          label: '慢速',
          value: 0
        },
        {
          label: '普通',
          value: 1
        },
        {
          label: '快速',
          value: 2
        }
      ], // 滚动速度
      directionList: [
        {
          label: '从左到右',
          value: 0
        },
        {
          label: '从右到左',
          value: 1
        }
      ], // 滚动方向
      fontList: [
        { value: 'SimSun', label: '宋体' },
        { value: 'Time News Roman', label: '新罗马体' },
        { value: 'SimHei', label: '黑体' },
        { value: 'Microsoft YaHei', label: '雅黑' }
      ], // 字体列表
      locking: true,
      typeSwitch: ''
    }
  },
  computed: {
    templateStyle: function() {
      return {
        width: `${this.templateWidth}px`,
        height: `${this.templateHeight}px`,
        transform: `scale(${this.proportion})`
      }
    },
    // 计算模板宽高，返回合适比例
    proportion: function() {
      let width = this.templateWidth
      let height = this.templateHeight
      let pp
      if (this.zoomMode === 0) {
        if (width > this.clientWidth - 40 || height > 780) {
          /* 直接用1-0.1会出现失精度问题，所以采用除以10 或者可以使用toFixed(1)*/
          for (let i = 10; width > this.clientWidth - 40 || height > 800; i--) {
            width = this.templateWidth * (i / 10)
            height = this.templateHeight * (i / 10)
            pp = i / 10
          }
          return pp
        } else {
          return 1
        }
      } else {
        return 1
      }
    },
    sizeList: function() {
      const list = []
      for (let i = 12; i <= 100; i++) {
        list.push({
          label: i + 'px',
          value: i
        })
      }
      return list
    }
  },
  watch: {
    // 比例变动重新渲染编辑区(主要用于窗口变化)
    proportion: function() {
      this.hackReset = false
      this.$nextTick(function() {
        this.hackReset = true
      })
    }
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.windowResize, true)
  },
  mounted() {
    window.addEventListener('resize', this.windowResize, true)
    this.infoInit()
  },
  methods: {
    saveSetting() {
      const index = this.elements.findIndex(item => {
        return item.id === this.paramsInfo.id
      })
      switch (this.typeSwitch) {
        case 'image':
          if (this.settingForm.resourceAddress === '') {
            this.$message({ type: 'warning', message: '请加入资源，再保存设置' })
          } else {
            this.elements[index].setting = {
              resourceAddress: this.settingForm.resourceAddress,
              thumbnail: this.settingForm.thumbnail,
              switchEffects: this.settingForm.switchEffects,
              admissionEffect: this.settingForm.admissionEffect
            }
            this.$message({ type: 'success', message: '设置成功' })
          }

          break
        case 'video':
          if (this.settingForm.resourceAddress === '') {
            this.$message({ type: 'warning', message: '请加入资源，再保存设置' })
          } else {
            this.elements[index].setting = {
              resourceAddress: this.settingForm.resourceAddress,
              thumbnail: this.settingForm.thumbnail
            }
            this.$message({ type: 'success', message: '设置成功' })
          }
          break
        case 'audio':
          if (this.settingForm.resourceAddress === '') {
            this.$message({ type: 'warning', message: '请加入资源，再保存设置' })
          } else {
            this.elements[index].setting = {
              resourceAddress: this.settingForm.resourceAddress,
              thumbnail: this.settingForm.thumbnail
            }
            this.$message({ type: 'success', message: '设置成功' })
          }
          break
        case 'text':
          if (this.settingForm.textContent === '') {
            this.$message({ type: 'warning', message: '请填写文本内容，再保存设置' })
          } else {
            this.elements[index].setting = {
              textContent: this.settingForm.textContent,
              textColor: this.settingForm.textColor,
              bgColor: this.settingForm.bgColor,
              bold: this.settingForm.bold,
              italic: this.settingForm.italic,
              underline: this.settingForm.underline,
              align: this.settingForm.align,
              fontSize: this.settingForm.fontSize,
              font: this.settingForm.font
            }
            this.$message({ type: 'success', message: '设置成功' })
          }
          break
        case 'scroll':
          if (this.settingForm.textContent === '') {
            this.$message({ type: 'warning', message: '请填写文本内容，再保存设置' })
          } else {
            this.elements[index].setting = {
              textContent: this.settingForm.textContent,
              textColor: this.settingForm.textColor,
              bgColor: this.settingForm.bgColor,
              bold: this.settingForm.bold,
              italic: this.settingForm.italic,
              underline: this.settingForm.underline,
              align: this.settingForm.align,
              speed: this.settingForm.speed,
              direction: this.settingForm.direction,
              fontSize: this.settingForm.fontSize,
              font: this.settingForm.font
            }
            this.$message({ type: 'success', message: '设置成功' })
          }
          break
      }
    },
    pageChange(val) {
      this.pageNo = val
      this.getResource()
    }, // 分页
    resourceSelect(data, id) {
      this.selected = id
      this.selectedResourceInfo = data
    }, // 选择资源
    addResource() {
      this.resourceDialog = true
      this.selected = ''
      this.selectedResourceInfo = {}
      this.getResource()
    },
    delResource() {
      this.settingForm.resourceAddress = ''
    },
    confirmAdd() {
      if (this.selected === '') return false
      this.settingForm.thumbnail = this.selectedResourceInfo.thumbnail
      this.settingForm.resourceAddress = this.selectedResourceInfo.url
      this.resourceDialog = false
    }, // 确认添加
    getResource() {
      const params = {
        pageSize: this.pageSize,
        pageNo: this.pageNo
      }
      switch (this.typeSwitch) {
        case 'image':
          getImage(params).then(res => {
            this.resourceList = res.cust.sources
            this.pageTotal = res.cust.pages.total
          })
          break
        case 'video':
          getVideo(params).then(res => {
            this.resourceList = res.cust.sources
            this.pageTotal = res.cust.pages.total
          })
          break
        case 'audio':
          getAudio(params).then(res => {
            this.resourceList = res.cust.sources
            this.pageTotal = res.cust.pages.total
          })
          break
      }
    },
    windowResize() {
      this.infoInit()
    }, // 窗口变化
    infoInit() {
      if (this.operateType === 'edit') {
        this.elements = this.templateInfo.elements
        this.checkStatus()
      }
      this.templateInfo['terminalType'] = '安卓'
      const editBox = document.querySelector('#editBox')
      this.clientWidth = editBox.clientWidth
    }, // 模板信息初始化
    checkStatus() {
      this.elements.forEach(item => {
        switch (item.type) {
          case 'video':
            this.hasVideo = true
            this.hasAudio = true
            break
          case 'audio':
            this.hasVideo = true
            this.hasAudio = false
            this.setOther.audio = true
            break
          case 'bg':
            this.setOther.bg = true
            break
        }
      })
      const imageTemp = []
      const textTemp = []
      const scrollTemp = []
      const htmlTemp = []
      const zIndexTemp = []
      // 将所有元素的label与zIndex数值放入数组
      this.elements.forEach(item => {
        if (item.label.indexOf('image') !== -1) {
          imageTemp.push(item.label.substr(5))
        }
        if (item.label.indexOf('text') !== -1) {
          textTemp.push(item.label.substr(4))
        }
        if (item.label.indexOf('scroll') !== -1) {
          scrollTemp.push(item.label.substr(6))
        }
        if (item.label.indexOf('html') !== -1) {
          htmlTemp.push(item.label.substr(4))
        }
        zIndexTemp.push(item.zIndex)
      })
      // 求出最大值赋+1后给累加变量,编辑时增加的元素将从最大值开始累加
      this.imageCount = Math.max.apply(Math, imageTemp) + 1
      this.textCount = Math.max.apply(Math, textTemp) + 1
      this.scrollCount = Math.max.apply(Math, scrollTemp) + 1
      this.htmlCount = Math.max.apply(Math, htmlTemp) + 1
      this.zIndex = Math.max.apply(Math, zIndexTemp) + 1
    }, // 检测元素状态(编辑模板时对部分重新赋值)
    addElement(type, size) {
      const [width, height] = size
      let label
      switch (type) {
        case 'image':
          label = type + this.imageCount++
          break
        case 'video':
          label = type
          if (!this.hasVideo) {
            this.hasAudio = this.hasVideo = true
          } else {
            return false
          }
          break
        case 'text':
          label = type + this.textCount++
          break
        case 'scroll':
          label = type + this.scrollCount++
          break
        case 'html' :
          label = type + this.htmlCount++
          break
        case 'audio' :
          label = type
          if (!this.hasAudio) {
            this.hasAudio = this.hasVideo = true
          } else {
            return false
          }
          break
      }
      const zIndex = this.zIndex++
      this.elements.push({
        x: 50,
        y: 50,
        id: new Date().getTime(),
        type: type,
        width: width,
        height: height,
        label: label,
        zIndex: label === 'audio' ? 999 : zIndex,
        locking: true,
        active: false,
        setting: {}
      })
    }, // 添加元素
    onLocking() {
      const index = this.elements.findIndex(item => {
        return item.id === this.paramsInfo.id
      })
      this.locking = this.elements[index].locking = !this.elements[index].locking
    }, // 锁定元素
    onActivated(data) {
      this.elementInfo['name'] = data.label
      // 锁定
      this.locking = data.locking
      this.typeSwitch = data.type
      /* 元素保持激活状态*/
      this.elements.forEach(item => {
        item.active = false
      })
      data.active = true

      // 设置属性回显
      if (JSON.stringify(data.setting) === '{}') {
        Object.assign(this.$data.settingForm, this.$options.data().settingForm)
      } else {
        this.settingForm = { ...data.setting }
      }

      this.paramsInfo = {
        id: data.id,
        x: data.x,
        y: data.y,
        w: data.width,
        h: data.height,
        z: data.zIndex
      }
    }, // 激活元素回调
    onResizing(left, top, width, height) {
      this.paramsInfo['x'] = left
      this.paramsInfo['y'] = top
      this.paramsInfo['w'] = width
      this.paramsInfo['h'] = height
    }, // 元素缩放中回调
    onDragging(left, top) {
      this.paramsInfo['x'] = left
      this.paramsInfo['y'] = top
    }, // 元素移动中回调
    onResizstop(params, data) {
      const l = params[0]
      const t = params[1]
      const w = params[2]
      const h = params[3]

      /* 获取当前元素在elements中的Index*/
      const index = this.elements.indexOf(data)
      /* 缩放停止后获取元素信息，并还原成原始数据*/
      data['x'] = l
      data['y'] = t
      data['width'] = w
      data['height'] = h

      /* 同步数据到elements*/
      this.elements.splice(index, 1, data)

      this.paramsInfo['x'] = data.x
      this.paramsInfo['y'] = data.y
      this.paramsInfo['w'] = data.width
      this.paramsInfo['h'] = data.height
    }, // 元素缩放停止后回调
    onDragstop(params, data) {
      const l = params[0]
      const t = params[1]

      /* 获取当前元素在elements中的Index*/
      const index = this.elements.indexOf(data)
      /* 移动停止后获取元素信息，并还原成原始数据*/
      data['x'] = l
      data['y'] = t

      /* 同步数据到elements*/
      this.elements.splice(index, 1, data)

      this.paramsInfo['x'] = data.x
      this.paramsInfo['y'] = data.y
    }, // 元素移动停止后回调
    delElement(type, index) {
      if (type === 'video' || type === 'audio') this.hasAudio = this.hasVideo = false
      this.elements.splice(index, 1)
    }, // 删除元素
    saveTemplate(img) {
      /* const viewImg = document.querySelector('#viewImg')
        viewImg.src = img*/
      const data = {
        thumbnail: img, // 模板缩略图
        width: this.templateWidth, // 模板宽
        height: this.templateHeight, // 模板高
        name: this.templateInfo.name, // 模板名称
        proTime: this.templateInfo.programTime, // 模板时长
        resolution: this.templateInfo.resolution, // 模板分辨率
        terminalType: this.templateInfo.terminalType, // 终端类型
        elements: this.elements // 模板元素集合
      }
      addTemplate(data).then(res => {
        this.$message({ type: 'success', message: res.info })
        this.onClose()
      })
    }, // 保存模板
    screenshot() {
      const box = document.querySelector('#editArea')
      const options = {
        useCORS: true
      }
      html2canvas(box, options).then((canvas) => {
        const img = canvas.toDataURL('image/jpeg', 0.6)
        this.saveTemplate(img)
      })
    }, // 截图
    onClose() {
      this.$emit('onClose')
    }, // 取消
    paramsChange() {
      let temp = []
      this.elements.forEach((item, index) => {
        if (item.id === this.paramsInfo.id) {
          temp = item
          temp['x'] = this.paramsInfo.x
          temp['y'] = this.paramsInfo.y
          temp['width'] = this.paramsInfo.w
          temp['height'] = this.paramsInfo.h
          temp['zIndex'] = this.paramsInfo.z
          this.elements.splice(index, 1, temp)
        }
      })
    }, // 元素参数改变
    setFontStyleB() {
      this.settingForm.bold = !this.settingForm.bold
    }, // 设置粗体
    setFontStyleT() {
      this.settingForm.italic = !this.settingForm.italic
    }, // 设置倾斜
    setFontStyleU() {
      this.settingForm.underline = !this.settingForm.underline
    }, // 设置下滑线
    setAlignStyle(val) {
      this.settingForm.align = val
    } // 设置对齐方式
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .el-color-picker{
    width: 100%;
    .el-color-picker__trigger{
      width: 100%;
    }
  }
  .fontStyle,.alignStyle{
    font-size: 18px;
    min-width: 120px;
    display: flex;
    justify-content: space-around;
    li{
      line-height: 28px;
      cursor: pointer;
      padding: 0 5px;
      border-radius: 5px;
      &:hover{
        background-color: #ebebeb
      }
    }
  }
  .image-list,.addImage{
    margin: 5px;
    width: 200px;
    height: 200px;
    display: inline-block;
    border-radius: 6px;
    box-sizing: border-box;
    position: relative;
  }

  .image-list{
    border: 1px solid #c0ccda;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .mask{
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0,0,0,.5);
      transition: opacity .3s;
      i{
        cursor: pointer;
      }
      &:after{
          display: inline-block;
          content: "";
          height: 100%;
          vertical-align: middle;
      }
      &:hover{
        opacity: 1;
      }
    }
  }
  .addImage{
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    cursor: pointer;
    line-height: 198px;
    vertical-align: top;
    text-align: center;
    outline: none;
    i{
      font-size: 14px;
      color: #8c939d;
    }
  }
  // 重置vdr组件样式
  /deep/.vdr {
    outline: 1px dashed #dcdcdc;
    border: none;
  }
  // 组件的背景图
  .image,.text,.scroll,.video,.audio{
    height: 100%;
    width: 100%;
    position: relative;
  }
  .image{
    background: url("../../assets/template/img.png") no-repeat 100% 100%;
    background-size: 100% 100%;
  }
  .text{
    background: url("../../assets/template/text.png") no-repeat 100% 100%;
    background-size: 100% 100%;
  }
  .scroll{
    background: url("../../assets/template/scroll.png") no-repeat 100% 100%;
    background-size: 100% 100%;
  }
  .video{
    background: url("../../assets/template/video.png") no-repeat 100% 100%;
    background-size: 100% 100%;
  }
  .audio{
    background: url("../../assets/template/audio.png") no-repeat 100% 100%;
    background-size: 100% 100%;
  }
  // end
  .toolBox{
    .svg-container{
      cursor: pointer;
      font-size: 22px;
      margin: 0 5px;
      color: #409EFF;
      vertical-align: middle;
      display: inline-block;
      padding: 5px;
      &:hover{
        background: #f3f3f3;
        border-radius: 5px;
      }
    }
  }

  .operating{
    .btn{
      display: flex;
      justify-content: end;
      align-items: center;
      margin-bottom: 20px;
      cursor: pointer;
      border-radius: 5px;
      &:hover{
        background-color: rgba(233, 233, 233, 0.4)
      }
      i{
        padding-left: 20px;
        font-size: 30px;
        color: #5ea2d3
      }
      p{
        font-size: 18px;
        font-weight: bold;
        margin-left: 10px;
        width: 100%;
        text-align: center
      }
    }
  }

  .editArea{
    background-color: white;
    flex-shrink: 0;
    position: relative;
  }

  .infoRow{
    margin-bottom: 5px
  }

  .action{
    text-align: end;
    padding-top: 5px;
    position: absolute;
    right: 0;
    top: 0;
    display: none;
    i{
      margin-right: 5px;
      color: red;
      font-size: 1.6rem;
      cursor: pointer;
    }

  }

  .vdr:hover .action{
    display: block
  }

  /deep/ .el-form-item{
    margin-bottom: 0
  }
</style>
