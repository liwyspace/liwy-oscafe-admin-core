<template>
    <section id="webProject">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>核心基础</el-breadcrumb-item>
            <el-breadcrumb-item>前端项目配置</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 工具条 -->
        <el-row class="toolbar">
            <el-button type="primary" icon="el-icon-circle-plus" @click="saveDialog = true">添加</el-button>
            <!-- 搜索模块 -->
            <el-form :inline="true" :model="query" class="demo-form-inline" style="float:right;">
                <el-form-item label="项目编号">
                    <el-input v-model="query.projectCode" placeholder="liwy-oscafe-admin-core"></el-input>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model="query.projectName" placeholder="开源小屋核心模块"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker
                        v-model="query.createTime"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="loadData" :loading="loading">查询</el-button>
                </el-form-item>
            </el-form>
        </el-row>

        <!-- 表格 -->
        <el-table
            :data="projectDate"
            stripe
            v-loading="loading"
            style="width: 100%;">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="editWebProject(scope.row)">编辑
                    </el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="deleteWebProject(scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="projectCode"
                label="项目编号"
                sortable
                width="150">
            </el-table-column>
            <el-table-column
                prop="projectName"
                label="项目名称"
                width="150">
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="创建时间"
                sortable
                width="150">
            </el-table-column>
            <el-table-column
                prop="cssPath">
            </el-table-column>
            <el-table-column
                prop="jsPath"
                label="JS文件">
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
        </el-pagination>

        <!-- 保存弹窗 -->
        <el-dialog title="收货地址" :visible.sync="saveDialog" :append-to-body="true">
            <WebProjectSave @closeDialog="closeSaveDialog()"></WebProjectSave>
        </el-dialog>
    </section>
</template>

<script>
    import $http from '@/api/http';
    import api from '@/api/api';

    import WebProjectSave from '@/components/WebProjectSave';

    export default {
        name: 'HelloWorld',
        components: {
            WebProjectSave
        },
        data() {
            return {
                query: {
                    projectCode: '',
                    projectName: '',
                    createTime: ''
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                loading: false,
                projectDate: [],
                currentPage: 4,
                saveDialog: false
            };
        },
        mounted() {
            this.loadData();
        },
        methods: {
            loadData() {
                let query = Object.assign({}, this.query);
                this.loading = true;
                $http.get(api.coreQueryWebProjectList, {params: query}).then(res => {
                    this.projectDate = res.data;
                    this.loading = false;
                });
            },
            closeSaveDialog() {
                this.saveDialog = false;
            },
            deleteWebProject(row) {
                console.log(row);
            },
            editWebProject(row) {
                console.log(row);
            }
        }
    };
</script>

<style lang="scss" scoped>
    #webProject {
        .toolbar {
            margin-top: 20px;
        }
        .el-pagination {
            padding: 20px;
        }
    }
</style>
