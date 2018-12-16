/**
 *  商品管理模块_商品查询
 */
angular.module('app')
    .controller('speciesCtrl', ['$scope', '$rootScope', '$location', '$anchorScroll', '$http', 'G', function ($scope, $rootScope, $location, $anchorScroll, $http, G) {
        $location.hash('main-content');
        $anchorScroll();

        // 查询物种
        var page = G.paging.page,
            pagesize = G.paging.pagesize,
            species = null;

        (function queryNews(page, pagesize, species) {
            // 请求查询
            $http.get('/admin/species/specieslist', {
                params: {
                    page: page,
                    pagesize: pagesize,
                    species: species
                }
            }).success(function (data) {
                G.expire(data);
                $scope.speciesList = data;
                $scope.pagesize = pagesize;

                // 处理删除之后更新数据出现的页数与数据不匹配问题
                if (page > 1 && data.dataList.length === 0) {
                    queryNews(1, pagesize, sid, name);
                }
            });

            // 分页查询
            $scope.PagingAct = function (page, pagesize) {
                queryNews(page, pagesize, species);
            };

            // 条件查询
            $scope.filterCond = function (species) {
                var mark = false;
                if (species) {
                    species = species.trim();
                    queryNews(1, pagesize, species);
                    mark = true;
                }
                // 重置查询
                $scope.resetFilter = function () {
                    if (mark) {
                        mark = false;
                        // 清除视图
                        var selects = $('#genreBox .select2-selection__rendered');
                        selects.text('全部物种');
                        selects.attr('title', '全部物种');
                        // 数据清除
                        $scope.species = undefined;
                        // 查询
                        queryNews(1, pagesize);
                    }
                }
            };

            // 删除物种
            $scope.speciesDel = function (id) {
                $scope.del = function () {
                    $http.get('/admin/species/speciesdel', {
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
                            queryNews(page, pagesize, species);
                        }

                    });
                }
            };

        })(page, pagesize, species);

    }]);