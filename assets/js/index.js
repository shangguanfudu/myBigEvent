$(function () {
  // 调用 getUserInfo 函数获取用户基本信息
  getUserInfo();
});
// 获取用户基本信息
function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    success: (res) => {
      if (res.status !== 0) return layui.layer.msg("数据请求失败！");
      console.log(res);
      // 调用 renderAvatar 渲染用户头像
      renderAvatar(res.data);
    },
  });
}
// 渲染用户头像信息
function renderAvatar(user) {
  let username = user.nickname || user.username;
  $("#welcome").text(`欢迎 ${username}`)
  if (user.user_pic !== null) {
      $(".layui-nav-img").attr("src", user.user_pic).show();
       $(".text-avatar").hide();
  }else{
    //   渲染文本图像
    let firstName = username[0].toUpperCase();
      $(".text-avatar").html(firstName).show();
      $(".layui-nav-img").hide();
  }
}
