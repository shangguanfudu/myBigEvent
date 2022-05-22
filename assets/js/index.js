$(function () {
  // 调用 getUserInfo 函数获取用户基本信息
  getUserInfo();
  // 退出登录
  $("#btnLogout").click(() => {
    layui.layer.confirm(
      "确定退出登录？",
      { icon: 3, title: "" },
      function (index) {
        // 清空本地存储里面的 token
        localStorage.removeItem("token");
        // 重新跳转到登录页面
        location.href = "/login.html";
      }
    );
  });
});
// 获取用户基本信息
function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    // headers: {
    //   Authorization: localStorage.getItem("token"),
    // },
    success: (res) => {
      if (res.status !== 0) return layui.layer.msg("数据请求失败！");
      // console.log(res);
      // 调用 renderAvatar 渲染用户头像
      renderAvatar(res.data);
    },
    // 不论成功还是失败，最终都会调用 complete 回调函数
    //使用 res.responseJSON 拿到服务器响应回来的数据
    // complete: (res) => {
    //   console.log(res.responseJSON);
    //   if(res.responseJSON.status ===1 && res.responseJSON.message === "身份认证失败！"){
    //     // 清空本地存储里面的 token
    //     localStorage.removeItem("token");
    //     // 重新跳转到登录页面
    //     location.href = "/login.html";
    //   }
    // },
  });
}
// 渲染用户头像信息
function renderAvatar(user) {
  let username = user.nickname || user.username;
  $("#welcome").text(`欢迎 ${username}`);
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    //   渲染文本图像
    let firstName = username[0].toUpperCase();
    $(".text-avatar").html(firstName).show();
    $(".layui-nav-img").hide();
  }
}
// 发布跳转标签高亮
function change(){
  $("#art_list").addClass("layui-this").next().removeClass("layui-this")
}
