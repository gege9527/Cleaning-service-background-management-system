<template>
    <div class="order">
        <el-tabs v-model="activeName">
            <el-tab-pane label="所有订单" name="AllOrder">
                <el-table>
                    <el-table-colum></el-table-colum>
                    <el-table-colum></el-table-colum>
                    <el-table-colum></el-table-colum>
                    <el-table-colum></el-table-colum>
                    <el-table-colum></el-table-colum>
                    <el-table-colum></el-table-colum>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="待支付" name="WaitPay"></el-tab-pane>
            <el-tab-pane label="待派单" name="WaitSend"></el-tab-pane>
            <el-tab-pane label="待接单" name="WaitReceive"></el-tab-pane>
            <el-tab-pane label="待服务" name="WaitService"></el-tab-pane>
            <el-tab-pane label="待确认" name="WaitSure"></el-tab-pane>
            <el-tab-pane label="已完成" name="Complate"></el-tab-pane>
        </el-tabs>
       
    </div>
</template>
<script>
export default {
    data(){

    },
}
</script>
<style scoped>

</style>