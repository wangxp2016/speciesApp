/**
 *  商品管理模块_商品添加
 */
angular.module('app')
    .controller('linkAddCtrl', ['$scope', '$rootScope', '$location', '$anchorScroll', '$http', 'G', '$state', function ($scope, $rootScope, $location, $anchorScroll, $http, G, $state) {
        $location.hash('main-content');
        $anchorScroll();

        // 添加链接
        $scope.linkAdd = function () {
            $('#linkAddId').ajaxForm({
                beforeSend: function () {
                    $scope.ADDlinkIF = true;
                },
                success: function (data) {
                    G.expire(data);
                    $scope.ADDlinkIF = false;
                    $('#alerts .modal-body').text(data.msg);
                    $('#alerts').modal('show');
                    if (data.i) {
                        // 跳转到列表
                        setTimeout(function () {
                            $state.go('link')
                        }, 500);
                    }
                }
            });
        };


    }]);