<template>
    <section id="webProjectSave">
        <el-dialog title="收货地址" :visible.sync="isShow" :append-to-body="true">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="项目编号" prop="projectCode">
                <el-input v-model="ruleForm.projectCode"></el-input>
            </el-form-item>
            <el-form-item label="项目名称" prop="projectName">
                <el-input v-model="ruleForm.projectName"></el-input>
            </el-form-item>
            <el-form-item label="项目类型" prop="type">
                <el-select v-model="ruleForm.type" placeholder="请选择">
                    <el-option label="前端" value="web"></el-option>
                    <el-option label="后端" value="java"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否启用" prop="isEnable">
                <el-switch v-model="ruleForm.isEnable"></el-switch>
            </el-form-item>
            <el-form-item label="CSS路径" prop="cssPath">
                <el-input v-model="ruleForm.cssPath"></el-input>
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <span slot="tip" class="el-upload__tip" style="margin-left: 10px;">只能上传jpg/png文件，且不超过500kb</span>
                </el-upload>
            </el-form-item>
            <el-form-item label="JS路径" prop="jsPath">
                <el-input v-model="ruleForm.jsPath"></el-input>
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <span slot="tip" class="el-upload__tip" style="margin-left: 10px;">只能上传jpg/png文件，且不超过500kb</span>
                </el-upload>
            </el-form-item>
            <el-form-item label="备注" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">确 定</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button @click="cancelDialog()">取 消</el-button>
        </span>
        </el-dialog>
    </section>
</template>

<script>
    import $http from '@/api/http';
    import api from '@/api/api';

    export default {
        name: 'web-project-save',
        data() {
            return {
                ruleForm: {
                    id: '',
                    projectCode: '',
                    projectName: '',
                    type: '',
                    isEnable: false,
                    cssPath: '',
                    jsPath: '',
                    desc: ''
                },
                rules: {
                    projectCode: [
                        {required: true, message: '请输入项目编号', trigger: 'blur'}
                    ],
                    projectName: [
                        {required: true, message: '请输入项目名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    type: [
                        {required: true, message: '请选择项目类型', trigger: 'change'}
                    ],
                    cssPath: [
                        {required: true, message: '请输入CSS文件路径', trigger: 'blur'}
                    ],
                    jsPath: [
                        {required: true, message: '请输入JS文件路径', trigger: 'blur'}
                    ],
                    desc: [
                        {required: true, message: '请输入备注内容', trigger: 'blur'}
                    ]
                },
                loading: false,
                isShow: false
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        let param = Object.assign({}, this.ruleForm);
                        this.loading = true;
                        $http.get(api.coreSaveWebProject).then(res => {
                            console.log(res.data);
                            this.loading = false;
                            this.cancelDialog();
                        });
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            cancelDialog() {
                this.isShow = false;
            },
            openDialog() {
                console.log(this);
                this.ruleForm = this.$options.data().ruleForm;
                this.isShow = true;
            },
            getProjectDetail(id) {
                let param = {
                    id: id
                };
                $http.get(api.coreGetWebProject, {params: param}).then(res => {
                    console.log(res.data);
                    this.ruleForm = Object.assign(this.ruleForm, res.data);
                });
            }
        }
    };
</script>

<style scoped>

</style>
