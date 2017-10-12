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
					
					$('.realnamebody .searchbox').empty().append(_t.search());
					
					
					$('.addbtnbox').empty().append(_t.addBtnBoxForOther());
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
							});
							_f.init();
							location.href = 'http://' + location.host + '/publicorder_web/pages/realname.html';
						});

					});


					_v.date = {
						starTime: _C.formatting.ExDate('/', (_C.formatting.ExDate('z') - 1000 * 60 * 60 * 24 * 10)) + ' 00:00:00',
						endTime: _C.formatting.ExDate('/') + ' 23:59:00'
					};

					$('.dataStar').val(_C.formatting.ExDate('/', _v.date.starTime));
					$('.dataEnd').val(_C.formatting.ExDate('/', _v.date.endTime));

					return; // 临时更改
					var option = {
						element: '#paging4',
						data: {
							dateStar: _v.date.starTime,
							dateEnd: _v.date.endTime,
							index: _v.search.index,
							count: _v.search.count,
						},
						allPageKey: 'totalCount',
						event: _a.search,
						success: function(result) {
							$('.realnamebody .listbox').empty();
							for (var i = 0; i < result.list.length; i++) {
								$('.realnamebody .listbox').append(_t.gethotellist(result.list[i]));
							};
						}
					};
					_C.paging(option);
				},
				getviewinfo: function(id) {
					_a.getgoodsInfo(id, function(data) {

						_C.dialog({
							className: 'hotelmessage',
							title: '详细信息',
							template: _t.viewResultsList(data),
							confirm: {
								hide: true,
								event: false,
							},
							cancel: {
								hide: true,
								event: false,
							}
						});
					})
				},
			},
			_t = {
				/*搜索住宿饭店实名制信息模板*/
				searchResultsList: function(data) {
					var html = '';
					html += '<li>'
					html += '<div class="boxheight">'
					html += '<p>房间号:</p><span>' + data['ds_roomnum'] + '</span><p>入住时间:</p><span>' + data['intoDate'] + '</span><p>创建时间:</p><span>' + data['dataTime'] + '</span><div class="obsimg"></div>'
					html += '</li>'
					html = $(html);
					html.click(function() {
						_f.getviewinfo(data.ds_shimingzhiid);
					});
					return html;
				},
				//查看房间信息模板
				viewResultsList: function(data) {
					var html = '';
					html += '<ul class="hotel" style="padding-bottom:50px;">'
					html += '<li>'
					html += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>房间号：</p><input type="text" value="' + (data.ds_roomnum ? data.ds_roomnum : '') + '" readonly="readonly" class="ds_roomnum">'
					html += '</li>'
					html += '<li>'
					html += '	<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>入住时间：</p><input value="' + (data.intoDate ? data.intoDate : '') + '" style="width:420px; cursor:pointer;height:30px;" type="text" class="ds_date laydate-icon" readonly="readonly">'
					html += '</li>'
					html += '<li>'
					html += '	<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>入住天数：</p><input type="text" value="' + data.ds_stayday + '"  class="ds_staynum" readonly="readonly">'
					html += '</li>'
					html += '<div style="font-size: 12px; color: #666;padding: 5px 13px;">入住人员：</div>'
					// html += '</ul>'
					for (var i = 0; i < data.stayPersonInfoModels.length; i++) {
						html += '<div class="peopelItem">姓名：<span style="display: inline-block;width: 30%;">' + data.stayPersonInfoModels[i].stayPersonName + '</span>身份证号：<span>' + data.stayPersonInfoModels[i].stayPersonId + '</span></div>'
					};
					html += '</ul>'
					html = $(html);

					return html;
				},
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
				/*获取住宿饭店实名制信息dialog模板*/
				createhotel2: function(data) {
					var item = '<div>'
					item += '<ul class="hotel">'
					item += '<li>'
					item += '<p>顾客姓名：</p><input type="text" value="' + data['ds_person-ds_name'] + '" class="ds_person">'
					item += '</li>'
					item += '<li>'
					item += '<p>证件号码：</p><input type="text" value="' + data['ds_person-ds_id'] + '" readonly="readonly" class="ds_personid">'
					item += '</li>'
					item += '<li>'
					item += '<p>联系电话：</p><input type="text" value="' + data['ds_person-ds_phone'] + '" class="ds_personphone">'
					item += '</li>'
					item += '<li>'
					item += '<p>房间号：</p><input type="text" value="' + data['ds_roomnum'] + '" class="ds_roomnum">'
					item += '</li>'
					item += '<li>'
					item += '<p>入住时间：</p><input type="text" value="' + (data['ds_date'].split(' ')[0] ? data['ds_date'].split(' ')[0] : '') + '" class="ds_date laydate-icon" style="width:448px; cursor:pointer;" onclick="laydate()">'
					item += '</li>'
					item += '</ul>'
					item += '</div>'
					item = $(item);
					return item;
				},
				/*其他四行业添加按钮模板*/
				addBtnBoxForOther: function() {
					var item = '';
					item += '<a class="addbtn addbtn2" href="realmaneHotelAdd.html">添加</a>'
					item = $(item);
					item.find('.addbtn').unbind().bind('click',function(){
						_v.firstpage=false;
					})
					return item;
				},
				search: function() {
					var html = '';
					html += '	<div class="personsearch">';
					html += '		<input type="text" style="width:250px" class="searchResult" placeholder="请输入房间号"/>';
					html += '		<a class="searchbtn" style="height:29px; line-height:29px;">搜索</a>';
					html += '		<input type="radio" style="display:inline-block;float:none;width:35px; height:15px; border:0px;" name="searchDate" value="2" class="all"> <span style="display:inline-block; line-height:27px;">全部</span> ';
					html += '		<input type="radio" style="display:inline-block;float:none;width:35px; height:15px; border:0px" name="searchDate" value="1" class="oneaYear"> <span style="display:inline-block; line-height:27px;">近一年</span> ';
					html += '		<input type="radio" style="display:inline-block;float:none;width:35px; height:15px; border:0px" name="searchDate" value="0" class="threeMonth" checked="checked"> <span style="display:inline-block; line-height:27px;">近三个月</span> ';
					html += '	</div>';
					html = $(html);
					// return html; // 临时更改
					var datatype = 0;
					getSearchResult = function() {

						var radios = document.getElementsByName("searchDate");
						for (var i = 0; i < radios.length; i++) {
							if (radios[i].checked) {
								datatype = radios[i].value;
								break;
							}
						};
						var option = {
							element: '#paging2',
							data: {
								commonStr: $(".searchResult").val(),
								type: _v.type,
								dateType: datatype,
								ds_publicorder: _v.message.id,
								index: '1',
								count: '10'
							},
							allPageKey: 'totalCount',
							event: _a.search,
							success: function(result) {
								if (result.list.length == 0 && _v.firstpage==true) {
									_C.alert({
										className: 'confirmPopup',
										text: '未搜索到相关信息'
									});
								} else {
									$('.realnamebody .listbox').empty();
									var Ul = $('<ul style="height:460px;"></ul>');
									$('.realnamebody .listbox').append(Ul);
									for (var i = 0; i < result.list.length; i++) {
										Ul.append(_t.searchResultsList(result.list[i]));
									};
								}
							}
						};
						_C.paging(option);

					};
					getSearchResult();
					html.find('.searchbtn').click(function() {
						getSearchResult();
					});
					html.find('.all').click(function() {
						getSearchResult();
					});
					html.find('.oneaYear').click(function() {
						getSearchResult();
					});
					html.find('.threeMonth').click(function() {
						getSearchResult();
					});
					return html;
				}
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
				search: function(data, success) {

					_C.POST({
						url: "/api/Crm/SearchForShiMingZhi",
						data: data,
						success: function(result) {
							if(!result.status == 1) {
								if (result.resultObj.length == 0 && data.index == 1) {
									var dataList = {
										totalCount: 0,
										list: result.resultObj,
									};
									success(dataList);
								} else {
									var dataList = {
										totalCount: result.resultObj[0].totalCount,
										list: result.resultObj,
									};
									success(dataList);
								}
							}
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
				// 查看信息
				getgoodsInfo: function(id, success) {
					common.POST({
						url: "/api/Crm/GetAppointShiMingZhi",
						data: {
							"commonStr": id,
							"type": _v.type
						},
						success: function(result) {
							if (result.status == 0) {
								success(result.resultObj);
							} else {
								_C.alert({
									className: 'confirmPopup',
									text: result.message
								});
							};
						}
					});
				}
			};
		return {
			init: _f.init,
			getDate: _f.getDate,
		};
	})();
})(jQuery, common, window);