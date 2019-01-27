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
            $scope.literatureList.splice(index, 1)
        }
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
        // 富文本编辑器配置
        CKEDITOR.replace('contentA', {
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
        // 富文本编辑器配置
        CKEDITOR.replace('contentB', {
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
                        // 跳转到列表
                        setTimeout(function () {
                            $state.go('species')
                        }, 500);
                    }
                }
            });
        };


    }]);