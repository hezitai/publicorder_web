(function($, _C, _W) {
	_W.realnameLogisticsSearch = (function() {
		var _v = {
				message: {},
				picname: {},
				picname1: {},
				search: {
					index: 1,
					count: 10
				},
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
					_f.initPage();
				},
				initPage: function() {
					$('.logisticsbody .logisticssearchbox').empty().append(_t.search());
				},
				/*获取搜索出的指定单号信息*/
				getviewinfo: function(result) {
					/*测试删除用--勿动*/
					//_a.delete(result.ds_shimingzhiid, function() {});
					_a.getSpecifySectionInfo(result['ds_shimingzhiid'], function(result) {
						_C.dialog({
							className: 'createlogisticsinfo',
							title: '详细信息',
							template: _t.viewlogisticsinfo(result),
							confirm: {
								hide: true,
								event: false,
								text: '确定',
								className: '',
							},
							cancel: {
								hide: true,
								event: false,
								text: '取消',
								className: '',
							},
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

				},
			},
			_t = {
				search: function() {
					var html = '';
					html += '	<div class="personsearch">';
					html += '		<input type="text" style="width:250px" class="searchResult" placeholder="请输入订单号或物品名称"/>';
					html += '		<a class="searchbtn" style="height:29px; line-height:29px;">搜索</a>';
					html += '		<input type="radio" style="display:inline-block;float:none;width:35px; height:15px; border:0px;" name="searchDate" value="2" class="all"> <span style="display:inline-block; line-height:27px;border:1px solid white!important;" onchange="getSearchResult()">全部</span> ';
					html += '		<input type="radio" style="display:inline-block;float:none;width:35px; height:15px; border:0px;" name="searchDate" value="1" class="oneaYear"> <span style="display:inline-block; line-height:27px;border:1px solid white!important;" onchange="getSearchResult()">近一年</span> ';
					html += '		<input type="radio" style="display:inline-block;float:none;width:35px; height:15px; border:0px;" name="searchDate" value="0" class="threeMonth" checked="checked"> <span style="display:inline-block; line-height:27px;border:1px solid white!important;" onchange="getSearchResult()">近三个月</span> ';
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
							element: '#paging4',
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
								if (result.list.length == 0) {
									// _C.alert({
									// 	className: 'confirmPopup',
									// 	text: '未搜索到相关信息'
									// });
								} else {
									$('.logisticsbody .logisticslistbox').empty();
									var Ul = $('<ul style="height:460px;"></ul>');
									$('.logisticslistbox').append(Ul);
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
				/*搜索出单号列表*/
				searchResultsList: function(data) {
					var html = '';
					html += '<li>'
					html += '<div class="boxheight1 boxheight" style="line-height:40px!important">'
					html += '<p>订单编号:</p><span>' + data['ds_ordernum'] + '</span><p>物品名称:</p><span>' + data['ds_name'] + '</span><p>创建时间:</p><span>' + data['dataTime'] + '</span><div class="obsimg"></div>'
					html += '</li>'
					html = $(html);
					html.click(function() {
						_f.getviewinfo(data);
					});
					return html;
				},
				viewlogisticsinfo: function(data) {
					var item = '<div>'
					item += '<ul class="postgoods">'
					item += '<li>'
					item += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>订单编号：</p><input type="text" readonly="readonly" value="' + (data['ds_ordernum'] ? data['ds_ordernum'] : '') + '"  class="ds_ordernum" readonly="readonly"/><div id="obs"></div>'
					item += '</li>'
					item += '<li>'
					item += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>邮寄物品：</p><input type="text" readonly="readonly" value="' + (data['ds_name'] ? data['ds_name'] : '') + '"  class="ds_name">'
					item += '</li>'
					item += '<li>'
					item += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>寄件人姓名：</p><input type="text" readonly="readonly" value="' + (data['ds_person-ds_name'] ? data['ds_person-ds_name'] : '') + '"  class="ds_person">';
					item += '</li>'
					item += '<li>'
					item += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>寄件人身份证号：</p><input type="text" readonly="readonly" value="' + (data['ds_person-ds_id'] ? data['ds_person-ds_id'] : '') + '"  class="ds_personid">'
					item += '</li>'
					item += '<li>'
					item += '<p><span style="color: red;margin-right: 3px;margin-left: -7px;">*</span>寄件人联系方式：</p><input type="text" readonly="readonly" value="' + (data['ds_person-ds_phone'] ? data['ds_person-ds_phone'] : '') + '"  class="ds_personphone">'
					item += '</li>'
					item += '<li>'
					item += '<p>收件人昵称：</p><input type="text" readonly="readonly" value="' + (data['ds_receivernic'] ? data['ds_receivernic'] : '') + '" class="ds_receivernic">'
					item += '</li>'
					item += '<li>'
					item += '<p>收件人联系方式：</p><input type="text" readonly="readonly" value="' + (data['ds_receiverphone'] ? data['ds_receiverphone'] : '') + '"  class="ds_receiverphone">'
					item += '</li>'
					item += '<li>'
					item += '<p>物品描述：</p><textarea name="" readonly="readonly"  id="" cols="30" rows="10" class="ds_information">' + (data['ds_information'] ? data['ds_information'] : '') + '</textarea>'
					item += '</li>'
					item += '<li class="lastli">'
					item += '<p>上传物品照片：</p>'
					item += '<input type="text" readonly="" class="picinput" value="' + (data['ds_image'] ? '物品照片.jpeg' : '') + '" />'
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
					item.find('.readIdCard').unbind().bind('click', function() {
						_C.readIdCard(function(data) {
							item.find('.ds_person').val(data.name);
							item.find('.ds_personid').val(data.id);
						});
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
				search: function(data, success) {
					_C.POST({
						url: "/api/Crm/SearchForShiMingZhi",
						data: data,
						success: function(result) {
							if (!result.status == 1) {
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
				/*删除接口--勿动*/
				/*delete: function(id, success) {
                    common.DELETE({
                        url: "/crm/Entities('ds_shimingzhi" + id + "')",
                        success: function() {
                        	console.log('success');
                        }
                    });
                },*/
			};

		return {
			init: _f.init,
			getImage: _f.getImage,
		}
	})();
})(jQuery, common, window);