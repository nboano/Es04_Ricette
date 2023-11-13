/*! DataTableS3 1.0.0
 * ©2023 Sistemi Tre srl
 */

/**
 * @summary     DataTableS3
 * @description Script per l'inizializzazione semplificata di DataTables.js
 * @version     1.0.0
 * @author      Sistemi Tre srl
 * @contact     www.sistemitre.it
 * @copyright   Sistemi Tre srl
 *
 * Documentazione: https://sistemitre.visualstudio.com/SistemiTre.Framework/_wiki/wikis/SistemiTre.Framework.wiki/110/Datatables
**/

var dataTableS3 = function () {
    var datatable;
    const initDatatable = (idTable, defaultLength, pagination, colOrder) => {
        datatable = $(idTable).DataTable({
            "order": colOrder ? colOrder : [[0, "asc"]],
            "lengthMenu": [[25, 50, 100, 200, -1], [25, 50, 100, 200, "Tutti"]],
            "iDisplayLength": defaultLength ? defaultLength : -1,
            "searching": true,
            "paging": pagination,
            "language": {
                "lengthMenu": datatables_lengthMenu,
                "zeroRecords": datatables_zeroRecords,
                "info": datatables_info,
                "infoEmpty": datatables_infoEmpty,
                "search": datatables_search,
                "paginate": {
                    "first": datatables_paginate_first,
                    "last": datatables_paginate_last,
                    "next": datatables_paginate_next,
                    "previous": datatables_paginate_previous
                },
                "infoFiltered": datatables_infoFiltered,
                "oAria": {
                    "sSortAscending": datatables_oAria_sSortAscending,
                    "sSortDescending": datatables_oAria_sSortDescending
                },
                "oPaginate": {
                    "sFirst": datatables_oPaginate_sFirst,
                    "sLast": datatables_oPaginate_sLast,
                    "sNext": datatables_oPaginate_sPrevious,
                    "sPrevious": datatables_oPaginate_sNext
                }
            }
        });
    }
    const handleSearchDatatable = (idSearch) => {
        const filterSearch = document.querySelector(idSearch);
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    }
    return {
        addSearch: function (idSearchInput, _dataTable) {
            // console.log(idTables, idSearchInput);
            datatable = _dataTable;
            handleSearchDatatable(idSearchInput);
        },
        /**
         * Inizializza datatables con le proprietà impostate e la ricerca
         * @param {string} idTables selector JS della table
         * @param {string} idSearchInput selector JS dell'input di ricerca
         * @param {int} defaultLength numero righe da visualizzare [25, 50, 100, 200, -1]
         * @param {bool} pagination abilita/disabilita la paginazione
         * @param {array} colOrder imposta la colonna di ordinamento
         * @returns oggetto datatables
         */
        init: function (idTables, idSearchInput = null, defaultLength = -1, pagination = false, colOrder = null) {
            // console.log(idTables, idSearchInput);
            initDatatable(idTables, defaultLength, pagination, colOrder);
            if (idSearchInput)
                handleSearchDatatable(idSearchInput);
            return datatable;
        }
    }
}();

