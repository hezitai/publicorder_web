(function($, _C, _W) {
	_W.publicDanger = (function() {
		var _v = {
				message: {},
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;
					_a.getDangerList(_v.message.id, function(result) {
						$('#main-a').html(_t.dangerList(result));
					});
				},
				getdangerinfo: function() {
					common.dialog({
						className:"dangerinfos",
						title: "添加危爆物品信息",
						template: _t.dangerTemplate1({}),
						confirm: {
							event: function(template, hide) {
								var _name = template.find('.ds_name').val(); //危爆物品名称
								var _charge = template.find('.ds_charge').val(); //危爆物品负责人
								var _namephone = template.find('.ds_namephone').val(); //负责人电话
								var _publicorder = template.find('.ds_nameid').val(); //负责人身份证号
								var _location = template.find('.ds_location').val(); //存放位置
								var _type = template.find('.ds_type').val(); //危爆物品危险总类
								var _description = template.find('.ds_description').val(); //危爆物品重要性论述
								var _condition = template.find('.ds_condition').val(); //危爆物品危险品情况
								var _measure = template.find('.ds_measure').val(); //危爆物品安保措施
								var _disposeplan = template.find('.ds_disposeplan').val(); //危爆物品应急处理方案
								var _picstub = template.find('.ds_picstub').val(); //危爆物品照片
								
								if (!_C.jude.isNull(_name)) {
									common.alert({
										text: '危爆物品名称不能为空'
									});
									return;
								};
								if (!_C.jude.isNull(_charge)) {
									common.alert({
										text: '负责人姓名不能为空'
									});
									return;
								};
								if (!_C.jude.isNull(_namephone)) {
									common.alert({
										text: '负责人电话不能为空'
									});
									return;
								};
								if (!_C.jude.isPhone(_namephone)) {
									common.alert({
										text: '请输入正确的手机号码'
									});
									return;
								};
								if (!_C.jude.isNull(_publicorder)) {
									common.alert({
										text: '负责人身份证不能为空'
									});
									return;
								};
								if (!_C.jude.isIdCard(_publicorder)) {
									common.alert({
										text: '请输入正确的身份证号码'
									});
									return;
								};
								if (!_C.jude.isNull(_location)) {
									common.alert({
										text: '请输入危爆物品存放位置'
									});
									return;
								};
								if (!_C.jude.isNull(_type)) {
									common.alert({
										text: '危爆物品危险种类不能为空'
									});
									return;
								};
							
								_a.checkStuffInfoReturn({
									"name": _charge,
									"idCard": _publicorder,
									"isCreate": "true",
									"publicorderId": permissions.getUserMessage().publicMessage.id,
									"publicorderName": permissions.getUserMessage().publicMessage.name,
									"policeId": permissions.getUserMessage().publicMessage.systemuserid,
								}, function(result) {
									_a.putPublicStuffInfo({
										"attributes": [{
											"name": "ds_phone",
											"value": _namephone
										},{
											"name": "ds_name",
											"value": _charge
										}]
									}, result.resultObj.personId, function() {
										var _data = {
											"name": "ds_dangerousgoods",
											"attributes": [{
												"name": "ds_charge",
												"value": "@look/" + result.resultObj.personId
											}, {
												"name": "ds_location",
												"value": _location
											}, {
												"name": "ds_name",
												"value": _name
											}, {
												"name": "ds_publicorder",
												"value": "@look/" + _v.message.id
											}, {
												"name": "ds_type",
												"value": _type
											}]
										};
										if(_C.jude.isNull(_description)){
											_data.attributes.push( {
												"name": "ds_description",
												"value": _description
											});
										};
										if(_C.jude.isNull(_condition)){
											_data.attributes.push({
												"name": "ds_condition",
												"value": _condition
											});
										};
										if(_C.jude.isNull(_measure)){
											_data.attributes.push({
												"name": "ds_measure",
												"value": _measure
											});
										};
										if(_C.jude.isNull(_disposeplan)){
											_data.attributes.push({
												"name": "ds_disposeplan",
												"value": _disposeplan
											});
										};
										function upDataWidthImage() {
											var options = {
												success: function(data) {
													_data.attributes.push({
														"name": "ds_picstub",
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
											_a.createDangerInfo(_data, function() {
												common.alert({
													text: "创建成功"
												}, _f.init, _f.init);
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
										/*有无照片判断*/
										// if ($('#fileUpDataElement').val()) {
										// 	upDataWidthImage();
										// } else if (!$('#fileUpDataElement').val() && $('#fileUpDataElement').attr('data-id') != 'none') {
										// 	upDataWidthOutImage();
										// } else {
										// 	_C.alert({
										// 		text: '请上传危爆物品照片',
										// 	});
										// };
									})
								});
							},
							text: '提交',
						}
					});
				},
				bindClickFun1:function(item, data) {
					item.find(".cekstuff").click(function() {
						_a.getDangerInfo(data.id, function(data) {
							common.dialog({
								className:"dangerinfos",
								title: "修改物品信息",
								template: _t.dangerTemplate(data),
								confirm: {
									event: function(template, hide) {
										var _name = template.find('.ds_name').val(); //危爆物品名称
										var _charge = template.find('.ds_charge').val(); //危爆物品负责人
										var _namephone = template.find('.ds_namephone').val(); //负责人电话
										var _publicorder = template.find('.ds_nameid').val(); //负责人身份证号
										var _type = template.find('.ds_type').val(); //危爆物品危险总类
										var _description = template.find('.ds_description').val(); //危爆物品重要性论述
										var _condition = template.find('.ds_condition').val(); //危爆物品危险品情况
										var _measure = template.find('.ds_measure').val(); //危爆物品安保措施
										var _disposeplan = template.find('.ds_disposeplan').val(); //危爆物品应急处理方案
										var _picstub = template.find('.ds_picstub').val(); //危爆物品照片
										var _location = template.find('.ds_location').val(); //存放位置
										var dataId = data.id;
										if (!_C.jude.isNull(_name)) {
											common.alert({
												text: '危爆物品名称不能为空'
											});
											return;
										};
										if (!_C.jude.isNull(_charge)) {
											common.alert({
												text: '负责人姓名不能为空'
											});
											return;
										};
										if (!_C.jude.isNull(_namephone)) {
											common.alert({
												text: '负责人电话不能为空'
											});
											return;
										};
										if (!_C.jude.isPhone(_namephone)) {
											common.alert({
												text: '请输入正确的手机号码'
											});
											return;
										};
										if (!_C.jude.isNull(_publicorder)) {
											common.alert({
												text: '负责人身份证不能为空'
											});
											return;
										};
										if (!_C.jude.isIdCard(_publicorder)) {
											common.alert({
												text: '请输入正确的身份证号码'
											});
											return;
										};
										if (!_C.jude.isNull(_location)) {
											common.alert({
												text: '请输入危爆物品存放位置'
											});
											return;
										};
										if (!_C.jude.isNull(_type)) {
											common.alert({
												text: '危爆物品危险种类不能为空'
											});
											return;
										};
									
										_a.checkStuffInfoReturn({
											"name": _charge,
											"idCard": _publicorder,
											"isCreate": "true",
											"publicorderId": permissions.getUserMessage().publicMessage.id,
											"publicorderName": permissions.getUserMessage().publicMessage.name,
											"policeId": permissions.getUserMessage().publicMessage.systemuserid,
										}, function(result) {
											_a.putPublicStuffInfo({
												"attributes": [{
													"name": "ds_phone",
													"value": _namephone
												},{
													"name": "ds_name",
													"value": _charge
												}]
											}, result.resultObj.personId, function() {
												var _data = {
													"attributes": [{
														"name": "ds_charge",
														"value": "@look/" + result.resultObj.personId
													}, {
														"name": "ds_location",
														"value": _location
													}, {
														"name": "ds_name",
														"value": _name
													}, {
														"name": "ds_publicorder",
														"value": "@look/" + _v.message.id
													}, {
														"name": "ds_type",
														"value": _type
													}]
												};
												if(_C.jude.isNull(_description)){
													_data.attributes.push( {
														"name": "ds_description",
														"value": _description
													});
												};
												if(_C.jude.isNull(_condition)){
													_data.attributes.push({
														"name": "ds_condition",
														"value": _condition
													});
												};
												if(_C.jude.isNull(_measure)){
													_data.attributes.push({
														"name": "ds_measure",
														"value": _measure
													});
												};
												if(_C.jude.isNull(_disposeplan)){
													_data.attributes.push({
														"name": "ds_disposeplan",
														"value": _disposeplan
													});
												};
												function upDataWidthImage() {
													var options = {
														success: function(data) {
															_data.attributes.push({
																"name": "ds_picstub",
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
													_a.putDangerInfo(dataId, _data, function() {
														common.alert({
															text: "修改成功"
														}, _a.getDangerList(_v.message.id, function(result) {
															$("#main-a").html(_t.dangerList(result, $("#dangerbtn").find('span').text()));
														}), _a.getDangerList(_v.message.id, function(result) {
															$("#main-a").html(_t.dangerList(result, $("#dangerbtn").find('span').text()));
														}));
														hide();
													});
												};
												/*有无照片判断*/
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
												// if ($('#fileUpDataElement').val()) {
												// 	upDataWidthImage();
												// } else if (!$('#fileUpDataElement').val() && $('#fileUpDataElement').attr('data-id') != 'none') {
												// 	upDataWidthOutImage();
												// } else {
												// 	_C.alert({
												// 		text: '请上传危爆物品照片',
												// 	})
												// 	return;
												// };
											});
										});
									},
									text: '修改'
								},
							});
						});
					});
					item.find(".delstuff").click(function() {
						common.dialog({
							className: 'delinfo',
							title: '提示',
							template: '确定删除？',
							confirm: {
								event: function(template, hide) {
									_a.delDangerInfo(data.id, function(result) {
										common.alert({
											text: "删除成功"
										}, _a.getDangerList(_v.message.id, function(result) {
											$("#main-a").html(_t.dangerList(result, $("#dangerbtn").find('span').text()));
										}), _a.getDangerList(_v.message.id, function(result) {
											$("#main-a").html(_t.dangerList(result, $("#dangerbtn").find('span').text()));
										}));
									});
									hide();
								},
								text: '确定',
							}
						});
					});
				},
			},
			_t = {
				dangerList: function(data) {
					var Danger = '<div id="Dangerlist"><div class="stuff"><h3>危爆物品管理</h3><button>添加</button></div>';
					Danger += '<ul class="stufflist">';
					Danger += '</ul></div>';
					Danger = $(Danger);
					Danger.find("button").click(function() {
						_f.getdangerinfo();
					});
					for (var i = 0; i < data.length; i++) {
						var item = '';
						item += '<li>';
						item += '<p>物品名称：<span class="stuffname">' + data[i]['ds_name'] + '</span></p>';
						item += '<a class="cekstuff">查看</a>';
						item += '<a class="delstuff">删除</a>';
						item += '</li>';
						item = $(item);
						_f.bindClickFun1(item, data[i]);
						Danger.find('ul').append(item);
					}
					return Danger;
				},
				dangerTemplate: function(data) {
					var dangerinfo = '<div class="dangerlist">'
					dangerinfo += '<ul class="dlist">'
					dangerinfo += '<div>'
					dangerinfo += '<li>'
					dangerinfo += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>危爆物品名称：</p>'
					dangerinfo += '<input type="text" value="' + (data['ds_name'] ? data['ds_name'] : '') + '" class="ds_name">'
					dangerinfo += '</li>'
					dangerinfo += '<li class="nth2li">'
					dangerinfo += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>危爆物品负责人：</p>'
					dangerinfo += '<input type="text" value="' + (data['ds_charge-ds_name'] ? data['ds_charge-ds_name'] : '') + '"  class="ds_charge">'
						// dangerinfo += '<span class="readIdCard">读取</span>';
					dangerinfo += '</li>'
					dangerinfo += '<li>'
					dangerinfo += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>负责人电话：</p>'
					dangerinfo += '<input type="text" value="' + (data['ds_charge-ds_phone'] ? data['ds_charge-ds_phone'] : '') + '"  class="ds_namephone">'
					dangerinfo += '</li>'
					dangerinfo += '<li class="nth2li">'
					dangerinfo += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>负责人身份证号：</p>'
					dangerinfo += '<input type="text" value="' + (data['ds_charge-ds_id'] ? data['ds_charge-ds_id'] : '') + '"  class="ds_nameid">'
					dangerinfo += '</li>'
					dangerinfo += '<li>'
					dangerinfo += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>危爆物品存放位置：</p>'
					dangerinfo += '<input type="text" value="' + (data['ds_location'] ? data['ds_location'] : '') + '"  class="ds_location">'
					dangerinfo += '</li>'
					dangerinfo += '<li class="nth2li">'
					dangerinfo += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>危爆物品危险种类：</p>'
					dangerinfo += '<input type="text" value="' + (data['ds_type'] ? data['ds_type'] : '') + '"  class="ds_type">'
					dangerinfo += '</li>'
					dangerinfo += '</div>'
					dangerinfo += '<li>'
					dangerinfo += '<p>危爆物品重要性论述：</p>'
					dangerinfo += '<textarea class="ds_description">' + (data['ds_description'] ? data['ds_description'] : '') + '</textarea>'
					dangerinfo += '</li>'
					dangerinfo += '<li>'
					dangerinfo += '<p>危爆物品危险品情况：</p>'
					dangerinfo += '<textarea class="ds_condition">' + (data['ds_condition'] ? data['ds_condition'] : '') + '</textarea>'
					dangerinfo += '</li>'
					dangerinfo += '<li>'
					dangerinfo += '<p>危爆物品安保措施：</p>'
					dangerinfo += '<textarea class="ds_measure">' + (data['ds_measure'] ? data['ds_measure'] : '') + '</textarea>'
					dangerinfo += '</li>'
					dangerinfo += '<li>'
					dangerinfo += '<p>危爆物品应急处理方案：</p>'
					dangerinfo += '<textarea class="ds_disposeplan">' + (data['ds_disposeplan'] ? data['ds_disposeplan'] : '') + '</textarea>'
					dangerinfo += '</li>'
					dangerinfo += '<li>'
					dangerinfo += '<p>危爆物品照片：</p>'
					dangerinfo += '<input type="text" readonly="" class="ds_picstub" value="' + (data['ds_picstub'] ? '危爆物品照片.jpg' : '') + '" style="display: block; border-right: none;height: 20px; width:391px;float: left" />'
					dangerinfo += '<button id="checkbtn"></button>'
					dangerinfo += '<button id="updatebtn"></button>'
					dangerinfo += '	<form id="IdCardA" action="/uploadFiles.ashx?Action=formUpload" method="post" enctype="multipart/form-data">';
					dangerinfo += '		<input type="file"  style="position:absolute; opacity:0; filter:alpha(opacity=0); top:0px; right:0px; overflow:hidden;width:36px; height:20px;" id="fileUpDataElement" data-id="' + (data['ds_picstub'] ? data['ds_picstub'] : '\"none\"') + '" data-name="危爆物品照片.jpeg" class="fileButtom" name="document"/>';// onchange="publicDanger.getImage()"
					dangerinfo += '		<input type="submit" style="display:none;" class="submit" value="提交表单" />';
					dangerinfo += '		<input type="hidden" class="fileName "name="fileName" style="display: none;" />';
					dangerinfo += '	</form>';
					dangerinfo += '</li>'
					dangerinfo += '</ul>'
					dangerinfo += '</div>'
					dangerinfo = $(dangerinfo);
					dangerinfo.find('#checkbtn').bind('click', function() { //上传图片
						$('.fileButtom').click();
					});
					var fileid = dangerinfo.find('[data-id]').attr('data-id');
					dangerinfo.find('#updatebtn').click(function() {
						if (fileid) {
							_a.downloadImg(fileid);
						} else {
							common.alert({
								text: '暂无照片'
							});
						}
					});
					dangerinfo.find('.fileButtom').change(function() {
						
						try {
							dangerinfo.find('.ds_picstub').val($(this).val());
						} catch (err) {
							var text = $(this).val().split('\\');
							text = text[text.length - 1];
							messlist.find('.ds_picstub').val(text);
						};
					});



					/*dangerinfo.find('.readIdCard').unbind().bind('click', function() {
						_C.readIdCard(function(data) {
							dangerinfo.find('.ds_charge').val(data.name);
							dangerinfo.find('.ds_nameid').val(data.id);
						});
					});*/

					return dangerinfo;
				},
				dangerTemplate1: function(data) {
					var dangerinfo = '<div class="dangerlist">'
					dangerinfo += '<ul class="dlist">'
					dangerinfo += '<div>'
					dangerinfo += '<li>'
					dangerinfo += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>危爆物品名称：</p>'
					dangerinfo += '<input type="text" value="' + (data['ds_name'] ? data['ds_name'] : '') + '" class="ds_name">'
					dangerinfo += '</li>'
					dangerinfo += '<li class="nth2li">'
					dangerinfo += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>危爆物品负责人：</p>'
					dangerinfo += '<input type="text" value="' + (data['ds_charge-ds_name'] ? data['ds_charge-ds_name'] : '') + '" class="ds_charge">';
					dangerinfo += '<span class="readIdCard">读取</span>';
					dangerinfo += '</li>'
					dangerinfo += '<li>'
					dangerinfo += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>负责人电话：</p>'
					dangerinfo += '<input type="text" value="' + (data['ds_charge-ds_phone'] ? data['ds_charge-ds_phone'] : '') + '"  class="ds_namephone">'
					dangerinfo += '</li>'
					dangerinfo += '<li class="nth2li">'
					dangerinfo += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>负责人身份证号：</p>'
					dangerinfo += '<input type="text" value="' + (data['ds_charge-ds_id'] ? data['ds_charge-ds_id'] : '') + '"  class="ds_nameid">'
					dangerinfo += '</li>'
					dangerinfo += '<li>'
					dangerinfo += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>危爆物品存放位置：</p>'
					dangerinfo += '<input type="text" value="' + (data['ds_location'] ? data['ds_location'] : '') + '"  class="ds_location">'
					dangerinfo += '</li>'
					dangerinfo += '<li class="nth2li">'
					dangerinfo += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>危爆物品危险种类：</p>'
					dangerinfo += '<input type="text" value="' + (data['ds_type'] ? data['ds_type'] : '') + '"  class="ds_type">'
					dangerinfo += '</li>'
					dangerinfo += '</div>'
					dangerinfo += '<li>'
					dangerinfo += '<p>危爆物品重要性论述：</p>'
					dangerinfo += '<textarea class="ds_description">' + (data['ds_description'] ? data['ds_description'] : '') + '</textarea>'
					dangerinfo += '</li>'
					dangerinfo += '<li>'
					dangerinfo += '<p>危爆物品危险品情况：</p>'
					dangerinfo += '<textarea class="ds_condition">' + (data['ds_condition'] ? data['ds_condition'] : '') + '</textarea>'
					dangerinfo += '</li>'
					dangerinfo += '<li>'
					dangerinfo += '<p>危爆物品安保措施：</p>'
					dangerinfo += '<textarea class="ds_measure">' + (data['ds_measure'] ? data['ds_measure'] : '') + '</textarea>'
					dangerinfo += '</li>'
					dangerinfo += '<li>'
					dangerinfo += '<p>危爆物品应急处理方案：</p>'
					dangerinfo += '<textarea class="ds_disposeplan">' + (data['ds_disposeplan'] ? data['ds_disposeplan'] : '') + '</textarea>'
					dangerinfo += '</li>'
					dangerinfo += '<li>'
					dangerinfo += '<p>危爆物品照片：</p>'
					dangerinfo += '<input type="text" readonly="" class="ds_picstub" value="" style="display: block; border-right: none;height: 20px; width:391px;float: left" />'
					dangerinfo += '<button id="checkbtn"></button>'
					dangerinfo += '<button id="updatebtn"></button>'
					dangerinfo += '	<form id="IdCardA" action="/uploadFiles.ashx?Action=formUpload" method="post" enctype="multipart/form-data">';
					dangerinfo += '		<input type="file" style="position:absolute; opacity:0; filter:alpha(opacity=0); top:0px; right:0px; overflow:hidden;width:36px; height:20px;" id="fileUpDataElement" data-id="' + (data['ds_picstub'] ? data['ds_picstub'] : '\"none\"') + '" data-name="危爆物品照片.jpeg" class="fileButtom" name="document"/>';// onchange="publicDanger.getImage()"
					dangerinfo += '		<input type="submit" style="display:none;" class="submit" value="提交表单" />';
					dangerinfo += '		<input type="hidden" class="fileName "name="fileName" style="display: none;" />';
					dangerinfo += '	</form>';
					dangerinfo += '</li>'
					dangerinfo += '</ul>'
					dangerinfo += '</div>'
					dangerinfo = $(dangerinfo);
					dangerinfo.find('#checkbtn').bind('click', function() {
						$('.fileButtom').click();
						if (data['ds_image']) {
							dangerinfo.find('.ds_picstub').val('物品照片.jpg');
						};
					});
					dangerinfo.find('.readIdCard').unbind().bind('click', function() {
						_C.readIdCard(function(data) {
							dangerinfo.find('.ds_charge').val(data.name);
							dangerinfo.find('.ds_nameid').val(data.id);
						});
					});
					dangerinfo.find('.fileButtom').change(function() {
						
						try {
							dangerinfo.find('.ds_picstub').val($(this).val());
						} catch (err) {
							var text = $(this).val().split('\\');
							text = text[text.length - 1];
							messlist.find('.ds_picstub').val(text);
						};
					});
					return dangerinfo;
				},
			},
			_a = {
				/*获取危爆物品列表*/
				getDangerList: function(id, success) {
					common.GET({
						url: "/crm/Entities?$expand=attributes($filter=name eq 'ds_dangerousgoodsid' or name eq 'ds_name'),lookups&$filter=name eq 'ds_dangerousgoods' and query eq 'ds_publicorder eq " + id + "' and orderby eq 'createdon/desc'",
						success: function(result) {
							var _c = _C.formatting.CRMList(result.value);
							success(_c);
						}
					})
				},
				/*获取指定危爆物品信息*/
				getDangerInfo: function(id, success) {
					common.GET({
						url: "/crm/Entities?$expand=attributes($filter=name eq 'ds_charge' or name eq 'ds_charge-ds_name'or name eq 'ds_charge-ds_phone'or name eq 'ds_charge-ds_id'or name eq 'ds_condition'or name eq 'ds_description'or name eq 'ds_disposeplan'or name eq 'ds_location'or name eq 'ds_measure'or name eq 'ds_name'or name eq 'ds_picstub'or name eq 'ds_publicorder'or name eq 'ds_type'),lookups&$filter=name eq 'ds_dangerousgoods' and query eq 'ds_dangerousgoodsid eq " + id + "'",
						success: function(result) {
							var _c = _C.formatting.CRMValue(result.value);
							success(_c);
						}
					});
				},
				/*修改指定危爆物品信息*/
				putDangerInfo: function(id, data, success) {
					common.PUT({
						data: data,
						url: "/crm/Entities('ds_dangerousgoods" + id + "')",
						success: function(result) {
							success();
						}
					});
				},
				/*新增危爆物品信息*/
				createDangerInfo: function(data, success) {
					common.POST({
						data: data,
						url: "/crm/Entities",
						success: function(result) {
							success(result);
						}
					});
				},
				/*删除指定危爆物品信息*/
				delDangerInfo: function(id, success) {
					common.DELETE({
						url: "/crm/Entities('ds_dangerousgoods" + id + "')",
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
					_a.getBase64({
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
					var file = $(data.elementId).val();
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
			getImage:_a.getImage,
		};
	})();
})(jQuery, common, window);