(function($, _C, _W) {
	_W.realnameHotel = (function() {
		var _v = {
				message: {},
				date: {
					starTime: '',
					endTime: ''
				},
				search: {
					index: 1,
					count: 10
				},
				personid: [],
				type: '',
				
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;
					if (_v.message.ds_businesskind == 100000011) {
						_v.type = 2
					} else if (_v.message.ds_businesskind == 100000018) {
						_v.type = 0
					} else if (_v.message.ds_businesskind == 100000006) {
						_v.type = 1
					} else if (_v.message.ds_businesskind == 100000009) {
						_v.type = 3
					} else if (_v.message.ds_businesskind == 100000002) {
						_v.type = 4
					};
					
					$('.add').unbind().bind('click', function() {
						if ($('.modelBox').children().length == 0) {
							$('.modelBox').append(_t.createhotel1());
						} else {
							return;
						};

						$('.close').unbind().bind('click', function() {
							$('.moban').remove();
						});
						$('.addsub').click(function() {
							var _person = $('.moban').find('.ds_person').val();
							var _personid = $('.moban').find('.ds_personid').val();

							var _date = $('.moban').find('.ds_date').val();
							if (!_C.jude.isNull(_person)) {
								common.alert({
									text: '顾客姓名不能为空'
								});
								return;
							};
							if (!_C.jude.isNull(_personid)) {
								common.alert({
									text: '证件号码不能为空'
								});
								return;
							};
							if (!_C.jude.isIdCard(_personid)) {
								common.alert({
									text: '请输入正确的证件号码'
								});
								return;
							};


							var data = {
								name: _person,
								id: _personid,

							};
							_a.checkStuffInfoReturn({
								"name": _person,
								"idCard": _personid,
								"isCreate": "true",
							}, function(result) {
								var personId = result.resultObj.personId;
								data.personId = personId;
								$('.personList').append(_t.personList(data));
								$('.moban').remove();
							})

						});
					});

					$('.Hotelsubmit').click(function() {
						var _date = $('.hotel').find('.ds_date').val();
						var _roomnum = $('.hotel').find('.ds_roomnum').val();
						var _staynum = $('.hotel').find('.ds_staynum').val();
						if (!_C.jude.isNull(_roomnum)) {
							common.alert({
								text: '房间号码不能为空'
							});
							return;
						};
						if (!_C.jude.isNumber(_roomnum)) {
							common.alert({
								text: '请输入正确的房间号码'
							});
							return;
						};
						if (!_C.jude.isNull(_date)) {
							common.alert({
								text: '日期不能为空'
							});
							return;
						};
						if (!_C.jude.isDate(_date)) {
							common.alert({
								text: '请输入正确的日期'
							});
							return;
						};
						if ($('.personList').children().length == 0) {
							common.alert({
								text: '请添加入住人员'
							});
							return;
						};
						if (!_C.jude.isNull(_staynum)) {
							common.alert({
								text: '入住天数不能为空'
							});
							return;
						};
						if (!_C.jude.isInteger(_staynum)) {
							common.alert({
								text: '请输入正确的天数'
							});
							return;
						};

						var time = _C.formatting.ExDate('/', _date);


						var personIdArr = new Array();
						$('.personList .box').each(function() {
							personIdArr.push($(this).attr('data-value'));
						});
						var personinfo = {
							"name": "ds_shimingzhi",
							"attributes": [{
								"name": "ds_date",
								"value": "@dt/" + time + " 08:00"
							}, {
								"name": "ds_personlist",
								"value": personIdArr.join(';')
							}, {
								"name": "ds_roomnum",
								"value": _roomnum
							}, {
								"name": "ds_publicorder",
								"value": "@look/" + _v.message.id
							}, {
								"name": "ds_stayday",
								"value": "@wn/" + _staynum
							}]
						};

						_a.createHotelInfo(personinfo, function(result) {
							_C.alert({
								text: '创建成功'
							},function(){
								location.href = 'http://' + location.host + '/publicorder_web/pages/realname.html';
							});
							_f.init();
							
						});

					});


					_v.date = {
						starTime: _C.formatting.ExDate('/', (_C.formatting.ExDate('z') - 1000 * 60 * 60 * 24 * 10)) + ' 00:00:00',
						endTime: _C.formatting.ExDate('/') + ' 23:59:00'
					};

					$('.dataStar').val(_C.formatting.ExDate('/', _v.date.starTime));
					$('.dataEnd').val(_C.formatting.ExDate('/', _v.date.endTime));

					
					
				},
				
			},
			_t = {
				
				
				/*添加住宿饭店实名制信息dialog模板*/
				createhotel1: function() {
					var item = '<div class="moban">';
					item += '<li>'
					item += '<p>顾客姓名：</p><input type="text" value="" placeholder="请输入顾客姓名" class="ds_person">'
					item += '<span class="readIdCard readIdCardbutton">读取</span>';
					item += '</li>'
					item += '<li>'
					item += '<p>证件号码：</p><input type="text" value="" placeholder="请输入证件号码" class="ds_personid">'
					item += '</li>'
					item += '<li>'
					item += '<li style="text-align:center;">'
					item += '<span class="close">取消</span><span class="addsub">提交</span>'
					item += '</li>'
					item += '</div>'
					item = $(item);

					item.find('.readIdCard').unbind().bind('click', function() {
						_C.readIdCard(function(data) {
							item.find('.ds_person').val(data.name);
							item.find('.ds_personid').val(data.id);
						})
					});

					return item;
				},
				personList: function(data) {

					var item = '';
					item += '<li class="box" data-value="' + data.personId + '">顾客姓名：<span style="display:inline-block;width:25%;">' + data.name + '</span>身份证号：<span>' + data.id + '</span><span class="del"><img src="/publicorder_web/img/icon-delete.png" style="vertical-align: middle;"/></span>';
					item += '</li>';
					item = $(item);

					_v.personid.push(data.personId);
					item.find('.del').unbind().bind('click', function() {
						var setting = {
							className: '',
							title: '提示',
							text: '是否删除',
							confirm: {
								text: '确定',
								event: function() {
									item.remove();

								},
							}
						};
						common.confirm(setting);
					})
					return item;
				},
			
			},
			_a = {
				/*更新人员信息接口,姓名,电话*/
				upDataPeoplePhone: function(id, data) {
					_C.PUT({
						data: data,
						url: "/crm/Entities('ds_person" + id + "')",
						success: function() {

						},
						unLoading: true,
					});
				},
				/*检查人员是否存在返回人员ID*/
				checkStuffInfoReturn: function(data, success) {
					common.POST({
						data: data,
						url: "/api/Crm/GetPeopleExist",
						success: function(result) {
							if (result.status == 0) {
								success(result);
							} else {
								_C.alert({
									className: 'confirmPopup',
									text: result.message
								});
							};
						}
					});
				},
				
				/*添加酒店实名制信息*/
				createHotelInfo: function(data, success) {
					common.POST({
						data: data,
						url: "/crm/Entities",
						success: function(result) {
							success();
						}
					});
				},
			};
		return {
			init: _f.init,
			getDate: _f.getDate,
		};
	})();
})(jQuery, common, window);