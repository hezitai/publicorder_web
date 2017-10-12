(function($, _C, _W) {
	_W.permissions = (function() {
		var _v = {
				user: {},
				local: 'publicorder_web',
			},
			_f = {
				init: function() {
					_v.user = _C.storage.get(_v.local);
					if (!_W.isChecked) {
						return;
					};
					if (!_v.user) {
						_W.common.alert({
							text: '登录已过期,请重新登录'
						}, _f.logout, _f.logout);
						return;
					};
/*					if (!_f.checkDayTime() && _W.isChecked) {
						_W.common.alert({
							text: '登录已过期,请重新登录'
						}, _f.logout, _f.logout);
						return;
					};*/
					$('#quit').click(_f.logout);
					
				},
				checkDayTime: function() {
					var dayTime = _C.getDayTime(true);
					if ((_v.user.dayTime + 1000 * 60 * 60 * 24) > dayTime) {
						return true;
					} else {
						return false;
					}
				},
				logout: function() {
					_C.storage.remove(_v.local);
					location.href = 'http://' + location.host + '/' + _v.local + '/index.html';
				},
				getUserMessage: function() {
					return _v.user;
				},
			};
		return {
			init: _f.init,
			checkDayTime: _f.checkDayTime,
			logout: _f.logout,
			getUserMessage: _f.getUserMessage,
		}
	})();
})(jQuery, common, window);
$(document).ready(function() {
	permissions.init();
});