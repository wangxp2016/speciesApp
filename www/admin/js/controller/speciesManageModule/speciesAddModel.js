/**
 *  商品管理模块_商品添加
 */
angular.module('app')
    .controller('speciesAddCtrl', ['$scope', '$rootScope', '$location', '$anchorScroll', '$http', 'G', '$state', function ($scope, $rootScope, $location, $anchorScroll, $http, G, $state) {
        $location.hash('main-content');
        $anchorScroll();

        $scope.literatureList = [{
            'id': '',
            'name': ''
        }];

        $scope.addItem = function () {
            $scope.literatureList.push({
                'id': '',
                'name': ''
            })
        }
        $scope.deleteItem = function (index) {
            $scope.literatureList.splice(index,1)
        }

        // 添加物种
        $scope.speciesAdd = function () {
            $('#speciesAddId').ajaxForm({
                beforeSend: function () {
                    $scope.ADDspeciesIF = true;
                },
                success: function (data) {
                    G.expire(data);
                    $scope.ADDspeciesIF = false;
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


    }]);