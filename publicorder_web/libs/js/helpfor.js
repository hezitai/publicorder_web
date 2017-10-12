(function($, _C, _W) {
	_W.helpfor = (function() {
		var _v = {
			socialList: {},
			socialValue: {}
		}
		_f = {
				init: function() {
					_v.publicId = permissions.getUserMessage().publicMessage.id;
					_v.systemuserid = permissions.getUserMessage().publicMessage.systemuserid;
					_f.initPage();
					$('.createinfo').click(function() {
						common.dialog({
							title: '信息发布',
							template: _t.dialogTemplate1({}),
							confirm: {
								event: function(template, hide) {
									var _data = {
										"name": "ds_message",
										"attributes": [{
											"name": "ds_content",
											"value": $('#createinfo').val()
										}, {
											"name": "ds_isread",
											"value": "@b/false"
										}, {
											"name": "ds_receive_all",
											"value": "@b/false"
										}, {
											"name": "ds_message_type",
											"value": "@code/100000003"
										}, {
											"name": "ds_sendid_publicorder",
											"value": "@look/" + _v.publicId
										}, {
											"name": "ds_receiveid_police",
											"value": "@look/" + _v.systemuserid
										}, ]
									};
									_f.createSocialHelpInfo(_data, _v.publicId, function() {
											common.alert({
												title: '',
												text: '提交成功',
												buttonText: '关闭',
											}, _f.initPage, _f.initPage)
										}),
										hide();
								},
								text: '提交',
							},
						});
					});
				},
				initPage: function() {
					var option = {
						element: '#paging',
						data: {
							count: '10',
							index: '1',
						},
						allPageKey: 'totalCount',
						event: _f.getSocialHelpList,
						success: function(result) {
							_t.helpList(result.list);
						}
					};
					_C.paging(option);
				},
				/*获取社会帮扶列表*/
				getSocialHelpList: function(data, success) {

					common.GET({
						url: "/crm/Entities?$expand=attributes( $filter=name eq 'createdon'  or name eq 'ds_content'  or name eq 'ds_isread'  or name eq 'ds_message_type'  or name eq 'ds_messageid'  or name eq 'ds_name'),lookups&$filter=name eq 'ds_message' and query eq '{{ds_sendid_publicorder eq " + _v.publicId + "} and {ds_message_type eq @code/100000003}}' and page eq " + data.index + " and count eq " + data.count + " and orderby eq 'createdon/desc'",
						success: function(result) {
							var list = _C.formatting.CRMList(result.value);
							if (list.length == 0 && data.index == 1) {
								var dataList = {
									totalCount: 0,
									list: list,
								};
								success(dataList);
								$('#empty').css('display', 'block');
							} else {
								$('#empty').css('display', 'none');
								var dataList = {
									totalCount: result.value[0].totalCount,
									list: list,
								};
								success(dataList);
							}
						}
					})
				},
				/*查看指定社会帮扶信息*/
				checkSocialHelpInfo: function(id, success) {
					common.GET({
						url: "/crm/Entities?$expand=attributes( $filter=name eq 'createdon'  or name eq 'ds_content'  or name eq 'ds_isread'  or name eq 'ds_message_type'  or name eq 'ds_messageid'  or name eq 'ds_name'),lookups&$filter=name eq 'ds_message' and query eq 'ds_messageid eq " + id + "'",
						success: function(result) {
							var _c = _C.formatting.CRMValue(result.value);
							_v.socialValue = _c;
							success(result);
						}
					});
				},

				/*新增社会帮扶信息*/
				createSocialHelpInfo: function(data, id, success) {
					common.POST({
						data: data,
						url: "/crm/Entities",
						success: function(result) {
							success(result);
						},
						error: function() {
							common.alert({
								text: '内容不能为空,请重新填写',
							});
						}
					});
				},
				/*删除指定社会帮扶信息*/
				delSocialHelpInfo: function(id, success) {
					common.DELETE({
						url: "/crm/Entities('ds_message" + id + "')",
						success: function(result) {
							success();
						}
					});
				},
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
							})
						})
						item.find('.delbtn').click(function() {
							common.dialog({
								className: 'delinfo',
								title: '提示',
								template: '确定删除？',
								confirm: {
									event: function(template, hide) {
										_f.delSocialHelpInfo(data['ds_messageid'], function(result) {
											common.alert({
												text: '删除成功',
											}, _f.initPage, _f.initPage)
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
						var item = '<li id="infobtn">'
						item += '<img class="fileimg" src="/publicorder_web/img/icon-doc.png" alt="">'
						item += '<a>' + data[i]['ds_content'] + '</a>'
						item += '<div>'
						item += '<p>' + _C.formatting.ExDate("zh", data['ds_createdon']) + '</p>'
						item += '<img class="delbtn" src="/publicorder_web/img/icon-delete.png" alt="">'
						item += '</div>'
						item += '</li>'
						item = $(item);
						bindClickFun(item, data[i]);
						$('.helpul').append(item);
					}
				},
				dialogTemplate1: function(data) {
					var crtinfo = '<div class="helpfordialog">'
					crtinfo += '<textarea placeholder="请输入帮扶信息..." class="textareainfo" name="" value="' + data['ds_content'] + '" id="createinfo" cols="70" rows="20"></textarea>'
					crtinfo += '</div>'
					crtinfo = $(crtinfo);
					return crtinfo;
				},
				dialogTemplate2: function(data) {
					var crtinfo = '<div class="helpfordialog">'
					crtinfo += '<textarea class="textareainfo" name="" value="' + data['ds_content'] + '" id="createinfo" cols="70" rows="20"></textarea>'
					crtinfo += '</div>'
					crtinfo = $(crtinfo);
					return crtinfo;
				},
				dialogTemplate3: function() {
					var hide = '';
					hide = $(hide);
					return hide;
				}
			}

		return {
			init: _f.init,
		}
	})();
})(jQuery, common, window);
$(document).ready(function() {
	helpfor.init();
});