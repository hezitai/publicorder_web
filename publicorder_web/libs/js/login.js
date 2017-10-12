(function($, _C, _W) {
	_W.login = (function() {
		var _v = {},
			_f = {
				init: function() {
					$('#login').click(_f.login);
					document.onkeydown = function(e) {
						var ev = document.all ? window.event : e;
						if (ev.keyCode == 13) {
							_f.login();
						}
					};
				},
				login: function() {
					_v.publicMessage = {};
					var name = $('#name').val();
					var idCardNum = $('#idCardNum').val();
					if (!_C.jude.isNull(name)) {
						_C.alert({
							text: '请输入用户名'
						});
						return;
					};
					if (!_C.jude.isNull(idCardNum)) {
						_C.alert({
							text: '请输入密码'
						});
						return;
					};
					var data = {
						name: name,
						password: idCardNum,
					};
					_a.login(data, function(result) {
					
						_v.publicMessage.name = result.resultObj.ds_name;
						_v.publicMessage.id = result.resultObj.ds_publicorderid;
						_v.publicMessage.systemuserid = result.resultObj.ds_charger;
						_v.publicMessage.systemuserName = result.resultObj.systemusername;
						_v.publicMessage.teamid = result.resultObj.teamId;
						_v.publicMessage.teamName = result.resultObj.ds_districtpolicestation_name;
						_v.publicMessage.ds_businesskind = result.resultObj.ds_businesskind;
						_v.publicMessage.ds_address = result.resultObj.ds_address;
						_v.publicMessage.ds_latitude = result.resultObj.ds_latitude;
						_v.publicMessage.ds_longitude = result.resultObj.ds_longitude;
						_v.publicMessage.ds_address_tree = result.resultObj.ds_address_tree;
						_v.publicMessage.ds_address_tree_name = result.resultObj.addressTreeName;
						_v.publicMessage.userId = result.resultObj.userId;
						_v.publicMessage.qrcode = result.resultObj.qrcode;
						_v.publicMessage.firestub = result.resultObj.ds_firestub;
						_v.publicMessage.ds_stub = result.resultObj.ds_stub;
						
						_C.storage.set('publicorder_web', _v);
						if (_v.publicMessage.systemuserid && _v.publicMessage.teamid && _v.publicMessage.ds_businesskind && _v.publicMessage.ds_latitude && _v.publicMessage.ds_longitude && _v.publicMessage.ds_address_tree) {
							location.href = 'http://' + location.host + '/publicorder_web/pages/index.html';
						} else {
							location.href = 'http://' + location.host + '/publicorder_web/pages/publicmanage.html';
						};
					});
				},

			},
			_a = {
				login: function(data, success) {
					_C.POST({
						url: '/api/Crm/PlaceLogon',
						data: {
							"username": data.name,
							"password": data.password,
						},
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
			};
		return {
			init: _f.init,
		}
	})();
})(jQuery, common, window);
$(document).ready(function() {
	login.init();
});