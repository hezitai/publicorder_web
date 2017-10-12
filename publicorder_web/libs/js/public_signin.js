(function($, _C, _W) {
	_W.publicSingin = (function() {
		var _v = {
				message: {},
				template: null,
				year: null,
				month: null,
				map: {
					event: null,
					marker: null,
				}
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;
					_a.chekcInState(function(result) {
						var template = _t.signLayout(result.ds_ischekcin == 'True');
						_v.template = template.find('#siginPeopleList');
						_v.year = template.find('#year');
						_v.month = template.find('#month');
						$('#main-a').html(template);
						_f.searchSignList();
					});
				},
				searchSignList: function() {
					_a.getSignList({
						"commonStr": _v.message.id,
						"year": _v.year.val(),
						"month": _v.month.val(),
					}, function(result) {
						_v.template.empty();
						for (var i = 0; i < result.length; i++) {
							_v.template.append(_t.singinPeople(result[i]));
						};
					});
				},
				showPeopleSiginPopup: function(list) {
					_C.dialog({
						className: "SinginBox",
						title: "签到记录",
						template: _t.peoplePopupTemplate(list),
						confirm: {
							event: false,
							text: '提交',
							hide: true
						},
						cancel: {
							event: function() {
								_v.map.event = null;
								_v.map.marker = null;
							},
							text: '取消',
							hide: true
						}
					});
				},
				changeChekcInState: function(element) {
					var type = element.attr('data-type') == 'true';
					_C.confirm({
						title: '标题',
						text: '是否' + (type ? '开启' : '关闭') + '签到?',
						confirm: {
							event: function() {
								var data = {
									attributes: [{
										name: 'ds_ischekcin',
										value: '@b/' + type.toString(),
									}]
								};
								_a.changeChekcInState(data, function() {
									type = !type;
									element.attr('data-type', type).text((type ? '开启' : '关闭') + '签到');
								});
							},
							text: '确定',
						},
					});
				},
				initMap: function() {
					_v.map.event = new AMap.Map("singinPosition", {
						resizeEnable: true,
						center: [125.658668, 43.524547],
						zoom: 16,
					});
				},
			},
			_a = {
				getSignList: function(data, success) {
					_C.POST({
						url: "/api/Crm/GetEmployeeCheckInHistory",
						data: data,
						success: function(result) {
							if (result.status == 0) {
								success(result.resultObj);
							} else {
								_C.alert({
									text: result.message,
								});
							}
						}
					});
				},
				chekcInState: function(success) {
					_C.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter= name eq 'ds_ischekcin' " +
							"),lookups&$filter=name eq 'ds_publicorder' and query eq 'ds_publicorderid eq " + _v.message.id + "'",
						success: function(result) {
							var value = _C.formatting.CRMValue(result.value);
							success(value);
						}
					});
				},
				changeChekcInState: function(data, success) {
					_C.PUT({
						url: "/crm/Entities('ds_publicorder" + _v.message.id + "')",
						data: data,
						success: function(result) {
							success();
						}
					});
				},
			},
			_t = {
				signLayout: function(isChecked) {
					var html = '';
					html += '<div>';
					html += '	<div class="stuff">';
					html += '		<h3>签到记录</h3>';
					html += '		<button style="width: 85px;" data-type="' + (isChecked ? 'false' : 'true') + '">' + (isChecked ? '关闭签到' : '开启签到') + '</button>';
					html += '	</div>';
					html += '	<ul class="stufflist" style="height: 51px;">';
					html += '		<li>';
					html += '			<p style="float:left">选择年份 : <select style="margin:0 10px 0 0" id="year"></select></p>';
					html += '			<p style="float:left">选择月份 : <select style="margin:0 10px 0 0" id="month"></select></p>';
					html += '			<p style="float:right;line-height:30px; color:#fff" class="btn btn-blue">查询</p>';
					html += '		</li>';
					html += '	</ul>';
					html += '	<ul class="stufflist" id="siginPeopleList" style="height: 319px;"></ul>';
					html += '</div>';
					html = $(html);
					var year = parseInt(_C.formatting.ExDate('YYYY'));
					for (var i = year - 2; i < year + 3; i++) {
						html.find('#year').append('<option value="' + i + '" ' + (i == year ? 'selected="selected"' : '') + '>' + i + '年' + '</option>');
					};
					var month = parseInt(_C.formatting.ExDate('M'));
					for (var i = 1; i < 13; i++) {
						html.find('#month').append('<option value="' + i + '" ' + (i == month ? 'selected="selected"' : '') + '>' + i + '月' + '</option>');
					};
					html.find('.btn.btn-blue').click(_f.searchSignList);
					html.find('.stuff button').click(function() {
						_f.changeChekcInState($(this));
					})
					return html;
				},
				singinPeople: function(data) {
					var html = '';
					html += '<li>';
					html += '	<p>姓名 ：<span class="stuffname">' + data.personName + '</span></p>';
					html += '	<a class="cekstuff" style="width:70px; right:0px;">查看记录</a>';
					html += '</li>';
					html = $(html);
					html.find('.cekstuff').click(function() {
						_f.showPeopleSiginPopup(data.checkInHistoryModels);
					});
					return html;
				},
				peoplePopupTemplate: function(list) {
					var html = '';
					html += '<div class="tepl-layout">';
					html += '	<div class="tepl-left">';
					html += '	</div>';
					html += '	<div class="tepl-right" id="singinPosition">';
					html += '	</div>';
					html += '</div>';
					html = $(html);
					for (var i = 0; i < list.length; i++) {
						html.find('.tepl-left').append(_t.peoplePopupSiginItem(list[i]));
					};
					return html;
				},
				peoplePopupSiginItem: function(data) {
					var html = '';
					html += '	<div class="tepl-item">';
					html += '		<span style="margin-left : 20px;">' + _C.formatting.ExDate('D日 HH:mm', data.checkintime.replace('Z', '')) + '</span>';
					if (data.latitude && data.longitude) {
						html += '		<span class="positionForMap"></span>';
					};
					html += '	</div>';
					html = $(html);
					html.find('.positionForMap').click(function() {
						if (!_v.map.event) {
							_f.initMap();
						};
						if (_v.map.marker) {
							_v.map.marker.setMap(null);
							_v.map.marker = null;
						};
						_v.map.marker = new AMap.Marker({
							map: _v.map.event,
							position: [data.longitude, data.latitude]
						});
						_v.map.event.setFitView();
					});
					return html;
				}
			};
		return {
			init: _f.init
		}
	})();
})(jQuery, common, window);