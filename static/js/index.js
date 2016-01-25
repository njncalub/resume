(function () {

var jqueryNoConflict = jQuery;
var currentTheme = 'default';
var templateDir = './static/templates/'+currentTheme+'/';

jqueryNoConflict(document).ready(function () {
  registerHelpers();
  retriveData();
  registerEvents();
});

function hbsDebug (optionalValue) {
  console.log('Current Context');
  console.log('====================');
  console.log(this);
}

function hbsJoin (array, sep, options) {
  if (array)
    return array.map(function(item) {
      return options.fn(item);
    }).join(sep);
}

function hbsBuildDateRange (_meta, enc) {
  var s = '';
  
  if (!(typeof(enc) == 'string' && enc.length == 2)) {
    enc = null;
  }
  
  if (_meta.dateEnded != null) {
    s = _meta.dateStarted + '&ndash;' + _meta.dateEnded;
  } else {
    s = _meta.dateStarted;
  }
  
  if (s) {
    if (enc != null)
      return enc[0] + '<span class="date-range">' + s + '</span>' + enc[1];
    else
      return '<span class="date-range">' + s + '</span>';
  } else {
    return '';
  }
}

function hbsBuildPosition (_meta) {
  if (_meta.position && _meta.department)
    return _meta.position + ', ' + _meta.department;
  else
    return _meta.position;
}

function hbsBuildSubtitle (_meta, ignore) {
  if (!(typeof(ignore) == 'object' && ignore.length > 0)) {
    ignore = [];
  }
  
  var array = [];
  if (_meta.position && ignore.indexOf('position') != 0)
    array.push(hbsBuildPosition(_meta));
  if (_meta.dateStarted && ignore.indexOf('date') != 0)
    array.push(hbsBuildDateRange(_meta));
  if (_meta.address && ignore.indexOf('address') != 0)
    array.push(_meta.address);
  if (_meta.technologies && ignore.indexOf('technologies') != 0)
    array.push('Technologies used: ' + _meta.technologies.join(", "));
  
  return array.join(" | ");
}

function retriveData () {
  var dataSource = '../../data.json';
  jqueryNoConflict.getJSON(dataSource, renderThemeTemplate);
}

function renderThemeTemplate (data) {
  includeThemeStyles();
  renderHandlebarsTemplate(templateDir + 'content.hbs', '#content', data);
}

function getTemplateAjax (path, callback) {
  var source, template;
  jqueryNoConflict.ajax({
    url: path,
    success: function (data) {
        source = data;
        template = Handlebars.compile(source);
        if (callback) callback(template);
    }
  });
}

function renderHandlebarsTemplate (withTemplate, inElement, withData) {
  getTemplateAjax(withTemplate, function(template) {
    jqueryNoConflict(inElement).html(template(withData));
  });
}

function registerEvents () {
  jqueryNoConflict(document).on('click', '.section-title', function (e) {
    var sectionTitle, content;
    sectionTitle = $(this);
    content = sectionTitle.next();
    content.slideToggle(750, function () {});
  });
  
  setTimeout(function () {
    $('.progress-bar').css('width', function() {return ($(this).attr('aria-valuenow')+'0%')});
  }, 500);
  
  $('ul').each(function () {
    var max = 3;
    if ($(this).find('li').length > max) {
      $(this)
        .find('li:gt('+max+')')
        .hide()
        .end()
        .append(
          $('<li class="showMore">More...</li>').click(function () {
            $(this).siblings(':hidden').show().end().remove();
          })
        );
      }
  });
}

function registerHelpers () {
  Handlebars.registerHelper('join', hbsJoin);
  Handlebars.registerHelper('debug', hbsDebug);
  Handlebars.registerHelper('buildDateRange', hbsBuildDateRange);
  Handlebars.registerHelper('buildPosition', hbsBuildPosition);
  Handlebars.registerHelper('buildSubtitle', hbsBuildSubtitle);
}

function includeThemeStyles () {
  jqueryNoConflict('head').append('<link rel="stylesheet" type="text/css" media="screen" href="' + templateDir + 'screen.css">');
  jqueryNoConflict('head').append('<link rel="stylesheet" type="text/css" media="print" href="' + templateDir + 'print.css">');
}

}());
