(function($, _C, _W) {
    _W.publicStuff = (function() {
        var _v = {
                message: {},
                options: {},
            },
            _f = {
                init: function() {
                    _v.message = permissions.getUserMessage().publicMessage;
                    _f.initPage();
                },
                initPage: function() {
                    _f.getOptionset(function() {
                        _a.get(function(result) {
                            $('#main-a').html(_t.stuffList(result));
                        });
                    });
                },
                getOptionSiteByArrayItem: function(thisArray, OptionSiteObject, success) {
                    var newArray = thisArray;
                    var resultArray = [];

                    function getOptionSites() {
                        var item = newArray.pop();
                        OptionSiteObject[item](function(result) {
                            resultArray.unshift(result);
                            if (newArray.length == 0) {
                                success(resultArray);
                            } else {
                                getOptionSites();
                            }
                        });
                    };
                    getOptionSites();
                },
                getOptionset: function(success) {
                    var optionSiteArray = ['getNationOptionset', 'getEducationOptionset', 'getMarriageOptionset', 'getBloodtypeOptionset', 'getfamilyregisterOptionset'];
                    _f.getOptionSiteByArrayItem(optionSiteArray, _optionSide, function(result) {
                        _v.options = result;
                        success();

                    });
                },
                bindClickFun: function(item, data) { //查看/修改/删除从业人员
                    item.find('.cekstuff').click(function() {
                        _a.getPublicStuffInitList(data.id, function(result) {
                            common.dialog({
                                className: 'putstuffinfo',
                                title: '从业人员信息',
                                template: _t.dialogTemplate(result, _v.options),
                                confirm: {
                                    event: function(template, hide) {
                                        var _name = $('.personname').val();
                                        var _oldname = $('.oldname').val();
                                        var _id = $('.id').val();
                                        var _education = $('.ds_education').val();
                                        var _nation = $('.ds_nation').val();
                                        var _marriage = $('.ds_marriage').val();
                                        var _familyregister = $('.ds_familyregister').val();
                                        var _bloodtype = $('.ds_bloodtype').val();
                                        var _phone = $('.phone').val();
                                        var _phone2 = $('.phone2').val();
                                        var _qq = $('.qq').val();
                                        var _wechat = $('.wechat').val();
                                        var _telephone = $('.telephone').val();
                                        var _height = $('.height').val();
                                        var _duty = $('.duty').val();
                                        var _address = $('.address').val();
                                        var resultid = result.id;
                                        var _data = {
                                            "attributes": [{
                                                    "name": "ds_name",
                                                    "value": _name
                                                }, {
                                                    "name": "ds_id",
                                                    "value": _id
                                                }/*, {
    												"name": "ds_address",
    												"value": _address
    											}, {
    												"name": "ds_height",
    												"value": _height
    											}, {
    												"name": "ds_oldname",
    												"value": _oldname
    											}, {
    												"name": "ds_phone",
    												"value": _phone
    											}, {
    												"name": "ds_phone2",
    												"value": _phone2
    											}, {
    												"name": "ds_qq",
    												"value": _qq
    											}, {
    												"name": "ds_telephone",
    												"value": _telephone
    											}, {
    												"name": "ds_wechat",
    												"value": _wechat
    											}*/
                                            ]
                                        };
                                        if (!_C.jude.isNull(_name)) { _C.alert({ text: '请输入姓名' }); return; };
                                        if (!_C.jude.isNull(_id)) { _C.alert({ text: '请输入身份证号' }); return; };
                                        if (!_C.jude.isIdCard(_id)) { _C.alert({ text: '请输入正确身份证号' }); return; };
                                        if (!_C.jude.isNull(_duty)) { _C.alert({ text: '请输入职务' }); return; };
                                        if (_C.jude.isNull(_qq) && !_C.jude.isNumber(_qq)) { _C.alert({ text: '请输入正确QQ号' }); return; };
                                        if (_C.jude.isNull(_phone) && !_C.jude.isPhone(_phone)) { _C.alert({ text: '请输入正确的手机号1' }); return; };
                                        if (_C.jude.isNull(_phone2) && !_C.jude.isPhone(_phone2)) { _C.alert({ text: '请输入正确的手机号2' }); return; };
                                        if (_C.jude.isNull(_telephone) && !_C.jude.isTelephone(_telephone)) { _C.alert({ text: '请输入正确的固定电话' }); return; };
                                        if (_address) { _data.attributes.push({ "name": "ds_address", "value": _address }); };
                                        if (_wechat) { _data.attributes.push({ "name": "ds_wechat", "value": _wechat }); };
                                        if (_height) { _data.attributes.push({ "name": "ds_height", "value": _height }); };
                                        if (_oldname) { _data.attributes.push({ "name": "ds_oldname", "value": _oldname }); };
                                        if (_phone) { _data.attributes.push({ "name": "ds_phone", "value": _phone }); };
                                        if (_phone2) { _data.attributes.push({ "name": "ds_phone2", "value": _phone2 }); };
                                        if (_qq) { _data.attributes.push({ "name": "ds_qq", "value": _qq }); };

                                        if (_telephone) { _data.attributes.push({ "name": "ds_telephone", "value": _telephone }); };
                                        if (_education != '1') { _data.attributes.push({ "name": "ds_education", "value": "@code/" + _education }); };
                                        if (_nation != '1') { _data.attributes.push({ "name": "ds_nation", "value": "@code/" + _nation }); };
                                        if (_marriage != '1') { _data.attributes.push({ "name": "ds_marriage", "value": "@code/" + _marriage }); };
                                        if (_familyregister != '1') { _data.attributes.push({ "name": "ds_account", "value": "@code/" + _familyregister }); };
                                        if (_bloodtype != '1') { _data.attributes.push({ "name": "ds_bloodtype", "value": "@code/" + _bloodtype }); };

                                        function upDataWidthImage() {
                                            var options = {
                                                success: function(data) {
                                                    _data.attributes.push({
                                                        "name": "ds_idaheadpic",
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
                                            _a.putPublicStuffInfo(_data, result['ds_employee-ds_personid'], function(result) {
                                                var _position = {
                                                    "attributes": [{
                                                        "name": "ds_position",
                                                        "value": _duty
                                                    }]
                                                };
                                                if (!_C.jude.isNull(_duty)) { _C.alert({ text: '请输入职务' }); return; };
                                                _a.putPublicStuffPosition(_position, resultid, function() {
                                                    _C.alert({
                                                        text: '修改成功',
                                                    });
                                                    _f.init();
                                                    hide();
                                                });
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
                                        // if ($('#fileUpDataElement').val()) {
                                        // 	upDataWidthImage();
                                        // } else if (!$('#fileUpDataElement').val() && $('#fileUpDataElement').attr('data-id') != 'none') {
                                        // 	upDataWidthOutImage();
                                        // } else {
                                        // 	_C.alert({
                                        // 		text: '请上传物品照片',
                                        // 	})
                                        // };
                                    },
                                    text: '提交',
                                    className: '',
                                },
                            });
                        })
                    });
                    item.find('.delstuff').click(function() {
                        _C.dialog({
                            className: 'delinfo',
                            title: '提示',
                            template: '确定删除？',
                            confirm: {
                                event: function(template, hide) {
                                    _a.delPublicStuffInfo(data.id, function(result) {
                                        _C.alert({
                                            text: '删除成功',
                                        });
                                        _f.init();
                                    });

                                    hide();
                                },
                                text: '确定',
                            },
                        });
                    });
                },
                addStuffInfo: function() { //添加从业人员
                    _C.dialog({
                        className: 'putstuffinfo',
                        title: '从业人员信息',
                        template: _t.creatdialogTemplate({}, _v.options),
                        confirm: {
                            event: function(template, hide) {
                                var _name = $('.personname').val();
                                var _oldname = $('.oldname').val();
                                var _id = $('.id').val();
                                var _education = $('.ds_education').val();
                                var _nation = $('.ds_nation').val();
                                var _marriage = $('.ds_marriage').val();
                                var _familyregister = $('.ds_familyregister').val();
                                var _bloodtype = $('.ds_bloodtype').val();
                                var _phone = $('.phone').val();
                                var _phone2 = $('.phone2').val();
                                var _qq = $('.qq').val();
                                var _wechat = $('.wechat').val();
                                var _telephone = $('.telephone').val();
                                var _height = $('.height').val();
                                var _duty = $('.duty').val();
                                var _address = $('.address').val();
                                var _data = {
                                    "attributes": [{
                                        "name": "ds_name",
                                        "value": _name
                                    }, {
                                        "name": "ds_id",
                                        "value": _id
                                    }]
                                };
                                if (!_C.jude.isNull(_name)) { _C.alert({ text: '请输入姓名' }); return; };
                                if (!_C.jude.isNull(_id)) { _C.alert({ text: '请输入身份证号' }); return; };
                                if (!_C.jude.isIdCard(_id)) { _C.alert({ text: '请输入正确身份证号' }); return; };
                                if (!_C.jude.isNull(_duty)) { _C.alert({ text: '请输入职务' }); return; };
                                if (_C.jude.isNull(_qq) && !_C.jude.isNumber(_qq)) { _C.alert({ text: '请输入正确QQ号' }); return; };
                                if (_C.jude.isNull(_phone) && !_C.jude.isPhone(_phone)) { _C.alert({ text: '请输入正确的手机号1' }); return; };
                                if (_C.jude.isNull(_phone2) && !_C.jude.isPhone(_phone2)) { _C.alert({ text: '请输入正确的手机号2' }); return; };
                                if (_C.jude.isNull(_telephone) && !_C.jude.isTelephone(_telephone)) { _C.alert({ text: '请输入正确的固定电话' }); return; };
                                if (_address) { _data.attributes.push({ "name": "ds_address", "value": _address }); };
                                if (_wechat) { _data.attributes.push({ "name": "ds_wechat", "value": _wechat }); };
                                if (_height) { _data.attributes.push({ "name": "ds_height", "value": _height }); };
                                if (_oldname) { _data.attributes.push({ "name": "ds_oldname", "value": _oldname }); };
                                if (_phone) { _data.attributes.push({ "name": "ds_phone", "value": _phone }); };
                                if (_phone2) { _data.attributes.push({ "name": "ds_phone2", "value": _phone2 }); };
                                if (_qq) { _data.attributes.push({ "name": "ds_qq", "value": _qq }); };
                                if (_telephone) { _data.attributes.push({ "name": "ds_telephone", "value": _telephone }); };
                                if (_education != '1') { _data.attributes.push({ "name": "ds_education", "value": "@code/" + _education }); };
                                if (_nation != '1') { _data.attributes.push({ "name": "ds_nation", "value": "@code/" + _nation }); };
                                if (_marriage != '1') { _data.attributes.push({ "name": "ds_marriage", "value": "@code/" + _marriage }); };
                                if (_familyregister != '1') { _data.attributes.push({ "name": "ds_account", "value": "@code/" + _familyregister }); };
                                if (_bloodtype != '1') { _data.attributes.push({ "name": "ds_bloodtype", "value": "@code/" + _bloodtype }); };
                                _a.checkStuffInfoReturn({
                                    "name": _name,
                                    "idCard": _id,
                                    "isCreate": "true",
                                    "publicorderId": permissions.getUserMessage().publicMessage.id,
                                    "publicorderName": permissions.getUserMessage().publicMessage.name,
                                    "policeId": permissions.getUserMessage().publicMessage.systemuserid,
                                }, function(result) {
                                    var ResultId = result.resultObj.personId;

                                    function upDataWidthImage() {
                                        var options = {
                                            success: function(data) {
                                                _data.attributes.push({
                                                    "name": "ds_idaheadpic",
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
                                        _a.createPublicStuffEntities1(ResultId, _data, function(result) {
                                            var _data1 = {
                                                "name": "ds_publicorder_employee",
                                                "attributes": [{
                                                    "name": "ds_employee",
                                                    "value": "@look/" + ResultId
                                                }, {
                                                    "name": "ds_publicorder_ref",
                                                    "value": "@look/" + _v.message.id
                                                }, {
                                                    "name": "ds_position",
                                                    "value": _duty
                                                }]
                                            }
                                            if (!_C.jude.isNull(_duty)) { _C.alert({ text: '请输入职务' }); return; };
                                            _a.createPublicStuffEntities(_data1, function() {
                                                _C.alert({
                                                    text: '创建成功'
                                                });
                                                hide();
                                                _f.init();
                                            });
                                        });
                                    };
                                    try {
                                        if ($('#fileUpDataElement')[0].files.length != 0) {

                                            upDataWidthImage();
                                        } else if ($('#fileUpDataElement')[0].files.length == 0 && $('#fileUpDataElement').attr('data-id') != 'none') {

                                            upDataWidthOutImage();
                                        }
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
                                    // 		text: '请上传物品照片',
                                    // 	})
                                    // };
                                });

                            },
                            text: '提交',
                            className: '',
                        },
                    });
                },
            },
            _optionSide = (function() {
                var getNationOptionset, getEducationOptionset, getMarriageOptionset, getBloodtypeOptionset, getfamilyregisterOptionset;
                return {
                    getNationOptionset: function(success) {
                        if (getNationOptionset) {
                            success(getNationOptionset);
                        } else {
                            _C.GET({
                                url: "/crm/OptionSets('ds_nation')",
                                success: function(result) {
                                    var resultValue = _C.formatting.CRMOptions(result);
                                    getNationOptionset = resultValue;
                                    success(getNationOptionset);
                                }
                            });
                        }
                    },
                    getEducationOptionset: function(success) {
                        if (getEducationOptionset) {
                            success(getEducationOptionset);
                        } else {
                            _C.GET({
                                url: "/crm/OptionSets('ds_education')",
                                success: function(result) {
                                    var resultValue = _C.formatting.CRMOptions(result);
                                    getEducationOptionset = resultValue;
                                    success(getEducationOptionset);
                                }
                            });
                        }
                    },
                    getMarriageOptionset: function(success) {
                        if (getMarriageOptionset) {
                            success(getMarriageOptionset);
                        } else {
                            _C.GET({
                                url: "/crm/OptionSets('ds_marriage')",
                                success: function(result) {
                                    var resultValue = _C.formatting.CRMOptions(result);
                                    getMarriageOptionset = resultValue;
                                    success(getMarriageOptionset);
                                }
                            });
                        }
                    },
                    getBloodtypeOptionset: function(success) {
                        if (getBloodtypeOptionset) {
                            success(getBloodtypeOptionset);
                        } else {
                            _C.GET({
                                url: "/crm/OptionSets('ds_bloodtype')",
                                success: function(result) {
                                    var resultValue = _C.formatting.CRMOptions(result);
                                    getBloodtypeOptionset = resultValue;
                                    success(getBloodtypeOptionset);
                                }
                            });
                        }
                    },
                    getfamilyregisterOptionset: function(success) {
                        if (getfamilyregisterOptionset) {
                            success(getfamilyregisterOptionset);
                        } else {
                            _C.GET({
                                url: "/crm/OptionSets('ds_familyregister')",
                                success: function(result) {
                                    var resultValue = _C.formatting.CRMOptions(result);
                                    getfamilyregisterOptionset = resultValue;
                                    success(getfamilyregisterOptionset);
                                }
                            });
                        }
                    },
                }
            })(),
            _t = {
                options: function(data, options) {
                    var html = '';
                    if (!_C.jude.isNull(data) && !data) {
                        html += _t.optionTemplate({
                            value: '1',
                            name: '请选择',
                            selected: true,
                        });
                        for (var i = 0; i < options.length; i++) {
                            var item = options[i];
                            html += _t.optionTemplate({
                                value: item.value,
                                name: item.name,
                                selected: false,
                            });
                        };
                    } else {
                        for (var i = 0; i < options.length; i++) {
                            var item = options[i];
                            if (item.value == data.split(':')[0]) {
                                html += _t.optionTemplate({
                                    value: item.value,
                                    name: item.name,
                                    selected: true,
                                });
                            } else {
                                html += _t.optionTemplate({
                                    value: item.value,
                                    name: item.name,
                                    selected: false,
                                });
                            };
                        }
                    }
                    return html;
                },
                optionTemplate: function(data) {
                    return "<option value=" + data.value + " " + (data.selected ? "selected='selected'" : "") + ">" + data.name + "</option>"
                },
                stuffList: function(data) {
                    var Stuff = '<div id="Stufflist"><div class="stuff"><h3>从业人员管理</h3><button>添加</button></div>';
                    Stuff += '<ul class="stufflist">';
                    Stuff += '</ul></div>';
                    Stuff = $(Stuff);
                    for (var i = 0; i < data.length; i++) {
                        var item = '';
                        item += '<li>';
                        item += '<p>姓名：<span class="stuffname">' + data[i]['ds_employee-ds_name'] + '</span></p>';
                        item += '<a class="cekstuff deletemes">查看</a>';
                        item += '<a class="delstuff">删除</a>';
                        item += '</li>';
                        item = $(item);
                        _f.bindClickFun(item, data[i]);
                        Stuff.find('ul').append(item);
                    }
                    Stuff.find('button').unbind().bind('click', function() {
                        _f.addStuffInfo();
                    });
                    return Stuff;
                },
                dialogTemplate: function(data, options) {

                    var messlist = '<div class="messlist">'
                    messlist += '<ul class="mlist">'
                    messlist += '<li>'
                    messlist += '<i>*</i><p>姓名：</p>'
                    messlist += '<input type="text" class="name personname" value="' + (data['ds_employee-ds_name'] ? data['ds_employee-ds_name'] : '') + '"  style="border : 1px solid #ccc;width: 140px;float: right;" />'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<p>曾用名：</p>'
                    messlist += '<input type="text" class="oldname" value="' + (data['ds_employee-ds_oldname'] ? data['ds_employee-ds_oldname'] : '') + '" style="border : 1px solid #ccc;width: 140px;float: right;" />'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<i>*</i><p>身份证号：</p>'
                    messlist += '<input type="text"  class="id" readonly="readonly" value="' + (data['ds_employee-ds_id'] ? data['ds_employee-ds_id'] : '') + '" style="border : 1px solid #ccc;width: 140px;float: right;font-size: 10px;" />'
                    messlist += '</li>'

                    messlist += '<li>'
                    messlist += '<p>文化程度：</p>'
                    messlist += '<select class="ds_education">' + _t.options(data['ds_employee-ds_education'], options[1]) + '</select>'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<p>民族：</p>'
                    messlist += '<select class="ds_nation">' + _t.options(data['ds_employee-ds_nation'], options[0]) + '</select>'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<p>婚姻状况：</p>'
                    messlist += '<select class="ds_marriage">' + _t.options(data['ds_employee-ds_marriage'], options[2]) + '</select>'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<p>户口类别：</p>'
                    messlist += '<select class="ds_familyregister">' + _t.options(data['ds_employee-ds_account'], options[4]) + '</select>'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<p>血型：</p>'
                    messlist += '<select class="ds_bloodtype">' + _t.options(data['ds_employee-ds_bloodtype'], options[3]) + '</select>'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<p>手机号1：</p>'
                    messlist += '<input type="text" class="phone" value="' + (data['ds_employee-ds_phone'] ? data['ds_employee-ds_phone'] : '') + '" style="border : 1px solid #ccc;width: 140px;float: right;" />'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<p>手机号2：</p>'
                    messlist += '<input type="text" class="phone2" value="' + (data['ds_employee-ds_phone2'] ? data['ds_employee-ds_phone2'] : '') + '" style="border : 1px solid #ccc;width: 140px;float: right;" />'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<p>QQ号：</p>'
                    messlist += '<input type="text" class="qq" value="' + (data['ds_employee-ds_qq'] ? data['ds_employee-ds_qq'] : '') + '" style="border : 1px solid #ccc;width: 140px;float: right;" />'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<p>微信号：</p>'
                    messlist += '<input type="text" class="wechat" value="' + (data['ds_employee-ds_wechat'] ? data['ds_employee-ds_wechat'] : '') + '" style="border : 1px solid #ccc;width: 140px;float: right;" />'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<p>固定电话：</p>'
                    messlist += '<input type="text" class="telephone" value="' + (data['ds_employee-ds_telephone'] ? data['ds_employee-ds_telephone'] : '') + '" style="border : 1px solid #ccc;width: 140px;float: right;" />'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<p>身高：</p>'
                    messlist += '<input type="text" class="height" value="' + (data['ds_employee-ds_height'] ? data['ds_employee-ds_height'] : '') + '" style="border : 1px solid #ccc;width: 140px;float: right;" />	'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<i>*</i><p>职务：</p>'
                    messlist += '<input type="text" class="duty" value="' + (data['ds_position'] ? data['ds_position'] : '') + '" style="border : 1px solid #ccc;width: 140px;float: right;" />'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<p>现居住地：</p>'
                    messlist += '<input type="text" class="address" value="' + (data['ds_employee-ds_address'] ? data['ds_employee-ds_address'] : '') + '" style="border : 1px solid #ccc;width: 140px;float: right;" />'
                    messlist += '</li>'
                    messlist += '<li class="lastmesslist">'
                    messlist += '<p style="width: 120px">身份证正面照片：</p>'
                    messlist += '<input type="text"  class="idaheadpic" placeholder="" value="" style="border : 1px solid #ccc;width:289px;float: left;border: 1px solid #a9a9a9!important; height: 20px;border-right: none!important;" readonly="readonly"/>'
                    messlist += '<button id="updatebtn"></button>'
                    messlist += '<button id="checkbtn"></button>'
                    messlist += '	<form id="IdCardA" action="/uploadFiles.ashx?Action=formUpload" method="post" enctype="multipart/form-data">';
                    messlist += '		<input style="position:absolute; opacity:0; filter:alpha(opacity=0); top:0px; right:37px; overflow:hidden;width:36px; height:20px;" type="file" id="fileUpDataElement" data-id="' + (data['ds_employee-ds_idaheadpic'] ? data['ds_employee-ds_idaheadpic'] : '\"none\"') + '" data-name="物品照片.jpeg" class="fileButtom" name="document" />'; //onchange="publicStuff.getImage()"
                    messlist += '		<input style="display:none;" type="submit" class="submit" value="提交表单" />';
                    messlist += '		<input type="hidden" class="fileName "name="fileName" style="display: none;" />';
                    messlist += '	</form>';
                    messlist += '</li>'
                    messlist += '</ul>'
                    messlist += '</div>';
                    messlist = $(messlist);
                    /*上传照片----上传缓存*/
                    var fileid = messlist.find('[data-id]').attr('data-id');
                    messlist.find('#updatebtn').click(function() {
                        if (fileid) {
                            _a.downloadImg(fileid);
                        } else {
                            common.alert({
                                text: '未找到图片！'
                            });
                        }
                    });
                    if (data['ds_employee-ds_idaheadpic']) {
                        messlist.find('.idaheadpic').val('身份证正面照片.jpg');
                    };
                    messlist.find('#checkbtn').bind('click', function() {
                        $('.fileButtom').click();
                    });
                    messlist.find('.fileButtom').change(function() {

                        try {
                            messlist.find('.idaheadpic').val($(this).val());
                        } catch (err) {
                            var text = $(this).val().split('\\');
                            text = text[text.length - 1];
                            messlist.find('.idaheadpic').val(text);
                        };
                    });
                    return messlist;
                },
                creatdialogTemplate: function(data, options) {
                    var messlist = '<div class="messlist">'
                    messlist += '<ul class="mlist">'
                    messlist += '<li>'
                    messlist += '<i>*</i><p>姓名：</p>'
                    messlist += '<input type="text" class="name personname" value=""  style="border : 1px solid #ccc;width: 140px;float: right;" />'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<p>曾用名：</p>'
                    messlist += '<input type="text" class="oldname" value="" style="border : 1px solid #ccc;width: 140px;float: right;" />'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<i>*</i><p>身份证号：</p>'
                    messlist += '<input type="text"  class="id" value="" style="border : 1px solid #ccc;width: 140px;float: right;font-size: 10px;" />'
                    messlist += '</li>'

                    messlist += '<li>'
                    messlist += '<p>文化程度：</p>'
                    messlist += '<select class="ds_education">' + _t.options(data['ds_employee-ds_education'], options[1]) + '</select>'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<p>民族：</p>'
                    messlist += '<select class="ds_nation">' + _t.options(data['ds_employee-ds_nation'], options[0]) + '</select>'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<p>婚姻状况：</p>'
                    messlist += '<select class="ds_marriage">' + _t.options(data['ds_employee-ds_marriage'], options[2]) + '</select>'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<p>户口类别：</p>'
                    messlist += '<select class="ds_familyregister">' + _t.options(data['ds_employee-ds_account'], options[4]) + '</select>'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<p>血型：</p>'
                    messlist += '<select class="ds_bloodtype">' + _t.options(data['ds_employee-ds_bloodtype'], options[3]) + '</select>'
                    messlist += '</li>'

                    messlist += '<li>'
                    messlist += '<p>手机号1：</p>'
                    messlist += '<input type="text" class="phone" value="" style="border : 1px solid #ccc;width: 140px;float: right;" />'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<p>手机号2：</p>'
                    messlist += '<input type="text" class="phone2" value="" style="border : 1px solid #ccc;width: 140px;float: right;" />'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<p>QQ号：</p>'
                    messlist += '<input type="text" class="qq" value="" style="border : 1px solid #ccc;width: 140px;float: right;" />'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<p>微信号：</p>'
                    messlist += '<input type="text" class="wechat" value="" style="border : 1px solid #ccc;width: 140px;float: right;" />'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<p>固定电话：</p>'
                    messlist += '<input type="text" class="telephone" value="" style="border : 1px solid #ccc;width: 140px;float: right;" />'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<p>身高：</p>'
                    messlist += '<input type="text" class="height" value="" style="border : 1px solid #ccc;width: 140px;float: right;" />	'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<i>*</i><p>职务：</p>'
                    messlist += '<input type="text" class="duty" value="" style="border : 1px solid #ccc;width: 140px;float: right;" />'
                    messlist += '</li>'
                    messlist += '<li>'
                    messlist += '<p>现居住地：</p>'
                    messlist += '<input type="text" class="address" value="" style="border : 1px solid #ccc;width: 140px;float: right;" />'
                    messlist += '</li>'
                    messlist += '<li class="lastmesslist">'
                    messlist += '<p style="width: 120px">身份证正面照片：</p>'
                    messlist += '<input type="text"  class="idaheadpic" placeholder="请上传身份证照片" value="" style="border : 1px solid #ccc;width:289px;float: left;border: 1px solid #a9a9a9!important; height: 20px;border-right: none!important;" readonly="readonly"/>'
                    messlist += '<button id="updatebtn"></button>'
                    messlist += '<button id="checkbtn"></button>'
                    messlist += '	<form id="IdCardA" action="/uploadFiles.ashx?Action=formUpload" method="post" enctype="multipart/form-data">';
                    messlist += '		<input type="file" style="position:absolute; opacity:0; filter:alpha(opacity=0); top:0px; right:37px; overflow:hidden;width:36px; height:20px;" id="fileUpDataElement" data-id="' + (data['ds_employee-ds_idaheadpic'] ? data['ds_employee-ds_idaheadpic'] : '\"none\"') + '" data-name="物品照片.jpeg" class="fileButtom" name="document"/>';
                    messlist += '		<input style="display:none;" type="submit" class="submit" value="提交表单" />';
                    messlist += '		<input type="hidden" class="fileName "name="fileName" style="display: none;" />';
                    messlist += '	</form>';
                    messlist += '</li>'
                    messlist += '</ul>'
                    messlist += '</div>';
                    messlist = $(messlist);
                    var fileid = messlist.find('[data-id]').attr('data-id');
                    messlist.find('#updatebtn').click(function() {
                        if (fileid) {
                            _a.downloadImg(fileid);
                        } else {
                            common.alert({
                                text: '未找到图片！'
                            });
                        }
                    });
                    messlist.find('#checkbtn').bind('click', function() {
                        $('.fileButtom').click();
                        if (data['ds_idaheadpic']) {
                            messlist.find('.idaheadpic').val('身份证正面照片.jpg');
                        };
                    });
                    messlist.find('.fileButtom').change(function() {

                        try {
                            messlist.find('.idaheadpic').val($(this).val());
                        } catch (err) {
                            var text = $(this).val().split('\\');
                            text = text[text.length - 1];
                            messlist.find('.idaheadpic').val(text);
                        };
                    });
                    return messlist;
                },
            },
            _a = {
                /*获取从业人员列表*/
                get: function(success) {
                    _C.GET({
                        url: "/crm/Entities?$expand=attributes("+
                        "$filter=name eq 'ds_employee-ds_name'"+ 
                        "or name eq 'ds_employee-ds_personid'"+  
                        "or name eq 'ds_publicorder_employeeid'"+
                        "or name eq 'ds_position'"+
                        "),lookups&$filter=name eq 'ds_publicorder_employee' and query eq 'ds_publicorder_ref eq " + _v.message.id + "' and orderby eq '"+
                        "createdon/desc'",
                        success: function(result) {
                            var value = _C.formatting.CRMList(result.value);
                            success(value);
                        }
                    });
                },
                /*获取指定从业人员信息*/
                getPublicStuffInitList: function(id, success) {
                    common.GET({
                        url: "/crm/Entities?$expand=attributes($filter=name eq 'ds_employee-ds_name' or name eq 'ds_employee-ds_id'  or name eq 'ds_position'  or name eq 'ds_employee-ds_account' or name eq 'ds_employee-ds_address'or name eq 'ds_employee-ds_birth'or name eq 'ds_employee-ds_bloodtype'or name eq 'ds_employee-ds_education'or name eq 'ds_employee-ds_gender'or name eq 'ds_employee-ds_height'or name eq 'ds_employee-ds_idaheadpic'or name eq 'ds_employee-ds_idbackpic'or name eq 'ds_employee-ds_livestatus'or name eq 'ds_employee-ds_marriage'or name eq 'ds_employee-ds_nation' or name eq 'ds_employee-ds_nativeplace' or name eq 'ds_employee-ds_oldname'or name eq 'ds_employee-ds_personid'or name eq 'ds_employee-ds_phone'or name eq 'ds_employee-ds_phone2'or name eq 'ds_employee-ds_politics'or name eq 'ds_employee-ds_qq'or name eq 'ds_employee-ds_telephone'or name eq 'ds_employee-ds_wechat' or name eq 'ds_employee-ds_placeaddress'),lookups&$filter=name eq 'ds_publicorder_employee' and query eq 'ds_publicorder_employeeid eq " + id + "'",
                        success: function(result) {
                            var _d = _C.formatting.CRMValue(result.value);
                            success(_d);
                        }
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
                        data.error('上传文件信息未');
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
                /*删除指定人员信息*/
                delPublicStuffInfo: function(id, success) {
                    common.DELETE({
                        url: "/crm/Entities('ds_publicorder_employee" + id + "')",
                        success: function() {
                            _f.init();
                        }
                    });
                },
                /*修改从业人员信息-2修改人员信息*/
                putPublicStuffInfo: function(data, id, success) {
                    common.PUT({
                        data: data, 
                        url: "/crm/Entities('ds_person" + id + "')",
                        success: function(result) {
                            success(result);
                        }
                    })
                },
                /*修改从业人员-1修改职务*/
                putPublicStuffPosition: function(data, id, success) {
                    common.PUT({
                        data: data,
                        url: "/crm/Entities('ds_publicorder_employee" + id + "')",
                        success: function(result) {
                            success();
                        }
                    });
                },
                /*新增行业人员-2创建人员关联*/
                createPublicStuffEntities: function(data, success) {
                    common.POST({
                        data: data,
                        url: "/crm/Entities",
                        success: function(result) {
                            success(result);
                        }
                    });
                },
                /*新增从业人员-1更新人员信息*/
                createPublicStuffEntities1: function(id, data, success) {
                    _C.PUT({
                        data: data,
                        url: "/crm/Entities('ds_person" + id + "')",
                        success: function(result) {
                            success(result);
                        }
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
            };
        return {
            init: _f.init,
            getImage: _a.getImage,
        };
    })();
})(jQuery, common, window);