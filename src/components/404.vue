<template>
    <div class="box">
        <div class="center">
            <img src="../assets/404.png" alt="">
            <div class="text">
                <p>404:页面找不到了...</p>
                <p>请检查网页路径    -_-</p>
                <p>或联系站长检查站点:166-1888</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.box{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .center{
        width: 500px;
        height: 300px;
        position:relative ;
        // flex-direction: ;
        img{
            width: 100%;
        }
        .text{
            position: absolute;
            top: 0;
            right:-40%;
            p{
                &:first-child{
                    font-size: 24px;
                    font-weight: 700;
                    color: #55aafe;
                }
                &:nth-child(2){
                    font-size: 16px;
                    margin-top: 20px;
                    color: rgb(138, 141, 141);
                }
                &:last-child{
                    font-size: 13px;
                    margin-top: 20px;
                    color: rgb(138, 141, 141);
                }
                width: 300px;
            }
        }
    }
}
</style>