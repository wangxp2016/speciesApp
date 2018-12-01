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
                console.log("data.fileList", data.fileList);
                $scope.fileList = data.fileList;
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
                // 地理分布图片展示
                $scope.removedistributionPic = function (path) {
                    console.log("删除地理分布图片展示");
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

                // 形态图展示
                $scope.removemorphologyPic = function (path) {
                    console.log("删除形态图展示");
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
                                $scope.Tip = function () {
                                    // 跳转到列表
                                    setTimeout(function () {
                                        $state.go('species')
                                    }, 500);
                                }
                            }
                        }
                    });
                };

            });
        })();

    }]);