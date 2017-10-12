(function($, _C, _W) {
	_W.public = (function() {
		var _v = {
				publicListJson: {
					place: [{
						id: 'listbtn',
						name: '行业场所治安管理档案',
						haveBtns: true,
					}, {
						id: 'stuffbtn',
						name: '从业人员管理',
						haveBtns: false,
					}, {
						id: 'firebtn',
						name: '消防档案',
						haveBtns: true,
					}, {
						id: 'dangerbtn',
						name: '危爆物品管理',
						haveBtns: false,
					}, {
						id: 'singin',
						name: '签到记录',
						haveBtns: false,
					}],
					logistics: [{
						id: 'listbtn',
						name: '物流寄递行业治安管理档案',
						haveBtns: true,
					}, {
						id: 'stuffbtn',
						name: '从业人员管理',
						haveBtns: false,
					}, {
						id: 'firebtn',
						name: '消防档案',
						haveBtns: true,
					}, {
						id: 'dangerbtn',
						name: '危爆物品管理',
						haveBtns: false,
					}, {
						id: 'singin',
						name: '签到记录',
						haveBtns: false,
					}],
					company: [{
						id: 'listbtn',
						name: '党政机关、企业、事业单位安全保卫工作档案',
						haveBtns: true,
					}, {
						id: 'dangerbtn',
						name: '危爆物品管理',
						haveBtns: false,
					}],
					college: [{
						id: 'listbtn',
						name: '党政机关、企业、事业单位安全保卫工作档案',
						haveBtns: true,
					}, {
						id: 'stubtn',
						name: '学生管理',
						haveBtns: false,
					}, {
						id: 'dangerbtn',
						name: '危爆物品管理',
						haveBtns: false,
					}],
				},
				publicMessage: {},
				message: {},
				options: [],
				legalid: '',
				securityid: '',
				oldname: '',
				oldAddress: '',
				oldlegalName: '',
				oldlegalid: '',
				oldsecurityid: '',
				oldlegalTel: '',
				oldlegalAddress: '',
				oldsecurityName: '',
				oldsecurityTel: '',
				oldsecurityTel2: '',
				oldsecurityAddress: '',

				oldlegalName1: '',
				oldlegalid1: '',
				oldlegalTel1: '',
				oldlegalAddress1: '',
				oldsecurityName1: '',
				oldsecurityid1: '',
				oldsecurityTel1: '',
				oldsecurityTel21: '',
				oldsecurityAddress1: '',

				islegal:true,
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;
					_a.getDetail(_f.initPage);
				
					$('body').off().on('click', '#upDatePublicOrderAddress', function() {
						_C.dialog({
							title: '修改信息',
							template: _t.publicInfo(),
							confirm: {
								event: function(template, hide) {

									var unitName = template.find('.unitName').val();
									var unitAddress = template.find('.unitAddress').val();
									var legalName = template.find('.legalName').val();
									var legalId = template.find('.legalId').val();
									var legalTel = template.find('.legalTel').val();
									var legalAddress = template.find('.legalAddress').val();
									var securityName = template.find('.securityName').val();
									var securityId = template.find('.securityId').val();
									var securityTel = template.find('.securityTel').val();
									var securityTel2 = template.find('.securityTel2').val();
									var securityAddress = template.find('.securityAddress').val();

									if (!_C.jude.isNull(unitName) && _C.jude.isNull(legalId)) {
										_C.alert({
											className: 'confirmPopup',
											text: '身份证不能修改'
										});
										return;
									};
									if (!_C.jude.isNull(securityName) && _C.jude.isNull(securityId)) {
										_C.alert({
											className: 'confirmPopup',
											text: '身份证不能修改'
										});
										return;
									};
									if (!_C.jude.isIdCard(legalId)) {
										_C.alert({
											className: 'confirmPopup',
											text: '请填写正确的身份证'
										});
										return;
									};
									if (!_C.jude.isIdCard(securityId)) {
										_C.alert({
											className: 'confirmPopup',
											text: '请填写正确的身份证'
										});
										return;
									};
									if (!_C.jude.isNull(legalName)) {
										_C.alert({
											className: 'confirmPopup',
											text: '法人姓名不能为空！'
										});
										return;
									};
									if (!_C.jude.isNull(securityName)) {
										_C.alert({
											className: 'confirmPopup',
											text: '安全保卫负责人姓名不能为空！'
										});
										return;
									};
									if (!_C.jude.isNull(legalTel)) {
										_C.alert({
											className: 'confirmPopup',
											text: '法人电话不能为空！'
										});
										return;
									};
									if (!_C.jude.isPhone(legalTel)) {
										_C.alert({
											className: 'confirmPopup',
											text: '法人电话填写有误！'
										});
										return;
									};
									if (!_C.jude.isNull(securityTel)) {
										_C.alert({
											className: 'confirmPopup',
											text: '安全保卫负责人电话1不能为空！'
										});
										return;
									};
									if (!_C.jude.isPhone(securityTel)) {
										_C.alert({
											className: 'confirmPopup',
											text: '安全保卫负责人电话1填写有误！'
										});
										return;
									};
									if(_C.jude.isNull(securityTel2) && !_C.jude.isPhone(securityTel2)){
										_C.alert({
											className: 'confirmPopup',
											text: '安全保卫负责人电话2填写有误！'
										});
										return;
									}

									var public = {
										attributes: []
									};

									//行业场所的名字和地址
									if (unitName != _v.oldname) {
										public.attributes.push({
											"name": "ds_name",
											"value": unitName,
										})
									} else {
										public.attributes.push({
											"name": "ds_name",
											"value": _v.oldname,
										})
									};

									if (unitAddress != _v.oldAddress) {
										public.attributes.push({
											"name": "ds_address",
											"value": unitAddress,
										})
									} else {
										public.attributes.push({
											"name": "ds_address",
											"value": _v.oldAddress,
										})
									};

									function updatapublic(lid,sid,message,success){
										if(!message.isnewlegal){
											if(_C.jude.isNull(message.legal.attributes)){
												_a.upDataPeopleInfo(lid,message.legal,function(){	
													success();												
												})
											}else{
												return;
											}
										}else{
											public.attributes.push({
												"name": "ds_owner_ref",
												"value": "@look/" + lid
											});
											_a.upDataPeopleInfo(lid,message.legal,function(){
												success();												
											})
										};
										if(!message.isnewsecurity){
											if(_C.jude.isNull(message.security.attributes)){
												_a.upDataPeopleInfo(sid,message.security,function(){
													success();													
												})
											}else{
												return;
											}
										}else{
											public.attributes.push({
												"name": "ds_securityowner_ref",
												"value": "@look/" + sid
											});
											_a.upDataPeopleInfo(sid,message.security,function(){
												success();												
											})
										}
										
										
									};

									_a.checkPeople(legalName, legalId, function(lid) {
										_a.checkPeople(securityName, securityId, function(sid){
											var data={};
											data.legal={
												attributes: []
											};
											data.security={
												attributes: []
											};
											if(lid==_v.legalid){
												data.isnewlegal=false;
												if(legalName!=_v.oldlegalName1){
													data.legal.attributes.push({
														"name": "ds_name",
														"value": legalName
													});
												}else if(legalTel!=_v.oldlegalTel1){
													data.legal.attributes.push({
														"name": "ds_phone",
														"value": legalTel
													});
												}else if(_C.jude.isNull(legalAddress)){
													if(legalAddress!=_v.oldlegalAddress1){															
														data.legal.attributes.push({
															"name": "ds_address",
															"value": legalAddress
														});
													}
												}
												
											}else{
												data.isnewlegal=true;
												data.legal.attributes.push({
													"name": "ds_name",
													"value": legalName
												});
												data.legal.attributes.push({
													"name": "ds_phone",
													"value": legalTel
												});
												if(_C.jude.isNull(legalAddress)){																
													data.legal.attributes.push({
														"name": "ds_address",
														"value": legalAddress
													});	
												};

											};
											if(sid==_v.securityid){
												data.isnewsecurity=false;
												if(securityName!=_v.oldsecurityName1){
													data.security.attributes.push({
														"name": "ds_name",
														"value": securityName
													});
												}else if(securityTel!=_v.oldsecurityTel1){
													data.security.attributes.push({
														"name": "ds_phone",
														"value": securityTel
													});
												}else if(_C.jude.isNull(securityAddress)){
													if(securityAddress!=_v.oldsecurityAddress1){															
														data.security.attributes.push({
															"name": "ds_address",
															"value": securityAddress
														});
													}
												}else if(_C.jude.isNull(securityTel2)){
													if(securityTel2!=_v.oldsecurityTel21){															
														data.security.attributes.push({
															"name": "ds_phone2",
															"value": securityTel2
														});
													}
												}
												
											}else{
												data.isnewsecurity=true;
												data.security.attributes.push({
													"name": "ds_name",
													"value": securityName
												});
												data.security.attributes.push({
													"name": "ds_phone",
													"value": securityTel
												});
												if(_C.jude.isNull(securityAddress)){																
													data.security.attributes.push({
														"name": "ds_address",
														"value": securityAddress
													});
												};
												if(_C.jude.isNull(securityTel2)){
																											
													data.legal.attributes.push({
														"name": "ds_phone2",
														"value": securityTel2
													});
													
												};

											};
											updatapublic(lid,sid,data,function(){
												_a.upDatePublicOrderAddressAjax(public,function(){
													_C.alert({
														className: 'confirmPopup',
														text: '修改成功',
													}, function() {
														hide();
														_f.init();
													}, function() {
														hide();
														_f.init();
													});
													var public = {};
													public.publicMessage = _v.message;
													if (_C.jude.isNull(unitAddress)) {
														public.publicMessage.ds_address = unitAddress;
													};
													_C.storage.set('publicorder_wap', public);
												})
											})												
												
										})
										

									});	

								},
							},
							cancel: {
								event: false,
							}
						});
					});
				},
				UpdatePublicDocument: function() {

					var type = _v.publicMessage.ds_businesskind.split(':')[0];
					if (type != 100000017 && type != 100000012 && type != 100000018) {
						var fileName = '行业场所治安管理档案';
					} else if (type != 100000017) {
						var fileName = '党政机关、企业、事业单位安全保卫工作档案';
					} else if (type != 100000012) {
						var fileName = '党政机关、企业、事业单位安全保卫工作档案';
					} else if (type != 100000018) {
						var fileName = '物流寄递行业治安管理档案';
					};
					var file = $('#publicDocumentUpdateFile')[0].files[0];
					var index1 = file.name.lastIndexOf(".");
					// alert(index1);
					var index2 = file.name.length;
					// alert(index2);
					var postf = file.name.substring(index1, index2).toLowerCase(); //后缀名
					if (postf != '.doc' && postf != '.docx') {
						_C.alert({
							text: '预期格式错误'
						});
						$('#publicDocumentUpdateFile').clearFields();
						return;
					};
					$('#publicDocumentUpdateFileName').val(fileName);
					
					var options = {
						success: function(data) {
							common.PUT({
								data: {
									"attributes": [{
										"name": "ds_stub",
										"value": data
									}]
								},
								url: "/crm/Entities('ds_publicorder" + _v.message.id + "')",
								success: function(result) {
									_C.alert({
										text: '上传成功'
									}, function() {
										location.reload();
									});

								}
							});
							$('#publicDocumentUpdateFile').clearFields();
						},
						error: function(a, b, c) {
							_C.loading.hide();
							_C.alert({
								text: '上传失败'
							});
							$('#publicDocumentUpdateFile').clearFields();
						}
					};
					$('#publicDocument').ajaxForm(options);
					$('#publicDocument .submit').click();
					_C.loading.show();
				},
				UpdatePublicFireDocument: function() {

					var fileName = '消防档案';

					var file = $('#publicFireDocumentUpdateFile')[0].files[0];
					var index1 = file.name.lastIndexOf(".");
					// alert(index1);
					var index2 = file.name.length;
					// alert(index2);
					var postf = file.name.substring(index1, index2).toLowerCase(); //后缀名
					if (postf != '.doc' && postf != '.docx') {
						_C.alert({
							text: '预期格式错误'
						});
						$('#publicFIreDocumentUpdateFile').clearFields();
						return;
					};
					$('#publicDocumentUpdateFileName').val(fileName);
					var options1 = {
						success: function(data) {
							common.PUT({
								data: {
									"attributes": [{
										"name": "ds_firestub",
										"value": data
									}]
								},
								url: "/crm/Entities('ds_publicorder" + _v.message.id + "')",
								success: function(result) {
									_C.alert({
										text: '上传成功'
									}, function() {
										location.reload();
									});

								}
							});

							$('#publicFireDocumentUpdateFile').clearFields();
						},
						error: function(a, b, c) {
							_C.loading.hide();
							_C.alert({
								text: '上传失败'
							});

							$('#publicFireDocumentUpdateFile').clearFields();
						}
					};

					$('#publicFireDocument').ajaxForm(options1);
					$('#publicFireDocument .submit').click();
					_C.loading.show();
				},
				initPage: function(value) {
					var type = value.ds_businesskind.split(":")[0];
					switch (type) {
						case "100000017": //大学
							var html = '';
							for (var i = 0; i < _v.publicListJson.college.length; i++) {
								var item = _v.publicListJson.college[i];
								var itemHtml = _t.rightButten(item);
								html += itemHtml;
							}
							html = $(html);
							html.find('#listbtn').click(function() {
								var $this = $(this)
								_a.getPublicInfo(function(result) {
									_v.publicMessage = result;
									$("#main-a").html(_t.publicTable(_v.publicMessage, $this.find('span').text()));
								});
							});
							//行业场所
							_f.operatedocument(html, 0, '#listbtn', 'college');
							html.find("#stubtn").click(function() {
								publicStudent.init();
							})
							html.find("#dangerbtn").click(function() {
								publicDanger.init();
							})
							$("#rightList").html(html);
							$('#listbtn').click();
							break;
						case "100000012": //企事业单位
							var html = '';
							for (var i = 0; i < _v.publicListJson.company.length; i++) {
								var item = _v.publicListJson.company[i];
								var itemHtml = _t.rightButten(item);
								html += itemHtml;
							}
							html = $(html);
							html.find('#listbtn').click(function() {
								var $this = $(this)
								_a.getPublicInfo(function(result) {
									_v.publicMessage = result;
									$("#main-a").html(_t.publicTable(_v.publicMessage, $this.find('span').text()));
								});
							});
							//行业场所
							_f.operatedocument(html, 0, '#listbtn', 'company');
							html.find("#dangerbtn").click(function() {
								publicDanger.init();
							});
							$("#rightList").html(html);
							$('#listbtn').click();
							break;
						case "100000018": //物流寄递业
							var html = '';
							for (var i = 0; i < _v.publicListJson.logistics.length; i++) {
								var item = _v.publicListJson.logistics[i];
								var itemHtml = _t.rightButten(item);
								html += itemHtml;
							}
							html = $(html);
							//行业场所
							_f.operatedocument(html, 0, '#listbtn', 'logistics');
							//消防档案
							_f.operateFiredocument(html, 2, '#firebtn', 'logistics');
							html.find('#listbtn').click(function() {
								var $this = $(this)
								_a.getPublicInfo(function(result) {
									_v.publicMessage = result;
									$("#main-a").html(_t.publicTable(_v.publicMessage, $this.find('span').text()));
								});
							});
							html.find('#stuffbtn').click(function() {
								publicStuff.init();
							});
							html.find("#dangerbtn").click(function() {
								publicDanger.init();
							});
							html.find("#singin").click(function() {
								publicSingin.init();
							});
							$("#rightList").html(html);
							$('#listbtn').click();
							break;
						default: //行业场所
							var html = '';
							for (var i = 0; i < _v.publicListJson.place.length; i++) {
								var item = _v.publicListJson.place[i];
								var itemHtml = _t.rightButten(item);
								html += itemHtml;
							}
							html = $(html);
							//行业场所
							_f.operatedocument(html, 0, '#listbtn', 'place');
							//消防档案
							_f.operateFiredocument(html, 2, '#firebtn', 'place');
							html.find('#listbtn').click(function() {
								var $this = $(this)
								_a.getPublicInfo(function(result) {
									_v.publicMessage = result;
									$("#main-a").html(_t.publicTable(_v.publicMessage, $this.find('span').text()));
								});
							});
							html.find('#stuffbtn').click(function() {
								publicStuff.init();
							});
							html.find("#dangerbtn").click(function() {
								publicDanger.init();
							});
							html.find("#singin").click(function() {
								publicSingin.init();
							});
							$("#rightList").html(html);
							$('#listbtn').click();
					};
					$('.qrcode').off().click(function() {
												
						_C.dialog({
							title: '二维码',
							template: '<img src="/process/qrcode.ashx?publicorderid=' + _v.message.id + '" style="display:block; margin:40px auto; width: 50%;" /><p style="text-align:center; font-size:14px; color:#777;">在图片上方点击右键菜单中选择图片另存为可保存二维码</p>',
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
				},
				//档案操作
				operatedocument: function(html, num, dom, company) {
					html.find('.downloadPublicOrdierDocument').unbind().bind('click', function(e) {
						e.stopPropagation();
						_a.downloadTemplate({
							"fileName": _v.publicListJson[company][num].name
						}, function(result) {
							if (result.status == 0) {
								common.download(result.resultObj.filePath);
							} else {
								_C.alert({
									text: result.message
								})
							};
						});
					});
										
					html.find('.downloadPublicOrdierStub').click(function(e) { //下载档案
						e.stopPropagation();
						_a.downloadDocument(_v.publicMessage.ds_stub, function(result) {
							if (result.status == 0) {
								common.download(result.resultObj.fileTempPath);
							} else {
								_C.alert({
									text: result.message
								})
							};
						});
					
					});
				
				},
				operateFiredocument: function(html, num, dom, company) {
					
					html.find('.downloadFireDocument').unbind().bind('click', function(e) {
						e.stopPropagation();
						_a.downloadTemplate({
							"fileName": _v.publicListJson[company][num].name
						}, function(result) {
							if (result.status == 0) {
								common.download(result.resultObj.filePath);
							} else {
								_C.alert({
									text: result.message
								})
							};
						});
					});
											
					html.find('.downloadFireStub').click(function(e) { //下载档案
						e.stopPropagation();
					
						_a.downloadDocument(_v.publicMessage.ds_firestub, function(result) {
							if (result.status == 0) {
								common.download(result.resultObj.fileTempPath);
							} else {
								_C.alert({
									text: result.message
								})
							};
						});
						
					});
				
				},
			},
			_t = {
				/*右选项卡*/
				rightButten: function(data) {
					// console.log(data);
					var html = '';

					html += '<li>';
					html += '	<div id="' + data.id + '">';
					html += '		<img class="fileimg" src="/publicorder_web/img/document.png" alt="">';
					html += '		<span>' + data.name + '</span>';
					html += '	</div>';
					if (data.haveBtns && data.id == 'listbtn') {

						html += '<div class="btns">';
						html += '	<div class="downloadPublicOrdierDocument btn-dl">';
						html += '		<img src="/publicorder_web/img/download.png" title="下载模版" alt="">';
						html += '	</div>';
						html += '	<div class="downloadPublicOrdierStub btn-re">';
						html += '		<img src="/publicorder_web/img/revamp.png" title="下载/修改档案" alt="">';
						html += '	</div>';
						html += '	<div class="updatePublicOrdierStub btn-ud">';
						html += '<form style="display:block;position:absolute;" id="publicDocument" action="/uploadFiles.ashx?Action=formUpload" method="post" enctype="multipart/form-data">';
						html += '	<input type="file" id="publicDocumentUpdateFile" name="document" onchange="public.UpdatePublicDocument()" style="position: absolute; width: 27px; left: -3px;opacity: 0;filter: alpha(opacity=0); z-index: 999;" overflow: hidden;/>';
						html += '	<input type="submit" class="submit" value="提交表单" style="display: none;"/>';
						html += '	<input type="hidden" id="publicDocumentUpdateFileName" name="fileName" style="display: none;" />';
						html += '</form>';
						html += '		<img src="/publicorder_web/img/update.png" title="上传档案" alt="">';
						html += '	</div>';
						html += '</div>';
					} else if (data.haveBtns && data.id == 'firebtn') {

						html += '<div class="btns">';
						html += '	<div class="downloadFireDocument btn-dl">';
						html += '		<img src="/publicorder_web/img/download.png" title="下载模版" alt="">';
						html += '	</div>';
						html += '	<div class="downloadFireStub btn-re">';
						html += '		<img src="/publicorder_web/img/revamp.png" title="下载/修改档案" alt="">';
						html += '	</div>';
						html += '	<div class="updateFireStub btn-ud">';
						html += '<form style="display:block;position:absolute;" id="publicFireDocument" action="/uploadFiles.ashx?Action=formUpload" method="post" enctype="multipart/form-data">';
						html += '	<input type="file" id="publicFireDocumentUpdateFile" name="document" onchange="public.UpdatePublicFireDocument()" style="position: absolute; width: 27px; left: -3px;opacity: 0;filter: alpha(opacity=0); z-index: 999;" overflow: hidden;/>';
						html += '	<input type="submit" class="submit" value="提交表单" style="display: none;"/>';
						html += '	<input type="hidden" id="publicFireDocumentUpdateFileName" name="fileName" style="display: none;" />';
						html += '</form>';
						html += '		<img src="/publicorder_web/img/update.png" title="上传档案" alt="">';
						html += '	</div>';
						html += '</div>';
					};
					return html;
				},
				/*行业场所档案表*/
				publicTable: function(data, name) {
					_v.legalid = data['ds_owner_ref-ds_personid'] ? data['ds_owner_ref-ds_personid'] : '';
					_v.securityid = data['ds_securityowner_ref-ds_personid'] ? data['ds_securityowner_ref-ds_personid'] : '';
					_v.oldname = data['ds_name'];
					_v.oldAddress = data['ds_address'];
					_v.oldlegalName = data['ds_owner_ref-ds_name'] ? data['ds_owner_ref-ds_name'] : 'null';
					_v.oldlegalid = data['ds_owner_ref-ds_id'] ? data['ds_owner_ref-ds_id'] : 'null';
					_v.oldlegalTel = data['ds_owner_ref-ds_phone'] ? data['ds_owner_ref-ds_phone'] : 'null';
					_v.oldlegalAddress = data['ds_owner_ref-ds_address'] ? data['ds_owner_ref-ds_address'] : 'null';
					_v.oldsecurityName = data['ds_securityowner_ref-ds_name'] ? data['ds_securityowner_ref-ds_name'] : 'null';
					_v.oldsecurityid = data['ds_securityowner_ref-ds_id'] ? data['ds_securityowner_ref-ds_id'] : 'null';
					_v.oldsecurityTel = data['ds_securityowner_ref-ds_phone'] ? data['ds_securityowner_ref-ds_phone'] : 'null';
					_v.oldsecurityTel2 = data['ds_securityowner_ref-ds_phone2'] ? data['ds_securityowner_ref-ds_phone2'] : 'null';
					_v.oldsecurityAddress = data['ds_securityowner_ref-ds_address'] ? data['ds_securityowner_ref-ds_address'] : 'null';

					_v.oldlegalName1 = data['ds_owner_ref-ds_name'] ? data['ds_owner_ref-ds_name'] : '';
					_v.oldlegalid1 = data['ds_owner_ref-ds_id'] ? data['ds_owner_ref-ds_id'] : '';
					_v.oldlegalTel1 = data['ds_owner_ref-ds_phone'] ? data['ds_owner_ref-ds_phone'] : '';
					_v.oldlegalAddress1 = data['ds_owner_ref-ds_address'] ? data['ds_owner_ref-ds_address'] : '';
					_v.oldsecurityName1 = data['ds_securityowner_ref-ds_name'] ? data['ds_securityowner_ref-ds_name'] : '';
					_v.oldsecurityid1 = data['ds_securityowner_ref-ds_id'] ? data['ds_securityowner_ref-ds_id'] : '';
					_v.oldsecurityTel1 = data['ds_securityowner_ref-ds_phone'] ? data['ds_securityowner_ref-ds_phone'] : '';
					_v.oldsecurityTel21 = data['ds_securityowner_ref-ds_phone2'] ? data['ds_securityowner_ref-ds_phone2'] : '';
					_v.oldsecurityAddress1 = data['ds_securityowner_ref-ds_address'] ? data['ds_securityowner_ref-ds_address'] : '';
					var Table = '<table id="Tablelist">' +
						'<tr>' +
						'<th colspan="4">' + name + '<span id="upDatePublicOrderAddress" style="width: 70px; height: 27px; line-height: 27px; color: #fff; text-align: center; border-radius: 50px; float: right; background: #0168b7; margin: -5px 10px -5px 0;border: 1px solid white;">修改</span></th>' +
						'</tr>' +
						'<tr>' +
						'<td>单位名称</td>' +
						'<td colspan="3" id="ds_name">' + (data['ds_name'] ? data['ds_name'] : '') + '</td>' +
						'</tr>' +
						'<tr>' +
						'<td>单位地址</td>' +
						'<td colspan="3" id="ds_address">' + (data['ds_address'] ? data['ds_address'] : '') + '</td>' +
						'</tr>' +
						'<tr>' +
						'<td>负责人</td>' +
						'<td>&nbsp;&nbsp;&nbsp;&nbsp;法定代表人&nbsp;&nbsp;&nbsp;&nbsp;</td>' +
						'<td colspan="2">治安保卫负责人</td>' +
						'</tr>' +
						'<tr>' +
						'<td>姓名</td>' +
						'<td id="ds_owner_ref-ds_name">' + (data['ds_owner_ref-ds_name'] ? data['ds_owner_ref-ds_name'] : '') + '</td>' +
						'<td colspan="2" id="ds_securityowner_ref-ds_name">' + (data['ds_securityowner_ref-ds_name'] ? data['ds_securityowner_ref-ds_name'] : '') + '</td>' +
						'</tr>' +
						'<tr>' +
						'<td>公民身份证号</td>' +
						'<td id="ds_owner_ref-ds_id">' + (data['ds_owner_ref-ds_id'] ? data['ds_owner_ref-ds_id'] : '') + '</td>' +
						'<td colspan="2" id="ds_securityowner_ref-ds_id">' + (data['ds_securityowner_ref-ds_id'] ? data['ds_securityowner_ref-ds_id'] : '') + '</td>' +
						'</tr>' +
						'<tr>' +
						'<td>联系电话</td>' +
						'<td id="ds_owner_ref-ds_phone">' + (data['ds_owner_ref-ds_phone'] ? data['ds_owner_ref-ds_phone'] : '') + '</td>' +
						'<td colspan="2" id="ds_securityowner_ref-ds_phone">' + (data['ds_securityowner_ref-ds_phone'] ? data['ds_securityowner_ref-ds_phone'] : '') + '</td>' +
						'</tr>' +
						'<tr>' +
						'<td>家庭住址</td>' +
						'<td id="ds_owner_ref-ds_address">' + (data['ds_owner_ref-ds_address'] ? data['ds_owner_ref-ds_address'] : '') + '</td>' +
						'<td colspan="2" id="ds_securityowner_ref-ds_address">' + (data['ds_securityowner_ref-ds_address'] ? data['ds_securityowner_ref-ds_address'] : '') + '</td>' +
						'</tr>' +
						'<tr>' +
						'<td>治安保卫负责人联系电话</td>' +
						'<td colspan="3" id="ds_fund">' + (data['ds_securityowner_ref-ds_phone2'] ? data['ds_securityowner_ref-ds_phone2'] : '') + '</td>' +
						'</tr>' +
						'</table>';
					return Table;
				},
				//二维码显示模板
				qrcodeModel: function(url) {
					var html = '';
					html += '<div class="dialog TA" id="addPublicPosition" style="opacity:1; filter:alpha(opacity=100);">';
					html += '	<div class="dialog-bg"></div>';
					html += '	<div class="dialog-main TA">';
					html += '		<div class="dialog-title cl">';
					html += '			<div class="dialog-close">X</div>';
					html += '		</div>';
					html += '   	<span style="display: block;text-align: center; margin-top: 100px;"><img src="' + url + '"/></sapn>';
					html += '	</div>';
					html += '</div>';
					html = $(html);
					html.find('.dialog-close').click(function() {
						html.remove();
					});
					return html;
				},
				//修改行业场所内容模板
				publicInfo: function() {
					var html = '';
					html += '<div class="dialogBox">';
					html += '	<div class="cell">';
					html += '		<span class="label">单位名称：</span><input type="text" class="unitName" value="' + _v.oldname + '" />';
					html += '		<span class="label">单位地址：</span><input type="text" class="unitAddress" name="" id="" value="' + _v.oldAddress + '" />';
					html += '	</div>';
					html += '	<div class="cell">';
					html += '		<span class="label">法定代表人：</span>';
					html += '	</div>';
					html += '	<div class="cell retract">';
					html += '		<span class="label small">姓名：</span><input type="text" class="legalName" value="' + _v.oldlegalName1 + ' "/>';
					html += '		<span class="label small">身份证号：</span><input type="text" class="legalId" style="font-size:13px;" value="' + _v.oldlegalid1 + '" />';
					html += '	</div>';
					html += '	<div class="cell retract">';
					html += '		<span class="label small">联系电话：</span><input type="text" class="legalTel" value="' + _v.oldlegalTel1 + '" />';
					html += '		<span class="label small">家庭住址：</span><input type="text" class="legalAddress" value="' + _v.oldlegalAddress1 + '" />';
					html += '	</div>';
					html += '	<div class="cell">';
					html += '		<span class="label" style="width:25%;" >治安保卫负责人：</span>';
					html += '	</div>';
					html += '	<div class="cell retract">';
					html += '		<span class="label small">姓名：</span><input type="text" class="securityName" name="" id="" value="' + _v.oldsecurityName1 + '" />';
					html += '		<span class="label small">身份证号：</span><input type="text" class="securityId" style="font-size:13px;" name="" id="" value="' + _v.oldsecurityid1 + '" />';
					html += '	</div>';
					html += '	<div class="cell retract">';
					html += '		<span class="label small">联系电话：</span><input type="text" class="securityTel" name="" id="" value="' + _v.oldsecurityTel1 + '" />';
					html += '		<span class="label small">联系电话2：</span><input type="text" class="securityTel2" name="" id="" value="' + _v.oldsecurityTel21 + '" />';
					html += '	</div>'
					html += '	<div class="cell retract">';
					html += '		<span class="label small">家庭住址：</span><input type="text" class="securityAddress" name="" id="" value="' + _v.oldsecurityAddress1 + '" />';
					html += '	</div>';
					html += '</div>';
					html = $(html);
					return html;
				}
			},
			_a = {
				getDetail: function(success) {
					var id = _v.message.id;
					_C.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter = name eq 'ds_publicorderid'" +
							"or name eq 'ds_businesskind'" +
							")&$filter=name eq 'ds_publicorder'" +
							"and query eq 'ds_publicorderid eq " + id + "'",
						success: function(result) {
							var value = _C.formatting.CRMValue(result.value);
							success(value);
						}
					});
				},
				getPublicInfo: function(success) {
					var id = _v.message.id;
					_C.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter= name eq 'ds_publicorderid'" +
							"or name eq 'ds_businesskind'" +
							"or name eq 'ds_districtpolicestation_name'" +
							"or name eq 'ds_name'" +
							"or name eq 'ds_address'" +
							"or name eq 'ds_owner_ref-ds_personid'" +
							"or name eq 'ds_owner_ref-ds_name'" +
							"or name eq 'ds_owner_ref-ds_id'" +
							"or name eq 'ds_owner_ref-ds_phone'" +
							"or name eq 'ds_owner_ref-ds_address'" +
							"or name eq 'ds_securityowner_ref-ds_personid'" +
							"or name eq 'ds_securityowner_ref-ds_name'" +
							"or name eq 'ds_securityowner_ref-ds_id'" +
							"or name eq 'ds_securityowner_ref-ds_phone'" +
							"or name eq 'ds_securityowner_ref-ds_phone2'" +
							"or name eq 'ds_securityowner_ref-ds_address'" +
							"or name eq 'ds_latitude'" +
							"or name eq 'ds_longitude'" +
							"or name eq 'ds_address_tree'" +
							"or name eq 'ds_collectperson'" +
							"or name eq 'ds_stub'" +
							"or name eq 'ds_firestub'" +
							"or name eq 'ds_issmall'" +
							"or name eq 'ds_firelevel'" +
							"),lookups&$filter=name eq 'ds_publicorder' and query eq 'ds_publicorderid eq " + id + "'",
						success: function(result) {
							var value = _C.formatting.CRMValue(result.value);
							success(value);
						}
					})
				},
				/*获取场所类别*/
				getOptionPublicType: function(success) {
					_C.GET({
						url: "/crm/OptionSets('ds_businesskind')",
						success: function(result) {
							var _arr = result.options
							success(_arr);
						}
					});
				},
				/*下载模板（治安档案、消防档案、物流档案、企事业单位大学档案）*/
				downloadTemplate: function(data, success) {
					common.POST({
						data: data,
						url: "/api/Place/GetArchiveTemp",
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
					})
				},
				/*上传档案文档-Vincent*/
				uploadDocument: function(name, id, success) {
					common.POST({
						data: {
							"name": name,
							"id": id
						},
						url: "/api/Crm/PriorityPeopleLogin",
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
					})
				},
				/*下载档案文档*/
				downloadDocument: function(id, success) {
					common.POST({
						data: {
							"id": id
						},
						url: "/api/Place/GetStub",
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
					})
				},
				upDatePublicOrderAddressAjax: function(data, success) {
					_C.PUT({
						url: "/crm/Entities('ds_publicorder" + _v.message.id + "')",
						data: data,

						success: function(result) {
							success();
						}
					})
				},
				checkPeople: function(name, id, success) {
					_C.POST({
						url: "/api/Crm/GetPeopleExist",
						data: {
							"name": name,
							"idCard": id,
							"isCreate": "true",
							"publicorderId": permissions.getUserMessage().publicMessage.id,
							"publicorderName": permissions.getUserMessage().publicMessage.name,
							"policeId": permissions.getUserMessage().publicMessage.systemuserid,
						},
						success: function(result) {
							if (result.status == 0) {
								success(result.resultObj.personId);
							} else {
								success(false);
							}
						}
					});
				},
				upDataPeopleInfo: function(id, data, success) {
					_C.PUT({
						data: data,
						url: "/crm/Entities('ds_person" + id + "')",
						success: function() {
							success();
						},
					});
				},
			};
		return {
			init: _f.init,
			UpdatePublicDocument: _f.UpdatePublicDocument,
			UpdatePublicFireDocument: _f.UpdatePublicFireDocument
		};
	})();
})(jQuery, common, window);
$(document).ready(function() {
	public.init();
});