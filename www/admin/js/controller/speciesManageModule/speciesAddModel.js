/**
 *  商品管理模块_商品添加
 */
angular.module('app')
    .controller('speciesAddCtrl',['$scope','$rootScope','$location','$anchorScroll','$http','G','$state',function($scope,$rootScope,$location,$anchorScroll,$http,G,$state){
        $location.hash('main-content');
        $anchorScroll();

        // 产品图片上传

        // 添加商品
        $scope.speciesAdd=function(){
            $('#speciesAddId').ajaxForm({
                beforeSend:function(){
                    $scope.ADDspeciesIF = true;
                },
                success:function(data){
                    G.expire(data);
                    $scope.ADDspeciesIF = false;
                    $('#alerts .modal-body').text(data.msg);
                    $('#alerts').modal('show');
                    if(data.i){
                        $scope.Tip = function(){
                            // 跳转到列表
                            setTimeout(function(){
                                $state.go('species')
                            },500);
                        }
                    }
                }
            });
        };


    }]);
