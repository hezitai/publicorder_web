(function($, _C, _W) {
	_W.resetpassword = (function() {
		var _v = {
			message : {},
		};
		var _f = {
			init : function () {
				_e.onClickOkbutten1();
				_e.onClickOkbutten2();
				_v.message = permissions.getUserMessage().publicMessage;
			},
			judeStr : function (str1,str2) {
				if (str1 == str2) {
					return true;
				} else {
					return false;
				}
			},
			checkQuote : function (str) {
			    var items = new Array("~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "{", "}", "[", "]", "(", ")");
			    items.push(":", ";", "'", "|", "\\", "<", ">", "?", "/", "<<", ">>", "||", "//");
			    items.push("administrators", "administrator", "管理员", "系统管理员");
			    items.push("select", "delete", "update", "insert", "create", "drop", "alter", "trancate");
			    str = str.toLowerCase();
			    for (var i = 0; i < items.length; i++) {
			        if (str.indexOf(items[i]) >= 0) {
			            return true;
			        }
			    }
			    return false;
			},
			CheckChinese :function (str){ 
			　　var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
			　　if(reg.test(str)){
					return true; 
				} else {
					return false; 
				}
			},
			DigitalLength : function (s){
				var regu =/^[a-z0-9]{6,18}$/;
				var re = new RegExp(regu);
				if (re.test(s)) {
			        return true;
			    }else{
			       return false;
			    }
			},
			get : function () {
				_C.post({
					url : '/api/User/ResetPwdForFirstLogin',
					data : {
						"id": permissions.getUserId(),
						"passWord":$("#password1").val(),
					},
					success : function (data) {
						if (data.status == 1) {
							AlertMessage.show(data.message);
						} else{
							AlertMessage.show("修改成功!");
						};
						localStorage.clear();
					},
					error : function (a,b,c) {
					},
				})
			},			
		};
		// 事件
		var _e = {
			onClickOkbutten1 : function () {
				$('.compass').on('click',function(){	
								
					var str1 = $("#password1").val();
					var str2 = $("#password2").val();
					if (str1 == str2 && str1!="" && str2!="") {
						var _data = {
							"passWord":str1,
							"id":_v.message.userId
						};
						_a.password(_data,function(){});
						return true;
					} else {
						_C.alert({
							text:'两次密码必须一致！'
						});
						return false;
					}		
					if(!_f.DigitalLength(str1)){
						_C.alert({
							text:'密码长度需大于6位小于18位！'
						});
						return false;
					}
				});
				
			},
			onClickOkbutten2 : function () {
				$('.comname').on('click',function(){
					var str1 = $("#text1").val();
					var str2 = $("#text2").val();
					if (str1 == str2 && str1!="" && str2!="") {
						var _data = {
							"userName":str1,
							"id":_v.message.userId
						};
						_a.username(_data,function(){});
						return true;
					} else {
						_C.alert({
							text:'两次用户名必须一致'
						});//("两次密码必须一致");
						return false;
					}
				});
				
			},
		};
		var _a = {
			username:function(data,success){
				_C.POST({
					url:"/api/Crm/UpdateUserName",
					data:data,
					success:function(result){
						if (result.status == 1) {
							_C.alert({
								text:result.message
							});
						} else{
							_C.alert({
								text:'修改成功'
							},function(){
								location.reload();
							},function(){

							});
						};
						_C.storage.remove();
					}
				});
			},
			password:function(data,success){
				_C.POST({
					url:"/api/Crm/UpdateUserPwd",
					data:data,
					success:function(result){
						if (result.status == 1) {
							_C.alert({
								text:result.message
							});
						} else{
							_C.alert({
								text:'修改成功'
							},function(){
								location.reload();
							});
						};
						_C.storage.remove();
					}
				});
			},
		};
		var _c = {
			url : {
				optionSide : '/crm/----',
			}
		};
		return {
			init: _f.init
		}
	})();
})(jQuery, common, window);
$(document).ready(function() {
	resetpassword.init();
});