(function($, _C, _W) {
	_W.regist = (function() {
		var _v = {
				businesskind: [{
					id: "100000000",
					name: "旅馆业",
					index: 0,
				}, {
					id: "100000010",
					name: "网吧",
					index: 1,
				}, {
					id: "100000013",
					name: "酒吧",
					index: 2,
				}, {
					id: "100000001",
					name: "KTV",
					index: 3,
				}, {
					id: "100000003",
					name: "影剧院",
					index: 4,
				}, {
					id: "100000002",
					name: "废旧物品回收",
					index: 5,
				}, {
					id: "100000011",
					name: "餐饮业",
					index: 6,
				}, {
					id: "100000006",
					name: "金银首饰加工",
					index: 7,
				}, {
					id: "100000004",
					name: "商（市）场",
					index: 8,
				}, {
					id: "100000005",
					name: "汽车修理业",
					index: 9,
				}, {
					id: "100000008",
					name: "典当业",
					index: 10,
				}, {
					id: "100000014",
					name: "养老机构",
					index: 11,
				}, {
					id: "100000015",
					name: "幼儿园",
					index: 12,
				}, {
					id: "100000016",
					name: "中小学",
					index: 13,
				}, {
					id: "100000009",
					name: "手机回收修理",
					index: 14,
				}, {
					id: "100000007",
					name: "开锁",
					index: 15,
				}, {
					id: "100000020",
					name: "刻字刻章",
					index: 16,
				}, {
					id: "100000021",
					name: "其他",
					index: 17,
				}, {
					id: "100000018",
					name: "物流寄递业",
					index: 18,
				}, {
					id: "100000012",
					name: "企事业单位",
					index: 19,
				}, {
					id: "100000017",
					name: "大学",
					index: 20,
				}],
				police: '',
				public: {},
				publicId: '',
				firstInitPage: false,
				policeList: [],
				plan: '0',
				postData: {},
				isInitMap: false,
				x: {},
				template: {
					body: '',
					pre: '',
					next: '',
					main: '',
					publicManage: false,
					publicMessage: false,
					owner: false,
					security: false,
					map: false,
				},
				address: {
					list: [
						[],
						[],
						[],
						[]
					],
					result: [{
						name: ' - 请选择 - ',
						id: '0',
						index: '0',
					}, {
						name: ' - 请选择 - ',
						id: '0',
						index: '0',
					}, {
						name: ' - 请选择 - ',
						id: '0',
						index: '0',
					}, {
						name: ' - 请选择 - ',
						id: '0',
						index: '0',
					}],
					data: [],
					template: false,
				},
			},
			_f = {
				init: function() {
					_a.getPolice(function() {
						//初始化行业场所
						for (var j = 0; j < _v.businesskind.length; j++) {
							var item = _v.businesskind[j];
							$('#businesskind').append(_t.options({
								"name": item['name'],
								"value": item.id,
							}));
						};
						//初始化派出所
						for (var i = 0; i < _v.police.length; i++) {
							var item = _v.police[i];
							$('#policeStationList').append(_t.options({
								"name": item['name'],
								"value": item.id,
								"index": item.index,
								"type": 'policeStation'

							}));
						};
						//初始化警员

						_f.initOptions();
					});
					$('#prev').bind('click', function() {
						_f.changePlan(false);
					});
					$('#next').bind('click', function() {
						_f.changePlan(true);
					});
				},
				initOptions: function() {
					$('#registPageOne').find('.chooseType').each(function() {
						var _this = $(this);
						if (!_this.hasClass('chooseType4')) {
							_this.find('.results').on('click', function(e) {
								e.stopPropagation();
								var options = _this.find('.options');
								if (options.css('display') == 'none') {
									options.css('display', 'block');
								} else {
									options.css('display', 'none');
								};
								_this.siblings().find('.options').css('display', 'none');
							});
							_this.find('.options').on('click', 'li', function(e) {
								e.stopPropagation();
								$(this).addClass('active').siblings().removeClass('active');
								_this.find('.name').text($(this).text());
								_this.find('.options').css('display', 'none');
								_this.find('.results').find('.isShow').removeClass('hide').addClass('show');
								$(this).parent().attr('data-value', $(this).attr('data-value'));
								if ($(this).attr('data-type') == "policeStation") {
									$('#policeList').empty().attr('data-value', 'none');
									$('.chooseType3 .name').text("请选择民警");

									var index = $('#policeStationList').find('.active').attr('data-index')
									for (var i = 0; i < _v.police[index].list.length; i++) {
										var item = _v.police[index].list[i];
										$('#policeList').append(_t.options({
											"name": item['name'],
											"value": item.id,
											"index": item.index,
											"type": 'police'

			                            }));
			                        };
			                         _v.teamid = $('#policeStationList').attr('data-value');
			                    };
			                    _f.checkOptionsComplete();
			                   
			                });
			            }

					});
					$('body').click(function() {
						$('.options').css('display', 'none');
					});

				},
				getAddress: function(data) {
					_C.confirm({
						className: 'confirmPopup',
						title: '提示',
						text: '是否选择' + data.ds_name + '?',
						confirm: {
							text: '确定',
							event: function() {

								$(".chooseType4").find('.name').text(data.ds_name);
								$(".chooseType4").find('#addressList').attr('data-value', data.ds_address_l4id);
								// _f.address.refresh();
								_v.address.template.css('display', 'none');
								_f.checkOptionsComplete();
							},
						},
						cancel: {
							text: '取消',
						}
					});
				},
				address: {
					template: function() {
						var html = '';
						html += '<div class="dialog TA" style="opacity: 1; filter:alpha(opacity=100)">';
						html += '	<div class="dialog-bg"></div>';
						html += '	<div class="dialog-main TA">';
						html += '		<div class="dialog-title cl">';
						html += '			<div class="dialog-title-text">请选择行政区域</div>';
						html += '			<div class="dialog-close">X</div>';
						html += '		</div>';
						html += '		<div class="dialog-body" style="width:600px; height:400px; position:relative">';
						html += '			<div class="searchAddressTree">';
						html += '				<input type="text" placeholder="请输入关键字" />';
						html += '				<div class="searchbtn">搜索</div>';
						html += '				<div class="searchlist"></div>';
						html += '			</div>';
						html += '		</div>';
						html += '		<div class="dialog-footer" style="bottom:0px;">';
						html += '		<div id="padding" class="paging" style="margin-top:0"></div>'
						html += '		</div>';
						html += '	</div>';
						html += '</div>';
						html = $(html);
						html.find('.dialog-close').click(function() {
							html.css('display', 'none');
						});
						html.find('.searchAddressTree .searchbtn').click(function() {
							var text = html.find('.searchAddressTree input').val();
							if (text.length < 2) {
								_C.alert({
									text: '关键字太短'
								});
								return;
							};

							var option = {
								element: '#padding',
								data: {
									str: text,
									count: '10',
									index: '1',
								},
								allPageKey: 'totalCount',
								event: _a.searchAddressTree,
								success: function(result) {
									html.find('.searchAddressTree .searchlist').empty();
									for (var i = 0; i < result.list.length; i++) {
										html.find('.searchAddressTree .searchlist').append(_t.chooseAddressItem(result.list[i]));
									};
								}
							};
							_C.paging(option);
						});
						return html;
					},
					init: function() {
						_f.address.set();
					},
					format: function(data, toData) {
						for (var i = 0; i < data.length; i++) {
							var _data = {};
							_data.name = data[i].name;
							_data.id = data[i].id;
							_data.index = i;
							toData.push(_data);
						};
					},
					get: function() {
						if (_v.address.result[3].id == 0) {
							_C.alert({
								className: 'confirmPopup',
								text: '请选择有效地址树',
							});
							return;
						};
						_C.confirm({
							className: 'confirmPopup',
							title: '提示',
							text: '是否选择' + _v.address.result[3].name + '?',
							confirm: {
								text: '确定',
								event: function() {
									$(".chooseType4").find('.name').text(_v.address.result[3].name);
									$(".chooseType4").find('#addressList').attr('data-value', _v.address.result[3].id);
									_f.address.refresh();
									_v.address.template.css('display', 'none');
									_f.checkOptionsComplete();
								},
							},
							cancel: {
								text: '取消',
								event: _f.address.refresh,
							}
						});
					},
					refresh: function() {
						$('.tree4').empty();
						var Tree4 = jQuery.extend(true, [], _v.address.list[3]);
						$('.tree4').append(_t.optionTemplate({
							name: ' - 请选择 - ',
							id: 0,
						}));
						for (var i = 0; i < Tree4.length; i++) {
							var options = Tree4[i];
							$('.tree4').append(_t.optionTemplate(options));
						};
					},
					set: function() {
						var addressData = _v.address.data;
						_f.address.format(addressData, _v.address.list[0]);
						if (!_v.address.template) {
							_v.address.template = _f.address.template();
							$('body').append(_v.address.template);
						} else {
							_v.address.template.css('display', 'block');
						};

					},
				},
				checkOptionsComplete: function() {
					var policeStationList = $('#policeStationList').attr('data-value');
					var businesskind = $('#businesskind').attr('data-value');
					var addressList = $('#addressList').attr('data-value');
					var police = $('#policeList').attr('data-value');
					if (policeStationList == 'none') {
						// _C.alert({text:'请选择所属派出所'});
						return;
					} else if (businesskind == 'none') {
						// _C.alert({text:'请选择场所类别'});
						return;
					} else if (addressList == 'none') {
						// _C.alert({text:'请选择行政区域'});
						return;
					} else if (police == 'none') {
						// _C.alert({text:'请选择民警'});
						return;
					} else {
						_v.postData['ds_businesskind_name'] = $('[data-type=type]').find('.name').text();
						_v.postData['ds_businesskind_value'] = businesskind;
						var dsDistrictpolicestationName = _v.postData['ds_districtpolicestation_name'] = $('[data-type=place]').find('.name').text();
						_v.postData['ds_districtpolicestation_id'] = policeStationList;

						$('#next').removeClass('hide');
					}
				},
				/*.............................*/
				formattedPoliceResult: function(data) {
					var police = [];
					for (var i = 0; i < data.length; i++) {
						if (police.length == 0) {
							police.push({
								name: data[i].teamName,
								id: data[i].teamId,
								list: [],
							})
						} else {
							var isChecked = false;
							for (var d = 0; d < police.length; d++) {
								if (police[d].name == data[i].teamName) {
									isChecked = true;
								};
							};
							if (!isChecked) {
								police.push({
									name: data[i].teamName,
									id: data[i].teamId,
									list: [],
								})
							}
						}
					};

					for (var i = 0; i < data.length; i++) {
						for (var d = 0; d < police.length; d++) {
							if (data[i].teamName == police[d].name) {
								police[d].list.push({
									name: data[i].name,
									id: data[i].policeCrmId
								});
							}
						}
					};
					return police;
				},
				verify: function() {
					var isFull = true;
					$('#userMessage').find('input').each(function() {
						var _this = $(this);
						var verifyConditions = _this.attr('data-verify').split(';');
						isAlert = true;
						for (var i = 0; i < verifyConditions.length; i++) {
							var verifyItem = verifyConditions[i];
							isAlert = _C.jude[verifyItem](_this.val());
							if (!isAlert) {
								var alterText = _this.attr('data-label');
								if (verifyItem == 'isNumber') {
									alterText += '必须为数字';
								};
								if (verifyItem == 'isPhone') {
									alterText += '输入有误';
								};
								if (verifyItem == 'isIdCard') {
									alterText += '输入有误';
								};
								if (verifyItem == 'isNull') {
									alterText += '不能为空';
								};
								_C.alert({
									text: alterText
								});
								isFull = false;
								break;
							} else {
								_v.postData[_this.attr('data-key')] = _this.val();
							};
						};
						if (!isAlert) {
							return false;
						}
					});
					return isFull;
				},
				initMap: function() {
					_v.isInitMap = true;
					var marker, map = new AMap.Map("MapContainer", {
						resizeEnable: false,
						center: [125.664676, 43.525465],
						zoom: 14,
					});
					AMap.plugin('AMap.Geocoder', function() {
						var geocoder = new AMap.Geocoder({
							city: "010" //城市，默认：“全国”
						});
						map.on('click', function(e) {
							if (marker) {
								marker.setMap(null);
								marker = null;
							};
							marker = new AMap.Marker({
								icon: "/publicorder_web/img/mark.png",
								position: [e.lnglat.getLng(), e.lnglat.getLat()]
							});
							marker.setMap(map);
							_v.postData['ds_latitude'] = e.lnglat.getLat().toString();
							_v.postData['ds_longitude'] = e.lnglat.getLng().toString();
							geocoder.getAddress(e.lnglat, function(status, result) {
								if (status == 'complete') {
									_v.postData['ds_buildingaddress'] = result.regeocode.formattedAddress
									_f.updataMessage();
								}
							});
						});
					});
				},
				changePlan: function(isNext) {
					switch (_v.plan) {
						case '0':
							if (isNext) {
								$('#selectBar').find('img').attr('src', '/publicorder_web/img/select-bar-2.png');
								$('#registPageOne').css('display', 'none');
								$('#userMessage').css('display', 'block');
								$('#Maps').css('display', 'none');
								_v.plan = '1';
								$('#prev').removeClass('hide');
							} else {
								$('#selectBar').find('img').attr('src', '/publicorder_web/img/select-bar-1.png');
								_v.plan = '0';
								$('#prev').addClass('hide');
							};
							break;
						case '1':
							if (isNext) {
								var isFull = _f.verify();
								if (!isFull) {
									return;
								}
								$('#selectBar').find('img').attr('src', '/publicorder_web/img/select-bar-3.png');
								$('#registPageOne').css('display', 'none');
								$('#userMessage').css('display', 'none');
								$('#Maps').css('display', 'block');
								_v.plan = '2';
								if (!_v.isInitMap) {
									_f.initMap();
								} else {
									_v.isSelected = true;
								}
								if (_v.isSelected) {
									$('#next').removeClass('hide').addClass('send');
								} else {
									$('#next').addClass('hide');
								}

								// _e.updataMessage();
							} else {
								$('#selectBar').find('img').attr('src', '/publicorder_web/img/select-bar-1.png');
								$('#registPageOne').css('display', 'block');
								$('#userMessage').css('display', 'none');
								$('#Maps').css('display', 'none');
								$('#prev').addClass('hide');
								_v.plan = '0';
							};
							break;
						case '2':
							if (isNext) {
								// _a.creatMessage();
								_f.judeAddress();
							} else {
								$('#selectBar').find('img').attr('src', '/publicorder_web/img/select-bar-2.png');
								$('#registPageOne').css('display', 'none');
								$('#userMessage').css('display', 'block');
								$('#Maps').css('display', 'none');
								$('#next').removeClass('send').removeClass('hide');
								_v.plan = '1';
							};
							break;
					}
				},
				updataMessage: function() {
					$('#next').addClass('send').removeClass('hide');
				},
				judeAddress: function() {

					var html = _t.judeAddress();
					html = $(html);
					$('body').append(html);
					html.css('display', 'block');
					html.find('.judeAddress-title-close').bind('click', function() {
						html.remove();
					});
					html.find('.bg').bind('click', function() {
						html.remove();
					});

					html.find('.textarea').html('纬度 : ' + _v.postData['ds_latitude'] + ' <br> ' + ' 经度 : ' + _v.postData['ds_longitude']);

					var slider = new SliderUnlock("#slider", {
						successLabelTip: "验证通过"
					}, function() {
						var sli_width = $("#slider_bg").width();
						endTime = $.now();
						numTime = endTime - startTime;
						endTime = 0;
						startTime = 0;

						function errorPart() {
							$('#labelTip').text('验证失败,请重试').css('color', '#f00');
							setTimeout(function() {
								slider.reset();
								slider.init();
								$('#labelTip').text('拖动滑块验证').css('color', '#787878');
							}, 2000);
						}
						if (numTime < 200) {
							errorPart();
						} else if (numTime > 10000) {
							errorPart();
						} else if (sli_width > 233) {
							errorPart();
						} else if (sli_width < 222) {
							errorPart();
						} else {
							setTimeout(function() {
								_a.CreatPublic(function() {
									$('#next').addClass('hide').removeClass('send');
									$('#prev').addClass('hide');
									$('#Maps').css('display', 'none');
									$('#complete').css('display', 'block');
									$("#completeUserName").text("登陆账号: " + $('#userMessage').find("[data-key=ds_username]").val());
									$("#completePassWord").text("密码: 888888");
								});
								html.remove();
							}, 500);
						}
					});
					slider.init();
				},
			},
			_a = {
				getPolice: function(success) {
					_C.POST({
						url: "/api/Crm/GetAllPolice",
						success: function(result) {
							if (result.status != 0) {
								_C.alert({
									className: 'confirmPopup',
									text: result.message
								});
								return;
							};
							// 格式化警员列表
							var data = result.resultObj;
							var police = [];
							for (var i = 0; i < data.length; i++) {
								if (police.length == 0) {
									police.push({
										name: data[i].teamName,
										id: data[i].teamId,
										list: [],
									})
								} else {
									var isChecked = false;
									for (var d = 0; d < police.length; d++) {
										if (police[d].name == data[i].teamName) {
											isChecked = true;
										};
									};
									if (!isChecked) {
										police.push({
											name: data[i].teamName,
											id: data[i].teamId,
											list: [],
										})
									}
								}
							};
							for (var i = 0; i < data.length; i++) {
								for (var d = 0; d < police.length; d++) {
									if (data[i].teamName == police[d].name) {
										police[d].list.push({
											name: data[i].name,
											id: data[i].policeCrmId
										});
									}
								}
							};

							for (var i = 0; i < police.length; i++) {
								police[i].index = i;
								for (var d = 0; d < police[i].list.length; d++) {
									police[i].list[d].index = i;
								}
							};


							_v.police = police;
							success();
						}
					});
				},

				getAddressTree: function(success) {
					_C.POST({
						url: '/api/Crm/GetAddressInfoAndVersion',
						success: function(result) {
							if (result.status == 0) {
								_v.address.data = result.resultObj.address1Models;
								success();
							} else {
								_C.alert({
									className: 'confirmPopup',
									text: '获取地址树信息失败\n请检查网络',
								});
							}
						},
					});
				},
				getLastAddressTree: function(id, success) {
					_C.GET({
						url: "/crm/Entities?$expand=attributes($filter=name eq 'ds_name' or name eq 'ds_address_l4id'),lookups&$filter=name eq 'ds_address_l4' and query eq 'ds_l3_ref eq " + id + "'",
						success: function(result) {
							var resultValue = _C.formatting.CRMList(result.value);
							var value = [];
							for (var i = 0; i < resultValue.length; i++) {
								var data = {};
								data.name = resultValue[i]['ds_name'];
								data.id = resultValue[i]['ds_address_l4id'];
								value.push(data);
							};
							success(value);
						}
					});
				},

				CreatPublic: function(success) {
					var manage = $('#userMessage');
					var data = {
						"userName": manage.find("[data-key=ds_username]").val(),
						"ds_latitude": _v.postData['ds_latitude'],
						"ds_longitude": _v.postData['ds_longitude'],
						"ds_address_tree": $('#addressList').attr('data-value'),
						"ds_collectperson": $('#policeList').attr('data-value'),
						"ds_charger": $('#policeList').attr('data-value'),
						"teamId": $('#policeStationList').attr('data-value'),
						"ds_businesskind": $('#businesskind').attr('data-value'),
						"ds_districtpolicestation_name": $(".chooseType2 .name").text(),
						"ds_name": manage.find("[data-key=ds_name]").val(),
						"ds_address": manage.find("[data-key=ds_address]").val(),
						"ds_owner_ref_ds_name": manage.find("[data-key=ds_owner_ref_ds_name]").val(),
						"ds_owner_ref_ds_id": manage.find("[data-key=ds_owner_ref_ds_id]").val(),
						"ds_owner_ref_ds_phone": manage.find("[data-key=ds_owner_ref_ds_phone]").val(),
						"ds_owner_ref_ds_address": manage.find("[data-key=ds_owner_ref_ds_address]").val(),
						"ds_securityowner_ref_ds_name": manage.find("[data-key=ds_securityowner_ref_ds_name]").val(),
						"ds_securityowner_ref_ds_id": manage.find("[data-key=ds_securityowner_ref_ds_id]").val(),
						"ds_securityowner_ref_ds_phone": manage.find("[data-key=ds_securityowner_ref_ds_phone]").val(),
						"ds_securityowner_ref_ds_phone2": manage.find("[data-key=ds_securityowner_ref_ds_phone2]").val(),
						"ds_owner_ref_ds_phone2": manage.find("[data-key=ds_owner_ref_ds_phone2]").val(),
						"ds_securityowner_ref_ds_address": manage.find("[data-key=ds_securityowner_ref_ds_address]").val(),
					};
					_C.POST({
						url: "/api/Crm/PlaceRegist",
						data: data,
						success: function(result) {
							if (result.status == 0) {
								success()
							} else {
								_C.alert({
									className: 'confirmPopup',
									text: result.message,
								});
							}
						}
					});
				},
				searchAddressTree: function(data, success) {
					_C.POST({
						url: '/api/Crm/SearchAddress',
						data: {
							"commonStr": data.str,
							"index": data.index,
							"count": data.count
						},
						success: function(result) {
							if (result.status == 0) {
								success({
									totalCount: result.resultObj[0].totalCount,
									list: result.resultObj
								});
							} else if (result.status == 2) {
								_C.alert({
									className: 'confirmPopup',
									text: '未搜索到结果'
								});
								success({
									totalCount: 0,
									list: []
								});
							} else {
								_C.alert({
									className: 'confirmPopup',
									text: '数据错误,请重试'
								})
							}
						}
					});
				},
				updatePublicAddress: function(data, success) {
					_C.PUT({
						url: "/crm/Entities('ds_publicorder" + _v.publicId + "')",
						data: {
							attributes: [{
								"name": "ds_address_tree",
								"value": "@look/" + data
							}]
						},
						success: function(result) {
							success();
						}
					})
				},
			},
			_t = {
				options: function(data) {
					return '<li data-value="' + data.value + '" data-index="' + data.index + '" data-type="' + data.type + '">' + data.name + '</li>';
				},
				options1: function(data) {
					return '<li data-value="' + data.value + '">' + data.name + '</li>';
				},
				judeAddress: function() {
					var html = '';
					html += '<div id="judeAddress">';
					html += '<div class="bg"></div>';
					html += '<div class="judeAddress-main">';
					html += '<div class="judeAddress-title cl">';
					html += '<div class="judeAddress-title-text">确认地址</div>';
					html += '<div class="judeAddress-title-close">X</div>';
					html += '</div>';
					html += '<div class="judeAddress-body">';
					html += '<div class="textarea"></div>';
					html += '<div id="slider" style="width: 280px;">';
					html += '<div id="slider_bg"></div>';
					html += '<span id="label">>></span> <span id="labelTip">拖动滑块验证</span>';
					html += '</div>';
					html += '</div>';
					html += '</div>';
					html += '</div>';
					return html;
				},
				optionTemplate: function(data) {
					var html = "";
					html += '<option value="' + data.id + '" data-index="' + data.index + '" ' + (data.isSelect ? 'select="select"' : '') + '>' + data.name + '</option>';
					return html;
				},
				chooseAddressItem: function(data) {
					var html = '<div class="listItem">' + data.ds_name + '</div>';
					html = $(html);
					html.click(function() {
						_f.getAddress(data);
					});
					return html;
				},
			};
		return {
			init: _f.init,
			address: _f.address.init,
		}
	})();
})(jQuery, window.common, window);
$(document).ready(function() {
	regist.init();
});