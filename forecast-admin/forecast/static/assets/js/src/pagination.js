$(function(){
  /**
   *Initializes list.js
   **/
  var paginationTopOptions = {
    name: 'paginationTop',
    paginationClass: 'pagination-top',
    innerWindow: 2,
    outerWinder: 1
  }
  var paginationBottomOptions = {
    name: 'paginationBottom',
    paginationClass: 'pagination-bottom',
    innerWindow: 5,
    outerWinder: 1
  }
  var listOptions = {
    valueNames: [
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
      'office'
    ]
    , page: 10
    , plugins: [
      ListPagination(paginationTopOptions),
      ListPagination(paginationBottomOptions)]

  };
  var listObj = new List('opportunities', listOptions)
  var data = {}

  /**
   *Initializes the More/Fewer Filters
   **/
  $("#award_amount-dropdown").parent().toggle();
  $("#estimated_fiscal_year_quarter-dropdown").parent().toggle();
  $("#more-filters").on('click', function(e){
    $("#more-filters").text("Fewer Filters");
    $("#award_amount-dropdown").parent().toggle();
    $("#estimated_fiscal_year_quarter-dropdown").parent().toggle();
  });

  /**
   * Load the Data into the Filters
   **/
  _.each(listOptions.valueNames, function (name) {

    // Create an array for each filterable element
    data[name] = [];
    $('.'+name).each( function (index) {
      data[name].push($(this).text());
    });

    // Find unique values and add them as options in dropdowns
    var opt = _.uniq(data[name]);
    $.each(opt, function(key, value) {
      $('#' + name + '-dropdown')
        .append($("<option></option>")
        .attr("value",value)
        .text(value));
    });

    // Add the filtering action to each dropdown
    var dropdown = "#" + name + "-dropdown";
    $(dropdown).change(function (){
      listObj.filter(function(item) {
        var value = $(dropdown).val();
        if (value === "all") {
          return true;
        }
        else {
          return (item.values()[name] === value ? true : false);
        }
      });
    });
  })

  $(document).ready(function () {
    // Search within list of opportunities
    $(".search").keyup(function () {
      listObj.search($(this).val());
    });

    // Disable search while it doesn't actually query the DB
    $(".search").keypress(function (event) {
      if (event.which == '13') {
        event.preventDefault();
      }
    });
  });

});
