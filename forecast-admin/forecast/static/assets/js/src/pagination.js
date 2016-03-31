
/**
 *Initializes list.js
 **/

var opportunitiesPerPage = 10;

var paginationBottomOptions = {
  name: 'paginationBottom',
  paginationClass: 'pagination-bottom',
  innerWindow: 2,
  outerWinder: 1
};

var listOptions = {
  valueNames: [
    'agency',
    'award_status',
    'place_of_performance_state',
    'naics',
    'award_amount',
    'estimated_fiscal_year_quarter',
    'description',
    'funding_agency',
    'estimated_fiscal_year',
    'place_of_performance_city',
    'contract_type',
    'office',
    'dollar_value_min',
    'dollar_value_max',
    'socioeconomic'
  ],
  page: opportunitiesPerPage,
  plugins: [
    ListPagination(paginationBottomOptions)
  ]
};

var listObj = new List('opportunities', listOptions);

var data = {};
var queries = {};
var urlStem = "api/opportunities/?format=csv";

/**
 *Initializes the More/Fewer Filters
 **/
$("#more-filters").hide();
$("#toggle-filters").on('click', function(e) {
    var filters = $("#more-filters");
    if (filters.is(":visible")) {
        filters.hide();
        $("#toggle-filters").text("More Filters");
    } else {
        filters.show();
        $("#toggle-filters").text("Fewer Filters");
    }
});

// A function to check whether an item matches any active filters
var filterCheck = function (item, queries) {
  shouldReturn = true;
  _.each(_.keys(queries), function (key) {
    if (key === 'description') {
      if (item.values()[key].search(new RegExp(queries[key], "i")) < 0) {
        shouldReturn = false;
        return shouldReturn;
      }
    } else if (key === 'dollar_value_min') {
      var value = item.values()[key].replace('$','').replace(',','');
      if (parseInt(value) < parseInt(queries[key])) {
        shouldReturn = false;
        return shouldReturn;
      }
    } else if (key === 'dollar_value_max') {
      var value = item.values()[key].replace('$','').replace(',','');
      if (parseInt(value) > parseInt(queries[key])) {
        shouldReturn = false;
        return shouldReturn;
      }
    } else {
      if (item.values()[key] != queries[key]) {
        shouldReturn = false;
        return shouldReturn;
      }
    }
  });
  return shouldReturn;
};

$(document).ready(function() {

  // Update current page (.opportunity-pagination_status)
  $paginationStatus = $('.opportunity-pagination_status');

  var renderPageStatus = function renderPageStatus() {
    if (listObj.matchingItems.length) {
      var pageLimit = listObj.i + opportunitiesPerPage - 1,
        totalOpportunities = listObj.matchingItems.length;

      var lastOpportunity = (pageLimit > totalOpportunities)
        ? totalOpportunities
        : pageLimit;

      var currentOpportunities = listObj.i + ' – ' + lastOpportunity;

      var opportunitiesText = (totalOpportunities === 1)
        ? ' opportunity'
        : ' opportunities';
      var status = currentOpportunities + ' of ' + totalOpportunities + opportunitiesText;
      $paginationStatus.text(status);
    } else {
      $paginationStatus.text('No opportunities found.');
    }
  }

  });

  // Search within list of opportunities
  $(".search").keyup(function () {
    urlQuery = "";
    if ($(this).val().length > 0) {
      queries.description = $(this).val();
    } else {
      queries = _.omit(queries, "description");
    }
    _.each(_.keys(queries), function(key) {
      urlQuery += "&"+key+"="+queries[key];
    });
    $(".button-download_wrapper a").attr("href",urlStem+urlQuery);
    listObj.filter(function(item) {
      return (filterCheck(item, queries));
    });

    renderPageStatus();
  });

  // // Search within list of opportunities
  $(".search").keyup(function () {
    listObj.search($(this).val());
    renderPageStatus();
  });


  // Disable search while it doesn't actually query the DB
  $(".search").keypress(function (event) {
    if (event.which == '13') {
      event.preventDefault();
    }
    renderPageStatus();
  });

  $("#dollar-value-min").keyup(function (event) {
    var value = $(this).val();
    urlQuery = "";
    // queries = _.omit(queries, name);
    queries.dollar_value_min = value;
    _.each(_.keys(queries), function(key) {
      urlQuery += "&"+key+"="+queries[key];
    });
    $(".button-download_wrapper a").attr("href",urlStem+urlQuery);
    listObj.filter(function(item) {
      return (filterCheck(item, queries));
    });
  });

  $("#dollar-value-max").keyup(function (event) {
    var value = $(this).val();
    urlQuery = "";
    // queries = _.omit(queries, name);
    queries.dollar_value_max = value;
    _.each(_.keys(queries), function(key) {
      urlQuery += "&"+key+"="+queries[key];
    });
    $(".button-download_wrapper a").attr("href",urlStem+urlQuery);
    listObj.filter(function(item) {
      return (filterCheck(item, queries));
    });
  });

  renderPageStatus();

  // listen for list to update
  listObj.on('updated', function() {
    renderPageStatus();
  });

});

