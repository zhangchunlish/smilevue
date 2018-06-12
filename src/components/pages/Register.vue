<template>
    <div>
        <van-cell-group>
            <van-field
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username = ''"
            />

            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
            />
        </van-cell-group>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>

</style>


