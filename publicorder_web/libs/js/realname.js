(function($, _C, _W) {
	_W.detail = (function() {
		var _v = {
				publicId: '',
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;
					_a.getDetail(_f.initPage);
				},
				initPage: function(value) {
					switch(value.ds_businesskind.split(":")[0]) {
						case "100000011": // 能住宿的饭店
							realnameHotel.init();
							break;
						case "100000006": // 金银首饰加工
							realnameMetal.init();
							break;
						case "100000002": // 废品回收
							realnameWaste.init();
							break;
						case "100000018": // 物流
							if(location.pathname == '/publicorder_web/pages/realname.html') {
								realnameLogistics.init();
							} else if(location.pathname == '/publicorder_web/pages/realnameSearchLogistics.html') {
								realnameLogisticsSearch.init();
							}
							break;
						case "100000009": // 手机回收
							realnamePhone.init();
							break;
						default:common.alert({
								className:"nonealert",
								title:"提示",
								text:"此区域暂未开放",
								buttonText:"关闭"
							});
					}
				}
			},
			_a = {
				getDetail: function(success) {//获取行业场所分类
					_C.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter= name eq 'ds_businesskind'" +
							"),lookups&$filter=name eq 'ds_publicorder' and query eq 'ds_publicorderid eq " + _v.message.id + "'",
						success: function(result) {
							var value = _C.formatting.CRMValue(result.value);
							success(value);
						}
					});
				}
			};
		return {
			init: _f.init,
		};
	})();
})(jQuery, common, window);
$(document).ready(function() {
	detail.init();
});