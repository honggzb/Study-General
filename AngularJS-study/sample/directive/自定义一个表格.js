var tableHelper = fucntion() {

    var linkFn = function (scope, element, attrs) {
        var headerCols = [], //表头列们
            tableStart = '<table>',
            tableEnd = '</table>',
            table = '',
            visibleProps = [], //可见列
            sortCol = null, //排序列
            sortDir = 1;

        //监视集合: 监视datasource的变化，一旦有变化，就重新加载表格
        scope.$watchCollection('datasource', render);
        //给表头th绑定事件
        wireEvents();

        //初始化表格
        function render() {
            if (scope.datasource && scope.datasource.length) {
                table += tableStart;
                table += renderHeader();
                table += renderRows() + tableEnd;
                //加载统计行
                renderTable();
            }
        }
        //给th添加click事件
        function wireEvents() {
            element.on('click', function (event) {
                if (event.srcElement.nodeName === 'TH') {
                    //获取列的名称
                    var val = event.srcElement.innerHTML;
                    //根据列的别名获取原始列名
                    var col = (scope.columnmap) ? getRawColumnName(val) : val;
                    if (col) {
                        //对该列进行排序
                        sort(col);
                    }
                }
            });
        }
        //给某列排序
        function sort(col) {
            if (sortCol === col) {
                sortDir = sortDir * -1;
            }
            sortCol = col;
            scope.datasource.sort(function (a, b) {
                if (a[col] > b[col]) return 1 * sortDir;
                if (a[col] < b[col]) return -1 * sortDir;
                return 0;
            });
            //重新加载表格
            render();
        }
        //加载头部
        function renderHeader() {
            var tr = '<tr>';
            for (var prop in scope.datasource[0]) {
                //{name: 'David',street: '1234 Anywhere St.',age: 25,url: 'index.html'}
                //根据原始列名获取别名,并考虑了是否显示列的情况
                var val = getColumnName(prop);
                if (val) {
                    //visibleProps存储的是原始列名
                    visibleProps.push(prop);
                    tr += '<th>' + val + '</th>';
                }
            }
            tr += '</tr>';
            tr = '<thead>' + tr '</thead>';
            return tr;
        }
        //加载行
        function renderRows() {
            var rows = '';
            for (var i = 0, len = scope.datasource.length; i < len; i++) {
                rows += '<tr>';
                var row = scope.datasource[i];
                for (var prop in row) {
                    //当前遍历的原始列名是否在visibleProps集合中，该集合存储的是原始列名
                    if (visibleProps.indexOf(prop) > -1) {
                        rows += '<td>' + row[prop] + '</td>';
                    }
                }
                rows += '</tr>';
            }
            rows = '<tbody>' + rows + '</tbody>';
            return rows;
        }
        //加载统计行
        function renderTable() {
            table += '<br /><div class="rowCount">' + scope.datasource.length + '行</div>';
            element.html(table);
            table = '';
        }
        //根据列的别名获取原始列名
        function getRawColumnName(friendlyCol) {
            var rawCol;
            //columnmap =[{name: 'Name'}, {street: 'Street'}, {age: 'Age'}, {url: 'URL', hidden: true}]
            scope.columnmap.forEach(function (colMap) {
                //{name: 'Name'}
                for (var prop in colMap) {
                    if (colMap[prop] === friendlyCol) {
                        rawCol = prop;
                        break;
                    }
                }
                return null;
            });
            return rawCol;
        }

        function pushColumns(rawCol, renamedCol) {
            visibleProps.push(rawCol);
            scope.columns.push(renamedCol);
        }
        //比如根据name属性，这里得到[{name: 'Name'}]
        //[{name: 'Name'}, {street: 'Street'}, {age: 'Age'}, {url: 'URL', hidden: true}]
        function filterColumnMap(prop) {
            var val = scope.columnmap.filter(function (map) {
                if (map[prop]) {
                    return true;
                }
                return false;
            });
            return val;
        }
        //根据原始列名获取列的别名，并考虑是否隐藏列的情况
        function getColumnName(prop) {
            if (!scope.columnmap) return prop;
            //得到[{name: 'Name'}]
            var val = filterColumnMap(prop);
            if (val && val.length && !val[0].hidden) return val[0][prop];
            else return null;
        }
    };

    return {
        restrict: 'E',
        scope: {
            columnmap: '=',
            datasource: '='
        },
        link: linkFn,
        template: '<div class="tableHelper"></div>'
    };

};

angular.module('directiveModule')
    .directive('tableHelper', tableHelper);
