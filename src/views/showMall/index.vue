<template>
  <div id="template" class="padding">
    <el-row :gutter="10">
      <el-col>
        <el-card>
          <div slot="header">
            <h2>{{ templateTitle }}</h2>
          </div>
          <el-row type="flex" justify="space-between">
            <el-col :xs="10" :xl="10">
              <div class="operateArea">
                <el-button type="primary" size="small" icon="el-icon-plus" @click="openTemplateParamsDialog">新增</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="delTemplate">删除</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <div id="resourceArea">
              <resource-thumbnail
                v-for="item of templateList"
                ref="resources"
                :key="item.id"
                :margin-right="24"
                :margin-left="24"
                :thumbnail="item.thumbnail + '?l=' + Math.random()"
                :resource-name="item.name"
                :radio-status="item.id === selected"
                :item-data="item"
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
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="templateDialog"
      :show-close="false"
      custom-class="resetDialog"
      :close-on-press-escape="false"
      :modal="false"
      fullscreen
    >
      <template-mack
        v-if="hackReset"
        ref="templateMack"
        :operate-type="operateType"
        :template-width="templateWidth"
        :template-height="templateHeight"
        :template-info="newTemplateInfo"
        @onClose="templateDialogClose"
      />
    </el-dialog>
    <el-dialog
      :visible.sync="setTemplateParamsDialog"
      title="新建模板"
      width="400px"
    >
      <el-form ref="newTemplateForm" :rules="rules" :model="newTemplateForm" label-width="80px">
        <el-form-item label="模板名称" prop="name">
          <el-input v-model="newTemplateForm.name" maxlength="10" />
        </el-form-item>
        <el-form-item label="节目时长">
          <el-select v-model="newTemplateForm.programTime" style="width: 100%;">
            <el-option v-for="item in programTimeList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="分辨率">
          <el-row>
            <el-form-item prop="resolution">
              <el-select v-model="newTemplateForm.resolution" style="width: 100%;">
                <el-option v-for="item in resolution" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-row>
          <el-row v-if="newTemplateForm.resolution === 'user-defined'" style="margin-top: 20px">
            <el-col :span="11">
              <el-form-item prop="width">
                <el-input v-model.number="newTemplateForm.width" style="width: 100%;" placeholder="宽" />
              </el-form-item>
            </el-col>
            <el-col :span="2" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-form-item prop="height">
                <el-input v-model.number="newTemplateForm.height" style="width: 100%;" placeholder="高" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setTemplateParamsDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmNewParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import resourceThumbnail from '@/components/resourceThumbnail'
import templateMack from '@/components/templateMake'

import { getTemplate, delTemplate } from '@/api/template'

export default {
  name: 'Index',
  components: {
    resourceThumbnail,
    templateMack
  },
  data() {
    return {
      templateGroupList: [],
      templateList: [],
      selectedTemplate: [],
      templateTitle: '模板商城',
      templateDialog: false,
      setTemplateParamsDialog: false,
      operateType: 'add', // 操作类型（可能值：add,edit）
      newTemplateForm: {
        name: '',
        programTime: 0,
        resolution: '1280*720',
        width: '',
        height: ''
      },
      newTemplateInfo: {
        name: '',
        programTime: '',
        treeId: 0,
        width: '',
        height: '',
        resolution: ''
      },
      resolution: [
        {
          value: 'user-defined',
          label: '自定义分辨率'
        },
        {
          value: '1280*720',
          label: '1280*720'
        }, {
          value: '1920*1080',
          label: '1920*1080'
        }, {
          value: '1080*1770',
          label: '1080*1770'
        }, {
          value: '720*1280',
          label: '720*1280'
        }, {
          value: '1920*200',
          label: '1920*200'
        }, {
          value: '1080*1920',
          label: '1080*1920'
        }],
      templateWidth: 0,
      templateHeight: 0,
      pageNo: 1,
      pageSize: 21,
      pageTotal: 0,
      rules: {
        name: [{ required: true, message: '此项不能为空', trigger: 'blur' }],
        resolution: [{ required: true, message: '此项不能为空', trigger: 'blur' }],
        width: [{ required: false, trigger: 'blur' }, { type: 'number', message: '必须为数字值' }],
        height: [{ required: false, trigger: 'blur' }, { type: 'number', message: '必须为数字值' }]
      },
      hackReset: true, // hack方法，为了让组件重新加载
      searchContent: '',
      isSearch: false, // 是否搜索
      selected: ''
    }
  },
  computed: {
    programTimeList: function() {
      const list = [{ label: '默认', value: 0 }]
      for (let i = 5; i <= 60; i += 5) {
        list.push({
          label: i + '秒',
          value: i
        })
      }
      return list
    }
  },
  watch: {},
  mounted() {
    this.getTemplateList()
  },
  methods: {
    getTemplateList() {
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      if (this.isSearch) {
        params['name'] = this.searchContent
      }
      getTemplate(params).then(res => {
        this.templateList = res.cust.temList
        this.pageTotal = res.cust.pages.total
        this.isSearch = false
      })
    }, // 获取模板list
    openTemplateParamsDialog() {
      this.setTemplateParamsDialog = true
      if (this.$refs.newTemplateForm !== undefined) {
        this.$refs.newTemplateForm.resetFields()
      }
    }, // 打开新建模板参数
    confirmNewParams() {
      this.$refs.newTemplateForm.validate(valid => {
        if (valid) {
          if (this.newTemplateForm.resolution !== 'user-defined') {
            this.templateWidth = parseInt(this.newTemplateForm.resolution.split('*')[0])
            this.templateHeight = parseInt(this.newTemplateForm.resolution.split('*')[1])
          } else {
            this.templateWidth = this.newTemplateForm.width
            this.templateHeight = this.newTemplateForm.height
            this.newTemplateForm.resolution = this.templateWidth + '*' + this.templateHeight // 转字符串分辨率
          }
          this.setTemplateParamsDialog = false

          this.newTemplateInfo = {
            name: this.newTemplateForm.name,
            programTime: this.newTemplateForm.programTime,
            treeId: this.treeId,
            resolution: this.newTemplateForm.resolution
          }
          this.operateType = 'add'
          this.templateDialog = true
          /* hack方法，让组件重新加载*/
          this.hackReset = false
          this.$nextTick(() => {
            this.hackReset = true
          })
        }
      })
    }, // 确认新建模板参数
    templateDialogClose() {
      this.templateDialog = false
      this.newTemplateInfo = {}
      // 清空选择状态
      if (this.$refs.resources !== undefined) {
        this.$refs.resources.forEach(item => {
          item.closeSelect()
        })
      }
      this.getTemplateList()
    }, // 关闭模板弹窗
    resourceSelect(data, id) {
      this.selected = id
      this.newTemplateInfo = data
    }, // 选择模板
    delTemplate() {
      if (this.newTemplateInfo.id === undefined) {
        this.$message({ type: 'warning', message: '未选择模板' })
        return false
      }
      this.$confirm('此操作将永久删除该项, 是否删除?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          id: this.newTemplateInfo.id
        }
        delTemplate(params).then(res => {
          this.$message({ type: 'success', message: res.info })
          this.getTemplateList()
          this.newTemplateInfo = {}
        })
      })
    }, // 删除模板
    pageChange(val) {
      this.pageNo = val
      this.getTemplateList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-expand-details-operate{
    .el-form-item{
      margin-bottom: 0
    }
  }
  /deep/.resetDialog>.el-dialog__header{
    padding: 0!important
  }
</style>
