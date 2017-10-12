(function($, _C, _W) {
	_W.publicStudent = (function() {
		var _v = {
				message: {},
				studentModel: {},
				order:{},
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;
					_a.get(function(result) {
						$('#main-a').html(_t.stuList(result));
					});
					
				},
				initStudentList: function() {
					_a.getHostelList(_v.order['ds_address_l4_ref-ds_address_l4id'], function(result) {
						_v.studentModel.find('.stutitle').empty();
						_v.studentModel.find('.students ul').empty();
						_v.studentModel.find('.studentsection').empty();
						var bgtext = $('<h2>请选择寝室列表</h2>');
						_v.studentModel.find('.stulistright .putininfo').empty().append(bgtext);
						if(result.length==0){
							_f.CheckDormitorylist(item,false);
						}else{
							for (var i = 0; i < result.length; i++) {
								var item = '';
								item += '<li><p><span>' + result[i]['ds_floor'] + '</span>楼<span>' + result[i]['ds_roomfigure'] + '</span>寝</p><img src="/publicorder_web/img/delbtn1.png" class="delbtn1" title="删除"><img src="/publicorder_web/img/checkbtn1.png" class="checkbtn1" title="修改/查看信息"></li>';
								item = $(item);
								_f.CheckDormitorylist(item, result[i]);
								_v.studentModel.find('.students ul').append(item);
							}
						}
						
					});
				},
				CheckDormitorylist: function(item, result) {
					_v.studentModel.find(".adddormitorylist").click(function() {
						_v.studentModel.find('.stulistright .putininfo').empty();
						_v.studentModel.find('.stulistright .studentsection').hide();
						_v.studentModel.find('.stulistright .putininfo').append(_t.studentTemplate1());
						$(".putbtn").click(function() {
							var _data = {
								"name": "ds_realhouse",
								"attributes": [{
									"name": "ds_address",
									"value": _v.order['ds_address_l4_ref-ds_name']
								}, {
									"name": "ds_floor",
									"value": $('.addfloor').val()
								}, {
									"name": "ds_roomfigure",
									"value": $('.addroomfigure').val()
								}, {
									"name": "ds_address_tree",
									"value": "@look/" + _v.order['ds_address_l4_ref-ds_address_l4id']
								}, {
									"name": "ds_dutypolice",
									"value": "@look/" + permissions.getUserMessage().publicMessage.systemuserid
								}, {
									"name": "ds_dutyplace",
									"value": "@look/" + permissions.getUserMessage().publicMessage.teamid
								}]
							};
							if (!_C.jude.isNull($('.addfloor').val())) {
								common.alert({
									text: '楼号不能为空'
								});
								return;
							};
							if (!_C.jude.isNull($('.addroomfigure').val())) {
								common.alert({
									text: '寝室号不能为空'
								});
								return;
							};
							_a.createHostelInfo(_v.order.id, _data, function(result) {
								common.alert({
									text: '添加成功',
								}, function() {
									_f.initStudentList();
								}, function() {
									_f.initStudentList();
								});
							});
						});
					});
					if(result!=false){
						item.find('.checkbtn1').click(function() {
							_v.studentModel.find('.stulistright .studentsection').hide();
							_v.studentModel.find('.stulistright .putininfo').empty();
							_v.studentModel.find('.stulistright .putininfo').append(_t.studentTemplate3(result));
							$(".putbtn1").click(function() {
								var ResultId = result.id;
								var _data = {
									"attributes": [{
										"name": "ds_floor",
										"value": _v.studentModel.find('.stulistright .addfloor').val()
									}, {
										"name": "ds_roomfigure",
										"value": _v.studentModel.find('.stulistright .addroomfigure').val()
									}]
								};
								if (!_C.jude.isNull(_v.studentModel.find('.stulistright .addfloor').val())) {
									common.alert({
										text: '楼号不能为空'
									});
									return;
								};
								if (!_C.jude.isNull(_v.studentModel.find('.stulistright .addroomfigure').val())) {
									common.alert({
										text: '寝室号不能为空'
									});
									return;
								};
								var Data = _data;
								_a.putHostelInfo(ResultId, Data, function(result) {
									common.alert({
										text: '修改成功'
									}, function() {
										_f.initStudentList();
									}, function() {
										_f.initStudentList();
									});
								});
							})
						});
						item.find('.delbtn1').click(function() {
							var setting = {
								className: '',
								title: '提示',
								text: '是否确认删除',
								confirm: {
									text: '确定',
									event: function() {
										_a.delHostelInfo(result.id, function() {
											common.alert({
												text: '已删除'
											}, function() {
												_f.initStudentList();
											}, function() {
												_f.initStudentList();
											})
										})
									},
								}
							};
							common.confirm(setting);
						});
						item.find('p').click(function() {
							_v.studentModel.find('.stulistright .studentsection .hidediv').hide();
							_v.studentModel.find('.stulistright .studentsection').show();
							_v.studentModel.find('.stulistright .putininfo').empty();
							_v.studentModel.find('.stulistright .headinfo .stutitle').empty();
							_v.studentModel.find('.stulistright .studentsection').empty();
							var Ul = $('<ul></ul>');
							_v.studentModel.find('.stulistright .studentsection').append(Ul);
							_v.studentModel.find('.stulistright .headinfo .stutitle').append(_t.studentTemplate4(result));
							_a.getStuHostelInfo(result.id, function(result) {
								_v.studentModel.find('.studentsection ul').empty();
								function CheckStuInfo(item, data) {
									item.find('.cekbtn').click(function() {
										var body = $(this).parents('.showdiv').next();
										var _hide = body.css('display');
										$('.hidediv').css('display', 'none');
										if (_hide == 'none') {
											body.css('display', 'block');
										} else {
											body.css('display', 'none');
										}
										$('.cancelinfo').click(function() {
											$('.hidediv').css('display', 'none');
										})
										var ResultId = data['ds_person_ref-ds_personid'];
										$('.putinfo2').click(function() {
											var _name = item.find('.ds_name').val();
											var _id = item.find('.ds_id').val();
											var _address = item.find('.ds_address').val();
											var _phone = item.find('.ds_phone').val();
											var _data = {
												"attributes": [{
													"name": "ds_name",
													"value": _name
												}, {
													"name": "ds_id",
													"value": _id
												}, {
													"name": "ds_nativeplace",
													"value": _address
												}, {
													"name": "ds_phone",
													"value": _phone
												}]
											};
											if (!_C.jude.isNull(_name)) {
												common.alert({
													text: '姓名不能为空'
												});
												return;
											};
											if (!_C.jude.isNull(_id)) {
												common.alert({
													text: '身份证号不能为空'
												});
												return;
											};
											if (!_C.jude.isIdCard(_id)) {
												common.alert({
													text: '请输入正确的身份证号码'
												});
												return;
											};
											if (!_C.jude.isNull(_address)) {
												common.alert({
													text: '户籍地址不能为空'
												});
												return;
											};
											if (!_C.jude.isNull(_phone)) {
												common.alert({
													text: '联系方式不能为空'
												});
												return;
											};
											if (!_C.jude.isPhone(_phone)) {
												common.alert({
													text: '请输入正确的手机号码'
												});
												return;
											};
											_a.putStuInfo(ResultId, _data, function(result) {
												common.alert({
													text: "修改成功"
												}, function() {
													_v.studentModel.find('.stulistright .studentsection .hidediv').hide();
													_v.studentModel.find('.stulistright .studentsection').show();
													_v.studentModel.find('.stulistright .putininfo').empty();
													_v.studentModel.find('.stulistright .headinfo .stutitle').empty();
													_v.studentModel.find('.stulistright .studentsection').empty();
													var bgtext = $('<h2>请选择寝室列表</h2>');
													_v.studentModel.find('.stulistright .putininfo').append(bgtext);
												});
											});
										});
									});
									item.find('.delbtn').click(function() {
										var setting = {
											className: '',
											title: '提示',
											text: '是否确认删除',
											confirm: {
												text: '确定',
												event: function() {
													_a.delStuInfo(data.id, function(result) {
														common.alert({
															text: '已删除'
														}, function() {
															_v.studentModel.find('.stulistright .studentsection .hidediv').hide();
															_v.studentModel.find('.stulistright .studentsection').show();
															_v.studentModel.find('.stulistright .putininfo').empty();
															_v.studentModel.find('.stulistright .headinfo .stutitle').empty();
															_v.studentModel.find('.stulistright .studentsection').empty();
															var bgtext = $('<h2>请选择寝室列表</h2>');
															_v.studentModel.find('.stulistright .putininfo').append(bgtext);
														})
													})
												},
											}
										};
										common.confirm(setting);
									});
								};
								for (var i = 0; i < result.length; i++) {
									var studentinfo2 = '';
									studentinfo2 += '<li>'
									studentinfo2 += '<div class="showdiv">'
									studentinfo2 += '<p>姓名：<span class="">' + result[i]['ds_person_ref-ds_name'] + '</span></p>'
									studentinfo2 += '<a class="delbtn">删除</a>'
									studentinfo2 += '<a class="cekbtn">查看</a>'
									studentinfo2 += '</div>'
									studentinfo2 += '<div class="hidediv" style="display:none">'
									studentinfo2 += '<div><p>姓名：</p><input type="text" class="ds_name" value="' + result[i]['ds_person_ref-ds_name'] + '"></div>'
									studentinfo2 += '<div><p>身份证号：</p><input type="text" readonly="" class="ds_id" value="' + result[i]['ds_person_ref-ds_id'] + '"></div>'
									studentinfo2 += '<div><p>户籍地址：</p><input type="text" class="ds_address" value="' + (result[i]['ds_person_ref-ds_nativeplace'] ? result[i]['ds_person_ref-ds_nativeplace'] : '') + '"></div>'
									studentinfo2 += '<div><p>联系电话：</p><input type="text" class="ds_phone" value="' + (result[i]['ds_person_ref-ds_phone'] ? result[i]['ds_person_ref-ds_phone'] : '') + '"></div>'
									studentinfo2 += '<div class="hidebtn">'
										// studentinfo2 += '<a class="readIdCard">读取身份证</a>'
									studentinfo2 += '<a class="cancelinfo">取消</a>'
									studentinfo2 += '<a class="putinfo2">提交</a>'
									studentinfo2 += '</div>'
									studentinfo2 += '</div>'
									studentinfo2 += '</li>'
									studentinfo2 = $(studentinfo2);
									CheckStuInfo(studentinfo2, result[i]);
									/*											studentinfo2.find('.readIdCard').unbind().bind('click', function() {
																					_C.readIdCard(function(data) {
																						studentinfo2.find('.ds_name').val(data.name);
																						studentinfo2.find('.ds_id').val(data.id);
																					})
																				});*/
									_v.studentModel.find('.studentsection ul').append(studentinfo2);
								}
							});
							_v.studentModel.find('.stulistright .addstuinfo').click(function() {
								_v.studentModel.find('.stulistright .studentsection .hidediv').show();
								_v.studentModel.find('.stulistright .studentsection').empty();
								var _realhouse = result.id;
								_v.studentModel.find('.stulistright .studentsection').append(_t.studentTemplate5({}));
								_v.studentModel.find('.studentsection .putinfo1').click(function() {
									var _name = _v.studentModel.find('.stulistright .studentsection .ds_name').val();
									var _id = _v.studentModel.find('.stulistright .studentsection .ds_id').val();
									var _address = _v.studentModel.find('.stulistright .studentsection .ds_address').val();
									var _phone = _v.studentModel.find('.stulistright .studentsection .ds_phone').val();
									if (!_C.jude.isNull(_name)) {
										common.alert({
											text: '姓名不能为空'
										});
										return;
									};
									if (!_C.jude.isNull(_id)) {
										common.alert({
											text: '身份证号不能为空'
										});
										return;
									};
									if (!_C.jude.isIdCard(_id)) {
										common.alert({
											text: '请输入正确的身份证号码'
										});
										return;
									};
									if (!_C.jude.isNull(_address)) {
										common.alert({
											text: '户籍地址不能为空'
										});
										return;
									};
									if (!_C.jude.isNull(_phone)) {
										common.alert({
											text: '联系方式不能为空'
										});
										return;
									};
									if (!_C.jude.isPhone(_phone)) {
										common.alert({
											text: '请输入正确的手机号码'
										});
										return;
									};
									_a.checkStuffInfoReturn({
										"name": _name,
										"idCard": _id,
										"isCreate": "true",
										"publicorderId": permissions.getUserMessage().publicMessage.id,
										"publicorderName": permissions.getUserMessage().publicMessage.name,
										"policeId": permissions.getUserMessage().publicMessage.systemuserid,
									}, function(result) {
										var _data = {
											"name": "ds_residentsassociation",
											"attributes": [{
												"name": "ds_person_ref",
												"value": "@look/" + result.resultObj.personId
											}, {
												"name": "ds_realhouse_ref",
												"value": "@look/" + _realhouse
											}]
										};
										var _data1 = {
											"attributes": [{
												"name": "ds_name",
												"value": _name
											}, {
												"name": "ds_id",
												"value": _id
											}, {
												"name": "ds_nativeplace",
												"value": _address
											}, {
												"name": "ds_phone",
												"value": _phone
											}]
										};
										var resId = result.resultObj.personId;
										_a.putStuInfo(resId, _data1, function() {
											_a.createStuInfo(resId, _data, function(result) {
												common.alert({
													text: '创建成功'
												}, function() {
													_v.studentModel.find('.stulistright .studentsection .hidediv').hide();
													_v.studentModel.find('.stulistright .studentsection').show();
													_v.studentModel.find('.stulistright .studentsection .showdiv').show();
													_v.studentModel.find('.stulistright .putininfo').empty();
													_v.studentModel.find('.stulistright .headinfo .stutitle').empty();
													_v.studentModel.find('.stulistright .studentsection').empty();
													var bgtext = $('<h2>请选择寝室列表</h2>');
													_v.studentModel.find('.stulistright .putininfo').empty().append(bgtext);
												});
											});
										});
									});
								});
								_v.studentModel.find('.studentsection .cancelinfo').click(function() {
									_v.studentModel.find('.stulistright .studentsection .hidediv').hide();
									_v.studentModel.find('.stulistright .studentsection').show();
									_v.studentModel.find('.stulistright .putininfo').empty();
									_v.studentModel.find('.stulistright .headinfo .stutitle').empty();
									_v.studentModel.find('.stulistright .studentsection').empty();
									var bgtext = $('<h2>请选择寝室列表</h2>');
									_v.studentModel.find('.stulistright .putininfo').empty().append(bgtext);
								});
							});
						});
					}
					
				},
				CheckbulidList: function(item, data) {
					item.find('.cekstudent').click(function() {
						_v.order = data;
						_f.initStudentList();
						_v.studentModel = {};
						common.dialog({
							className: 'studialog',
							title: '学生管理',
							template: _t.studentTemplate(data),
							confirm: {
								event: false,
								hide: true,
							},
							cancel: {
								event: false,
								hide: true,
							}
						});
					});
				}
			},
			_t = {
				stuList: function(data, name) {
					var Stu = '<div id="Stulist"><div class="stuff"><h3>学生管理</h3></div>'
					Stu += '	<ul class="stulist">'
					Stu += '		<div class="emptyBox" id="empty" style="text-align: center; display: none; position: relative; top: 90px;">'
					Stu += '			<img src="/police_web/img/empty.png" class="Icon">'
					Stu += '			<span style="display: block; color: #888;">暂无公寓</span>'
					Stu += '		</div>'
					Stu += '	</ul>'					
					Stu += '</div>'
					
					Stu = $(Stu);
					if(!_C.jude.isNull(data)){
						Stu.find('#empty').css('display','block');
					}else{
						Stu.find('#empty').css('display','none');
						for (var i = 0; i < data.length; i++) {
							var item = '';
							item += '<li>';
							item += '<div class="cekstudent">';
							item += '<img src="/publicorder_web/img/building.png" alt="">';
							item += '<p>' + data[i]['ds_address_l4_ref-ds_name'] + '</p>';
							item += '</div>';
							item += '</li>';
							item = $(item);
							_f.CheckbulidList(item, data[i]);
							Stu.find("ul").append(item);
						}
					};					
					return Stu;
				},
				studentTemplate1: function() {
					var studentinfo1 = '';
					studentinfo1 += '<div class="putininfo">'
					studentinfo1 += '<div style="";>'
					studentinfo1 += '<div style="width: 200px;height: 30px">'
					studentinfo1 += '<p style="width: 60px">楼层：</p><input type="text" class="addfloor"><p>楼</p>'
					studentinfo1 += '</div>'
					studentinfo1 += '<div style="width: 200px;height: 30px">'
					studentinfo1 += '<p style="width: 60px">寝室号：</p><input type="text" class="addroomfigure"><p>寝</p>'
					studentinfo1 += '</div>'
					studentinfo1 += '<a class="putbtn">提交</a>'
					studentinfo1 += '</div>'
					studentinfo1 += '</div>'
					studentinfo1 = $(studentinfo1);
					return studentinfo1;
				},
				studentTemplate3: function(result) {
					var studentinfo3 = '';
					studentinfo3 += '<div style="";>'
					studentinfo3 += '<div style="width: 200px;height: 30px">'
					studentinfo3 += '<p style="width: 60px">楼层：</p><input type="text" value="' + result['ds_floor'] + '" class="addfloor"><p>楼</p>'
					studentinfo3 += '</div>'
					studentinfo3 += '<div style="width: 200px;height: 30px">'
					studentinfo3 += '<p style="width: 60px">寝室号：</p><input type="text" value="' + result['ds_roomfigure'] + '" class="addroomfigure"><p>寝</p>'
					studentinfo3 += '</div>'
					studentinfo3 += '<a class="putbtn1">提交</a>'
					studentinfo3 += '</div>'
					studentinfo3 = $(studentinfo3);
					return studentinfo3;
				},
				studentTemplate2: function(data) {
					var studentinfo2 = '';
					studentinfo2 += '<li>'
					studentinfo2 += '<div class="showdiv">'
					studentinfo2 += '<p>姓名：<span class="">' + data['ds'] + '</span></p>'
					studentinfo2 += '<a class="delbtn">删除</a>'
					studentinfo2 += '<a class="cekbtn">查看</a>'
					studentinfo2 += '</div>'
					studentinfo2 += '<div class="hidediv" style:"display:none">'
					studentinfo2 += '<div><p>姓名：</p><input type="text" class="ds_name" value=""></div>'
					studentinfo2 += '<div><p>身份证号：</p><input type="text" class="ds_id" value=""></div>'
					studentinfo2 += '<div><p>户籍地址：</p><input type="text" class="ds_address" value=""></div>'
					studentinfo2 += '<div><p>联系电话：</p><input type="text" class="ds_phone" value=""></div>'
					studentinfo2 += '<div class="hidebtn">'
					studentinfo2 += '<a class="cancelinfo">取消</a>'
					studentinfo2 += '<a class="putinfo">提交</a>'
					studentinfo2 += '</div>'
					studentinfo2 += '</div>'
					studentinfo2 += '</li>'
					studentinfo2 = $(studentinfo2);
					return studentinfo2;
				},
				studentTemplate4: function(data) {
					var studentinfo4 = '';
					studentinfo4 += '<p>' + data['ds_floor'] + '楼' + data['ds_roomfigure'] + '寝</p><img src="/publicorder_web/img/add_2.png" title="添加人员信息" class="addstuinfo" alt="">'
					studentinfo4 = $(studentinfo4);
					return studentinfo4;
				},
				studentTemplate5: function(data) {
					var studentinfo5 = '';
					studentinfo5 += '<div class="hidediv" style:"display:none">'
					studentinfo5 += '<div><p>姓名：</p><input type="text" class="ds_name" value=""></div>'
					studentinfo5 += '<div><p>身份证号：</p><input type="text" class="ds_id" value=""></div>'
					studentinfo5 += '<div><p>户籍地址：</p><input type="text" class="ds_address" value=""></div>'
					studentinfo5 += '<div><p>联系电话：</p><input type="text" class="ds_phone" value=""></div>'
					studentinfo5 += '<div class="hidebtn">'
					studentinfo5 += '<a class="readIdCard">读取身份证</a>'
					studentinfo5 += '<a class="cancelinfo">取消</a>'
					studentinfo5 += '<a class="putinfo1">提交</a>'
					studentinfo5 += '</div>'
					studentinfo5 += '</div>'
					studentinfo5 = $(studentinfo5);

					studentinfo5.find('.readIdCard').unbind().bind('click', function() {
						_C.readIdCard(function(data) {
							studentinfo5.find('.ds_name').val(data.name);
							studentinfo5.find('.ds_id').val(data.id);
						})
					});
					return studentinfo5;
				},
				studentTemplate: function(data) {
					var studentinfo = '<div class="studentlist">'
					studentinfo += '<div class="stulistleft">'
					studentinfo += '<header><p>寝室列表</p><img class="adddormitorylist" title="添加寝室" src="/publicorder_web/img/putbtn.png" alt=""></header>'
					studentinfo += '<section class="students">'
					studentinfo += '<ul>'

					studentinfo += '</ul>'
					studentinfo += '</section>'
					studentinfo += '</div>'
					studentinfo += '<div class="stulistright"><div class="headinfo">'
					studentinfo += '<header><div class="stutitle"></div></header>'
					studentinfo += '</div>'
					studentinfo += '<div class="putininfo">'
					studentinfo += '<h2>请选择寝室列表</h2>'
					studentinfo += '</div>'
					studentinfo += '<section class="studentsection" style=" " >'
					studentinfo += '<ul>'

					studentinfo += '</ul>'
					studentinfo += '</section>'
					studentinfo += '</div>'
					studentinfo += '</div>'
					studentinfo = $(studentinfo);
					_v.studentModel = studentinfo;
					return studentinfo;
				},
			},
			_a = {
				get: function(success) {
					_C.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter=name eq 'ds_address_l4_ref-ds_address_l4id' " +
							"or name eq 'ds_address_l4_ref-ds_name' " +
							"),lookups&$filter=name eq 'ds_publicorder_address_l4' and query eq 'ds_publicorder_ref eq " + _v.message.id + "'",
						success: function(result) {
							var value = _C.formatting.CRMList(result.value);
							success(value);
						}
					});
				},
				/*获取学生管理楼房列表*/
				getStuList: function(id, success) {
					common.GET({
						url: "/crm/Entities?$expand=attributes($filter=name eq 'ds_address_l4_ref-ds_address_l4id' or name eq 'ds_address_l4_ref-ds_name'),lookups&$filter=name eq 'ds_publicorder_address_l4' and query eq 'ds_publicorder_ref eq " + id + "'",
						success: function(result) {
							var _d = _C.formatting.CRMList(result.value);
							success(_d);
						}
					})
				},
				/*获取指定楼房寝室列表*/
				getHostelList: function(id, success) {
					common.GET({
						url: "/crm/Entities?$expand=attributes($filter=name eq 'ds_address' or name eq 'ds_floor'or name eq 'ds_roomfigure'),lookups&$filter=name eq 'ds_realhouse' and query eq 'ds_address_tree eq " + id + "'",
						success: function(result) {
							var _d = _C.formatting.CRMList(result.value);
							success(_d);
						}
					})
				},
				/*修改指定寝室信息*/
				putHostelInfo: function(id, data, success) {
					common.PUT({
						data: data,
						url: "/crm/Entities('ds_realhouse" + id + "')",
						success: function(result) {
							success();
						}
					})
				},
				/*删除指定寝室信息*/
				delHostelInfo: function(id, success) {
					common.DELETE({
						url: "/crm/Entities('ds_realhouse" + id + "')",
						success: function(result) {
							success();
						}
					})
				},
				/*新增寝室信息*/
				createHostelInfo: function(id, data, success) {
					common.POST({
						data: data,
						url: "/crm/Entities",
						success: function(result) {
							success();
						}
					})
				},
				/*获取指定寝室学生列表*/
				getStuHostelInfo: function(id, success) {
					common.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter=name eq 'ds_person_ref-ds_name' " +
							"or name eq 'ds_person_ref-ds_personid'" +
							"or name eq 'ds_residentsassociationid'" +
							"or name eq 'ds_person_ref-ds_account' " +
							"or name eq 'ds_person_ref-ds_address'" +
							"or name eq 'ds_person_ref-ds_birth'" +
							"or name eq 'ds_person_ref-ds_bloodtype'" +
							"or name eq 'ds_person_ref-ds_education'" +
							"or name eq 'ds_person_ref-ds_gender'" +
							"or name eq 'ds_person_ref-ds_height'" +
							"or name eq 'ds_person_ref-ds_id'" +
							"or name eq 'ds_person_ref-ds_idaheadpic'" +
							"or name eq 'ds_person_ref-ds_idbackpic'" +
							"or name eq 'ds_person_ref-ds_livestatus'" +
							"or name eq 'ds_person_ref-ds_marriage'" +
							"or name eq 'ds_person_ref-ds_name'" +
							"or name eq 'ds_person_ref-ds_nation'" +
							"or name eq 'ds_person_ref-ds_nativeplace'" +
							"or name eq 'ds_person_ref-ds_oldname'" +
							"or name eq 'ds_person_ref-ds_personid'" +
							"or name eq 'ds_person_ref-ds_phone'" +
							"or name eq 'ds_person_ref-ds_placeaddress'" +
							"),lookups&$filter=name eq 'ds_residentsassociation' and query eq 'ds_realhouse_ref eq " + id + "'",
						success: function(result) {
							var _d = _C.formatting.CRMList(result.value);
							success(_d);
						}
					});
				},
				/*查看指定学生信息*/
				checkStuInfo: function(id, data, success) {
					common.GET({
						url: "/crm/Entities?$expand=attributes($filter= name eq 'ds_account' or name eq 'ds_address'or name eq 'ds_birth'or name eq 'ds_bloodtype'or name eq 'ds_education'or name eq 'ds_gender'or name eq 'ds_height'or name eq 'ds_id'or name eq 'ds_idaheadpic'or name eq 'ds_idbackpic'or name eq 'ds_livestatus'or name eq 'ds_marriage'or name eq 'ds_name'or name eq 'ds_nation'or name eq 'ds_nativeplace'or name eq 'ds_oldname'or name eq 'ds_personid'or name eq 'ds_phone'or name eq 'ds_phone2'or name eq 'ds_politics'or name eq 'ds_qq'or name eq 'ds_telephone'or name eq 'ds_wechat')&$filter=name eq 'ds_person' and query eq 'ds_personid eq " + id + "'",
						success: function(result) {
							var _d = _C.formatting.CRMValue(result.value);
							success(_d);
						}
					})
				},
				/*删除指定学生信息*/
				delStuInfo: function(id, success) {
					common.DELETE({
						url: "/crm/Entities('ds_residentsassociation" + id + "')",
						success: function(result) {
							success(result);
						}
					})
				},
				/*修改指定学生信息*/
				putStuInfo: function(id, data, success) {
					common.PUT({
						data: data,
						url: "/crm/Entities('ds_person" + id + "')",
						success: function(result) {
							success();
						}
					})
				},
				/*新增学生信息*/
				createStuInfo: function(id, data, success) {
					common.POST({
						data: data,
						url: "/crm/Entities",
						success: function(result) {
							success(result);
						}
					});
				},
				downloadImg: function(id) {
					_C.POST({
						url: "/api/Place/GetStub",
						data: {
							"id": id
						},
						success: function(result) {
							if (result.status == 0) {
								var a = '<a href="' + result.resultObj.fileTempPath + '" target="_blank"><span> </span></a>';
								a = $(a);
								a.find('span').click();
							} else {
								common.alert({
									text: '未找到图片！'
								});
							}
						},
						error: function(a, b, c) {}

					});
				},
				/*获取附件接口*/
				getSub: function(id, success) {
					_C.POST({
						url: "/api/Place/GetStub",
						data: {
							"id": id
						},
						success: function(result) {
							success(result);
						}
					});
				},
				getImage: function() {
					_f.getBase64({
						fileType: 'image',
						elementId: '.fileButtom',
						success: function(imageUrl) {
							$('#updatebtn').unbind().bind('click', function() {
								var a = '<a href="' + imageUrl + '" target="_blank"><span> </span></a>';
								a = $(a);
								a.find('span').click();
							})

						},
						error: function(message) {
							common.alert({
								className: 'userAlert',
								text: message
							});
						}
					});
				},
				getBase64: function(data) {
					var file = $(data.elementId)[0].files[0];
					if (!file) {
						data.error('上传文件信息未空');
						$(data.elementId).clearFields();
						return;
					};
					var fileType = ['.doc', '.docx', '.jpg', '.jpeg', '.png'];
					var index1 = file.name.lastIndexOf(".");
					var index2 = file.name.length;
					var postf = file.name.substring(index1, index2).toLowerCase(); //后缀名  
					if ($.inArray(postf, fileType) == -1) {
						data.error('文件格式错误');
						$(data.elementId).clearFields();
						return;
					};
					if (data.fileType == 'image' && (postf != '.jpg' && postf != '.jpeg' && postf != '.png')) {
						data.error('预期格式错误');
						$(data.elementId).clearFields();
						return;
					} else if (data.fileType == 'doc' && (postf != '.doc' && postf != '.docx')) {
						data.error('预期格式错误');
						$(data.elementId).clearFields();
						return;
					};
					var oReader = new FileReader();
					oReader.onload = function(e) {
						if (data.fileType == 'image') {
							var _image = document.createElement('img');
							_image.src = e.target.result;
							_image.onload = function() {
								var that = _image;
								var w = that.width,
									h = that.height,
									scale = w / h;
								w = 640;
								h = w / scale;
								var canvas = document.createElement('canvas');
								var ctx = canvas.getContext('2d');
								$(canvas).attr({
									width: w,
									height: h
								});
								ctx.drawImage(that, 0, 0, w, h);
								var base64 = canvas.toDataURL('image/jpeg', 0.6);
								data.success(base64);
							};
						} else if (data.fileType == 'doc') {
							data.success(e.target.result);
						};
					};
					oReader.readAsDataURL(file);
				},
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
				putPublicStuffInfo: function(data, id, success) {
					common.PUT({
						data: data,
						url: "/crm/Entities('ds_person" + id + "')",
						success: function(result) {
							success(result);
						}
					})
				},
			};
		return {
			init: _f.init,
		};
	})();
})(jQuery, common, window);