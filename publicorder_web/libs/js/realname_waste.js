(function($, _C, _W) {
	_W.realnameWaste = (function() {
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
				type:'',
				datatype:'',
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
					}else if (_v.message.ds_businesskind == 100000009) {
						_v.type = 3
					}else if (_v.message.ds_businesskind == 100000002){
						_v.type = 4
					};
					$('.realnamebody .searchbox').empty().append(_t.search());
					$('.addbtnbox').empty().append(_t.addBtnBoxForOther());
					$('.addbtnbox').find('.addbtn2').click(function() {
						common.dialog({
							className: 'metaldialog',
							title: '详细信息',
							template: _t.creatmetalpersoninfo({}),
							confirm: {
								event: function(template, hide) {
									var _person = template.find('.ds_person').val();
									var _personid = template.find('.ds_personid').val();
									var _personphone = template.find('.ds_personphone').val();
									var _name = template.find('.ds_name').val();
									var _information = template.find('.ds_information').val();
									var _date = template.find('.ds_date').val();
									var _brand = template.find('.ds_brand').val();
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
									if (!_C.jude.isNull(_personphone)) {
										common.alert({
											text: '手机号码不能为空'
										});
										return;
									};
									if (!_C.jude.isPhone(_personphone)) {
										common.alert({
											text: '请输入正确的手机号码'
										});
										return;
									};
									if (!_C.jude.isNull(_name)) {
										common.alert({
											text: '物品名称不能为空'
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
										var personinfo = {
											"name": "ds_shimingzhi",
											"attributes": [{
												"name": "ds_name",
												"value": _name
											}, {
												"name": "ds_person",
												"value": "@look/" + ResultId
											}, {
												"name": "ds_publicorder",
												"value": "@look/" + _v.message.id
											}]
										};
										if(_C.jude.isNull(_date)){
											personinfo.attributes.push({
												"name": "ds_date",
												"value": "@dt/" + _date + ' 8:00:00'
											});
										};
										if(_C.jude.isNull(_information)){
											personinfo.attributes.push({
												"name": "ds_information",
												"value": _information
											});
										};
										if(_C.jude.isNull(_brand)){
											personinfo.attributes.push({
												"name": "ds_brand",
												"value": _brand
											});
										};
										function upDataWidthImage() {
											var options = {
												success: function(data) {
													personinfo.attributes.push({
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
											_a.createRecyclingInfo(personinfo, function() {
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
								},
							},
						});
					});
					$('.realnamebody .searchbox').empty().append(_t.search());

					_v.date = {
						starTime: _C.formatting.ExDate('/', _C.formatting.ExDate('z') - 1000 * 60 * 60 * 24 * 10) + ' 00:00:00',
						endTime: _C.formatting.ExDate('/') + ' 23:59:00'
					};
					$('.dataStar').val(_C.formatting.ExDate('-', _v.date.starTime));
					$('.dataEnd').val(_C.formatting.ExDate('-', _v.date.endTime));

					return; // 临时更改
				},
				getwasteinfo: function(id) {
					_a.getgoodsInfo(id,function(data){
						common.dialog({
						className: 'metaldialog',
						title: '详细信息',
						template: _t.creatmetalpersoninfo2(data),
						confirm: {
								hide:true,
								event:false,
							},
							cancel: {
								hide:true,
								event:false,	
							}
					});
					})
					
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
			},
			_t = {
				searchResultsList: function(data) {
					var html = '';
					html += '<li>'
					html += '<div class="boxheight">'
					html += '<p>姓名:</p><span>' + data['ds_person_name'] + '</span><p>物品名称:</p><span>' + data['ds_name'] + '</span><p>创建时间:</p><span>'
					+ data['dataTime'] +'</span><div class="obsimg"></div>'
					html += '</li>'
					html = $(html);
					html.click(function() {
						_f.getwasteinfo(data.ds_shimingzhiid);
					});
					return html;
				},
				search: function() {
					var html = '';
					html += '<div class="personsearch">';
					html += '	<input type="text" style="width:250px" class="searchResult" placeholder="请输入物品名"/>';
					html += '	<a class="searchbtn" style="height:29px; line-height:29px;">搜索</a>';
					html += '	<input type="radio" style="display:inline-block;float:none;width:35px; height:15px; border:1px solid #fff;" name="searchDate" value="2" class="all" checked> <span style="display:inline-block; line-height:27px;">全部</span> ';
					html += '	<input type="radio" style="display:inline-block;float:none;width:35px; height:15px; border:1px solid #fff;" name="searchDate" value="1" class="oneaYear"> <span style="display:inline-block; line-height:27px;">近一年</span> ';
					html += '	<input type="radio" style="display:inline-block;float:none;width:35px; height:15px; border:1px solid #fff;" name="searchDate" value="0" class="threeMonth"> <span style="display:inline-block; line-height:27px;">近三个月</span> ';
					html += '</div>';
					html = $(html);
					_v.datatype = 0;
					getSearchResult = function() {
						var radios = document.getElementsByName("searchDate");
						for (var i = 0; i < radios.length; i++) {
							if (radios[i].checked) {
								_v.datatype = radios[i].value;
								break;
							}
						};
						var option = {
							element: '#paging2',
							data: {
								commonStr: $(".searchResult").val(),
								type: _v.type,
								dateType: _v.datatype,
								ds_publicorder: _v.message.id,
								index: '1',
								count: '10'
							},
							allPageKey: 'totalCount',
							event: _a.search,
							success: function(result) {
								if (result.list.length == 0) {
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

				},
				/*其他四行业添加按钮模板*/
				addBtnBoxForOther: function() {
					var item = '';
					item += '<a class="addbtn addbtn2">添加</a>'
					item = $(item);
					return item;
				},
				creatmetalpersoninfo: function(data) { //添加废品回收实名制信息dialog模板
					var creatinfo = '';
					creatinfo += '<div>'
					creatinfo += '<ul class="metalinfo">'
					creatinfo += '<li>'
					creatinfo += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>人员姓名：</p><input type="text" placeholder="请输入姓名" class="ds_person">'
					creatinfo += '<span class="readIdCard">读取</span>';
					creatinfo += '</li>'
					creatinfo += '<li>'
					creatinfo += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>证件号码：</p><input type="text" placeholder="请输入证件号码" class="ds_personid">'
					creatinfo += '</li>'
					creatinfo += '<li>'
					creatinfo += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>手机号：</p><input type="text" placeholder="请输入手机号" class="ds_personphone">'
					creatinfo += '</li>'
					creatinfo += '<li>'
					creatinfo += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>物品名称：</p><input type="text" placeholder="请输入物品名称" class="ds_name">'
					creatinfo += '</li>'
					creatinfo += '<li>'
					creatinfo += '<p>回收时间：</p><input style="width:448px; cursor:pointer;" type="text" class="ds_date laydate-icon" onclick="laydate()">'
					creatinfo += '</li>'
					creatinfo += '<li>'
					creatinfo += '<p>品牌：</p><input type="text" placeholder="请输入品牌" class="ds_brand">'
					creatinfo += '</li>'
					creatinfo += '<li>'
					creatinfo += '<p>物品描述：</p><textarea style="height:160px;" name="" placeholder="请输入物品描述" id="" cols="30" rows="10" class="ds_information"></textarea>'
					creatinfo += '</li>'
					creatinfo += '<li>'
					creatinfo += '<p>上传物品照片：</p>'
					creatinfo += '<input type="text" readonly="" class="picinput" value="" />'
					creatinfo += '<button id="" class="browsebtn">上传</button>'
					creatinfo += '<button id="" class="checkbtn">查看</button>'
					creatinfo += '<form style="display:none;" id="IdCardA" action="/uploadFiles.ashx?Action=formUpload" method="post" enctype="multipart/form-data">'
					creatinfo += '<input type="file" id="fileUpDataElement" data-id="' + (data['ds_image'] ? data['ds_image'] : '\"none\"') + '" data-name="物品照片.jpeg" class="fileButtom" name="document" onchange="realnameLogistics.getImage()"/>'
					creatinfo += '<input type="submit" class="submit" value="提交表单" />'
					creatinfo += '<input type="hidden" class="fileName "name="fileName" style="display: none;" />'
					creatinfo += '</form>'
					creatinfo += '</li>'
					creatinfo += '</ul>'
					creatinfo += '</div>'
					creatinfo = $(creatinfo);
					creatinfo.find('.browsebtn').bind('click', function() {
						$('.fileButtom').click();
						if (data['ds_image']) {
							creatinfo.find('.picinput').val('物品照片.jpg');
						};
					});
					creatinfo.find('.fileButtom').change(function() {
						try {
							creatinfo.find('.picinput').val($(this)[0].files[0].name);
						} catch (err) {
							var text = $(this).val().split('\\');
							text = text[text.length - 1];
							creatinfo.find('.picinput').val(text);
						};
						_v.picname = $(this)[0].files[0].name;
					});
					creatinfo.find('.readIdCard').unbind().bind('click', function() {
						_C.readIdCard(function(data) {
							creatinfo.find('.ds_person').val(data.name);
							creatinfo.find('.ds_personid').val(data.id);
						})
					});
					return creatinfo;
				},
				creatmetalpersoninfo2: function(data) { //获取废品回收实名制信息dialog模板
					var creatinfo = '';
					creatinfo += '<div>'
					creatinfo += '<ul class="metalinfo">'
					creatinfo += '<li>'
					creatinfo += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>人员姓名：</p><input type="text" value="' + (data['ds_person_name'] ? data['ds_person_name'] : '') + '"  readonly="readonly" class="ds_person">'
					creatinfo += '</li>'
					creatinfo += '<li>'
					creatinfo += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>证件号码：</p><input type="text" readonly="readonly" value="' + (data['ds_person_id'] ? data['ds_person_id'] : '') + '"    class="ds_personid">'
					creatinfo += '</li>'
					creatinfo += '<li>'
					creatinfo += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>手机号：</p><input type="text" value="' + (data['ds_person_phone'] ? data['ds_person_phone'] : '') + '"   readonly="readonly" class="ds_personphone">'
					creatinfo += '</li>'
					creatinfo += '<li>'
					creatinfo += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>物品名称：</p><input type="text" value="' + (data['ds_name'] ? data['ds_name'] : '') + '" readonly="readonly"  class="ds_name">'
					creatinfo += '</li>'
					creatinfo += '<li>'
					creatinfo += '<p>回收时间：</p><input type="text" value="' + (data['intoDate'] ? data['intoDate'] : '') + '" class="ds_date laydate-icon" style="width:448px; cursor:pointer;" onclick="laydate()">'
					creatinfo += '</li>'
					creatinfo += '<li>'
					creatinfo += '<p>品牌：</p><input type="text" value="' + (data['ds_brand'] ? data['ds_brand'] : '') + '"  class="ds_brand" readonly="readonly">'
					creatinfo += '</li>'
					creatinfo += '<li>'
					creatinfo += '<p>物品描述：</p><textarea name="" style="height:160px;" readonly="readonly"  id="" cols="30" rows="10" class="ds_information">' + (data['ds_information'] ? data['ds_information'] : '') + '</textarea>'
					creatinfo += '</li>'
					creatinfo += '<li>'
					creatinfo += '<p>上传物品照片：</p>'
					creatinfo += '<input type="text" readonly="" class="picinput" value="' + (data['ds_image'] ?'物品照片.jpg' : '') + '" />'
					creatinfo += '<button id="" class="browsebtn" disabled="disabled">上传</button>'
					creatinfo += '<button id="" class="checkbtn">查看</button>'
					creatinfo += '<form style="display:none;" id="IdCardA" action="/uploadFiles.ashx?Action=formUpload" method="post" enctype="multipart/form-data">'
					creatinfo += '<input type="file" id="fileUpDataElement" data-id="' + (data['ds_image'] ? data['ds_image'] : '\"none\"') + '" data-name="物品照片.jpeg" class="fileButtom" name="document" onchange="realnameLogistics.getImage()"/>'
					creatinfo += '<input type="submit" class="submit" value="提交表单" />'
					creatinfo += '<input type="hidden" class="fileName "name="fileName" style="display: none;" />'
					creatinfo += '</form>'
					creatinfo += '</li>'
					creatinfo += '</ul>'
					creatinfo += '</div>'
					creatinfo = $(creatinfo);
					creatinfo.find('.browsebtn').bind('click', function() { //上传图片
						$('.fileButtom').click();
					});
					var fileid = creatinfo.find('[data-id]').attr('data-id');
					creatinfo.find('.checkbtn').click(function() {
						if (fileid) {
							_a.downloadImg(fileid);
						} else {
							common.alert({
								text: '暂无照片'
							});
						}
					});
					creatinfo.find('.fileButtom').change(function() {
						
						try {
							creatinfo.find('.picinput').val($(this)[0].files[0].name);
						} catch (err) {
							var text = $(this).val().split('\\');
							text = text[text.length - 1];
							creatinfo.find('.picinput').val(text);
						};
					});
					return creatinfo;
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
				search: function(data, success) {
					_C.POST({
						url:"/api/Crm/SearchForShiMingZhi",
						data:data,
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
				/*添加废品回收实名制信息*/
				createRecyclingInfo: function(data, success) {
					common.POST({
						data: data,
						url: "/crm/Entities",
						success: function(result) {
							success();
						}
					});
				},
				//获取废旧物品信息
				getgoodsInfo:function(id,success){
					common.POST({						
						url: "/api/Crm/GetAppointShiMingZhi",
						data:{
							"commonStr":id,
						   	"type":_v.type						   	
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