<template>
    <div class="delay-tips">
        <span>There is a delay of {{ delayTimestamp }}ms, and a backlog of {{ delayCount * 200 }}ms.</span>
    </div>
</template>
<script setup>
    defineProps({
        delayTimestamp: {
            type: Number,
            defalult: 0
        },
        delayCount: {
            type: Number,
            defalult: 0
        }
    });
</script>
<style lang="less" scoped>
    .delay-tips {
        font-size: 12px;
        color: #dc3545;
    }
</style>
