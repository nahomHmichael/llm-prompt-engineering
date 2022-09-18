(function($) {

  var RestTest = function() {

    var self = this;

    self.init = function() {
      var forms = $('form');
      registerActions(forms);
      showURLs(forms);
    };

    var registerActions = function(forms) {
      $.each(forms, function() {
        var submit = $('input[type="submit"]', $(this));
        $(submit).on('click submit', callResource);
      });
    };

    var callResource = function(e) {
      e.preventDefault();
      $('textarea, ul, h4').remove();
      var form = $(e.target).closest('form');
      var method = form.attr('method');
      var url = form.attr('action');
      var headers = {};
      $('input:not([type="submit"])', form).each(function() {
        url = url.replace('{' + $(this).attr('id') + '}', $(this).val());
        var header = $(this).data('header');
        if (header) {
          headers[header] = $(this).val();
        }
      });

      $.ajax({
        type: method,
        url: url,
        data: serialize(form),
        headers : headers,
        contentType: form.data('type') === 'json' ? 'application/json' : 'application/x-www-form-urlencoded'
      }).done(function(data, textStatus, jqXHR) {
        showResult(jqXHR.status, textStatus, data, form);
      }).fail(function(jqXHR, textStatus, errorThrown) {
        // fail may also be called if jQuery can't parse the response
        // after e.g. Response.ok("Hello World").build()
        var response = textStatus === 'parsererror' ? jqXHR.responseText : errorThrown;
    	  showResult(jqXHR.status, jqXHR.statusText, response, form);
      });
    };

    var showResult = function(status, statusText, response, form) {
      var content = JSON.stringify({
        "status" : status,
        "statusText" : statusText,
        "response" : response
      }, null, '  ');
      var textarea = $('<textarea />', {
        text : content
      });
      form.after(textarea).after($('<h4 />', {
        text : 'Response'
      }));
      var links = findLinks(response, []);
      if (!links.length) {
        return;
      }
      var ul = $('<ul />');
      for (var i = 0; i < links.length; i++) {
        $(ul).append($('<li />').append($('<a />', {
          href : links[i],
          text : links[i],
          target : '_blank'
        })));
      }
      textarea.after(ul).after($('<h4 />', {
        text : 'Links'
      }));
    };

    var findLinks = function(json, links) {
       for (var key in json) {
         if (key === 'href') {
           links.push(json[key]);
         }
         if (json[key] !== null && typeof(json[key]) === 'object') {
           findLinks(json[key], links);
         }
       }
       return links;
    };

    var serialize = function(form) {
        if (form.data('type') !== 'json') {
          return form.serialize();
        }
        var result = {};
        $('input[name]', form).each(function() {
          result[$(this).attr('name')] = $(this).val();
        });
        return JSON.stringify(result);
    };

    var showURLs = function(form) {
      $.each(form, function() {
        var path = $(this).attr('action');
        var heading = $(this).prev('h3');
        heading.text(heading.text() + ' – ' + document.location.origin + path);
      });
    };

    return self;
  }

  $(document).ready(function() {
    new RestTest().init();
  });


})(jQuery)
