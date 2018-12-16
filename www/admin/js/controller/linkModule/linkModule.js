/**
 *  商品管理模块_商品查询
 */
angular.module('app')
    .controller('linkCtrl', ['$scope', '$rootScope', '$location', '$anchorScroll', '$http', 'G', function ($scope, $rootScope, $location, $anchorScroll, $http, G) {
        $location.hash('main-content');
        $anchorScroll();

        // 查询链接
        var page = G.paging.page,
            pagesize = G.paging.pagesize,
            link = null;

        (function queryNews(page, pagesize, link) {
            // 请求查询
            $http.get('/admin/link/linklist', {
                params: {
                    page: page,
                    pagesize: pagesize,
                    link: link
                }
            }).success(function (data) {
                G.expire(data);
                $scope.linkList = data;
                $scope.pagesize = pagesize;

                // 处理删除之后更新数据出现的页数与数据不匹配问题
                if (page > 1 && data.dataList.length === 0) {
                    queryNews(1, pagesize, sid, name);
                }
            });

            // 分页查询
            $scope.PagingAct = function (page, pagesize) {
                queryNews(page, pagesize, link);
            };

            // 条件查询
            $scope.filterCond = function (link) {
                var mark = false;
                if (link) {
                    link = link.trim();
                    queryNews(1, pagesize, link);
                    mark = true;
                }
            };

            // 删除链接
            $scope.linkDel = function (id) {
                $scope.del = function () {
                    $http.get('/admin/link/linkdel', {
                        params: {
                            id: id
                        }
                    }).success(function (data) {
                        G.expire(data);
                        // 提交删除
                        $('.confirms').modal('hide');
                        $('#alerts .modal-body').text(data.msg);
                        $('#alerts').modal('show');
                        if (data.i) {
                            // 更新数据
                            queryNews(page, pagesize, link);
                        }

                    });
                }
            };

        })(page, pagesize, link);

    }]);