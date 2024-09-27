<template>
    <div>
        <el-container class="move-up">
            <el-aside :style="{ width: isCollapse ? '64px' : asidWidth }" style="height: 800px; background-color: #8c939d; color: white;">
                <div style="height: 60px; background-color: #8c939d; color: white; display: flex; align-items: center; justify-content: center;">
                    <img src="@/assets/4.png" alt="" style="width: 40px; height: 40px;">
                    <transition name="el-fade-in">
                        <span style="margin-left: 5px; font-size: 20px;" v-show="!isCollapse">街道管理</span>
                    </transition>
                </div>
                <el-menu
                    :collapse="isCollapse"
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    style="padding: 10px 0;">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <transition name="el-fade-in">
                                <span v-if="!isCollapse">用户信息</span>
                            </transition>
                        </template>
                        <el-menu-item index="1-1" @click="selectComponent('userInfo')">用户信息</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <transition name="el-fade-in">
                                <span v-if="!isCollapse">员工信息</span>
                            </transition>
                        </template>
                        <el-menu-item index="2-1" @click="selectComponent('employeeInfo')">员工信息</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container>
                <el-header style="height: 60px; background-color: #888; color: white; display: flex; align-items: center; justify-content: space-between;">
                    <el-button
                        icon="el-icon-s-fold"
                        @click="toggleCollapse"
                        circle
                        style="background-color: transparent; color: white;">
                    </el-button>
                    <el-dropdown placement="bottom">
                        <div style="display: flex; align-items: center; cursor: default;">
                            <img src="@/assets/4.png" alt="" style="width: 40px; height: 40px;">
                            <span>管理员</span>
                        </div>
                    </el-dropdown>
                </el-header>
                <el-main>
                    <router-view></router-view> <!-- 动态加载主体部分 -->
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            asidWidth: '200px', // 侧边栏宽度
            isCollapse: false    // 控制侧边栏是否折叠
        };
    },
    methods: {
        toggleCollapse() {
            this.isCollapse = !this.isCollapse; // 切换侧边栏折叠状态
        },
        selectComponent(component) {
            // 根据选择的组件跳转到相应的路由
            if (component === 'userInfo') {
                this.$router.push({ path: '/SuperAdmin/UserInfo' });
            } else if (component === 'employeeInfo') {
                this.$router.push({ path: '/SuperAdmin/EmployeeInfo' });
            }
        }
    }
}
</script>

<style>
.move-up {
  position: relative;
  top: -63px; 
}
.el-main {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); 
    padding: 20px; 
    overflow: auto;
}
</style>
