$(function () {
  initUserInfo();
//   重置表单
  $("#btnReset").click(e=>{
      e.preventDefault();
      initUserInfo();
  });
//   发起请求更新用户的信息
$(".layui-form").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg("更新用户信息失败！");
            layer.msg("更新用户信息成功！");
            // 调用父页面渲染函数
             window.parent.getUserInfo();//window.parent位上一级页面window对象
      },
    });
})
});
const form = layui.form;
form.verify({
  nickname: (val) => {
    if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
  },
});
// 初始化用户信息
const layer = layui.layer;
const initUserInfo = () => {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    success: function (res) {
      if (res.status !== 0) return layer.msg("获取用户信息失败！");
      console.log(res);
      form.val("formUserInfo", res.data);
    },
  });
};
