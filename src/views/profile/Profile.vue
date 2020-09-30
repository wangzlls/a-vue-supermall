<template>
  <div id="profile">
    <nav-bar class="profile-nav">
      <div slot="center">个人中心</div>
    </nav-bar>
    <user-info></user-info>

    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">9999</span>元
        </div>
        <div class="account-info">账户余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">99</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">99</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>

    <list-view class="order-list"/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import UserInfo from "./childComps/UserInfo";
  import ListView from "./childComps/ListView";

  export default {
    name: "Profile",
    components: {
      ListView,
      UserInfo,
      NavBar
    },
  }
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }

  .profile-nav {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }

  .account {
    display: flex;
  }

  .account .account-item {
    width: 100%;
    margin-right: 1px;
    background-color: #fff;
    text-align: center;
    color: #666;
    font-size: 13px;
    padding: 15px;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item .balance {
    font-size: 24px;
    font-weight: bold;
    color: #ff5f3e;
  }

  .account .account-info {
    margin-top: 5px;
  }

  .order-list, .service-list {
    margin-top: 10px;
  }
</style>
