(function($, _C, _W) {
	_W.news = (function() {
		var _v = {
			socialList: {},
			socialValue: {},
			allCount: '0',
			focusCount: 1,
			count: '12',
		},
		_f = {
			init: function() {
				_v.publicId = permissions.getUserMessage().publicMessage.id;
				_f.initPage();
			},
			initPage: function() {
				var option = {
					element: '#paging',
					data: {
						count: '10',
						index: '1',
					},
					allPageKey: 'totalCount',
					event: _f.getNewsList,
					success: function(result) {
						_t.helpList(result.list);
					}
				};
				_C.paging(option);
			},
			/*获取消息中心列表*/
			getNewsList:function(data,success){
				common.GET({
					url:"/crm/Entities?$expand=attributes($filter=name eq 'createdon'  or name eq 'ds_content'  or name eq 'ds_isread'  or name eq 'ds_message_type'  or name eq 'ds_messageid'  or name eq 'ds_name'),lookups&$filter=name eq 'ds_message' and  query eq '{{{ds_message_type eq @code/100000001} or {ds_message_type eq @code/100000002}} and {ds_receiveid_publicorder eq " + _v.publicId + "}}'and page eq " + data.index + " and count eq " + data.count + " and orderby eq 'createdon/desc'",
					success:function(result){
						var list = _C.formatting.CRMList(result.value);
						if (list.length == 0 && data.index == 1) {
							var dataList = {
								totalCount: 0,
								list: list,
							};
							success(dataList);
							$('#empty').css('display','block');
						} else {
							$('#empty').css('display','none');
							var dataList = {
								totalCount: result.value[0].totalCount,
								list: list,
							};
							success(dataList);
						}
					}
				});
			},
			// 改变消息状态
			changestatus:function(id,success){
				common.PUT({
					url:"/crm/Entities('ds_message" + id + "')",
					data:{
						  "attributes": [
						    {
						      "name": "ds_isread",
						      "value": "@b/true"
						    }
						  ]
						},
					success:function(result){
						success(result);
					}
				})
			},
			//删除消息
			deleteMessage:function(id){
				common.DELETE({
					url:"/crm/Entities('ds_message" + id + "')",
					success:function(){
						common.alert({
							text:'删除成功'
						});
						_f.init();
					}
				})
			}
			// /*获取指定信息中心信息*/
			// getNewsInfo:function(id,success) {
			// 	common.GET({
			// 		url:"/crm/Entities?$expand=attributes($filter=name eq 'createdon'  or name eq 'ds_content'  or name eq 'ds_isread'  or name eq 'ds_message_type'  or name eq 'ds_messageid'  or name eq 'ds_name'),lookups&$filter=name eq 'ds_message' and  query eq 'ds_messageid eq " + id + "'",
			// 		success:function(result){
			// 			var _c = _C.formatting.CRMValue(result.value);
			// 			_v.socialValue = _c;
			// 			success(result);
			// 		}
			// 	});
			// }
		},
		_t = {
			helpList: function(data) {
				
				function bindClickFun(item, data) {
					item.find('a').click(function() {
						common.alert({
							className: 'classinfo',
							title: '信息查看',
							text: data['ds_content'],
							buttonText: '关闭',
						});
						_f.changestatus(data.id,function(result){
							data.ds_isread='true';
							item.addClass('isredbox');
							item.find('.fileimg').attr('src','/publicorder_web/img/read.png');
						});
						
					});
					item.find('.delete').unbind().bind('click',function(event){
						event.stopPropagation();
						_C.dialog({
							className: 'delinfo',
							title: '提示',
							template: '确定删除？',
							confirm: {
								event: function(template, hide) {
									_f.deleteMessage(data.id,function(){										
									})
									
									hide();
								},
								text: '确定',
							},
						});
						
					})
				}
				$('.helpul').empty();
				for (var i = 0; i < data.length; i++) {
					var item = '<li class="infobtn">'
					item += '<img class="fileimg" src="/publicorder_web/img/read.png" alt="">'
					item += '<a>' + data[i]['ds_content'] + '</a>'
					item += '<div>'
					item += '<p>' + _C.formatting.ExDate("zh",data.ds_date) +  '</p>'
					item += '<span class="delete" style="line-height: 49px;display: inline-block;width: 45px;cursor: pointer;text-align: center;"><img src="/publicorder_web/img/icon-delete.png" style="cursor: pointer;"/></span>'
					item += '</div>'
					item += '</li>'
					item = $(item);
					if(data[i]['ds_isread'] == 'True') {
						item.addClass('isredbox');
						item.find('.fileimg').attr('src','/publicorder_web/img/read.png');
					} else {
						item.removeClass('isredbox');
						item.find('.fileimg').attr('src','/publicorder_web/img/isread.png');
					}
					bindClickFun(item, data[i]);
					$('.helpul').append(item);
					
				};
			}
		};
		return {
			init: _f.init,
		}
	})();
})(jQuery, common, window);
	$(document).ready(function() {
		news.init();
	});