<template>
	<div class="error-box">
    <h1>500</h1>
    <h3 class="font-bold">你没有权限访问...</h3>
    <el-button type="info" @click="$router.go(-1)">返回</el-button>
	</div>
</template>
<style lang="scss">
	.error-box{
    max-width: 400px;
    z-index: 100;
    margin: 0 auto;
    padding-top: 40px;
    text-align: center;

    h1{
	    font-size: 100px;
    }

    h3{
	    font-weight: 600;
    }
	}
</style>