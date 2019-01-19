/**
 *  新闻模块_新闻添加
 */
angular.module('app')
    .controller('speciesEditCtrl', ['$scope', '$rootScope', '$location', '$anchorScroll', '$http', 'G', '$state', '$stateParams', function ($scope, $rootScope, $location, $anchorScroll, $http, G, $state, $stateParams) {
        $location.hash('main-content');
        $anchorScroll();

        $scope.unique = $stateParams.id;

        // 物种详情
        (function msgInit() {
            $http.get('/admin/species/speciesonly', {
                params: {
                    id: $stateParams.id
                }
            }).success(function (data) {
                G.expire(data);
                $scope.species = data;
                // 富文本编辑器配置
                CKEDITOR.replace('content', {
                    toolbar: [
                        ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'],
                        ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent'],
                        ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
                        ['Link', 'Unlink', 'Anchor'],
                        ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak'],
                        '/',
                        ['Styles', 'Format', 'Font', 'FontSize'],
                        ['TextColor', 'BGColor'],
                        ['Maximize', 'ShowBlocks', '-']
                    ],
                    height: 250,
                    removePlugins: 'elementspath' // 移除编辑器底部状态栏显示的元素路径和调整编辑器大小的按钮 elementspath,resize
                    // removeDialogTabs: '/uploads', // 配置图片上传路径
                    // filebrowserImageUploadUrl: '/uploads?type=images'
                });

                var literatures = data.literature.split("||");
                $scope.literatureList = [];
                for (let i in literatures) {
                    $scope.literatureList.push({
                        id: i,
                        name: literatures[i]
                    })
                }
                $scope.addItem = function () {
                    $scope.literatureList.push({
                        id: '',
                        name: ''
                    })
                };
                $scope.deleteItem = function (index) {
                    $scope.literatureList.splice(index, 1)
                };
                // 生境型图片展示
                $scope.habitat_img = $scope.species.habitat_img;
                if ($scope.habitat_img) {
                    $scope.habitat_img = $scope.habitat_img.split(',');
                }
                // 地理分布图片展示
                $scope.distribution_img = $scope.species.distribution_img;
                if ($scope.distribution_img) {
                    $scope.distribution_img = $scope.distribution_img.split(',');
                }
                // 形态图展示
                $scope.morphology_img = $scope.species.morphology_img;
                if ($scope.morphology_img) {
                    $scope.morphology_img = $scope.morphology_img.split(',');
                }
                // 删除生境型图片
                $scope.removehabitatPic = function (path) {
                    $scope.del = function () {
                        $http.get('/admin/species/habitatPicDel', {
                            params: {
                                id: $stateParams.id,
                                path: path
                            }
                        }).success(function (data) {
                            $('.confirms').modal('hide');
                            $('#alerts .modal-body').text(data.msg);
                            $('#alerts').modal('show');
                            if (data.i) {
                                $scope.Tip = function () {
                                    // 更新数据
                                    setTimeout(function () {
                                        location.reload()
                                    }, 500)
                                }
                            }
                        });
                    };
                };
                // 删除地理分布图片
                $scope.removedistributionPic = function (path) {
                    $scope.del = function () {
                        $http.get('/admin/species/distributionPicDel', {
                            params: {
                                id: $stateParams.id,
                                path: path
                            }
                        }).success(function (data) {
                            $('.confirms').modal('hide');
                            $('#alerts .modal-body').text(data.msg);
                            $('#alerts').modal('show');
                            if (data.i) {
                                $scope.Tip = function () {
                                    // 更新数据
                                    setTimeout(function () {
                                        location.reload()
                                    }, 500)
                                }
                            }
                        });
                    };
                };

                // 删除形态图
                $scope.removemorphologyPic = function (path) {
                    $scope.del = function () {
                        $http.get('/admin/species/morphologyPicDel', {
                            params: {
                                id: $stateParams.id,
                                path: path
                            }
                        }).success(function (data) {
                            $('.confirms').modal('hide');
                            $('#alerts .modal-body').text(data.msg);
                            $('#alerts').modal('show');
                            if (data.i) {
                                $scope.Tip = function () {
                                    // 更新数据
                                    setTimeout(function () {
                                        location.reload()
                                    }, 500)
                                }
                            }
                        });
                    };
                };

                // 修改物种
                $scope.speciesEdit = function () {
                    $('#speciesEditId').ajaxForm({
                        beforeSend: function () {
                            $scope.EDITspeciesIF = true;
                        },
                        success: function (data) {
                            G.expire(data);
                            $scope.EDITspeciesIF = false;
                            $('#alerts .modal-body').text(data.msg);
                            $('#alerts').modal('show');
                            if (data.i) {
                                // 跳转到列表
                                setTimeout(function () {
                                    $state.go('species')
                                }, 500);
                            }
                        }
                    });
                };

            });
        })();

    }]);