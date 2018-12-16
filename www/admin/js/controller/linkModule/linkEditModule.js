/**
 *  新闻模块_新闻添加
 */
angular.module('app')
    .controller('linkEditCtrl', ['$scope', '$rootScope', '$location', '$anchorScroll', '$http', 'G', '$state', '$stateParams', function ($scope, $rootScope, $location, $anchorScroll, $http, G, $state, $stateParams) {
        $location.hash('main-content');
        $anchorScroll();

        $scope.unique = $stateParams.id;
        // 物种详情
        (function msgInit() {
            $http.get('/admin/link/linkonly', {
                params: {
                    id: $stateParams.id
                }
            }).success(function (data) {
                G.expire(data);
                $scope.link = data;
                $scope.link_img = $scope.link.images;
                $scope.type = $scope.link.type;
                $scope.removelinkPic = function (path) {
                    $scope.del = function () {
                        $http.get('/admin/link/linkPicDel', {
                            params: {
                                id: $stateParams.id,
                                path: path
                            }
                        }).success(function (data) {
                            $('.confirms').modal('hide');
                            $('#alerts .modal-body').text(data.msg);
                            $('#alerts').modal('show');
                            if (data.i) {
                                // 更新数据
                                setTimeout(function () {
                                    location.reload()
                                }, 500)
                            }
                        });
                    };
                };


                // 修改物种
                $scope.linkEdit = function () {
                    $('#linkEditId').ajaxForm({
                        beforeSend: function () {
                            $scope.EDITlinkIF = true;
                        },
                        success: function (data) {
                            G.expire(data);
                            $scope.EDITlinkIF = false;
                            $('#alerts .modal-body').text(data.msg);
                            $('#alerts').modal('show');
                            if (data.i) {
                                setTimeout(function () {
                                    $state.go('link')
                                }, 500);
                            }
                        }
                    });
                };

            });
        })();

    }]);