(function($, _C, _W) {
	_W.send = (function() {
		var _v = {
			publicId: '',
		},
		_f = {
			init: function() {
				_v.publicId = permissions.getUserMessage().publicMessage.id;
				_v.systemuserid = permissions.getUserMessage().publicMessage.systemuserid;
				_f.initPage();
				
			},
			initPage: function() {
				$(".send").click(function(){
					if (!_C.jude.isNull ($(".sendinformation").val())) {
						common.alert({
							text: '内容不能为空，请重试'
						});
						return;
					};
					var _data = {
					   "name":"ds_message",
					   "attributes":[{
				          "name":"ds_content","value":$(".sendinformation").val()
				        }, {
				          "name":"ds_isread","value":"@b/false"
				        }, {
				          "name":"ds_message_type","value":"@code/100000004"
				        }, {
				          "name":"ds_receive_all","value":"@b/false"
				        },{
				          "name":"ds_sendid_publicorder","value":"@look/" + _v.publicId
				        },{
				          "name":"ds_receiveid_police","value":"@look/" + _v.systemuserid
				        }]
					};
					_f.sendInfo(_v.publicId,_data,function(){
						common.alert({
							title: '',
							text: '发送成功',
							buttonText: '关闭',
						});
					})
					$(".sendinformation").val("");
				});
				$(".onesend").click(function(){
					var _data = {
					   "name":"ds_message",
					   "attributes":[
					        {
					          "name":"ds_isread","value":"@b/false"
					        }, {
					          "name":"ds_message_type","value":"@code/100000005"
					        }, {
					          "name":"ds_receive_all","value":"@b/false"
					        },{
					          "name":"ds_sendid_publicorder","value":"@look/" + _v.publicId
					        },{
					          "name":"ds_receiveid_police","value":"@look/" + _v.systemuserid
					        }
					    ]
					};
					_f.onecSendInfo(_v.publicId,_data,function(){
						_C.alert({
							text:'已发送'
						});
					})
					$(".sendinformation").val("");
				});
			},

			/*发送信息*/
			sendInfo:function(id,data,success) {
				common.POST({
					data:data,
					url:"/crm/Entities",
					success:function(result) {
						success(result);
					}
				})
			},
			/*一键发送信息*/
			onecSendInfo:function(id,data,success) {
				common.POST({
					data:data,
					url:"/crm/Entities",
					success:function(result) {
						success(result);
					}
				})
			}
		}
		return {
			init: _f.init,
		}
	})();
})(jQuery, common, window);
	$(document).ready(function() {
		send.init();
	});