<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <div class="avatar">
        <slot name="user-icon">
          <img src="~assets/img/profile/avatar.svg" alt="">
        </slot>
      </div>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <img src="~assets/img/profile/phone.svg" alt="">
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
<!--          <span>暂无绑定手机号</span>-->
        </div>
      </div>
      <div class="right">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: "UserInfo"
  }
</script>

<style scoped>
  #user-info {
    width: 100%;
    background-color: var(--color-tint);
  }

  .avatar{
    display: inline-block;
    float: left;
  }

  .login-info{
    color: #fff;
  }

  .avatar img {
    width: 80px;
    height: 80px;
    margin-left: 10px;
  }

  #user-info .login-info {
    color: #fff;
    margin: 15px 0 0 15px;
  }

  .login-info .phone {
    position: relative;
    font-size: 13px;
    margin-top: 5px;
    font-weight: 300;
    left: -10px;
  }

  .login-info .phone span{
    vertical-align: -7px;
  }

  .phone img {
    padding-top: 1px;
    width: 23px;
    height: 23px;
  }

  .right{
    margin-top: 30px;
    float: right;
    transform: rotate3d(0,0,180,180deg);
  }
</style>
