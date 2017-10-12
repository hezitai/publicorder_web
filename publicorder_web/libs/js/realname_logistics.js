(function($, _C, _W) {
	_W.realnameLogistics = (function() {
		var _v = {
				message: {},
				picname: {},
				picname1: {},
				search: {
					index: 1,
					count: 10
				},
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;
					$('.searchbox').css('display', 'none');
					_f.initPage();

				},
				initPage: function() {
					$('.addbtnbox').empty().append(_t.addBtnBoxForLogistics());
					$('.addbtnbox').find('.addbtn2').click(function() { //添加自定义单号
						_f.addinterval();
					});
					$('.addbtnbox').find('.addbtn1').click(function() { //添加单号区间
						_f.addorder();
					});
					var option = {
						element: '#paging2',
						data: {
							count: '10',
							index: '1',
						},
						allPageKey: 'totalCount',
						event: _a.getlist,
						success: function(result) {
							$('.realnamebody .listbox').empty();
							var Ul = $('<ul style="margin-top:10px;"></ul>');
							$('.realnamebody .listbox').append(Ul)
							for (var i = 0; i < result.list.length; i++) {
								Ul.append(_t.list(result.list[i]));
							};
						}
					};
					_C.paging(option);
				},
				/*添加自定义单号信息*/
				addinterval: function() {
					_C.dialog({
						className: 'createlogisticsinfo',
						title: '详细信息',
						template: _t.createlogisticsinfo({}),
						confirm: {
							event: function(template, hide) {
								var _ordernum = template.find('.ds_ordernum').val(); //订单编号
								var _name = template.find('.ds_name').val(); //物品名称
								var _receivernic = template.find('.ds_receivernic').val(); //收件人名称
								var _receiverphone = template.find('.ds_receiverphone').val(); //收件人手机号
								var _person = template.find('.ds_person').val(); //寄件人姓名
								var _personid = template.find('.ds_personid').val(); //寄件人身份证
								var _information = template.find('.ds_information').val(); //物品描述
								var _personphone = template.find('.ds_personphone').val(); //寄件人电话
								if (!_C.jude.isNull(_ordernum)) {
									common.alert({
										text: '订单编号不能为空'
									});
									return;
								};
								if (!_C.jude.isLogistics(_ordernum)) {
									common.alert({
										text: '订单号填写错误'
									});
									return;
								};
								if (_C.jude.isHaveChinese(_ordernum)) {
									common.alert({
										text: '订单编号不能有中文'
									});
									return;
								};
								if (!_C.jude.isNull(_name)) {
									common.alert({
										text: '物品名称不能为空'
									});
									return;
								};

								if (_C.jude.isNull(_receiverphone) && !_C.jude.isPhone(_receiverphone)) {
									common.alert({
										text: '请输入正确的手机号码'
									});
									return;
								};
								if (!_C.jude.isNull(_person)) {
									common.alert({
										text: '寄件人姓名不能为空'
									});
									return;
								};
								if (!_C.jude.isNull(_personid)) {
									common.alert({
										text: '寄件人身份证号不能为空'
									});
									return;
								};
								if (!_C.jude.isIdCard(_personid)) {
									common.alert({
										text: '请输入正确的身份证号码'
									});
									return;
								};
								if (!_C.jude.isNull(_personphone)) {
									common.alert({
										text: '寄件人联系方式不能为空'
									});
									return;
								};
								if (!_C.jude.isPhone(_personphone)) {
									common.alert({
										text: '请输入正确的手机号码'
									});
									return;
								};

								_a.checkStuffInfoReturn({
									"name": _person,
									"idCard": _personid,
									"isCreate": "true",
									"publicorderId": permissions.getUserMessage().publicMessage.id,
									"publicorderName": permissions.getUserMessage().publicMessage.name,
									"policeId": permissions.getUserMessage().publicMessage.systemuserid,
								}, function(result) {
									var ResultId = result.resultObj.personId
									var _data = {
										"attributes": [{
											"name": "ds_phone",
											"value": _personphone
										}, {
											"name": "ds_name",
											"value": _person
										}]
									};
									var goodsinfo = {
										"name": "ds_shimingzhi",
										"attributes": [{
											"name": "ds_ordernum",
											"value": _ordernum
										}, {
											"name": "ds_person",
											"value": "@look/" + ResultId
										}, {
											"name": "ds_orderstatus",
											"value": "@code/100000002"
										}, {
											"name": "ds_name",
											"value": _name
										}]
									};
									if (_C.jude.isNull(_information)) {
										goodsinfo.attributes.push({
											"name": "ds_information",
											"value": _information
										});
									};
									if (_C.jude.isNull(_receivernic)) {
										goodsinfo.attributes.push({
											"name": "ds_receivernic",
											"value": _receivernic
										});
									};
									if (_C.jude.isNull(_receiverphone)) {
										goodsinfo.attributes.push({
											"name": "ds_receiverphone",
											"value": _receiverphone
										});
									};

									_a.upDataPeoplePhone(ResultId, _data);
									_f.checkCustomOrderIshas(_ordernum, function(isHas, orderId) {

										function upDataOrder() {
											_a.createCustomListUpdate(orderId, goodsinfo, function(result) {
												var setting = {
													className: 'breakdialog',
													title: '提示',
													text: '修改成功',
													confirm: {
														text: '确定',
														event: function() {
															location.reload();
														},
													}
												};
												common.confirm(setting);
												hide();
											});
										};

										function CreatOrder() {
											goodsinfo.attributes.push({
												"name": "ds_publicorder",
												"value": "@look/" + _v.message.id
											});
											_a.createCustomListAdd(goodsinfo, function(result) {
												var setting = {
													className: 'breakdialog',
													title: '提示',
													text: '添加成功',
													confirm: {
														text: '确定',
														event: function() {
															location.reload();
														},
													}
												};
												_C.confirm(setting);
												hide();
											});
										};

										function upDataWidthImage() {
											var options = {
												success: function(data) {
													goodsinfo.attributes.push({
														"name": "ds_image",
														"value": data
													});
													_C.loading.hide();

													if (isHas) {
														// 存在
														upDataOrder();
													} else {
														// 不存在
														CreatOrder();
													};
												},
												error: function(a, b, c) {
													_C.loading.hide();
												}
											};
											template.find('#IdCardA').ajaxForm(options);
											template.find('#IdCardA .submit').click();
											_C.loading.show();
										};

										var isHasImage = false;

										try {
											if ($('#fileUpDataElement')[0].files.length != 0) {
												isHasImage = true;
											} else if ($('#fileUpDataElement')[0].files.length == 0 && $('#fileUpDataElement').attr('data-id') != 'none') {
												isHasImage = false;
											};
										} catch (err) {
											if (_C.jude.isNull($('#fileUpDataElement').val())) {
												isHasImage = true;
											} else {
												isHasImage = false;
											};
										};

										if (isHasImage) {
											upDataWidthImage();
										} else {
											if (isHas) {
												// 存在
												upDataOrder();
											} else {
												// 不存在
												CreatOrder();
											};
										};
									});
								});
							}
						}
					});
				},
				checkCustomOrderIshas: function(orderNum, success) {
					_a.checkCustomOrderIshas(orderNum, function(result) {
						if (result.length == 0) {
							success(false);
						} else {
							success(true, result[0].id);
						}
					});
				},
				/*添加单号区间*/
				addorder: function() {
					_C.dialog({
						className: 'numberdialog',
						title: '添加单号区间',
						template: _t.createcustom({}),
						confirm: {
							event: function(template, hide) {
								var startnum = template.find('.startnum').val().toString();
								var number = template.find('.sumnum').val().toString();

								if (!_C.jude.isLogistics(startnum)) {
									_C.alert({
										className: 'confirmPopup',
										text: '请输入正确的单号',
									});
									return;
								};

								if (!_C.jude.isInteger(number)) {
									_C.alert({
										className: 'confirmPopup',
										text: '请输入正确的单号数量',
									});
									return;
								};
								if (number > 200) {
									_C.alert({
										className: 'confirmPopup',
										text: '单号数量不能超过200',
									});
									return;
								};

								var creatlogistics = {
									"ds_ordercount": number,
									"ds_orderstart": startnum,
									"ds_publicorder_ref": _v.message.id
								};
								_a.createLogisticsSectionInfo(creatlogistics, function(result) {
									var setting = null;
									if (result.status == 2) {
										setting = {
											className: 'breakdialog',
											title: '提示',
											text: '创建的单号区间包含已有订单，请勿重复创建',
											confirm: {
												text: '确定'
											}
										};
									} else if (result.status == 1) {
										setting = {
											className: 'breakdialog',
											title: '提示',
											text: '创建失败，请重试',
											confirm: {
												text: '确定'
											}
										};
									} else if (result.status == 3) {
										setting = {
											className: 'breakdialog',
											title: '提示',
											text: result.message,
											confirm: {
												text: '确定'
											}
										};
									} else {
										setting = {
											className: 'breakdialog',
											title: '提示',
											text: '创建成功',
											confirm: {
												text: '确定',
												event: function() {
													_f.init();
												},
											}
										};
									}
									common.confirm(setting);
								});
								hide();
							}
						}
					});
				},
				/*获取单号区间单号列表*/
				getorderinfo: function(id, Template1, Template2, num) {
					var addimg = '<img src="/publicorder_web/img/addbtn.png" alt="">';
					var eveimg = '<img src="/publicorder_web/img/evebtn.png" alt="">';
					if (num == 0) {
						_C.alert({
							text: '单号已用完'
						});
					} else {
						if (Template1.html() == '') {
							_a.getSectionNumberList(id, function(result) {
								$('.boxheight1 a').empty().html(addimg);
								$('.listbox .numberbox').empty();
								for (var i = 0; i < result.length; i++) {
									var className = '';
									if (result[i].ds_orderstatus.split(":")[0] == '100000000') {
										className = 'grayborder';
									};
									if (result[i].ds_orderstatus.split(":")[0] == '100000002') {
										className = 'normalborder';
									};
									if (result[i].ds_orderstatus.split(":")[0] == '100000001') {
										className = 'blueborder';
									};
									Template1.append(_t.getnumlist(className, result[i]));

								};
								Template2.html(eveimg);
							});
						} else {
							$('#paging').css('display', 'none');
							$('.listbox .numberbox').empty();
							$('.boxheight a').html(addimg);
						}

					}

					if (!Template1.html() == '') {
						if(num == 0){
							if(Template2.html() == addimg) {
								Template2.empty().html(eveimg);
							} else{
								Template2.empty().html(addimg);
							};
							//Template3.click();
						} else {
							$('#paging').css('display', 'none');
							$('.listbox .numberbox').empty();
							if(Template2.html() == addimg) {
								Template2.empty().html(eveimg);
							} else{
								Template2.empty().html(addimg);
							};
						}
						//Template3.click();
					} else {
						_a.getSectionNumberList(id, function(result) {
							$('#paging').empty();
							$('.listbox .numberbox').empty();
							$('#empty').css('display', 'none');
							$('.boxheight1 a').empty().html(addimg);
							Template2.empty().html(eveimg);
							
							for (var i = 0; i < result.length; i++) {
								var className = ''
								if (result[i].ds_orderstatus.split(":")[0] == '100000000') {
									className = 'grayborder';
								};
								if (result[i].ds_orderstatus.split(":")[0] == '100000002') {
									className = 'normalborder';
								};
								if (result[i].ds_orderstatus.split(":")[0] == '100000001') {
									className = 'blueborder';
								};
								Template1.append(_t.getnumlist(className, result[i]));
							};
						});
					};
				},
				/*删除区间专用--勿动*/
				/*getorderinfo: function(id, Template1, Template2, num) {
					_a.delete(id, function() {

					});
				},*/
				/*使用或修改指定单号信息*/
				getnuminfo: function(result) {
					_a.getSpecifySectionInfo(result['ds_shimingzhiid'], function(result) {
						_v.resultId = result.id;
						if (result['ds_orderstatus'].split(':')[0] == '100000000') { //订单已作废时，修改订单属性ds_orderstatus
							_C.dialog({
								className: 'createlogisticsinfo',
								title: '详细信息',
								template: _t.createlogisticsinfo2(result),
								confirm: {
									event: function(template, hide) {
										var _ordernum = template.find('.ds_ordernum').val(); //订单编号
										var _name = template.find('.ds_name').val(); //物品名称
										var _receivernic = template.find('.ds_receivernic').val(); //收件人名称
										var _receiverphone = template.find('.ds_receiverphone').val(); //收件人手机号
										var _person = template.find('.ds_person').val(); //寄件人姓名
										var _personid = template.find('.ds_personid').val(); //寄件人身份证
										var _information = template.find('.ds_information').val(); //物品描述
										var _personphone = template.find('.ds_personphone').val(); //寄件人电话
										if (!_C.jude.isNull(_ordernum)) {
											common.alert({
												text: '订单编号不能为空'
											});
											return;
										};
										if (!_C.jude.isNull(_name)) {
											common.alert({
												text: '物品名称不能为空'
											});
											return;
										};

										if (_C.jude.isNull(_receiverphone) && !_C.jude.isPhone(_receiverphone)) {
											common.alert({
												text: '请输入正确的手机号码'
											});
											return;
										};
										if (!_C.jude.isNull(_person)) {
											common.alert({
												text: '寄件人姓名不能为空'
											});
											return;
										};
										if (!_C.jude.isNull(_personid)) {
											common.alert({
												text: '寄件人身份证号不能为空'
											});
											return;
										};
										if (!_C.jude.isIdCard(_personid)) {
											common.alert({
												text: '请输入正确的身份证号码'
											});
											return;
										};
										if (!_C.jude.isNull(_personphone)) {
											common.alert({
												text: '寄件人联系方式不能为空'
											});
											return;
										};
										if (!_C.jude.isPhone(_personphone)) {
											common.alert({
												text: '请输入正确的手机号码'
											});
											return;
										};

										_a.checkStuffInfoReturn({
											"name": _person,
											"idCard": _personid,
											"isCreate": "true",
											"publicorderId": permissions.getUserMessage().publicMessage.id,
											"publicorderName": permissions.getUserMessage().publicMessage.name,
											"policeId": permissions.getUserMessage().publicMessage.systemuserid,
										}, function(result) {
											var ResultId = result.resultObj.personId
											var _data = {
												"attributes": [{
													"name": "ds_phone",
													"value": _personphone
												}, {
													"name": "ds_name",
													"value": _person
												}]
											};
											_a.upDataPeoplePhone(ResultId, _data);
											var goodsinfo = {
												"attributes": [{
													"name": "ds_person",
													"value": "@look/" + ResultId
												}, {
													"name": "ds_name",
													"value": _name
												}, {
													"name": "ds_orderstatus",
													"value": "@code/100000002"
												}, {
													"name": "ds_publicorder",
													"value": "@look/" + _v.message.id
												}]
											};
											if (_C.jude.isNull(_information)) {
												goodsinfo.attributes.push({
													"name": "ds_information",
													"value": _information
												});
											};
											if (_C.jude.isNull(_receivernic)) {
												goodsinfo.attributes.push({
													"name": "ds_receivernic",
													"value": _receivernic
												});
											};
											if (_C.jude.isNull(_receiverphone)) {
												goodsinfo.attributes.push({
													"name": "ds_receiverphone",
													"value": _receiverphone
												});
											};

											function upDataWidthImage() {
												var options = {
													success: function(data) {
														goodsinfo.attributes.push({
															"name": "ds_image",
															"value": data
														});
														upDataWidthOutImage();
													},
													error: function(a, b, c) {
														_C.loading.hide();
													}
												};
												template.find('#IdCardA').ajaxForm(options);
												template.find('#IdCardA .submit').click();
												_C.loading.show();
											};

											function upDataWidthOutImage() {
												_a.putSpecifySectionInfo(_v.resultId, goodsinfo, function() {
													var setting = {
														className: 'breakdialog',
														title: '提示',
														text: '修改成功',
														confirm: {
															text: '确定',
															event: function() {
																location.reload();
															},
														}
													};
													common.confirm(setting);
													hide();
												});
											};
											try {
												if ($('#fileUpDataElement')[0].files.length != 0) {
													upDataWidthImage();
												} else if ($('#fileUpDataElement')[0].files.length == 0 && $('#fileUpDataElement').attr('data-id') != 'none') {
													upDataWidthOutImage();
												};
											} catch (err) {
												if (_C.jude.isNull($('#fileUpDataElement').val())) {
													upDataWidthImage();
												} else {
													upDataWidthOutImage();
												};
											};
										});
									}
								}
							});
						} else {
							_C.dialog({
								className: 'createlogisticsinfo',
								title: '详细信息',
								template: _t.createlogisticsinfo2(result),
								confirm: {
									event: function(template, hide) {
										var _ordernum = template.find('.ds_ordernum').val(); //订单编号
										var _name = template.find('.ds_name').val(); //物品名称
										var _receivernic = template.find('.ds_receivernic').val(); //收件人名称
										var _receiverphone = template.find('.ds_receiverphone').val(); //收件人手机号
										var _person = template.find('.ds_person').val(); //寄件人姓名
										var _personid = template.find('.ds_personid').val(); //寄件人身份证
										var _information = template.find('.ds_information').val(); //物品描述
										var _personphone = template.find('.ds_personphone').val(); //寄件人电话
										if (!_C.jude.isNull(_ordernum)) {
											common.alert({
												text: '订单编号不能为空'
											});
											return;
										};
										if (!_C.jude.isNull(_name)) {
											common.alert({
												text: '物品名称不能为空'
											});
											return;
										};
										if (_C.jude.isNull(_receiverphone) && !_C.jude.isPhone(_receiverphone)) {
											common.alert({
												text: '请输入正确的手机号码'
											});
											return;
										};
										if (!_C.jude.isNull(_person)) {
											common.alert({
												text: '寄件人姓名不能为空'
											});
											return;
										};
										if (!_C.jude.isNull(_personid)) {
											common.alert({
												text: '寄件人身份证号不能为空'
											});
											return;
										};
										if (!_C.jude.isIdCard(_personid)) {
											common.alert({
												text: '请输入正确的身份证号码'
											});
											return;
										};
										if (!_C.jude.isNull(_personphone)) {
											common.alert({
												text: '寄件人联系方式不能为空'
											});
											return;
										};
										if (!_C.jude.isPhone(_personphone)) {
											common.alert({
												text: '请输入正确的手机号码'
											});
											return;
										};

										_a.checkStuffInfoReturn({
											"name": _person,
											"idCard": _personid,
											"isCreate": "true",
											"publicorderId": permissions.getUserMessage().publicMessage.id,
											"publicorderName": permissions.getUserMessage().publicMessage.name,
											"policeId": permissions.getUserMessage().publicMessage.systemuserid,
										}, function(result) {
											var ResultId = result.resultObj.personId
											var _data = {
												"attributes": [{
													"name": "ds_phone",
													"value": _personphone
												}, {
													"name": "ds_name",
													"value": _person
												}]
											};
											_a.upDataPeoplePhone(ResultId, _data);
											var goodsinfo = {
												"attributes": [{
													"name": "ds_person",
													"value": "@look/" + ResultId
												}, {
													"name": "ds_name",
													"value": _name
												}, {
													"name": "ds_orderstatus",
													"value": "@code/100000002"
												}, {
													"name": "ds_publicorder",
													"value": "@look/" + _v.message.id
												}]
											};
											if (_C.jude.isNull(_information)) {
												goodsinfo.attributes.push({
													"name": "ds_information",
													"value": _information
												});
											};
											if (_C.jude.isNull(_receivernic)) {
												goodsinfo.attributes.push({
													"name": "ds_receivernic",
													"value": _receivernic
												});
											};
											if (_C.jude.isNull(_receiverphone)) {
												goodsinfo.attributes.push({
													"name": "ds_receiverphone",
													"value": _receiverphone
												});
											};

											function upDataWidthImage() {
												var options = {
													success: function(data) {
														goodsinfo.attributes.push({
															"name": "ds_image",
															"value": data
														});
														upDataWidthOutImage();
													},
													error: function(a, b, c) {
														_C.loading.hide();
													}
												};
												template.find('#IdCardA').ajaxForm(options);
												template.find('#IdCardA .submit').click();
												_C.loading.show();
											};

											function upDataWidthOutImage() {
												_a.putSpecifySectionInfo(_v.resultId, goodsinfo, function() {
													var setting = {
														className: 'breakdialog',
														title: '提示',
														text: '创建成功',
														confirm: {
															text: '确定',
															event: function() {
																location.reload();
															},
														}
													};
													common.confirm(setting);
													hide();
												});
											};
											try {
												if ($('#fileUpDataElement')[0].files.length != 0) {
													upDataWidthImage();
												} else if ($('#fileUpDataElement')[0].files.length == 0 && $('#fileUpDataElement').attr('data-id') != 'none') {
													upDataWidthOutImage();
												};
											} catch (err) {
												if (_C.jude.isNull($('#fileUpDataElement').val())) {
													upDataWidthImage();
												} else {
													upDataWidthOutImage();
												};
											};

										});
									}
								}
							});
						};
						var Obsitem = '';
						if (result.ds_orderstatus.split(':')[0] == '100000002' || result.ds_orderstatus.split(':')[0] == '100000001') {
							Obsitem = '<a class="obsbtn"><img src="/publicorder_web/img/obsbtn.png" alt="" title="作废"></a>'
							Obsitem = $(Obsitem);
							$('#obs').append(Obsitem);

						};
						if (result.ds_orderstatus.split(':')[0] == '100000000') {
							Obsitem = '<a class="obsbtn"><img src="/publicorder_web/img/obsbtn1.png" alt="" title=""></a>'
							Obsitem = $(Obsitem);
							$('#obs').append(Obsitem);
						};
						$('.obsbtn').click(function() {
							if (result.ds_orderstatus.split(':')[0] == '100000002' || result.ds_orderstatus.split(':')[0] == '100000001') {

								var setting = {
									className: '',
									title: '提示',
									text: '是否作废',
									confirm: {
										text: '确定',
										event: function() {
											_a.invalid(result['id'], function() {
												location.reload();
											});
										},
									}
								};
								common.confirm(setting);
							}
						});
					});
				},
				getImage: function() {
					_f.getBase64({
						fileType: 'image',
						elementId: '.fileButtom',
						success: function(imageUrl) {
							$('.checkbtn').unbind().bind('click', function() {
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
					if ($(data.elementId).prop('files')) {
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
					}

				}
			},
			_t = {
				/*单号区间列表*/
				list: function(data) {
					//console.log(data);
					var html = '';
					html += '<li data-showhide="hide">'
					html += '<div class="boxheight1 boxheight">'
					html += '<a><img src="/publicorder_web/img/addbtn.png" alt=""></a>'
					html += '<p>单号区间</p><span>' + data['ds_orderstart'] + '</span><p>——</p><span>' + data['ds_orderend'] + '</span><p>剩余单号个数：</p><span style="width:30px;">' + data['ds_unusednum'] + '</span>'
					html += '</div>'
					html += '<div class="numberbox">'
					html += '</div>'
					html += '</li>'
					html = $(html);
					html.find('.boxheight1').click(function() {
						// var addimg = '<img src="/publicorder_web/img/addbtn.png" alt="">';
						// var eveimg = '<img src="/publicorder_web/img/evebtn.png" alt="">';
						// if(data.ds_unusednum == 0){
						// 	//html.find('a').html(eveimg);
						// 	html.find('.boxheight1').click();
						// } else {
						_f.getorderinfo(data.id, html.find('.numberbox'), html.find('a'), data.ds_unusednum);
						//}
					});
					return html;
				},
				getnumlist: function(className, data) {
					var item = '<i class="' + className + '">' + data['ds_ordernum'] + '</i>';
					item = $(item);
					item.click(function() {
						_f.getnuminfo(data);
					});
					return item;
				},
				/*物流添加按钮模板*/
				addBtnBoxForLogistics: function() {
					var addbtn = '';
					addbtn += '<a class="addbtn addbtn3" href="realnameSearchLogistics.html">搜索</a><a class="addbtn addbtn2">添加</a><a class="addbtn addbtn1">添加单号区间</a>'
					addbtn = $(addbtn);
					return addbtn;
				},
				/*添加物流自定义单号信息dialog模板*/
				createlogisticsinfo: function(data) { //
					var item = '<div>'
					item += '<ul class="postgoods">'
					item += '<li>'
					item += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>订单编号：</p><input type="text" value="' + (data['ds_ordernum'] ? data['ds_ordernum'] : '') + '" placeholder="请输入订单编号" class="ds_ordernum"><div id="obs"></div>'
					item += '</li>'
					item += '<li>'
					item += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>邮寄物品：</p><input type="text" value="' + (data['ds_name'] ? data['ds_name'] : '') + '" placeholder="请输入邮寄物品" class="ds_name">'
					item += '</li>'
					item += '<li>'
					item += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>寄件人姓名：</p><input type="text" value="' + (data['ds_person-ds_name'] ? data['ds_person-ds_name'] : '') + '" placeholder="请输入寄件人姓名" class="ds_person">';
					item += '<span class="readIdCard">读取</span>';
					item += '</li>'
					item += '<li>'
					item += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>寄件人身份证号：</p><input type="text" value="' + (data['ds_person-ds_id'] ? data['ds_person-ds_id'] : '') + '" placeholder="请输入寄件人身份证号" class="ds_personid">'
					item += '</li>'
					item += '<li>'
					item += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>寄件人联系方式：</p><input type="text" value="' + (data['ds_person-ds_phone'] ? data['ds_person-ds_phone'] : '') + '" placeholder="请输入寄件人联系方式" class="ds_personphone">'
					item += '</li>'
					item += '<li>'
					item += '<p>收件人昵称：</p><input type="text" value="' + (data['ds_receivernic'] ? data['ds_receivernic'] : '') + '" placeholder="请输入收件人昵称：" class="ds_receivernic">'
					item += '</li>'
					item += '<li>'
					item += '<p>收件人联系方式：</p><input type="text" value="' + (data['ds_receiverphone'] ? data['ds_receiverphone'] : '') + '" placeholder="请输入收件人联系方式" class="ds_receiverphone">'
					item += '</li>'
					item += '<li>'
					item += '<p>物品描述：</p><textarea name="" placeholder="请输入物品描述" id="" cols="30" rows="10" class="ds_information">' + (data['ds_information'] ? data['ds_information'] : '') + '</textarea>'
					item += '</li>'
					item += '<li class="lastli">'
					item += '<p>上传物品照片：</p>'
					item += '<input type="text" readonly="" class="picinput" value="" placeholder="请上传物品照片" />'
					item += '<button id="" class="browsebtn">上传</button>'
					item += '<button id="" class="checkbtn">查看</button>'
					item += '	<form style="display:none;" id="IdCardA" action="/uploadFiles.ashx?Action=formUpload" method="post" enctype="multipart/form-data">';
					item += '		<input type="file" id="fileUpDataElement" data-id="' + (data['ds_image'] ? data['ds_image'] : '\"none\"') + '" data-name="物品照片.jpeg" class="fileButtom" name="document" onchange="realnameLogistics.getImage()"/>';
					item += '		<input type="submit" class="submit" value="提交表单" />';
					item += '		<input type="hidden" class="fileName "name="fileName" style="display: none;" />';
					item += '	</form>';
					item += '</li>'
					item += '</ul>'
					item += '</div>'
					item = $(item);
					item.find('.browsebtn').bind('click', function() {
						$('.fileButtom').click();
						if (data['ds_image']) {
							item.find('.picinput').val('物品照片.jpg');
						};
					});
					item.find('.fileButtom').change(function() {
						try {
							item.find('.picinput').val($(this)[0].files[0].name);
						} catch (err) {
							var text = $(this).val().split('\\');
							text = text[text.length - 1];
							item.find('.picinput').val(text);
						};
					});
					item.find('.readIdCard').unbind().bind('click', function() {
						_C.readIdCard(function(data) {
							item.find('.ds_person').val(data.name);
							item.find('.ds_personid').val(data.id);
						})
					});
					return item;
				},
				/*获取物流自定义单号信息dialog模板*/
				createlogisticsinfo2: function(data) {

					var item = '<div>'
					item += '<ul class="postgoods">'
					item += '<li>'
					item += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>订单编号：</p><input type="text" value="' + (data['ds_ordernum'] ? data['ds_ordernum'] : '') + '" placeholder="请输入订单编号" class="ds_ordernum"  readonly="readonly"/><div id="obs"></div>'
					item += '</li>'
					item += '<li>'
					item += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>邮寄物品：</p><input type="text" value="' + (data['ds_name'] ? data['ds_name'] : '') + '" placeholder="请输入邮寄物品" class="ds_name">'
					item += '</li>'
					item += '<li>'
					item += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>寄件人姓名：</p><input type="text" value="' + (data['ds_person-ds_name'] ? data['ds_person-ds_name'] : '') + '" placeholder="请输入寄件人姓名" class="ds_person">'
					item += '<span class="readIdCard">读取</span>';
					item += '</li>'
					item += '<li>'
					item += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>寄件人身份证号：</p><input ' + (data['ds_person-ds_id'] ? 'readonly="readonly"' : '') + ' type="text" value="' + (data['ds_person-ds_id'] ? data['ds_person-ds_id'] : '') + '" placeholder="请输入寄件人身份证号" class="ds_personid">'
					item += '</li>'
					item += '<li>'
					item += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>寄件人联系方式：</p><input type="text" value="' + (data['ds_person-ds_phone'] ? data['ds_person-ds_phone'] : '') + '" placeholder="请输入寄件人联系方式" class="ds_personphone">'
					item += '</li>'
					item += '<li>'
					item += '<p>收件人昵称：</p><input type="text" value="' + (data['ds_receivernic'] ? data['ds_receivernic'] : '') + '" placeholder="请输入收件人昵称：" class="ds_receivernic">'
					item += '</li>'
					item += '<li>'
					item += '<p>收件人联系方式：</p><input type="text" value="' + (data['ds_receiverphone'] ? data['ds_receiverphone'] : '') + '" placeholder="请输入收件人联系方式" class="ds_receiverphone">'
					item += '</li>'
					item += '<li>'
					item += '<p>物品描述：</p><textarea name="" placeholder="请输入物品描述" id="" cols="30" rows="10" class="ds_information">' + (data['ds_information'] ? data['ds_information'] : '') + '</textarea>'
					item += '</li>'
					item += '<li class="lastli">'
					item += '<p>上传物品照片：</p>'
					item += '<input type="text" readonly="readonly" class="picinput" value="' + (data['ds_image'] ? '物品照片.jpeg' : '') + '" placeholder="请输入上传照片" />'
					item += '<button id="" class="browsebtn">上传</button>'
					item += '<button id="" class="checkbtn">查看</button>'
					item += '	<form style="display:none;" id="IdCardA" action="/uploadFiles.ashx?Action=formUpload" method="post" enctype="multipart/form-data">';
					item += '		<input type="file" id="fileUpDataElement" data-id="' + (data['ds_image'] ? data['ds_image'] : '\"none\"') + '" data-name="物品照片.jpeg" class="fileButtom" name="document" onchange="realnameLogistics.getImage()"/>';
					item += '		<input type="submit" class="submit" value="提交表单" />';
					item += '		<input type="hidden" class="fileName "name="fileName" style="display: none;" />';
					item += '	</form>';
					item += '</li>'
					item += '</ul>'
					item += '</div>'
					item = $(item);

					if (data['ds_orderstatus'].split(':')[0] == '100000001') {
						item.find('.picinput').val('');
					};
					if (data['ds_orderstatus'].split(':')[0] == '100000001') {
						item.find('.ds_personid').removeAttr('readonly');
					};
					item.find('.browsebtn').bind('click', function() { //上传图片
						$('.fileButtom').click();
					});
					if (data['ds_image']) {
						item.find('.picinput').val('物品照片.jpeg');
					};
					var fileid = item.find('[data-id]').attr('data-id');
					item.find('.checkbtn').click(function() {
						if (fileid) {
							_a.downloadImg(fileid);
						} else {
							common.alert({
								text: '暂无照片'
							});
						}
					});
					item.find('.fileButtom').change(function() {
						try {
							item.find('.picinput').val($(this)[0].files[0].name);
						} catch (err) {
							var text = $(this).val().split('\\');
							text = text[text.length - 1];
							item.find('.picinput').val(text);
						};

					});
					if (!data['ds_person-ds_id']) {
						item.find('.readIdCard').unbind().bind('click', function() {
							_C.readIdCard(function(data) {
								item.find('.ds_person').val(data.name);
								item.find('.ds_personid').val(data.id);
							})
						});
					} else {
						item.find('.readIdCard').css('display', 'none');
					};
					return item;
				},
				/*添加单号区间dialog模板*/
				createcustom: function(data) {
					var item = '<div>'
					item += '<ul class="monad">'
					item += '<li>'
					item += '<p>起始单号</p>'
					item += '<input type="text" class="startnum" value="" placeholder="第一个单号">'
					item += '</li>'
					item += '<li>'
					item += '<p>单号总个数</p>'
					item += '<input class="sumnum" type="text" value="" placeholder="单号总个数不能大于200">'
					item += '</li>'
					item += '</ul>'
					item += '</div>'
					item = $(item);
					return item;
				},
			},
			_a = {
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
				/*更新人员信息接口,姓名,电话*/
				upDataPeoplePhone: function(id, data) {
					_C.PUT({
						data: data,
						url: "/crm/Entities('ds_person" + id + "')",
						success: function() {

						},
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
				/*添加物流实名制单号区间*/
				createLogisticsSectionInfo: function(data, success) {
					common.POST({
						data: data,
						url: "/api/Crm/CreateOrderArea",
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
				/*获取单号区间列表*/
				getlist: function(data, success) {
					_C.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter=name eq 'ds_orderstart' " +
							"or name eq 'ds_orderend' " +
							"or name eq 'ds_logisticsorderareaId' " +
							"or name eq 'ds_ordercount' " +
							"or name eq 'ds_unusednum' " +
							"),lookups&$filter=name eq 'ds_logisticsorderarea' and  query eq 'ds_publicorder_ref eq " + _v.message.id + "'" +
							" and page eq " + data.index + " and count eq " + data.count + " and orderby eq 'createdon/desc'",
						success: function(result) {
							var list = _C.formatting.CRMList(result.value);
							console.log(result.value);
							if (list.length == 0 && data.index == 1) {
								var dataList = {
									totalCount: 0,
									list: list,
								};
								success(dataList);
							} else {
								var dataList = {
									totalCount: result.value[0].totalCount,
									list: list,
								};
								success(dataList);
							}

						}
					});
				},
				/*获得自定义单号区间接口*/
				getCustomList: function(data, success) {
					_C.POST({
						url: "/api/Crm/GetCustomOrderList",
						data: {
							"commonStr": _v.message.id,
							"index": data.index,
							"count": data.count
						},
						success: function(result) {
							if (result.status == 0) {
								if (result.resultObj.length == 0) {
									$('#empty').css('display', 'block');
								} else {
									$('#empty').css('display', 'none');
									var list = result.resultObj;
									var dataList = {
										totalCount: result.resultObj[0].totalCount,
										list: list,
									};
									success(dataList);
								}

							} else {
								_C.alert({
									text: '获取错误'
								})
							};
						}
					});
				},
				/*获取单号区间单号列表*/
				getSectionNumberList: function(id, success) {
					common.GET({
						url: "/crm/Entities?$expand=attributes($filter=name eq 'ds_ordernum'  or name eq 'ds_orderstatus'  or name eq 'ds_unusednum'   or name eq 'ds_shimingzhiid' ),lookups&$filter=name eq 'ds_shimingzhi' and  query eq '{{ds_orderarea eq " + id + "} and {ds_orderstatus eq 100000001}}'",
						success: function(result) {
							var _b = _C.formatting.CRMList(result.value);
							success(_b);
						}
					});
				},
				/*新增自定义单号-1检查订单是否存在*/
				checkCustomOrderIshas: function(id, success) {
					common.GET({
						url: "/crm/Entities?$expand=attributes($filter=name eq 'ds_ordernum' or name eq 'ds_shimingzhiid' or name eq 'ds_person-ds_name'  or name eq 'ds_person-ds_id' or name eq 'ds_orderstatus'  or name eq 'ds_person-ds_phone'  or name eq 'ds_name'or name eq 'ds_information'  or name eq 'ds_image'  ),lookups&$filter=name eq 'ds_shimingzhi' and  query eq 'ds_ordernum eq " + id + "'",
						success: function(result) {
							var _d = _C.formatting.CRMList(result.value);
							success(_d);
						}
					});
				},
				/*新增自定义单号-2更新订单信息*/
				createCustomListUpdate: function(id, data, success) {
					common.PUT({
						data: data,
						url: "/crm/Entities('ds_shimingzhi" + id + "')",
						success: function(result) {
							success(result);
						}
					});
				},
				/*新增自定义单号-3新增新订单*/
				createCustomListAdd: function(data, success) {
					common.POST({
						data: data,
						url: "/crm/Entities",
						success: function(result) {
							success(result);
						}
					});
				},

				
				/*创建订单接口*/
				addinterval: function(data, success) {
					_C.POST({
						url: "/crm/Entities",
						data: data,
						success: function(result) {
							success();
						}
					});
				},
				/*获取指定单号信息*/
				getSpecifySectionInfo: function(id, success) {
					common.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter=name eq 'ds_ordernum' " +
							"or name eq 'ds_person-ds_name'  " +
							"or name eq 'ds_person-ds_id'  " +
							"or name eq 'ds_person-ds_phone'  " +
							"or name eq 'ds_name' " +
							"or name eq 'ds_orderstatus' " +
							"or name eq 'ds_information' " +
							"or name eq 'ds_image' " +
							"or name eq 'ds_person-ds_personid' " +
							"or name eq 'ds_receivernic' " +
							"or name eq 'ds_receiverphone' " +
							"),lookups&$filter=name eq 'ds_shimingzhi' and  query eq 'ds_shimingzhiid eq " + id + "'",
						success: function(result) {
							var _b = _C.formatting.CRMValue(result.value);
							success(_b);
						}
					});
				},
				/*修改指定单号信息*/
				putSpecifySectionInfo: function(id, data, success) {
					common.PUT({
						data: data,
						url: "/crm/Entities('ds_shimingzhi" + id + "')",
						success: function(result) {
							success();
						}
					});
				},
				// 作废订单接口
				invalid: function(id, success) {
					_C.PUT({
						url: "/crm/Entities('ds_shimingzhi" + id + "')",
						data: {
							"attributes": [{
								"name": "ds_orderstatus",
								"value": "@code/100000000"
							}]
						},
						success: function(result) {
							success();
						}
					});
				},
				// 删除区间专用--勿动
				/*delete: function(id, success) {
                    common.DELETE({
                        url: "/crm/Entities('ds_logisticsorderarea" + id + "')",
                        success: function() {
                        	console.log('success');
                        }
                    });
                },*/
			};
		return {
			init: _f.init,
			getImage: _f.getImage,
		};
	})();
})(jQuery, common, window);