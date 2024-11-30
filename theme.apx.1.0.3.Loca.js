
theme.lang.footerTitle3 = "Pagamento";
theme.settings.footer.institutional = false;
theme.settings.footer.categories = false;
theme.settings.footer.atendimento = true;
theme.settings.footer.importante = true;
theme.settings.footer.security = true;

theme.templates.footer = '<div class="row-flex justify-content-between">' + 
(theme.settings.footer.institutional == true ? '<div class="col-auto"><div id="theme_footer-content4"></div><h4>Sobre</h4><div id="theme_footer-content-institutional"></div></div>' : '') +
`<div class="col"><div class="row-flex p-0 justify-content-between">` + 
(theme.settings.footer.atendimento == true ?  '<div class="col-auto"><h4>Atendimento</h4><div id="theme_footer-content-atendimento"></div></div>' : '') +
(theme.settings.footer.pages == true ? '<div class="col-auto"><h4>'+ theme.lang.footerTitle1 +'</h4><div id="theme_footer-content1"></div></div>' : '') +
(theme.settings.footer.categories == true ?  '<div class="col-auto"><h4>'+ theme.lang.footerTitle2 +'</h4><div id="theme_footer-content2"></div></div>' : '') +
(theme.settings.footer.importante == true ?  '<div class="col-auto"><h4>Importante</h4><div id="theme_footer-content-importante"></div></div>' : '') +    
`</div><div class="row-flex p-0 mt-5 justify-content-between">` + 
(theme.settings.footer.payments == true ? '<div class="col-auto"><h4>'+ theme.lang.footerTitle3 +'</h4><div id="theme_footer-content3"></div></div>' : '' ) +
(theme.settings.footer.security == true ? '<div class="col-auto"><h4>Segurança</h4><div id="theme_footer-security"></div></div>' : '' ) +
`</div></div>`+
'</div>';  

theme.build.footer = function(template){
    theme.newsletter = theme.newsletter.replace(`posicao-rodape`,``);
    $('#barraNewsletter, .pagamento-selos').remove();
    $('#rodape .institucional').html(theme.templates.footer);
    $('#theme_footer-content1').append(theme.footerPages);
    $('#theme_footer-content2').append(theme.footerCategories);
    $('#theme_footer-content3').append(theme.footerPayments);
    $('#theme_footer-content3').append(theme.footerGateways);
    $('#theme_footer-security').append(theme.footerSeals);

    $('#theme_footer-content-atendimento').append(theme.atendimento);
    $('#theme_footer-content-importante').append(theme.importante);

    if(theme.settings.footer.institutional) $('#theme_footer-content-institutional').append('<p>' + theme.storeDescriptionCustom + '</p>');
    if(theme.settings.footer.institutional && theme.settings.footer.social) $('#theme_footer-content-institutional').append('<div id="theme_footer-content-institutional-social">' + theme.socialIcons + '</div>');
    
    if(theme.newsletter){
        $('#theme_footer-content4').append(theme.newsletter);
    }
    
    $('#rodape .selos').find('.titulo').remove();
    $('#rodape .selos').attr('class','selos');
};

theme.build.header = function(template){
    $('#cabecalho').html(theme.templates.header);
    $('#theme_header-logo').append(theme.logo);
    $('#theme_header-menu').html(theme.headerMenu);
    $('#theme_header-functions').append('<li>' + theme.headerCart + '</li>');

    $('#theme_header-functions').prepend('<li><button type="button" class="account-trigger"><span data-isLogged="false">Entrar</span></button></li>');
    $('#theme_header-functions').prepend('<li><button type="button" class="search-trigger">'+ theme.icon.search +'</button></li>');

    if($.cookie('LI-isUserLogged') === "true" ? true : false){
        let name = $.cookie('LI-UserLoggedName').split(` `)[0];
        $(`.account-trigger [data-isLogged]`).text(`Olá, ${name}`)
    }
    $(window).load(function(){
        if(theme.isLogged){
            let name = $.cookie('LI-UserLoggedName').split(` `)[0];
            $(`.account-trigger [data-isLogged]`).text(`Olá, ${name}`)
        }
    });
    
    $('.carrinho .icon-shopping-cart').before(theme.icon.cart);
    $('.carrinho .icon-shopping-cart').remove();
    $('.barra-inicial').remove();

    if(theme.stripe.content){
        let stripe;
        if(Array.isArray(theme.stripe.content)){
            stripe = $('<div id="theme_header-stripe" style="background:'+ theme.stripe.background +'; color:'+ theme.stripe.color +'">'+ theme.stripe.content.map(item => `<p>${item}</p>`).join('') +'</div>');
        }else{
            stripe = $('<div id="theme_header-stripe" style="background:'+ theme.stripe.background +'; color:'+ theme.stripe.color +'"><p>'+ theme.stripe.content+'</p></div>');
        }
        
        if(theme.stripe.fixed){
            theme.stripe.position == 1 ? stripe.prependTo('#cabecalho') : stripe.appendTo('#cabecalho');
        }else{
            theme.stripe.position == 1 ? stripe.insertBefore('#cabecalho') : stripe.insertAfter('#cabecalho');
        }

        if(Array.isArray(theme.stripe.content)){
            $(`#theme_header-stripe`).apx_slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots:false,
                autoplay:true,
                autoplaySpeed: 3000,
                prevArrow: theme.settings.sliders.config.prevArrow,
                nextArrow: theme.settings.sliders.config.nextArrow,
                arrows:true
              });
        }
        
    } 

    //theme.settings.invertHeader
    if(theme.settings.invertHeader == true){
        $('#cabecalho').addClass('theme_invert');
    }

    
};

theme.functions.sideCartSet = function(){
  $(document).on("click", ".theme_buttonBuy-ajax", function(o) {
      o.preventDefault();
      var n = $(this);
      let previousText = n.attr('text');
      n.addClass("loading");
      $.ajax({
          url: $(this).attr("href").replace("https:", ""),
          dataType: "json"
      }).done(function(p) {
          if (p.status !== "sucesso") {
              alert(p.mensagem);
          } else {
              $("#theme_sideCart-content").load("/carrinho/mini", function() {
                  theme.functions.sideCart()
              })
          }
      }).fail(function(p) {
          window.location = n.attr("href")
      }).always(function() {            
          n.text(previousText).removeClass("loading");
      })
  });
  let sideCardBn = window.sideCartBanner ? `<img src="${window.sideCartBanner}"/>` : '';
  $('body').append('<div id="theme_sideCart" class="theme_aside right"><div class="theme_aside-header" id="theme_sideCart-header"><button type="button" onclick="theme.functions.sideCartToggle()">'+ theme.icon.sideCartClose +'</button><span>'+ theme.lang.sideCartTitle +'</span></div><div id="theme_sideCart-content"></div><div id="theme_sideCart-footer">'+sideCardBn+'<a href="/carrinho/index" class="botao principal botao-comprar">Finalizar Compra</div></div></div>');    
};
theme.functions.sideCartScroll = function(){
  if($("#theme_sideCart-content .scroll").length){
      let h = $('#theme_sideCart-header').innerHeight() + $('#theme_sideCart-content .table-footer').innerHeight() + $('#theme_sideCart-footer').innerHeight() ;
      let maxheight = $('#theme_sideCart').innerHeight();
      $('#theme_sideCart-content .scroll').css('height','calc('+ maxheight +'px - ' + h + 'px');

      if($('#theme_sideCart-footer').find(`img`)){
        let pb = $('#theme_sideCart-footer').find(`img`).innerHeight();
        $('#theme_sideCart-content .scroll').css('padding-bottom',`${pb}px`);

      }
  }
}

theme.build.search = function(template){
  $((theme.isMobile ? 'body' : '#cabecalho')).append(theme.templates.search);
  $('#theme_search').append(theme.searchForm);

  $('#theme_search #auto-complete').attr('placeholder',theme.lang.searchPlaceholder);
  $('#theme_search .botao.icon-search').text(theme.lang.searchButtonText);
  $('#theme_search .botao.icon-search').removeClass('icon-search');

  $('.search-trigger').click(function(){   
      $('body').toggleClass('asideSearch-visible');         
      $('#theme_search input').val('');
  });

  $("#theme_search input").autocomplete({
      delay: 300,
      minLength: 5,
      source: function(o, n) {
          $.ajax({
              url: "//api.awsli.com.br/v2/autocomplete/" + LOJA_ID,
              dataType: "json",
              data: {
                  q: o.term,
                  size: 3,
                  ttl: 300
              },
              success: function(p) {
                  n($.map(p.hits, function(q) {
                      console.log(q);
                      if (q.imagens) {
                          return {
                              label: '<span class="img"><img src="' + MEDIA_URL + "80x80/" + q.imagens[0].caminho + '?type=trim" /></span><span>' + q.nome + '</span>',
                              value: q.nome,
                              url: q.canonical_path
                          }
                      } else {
                          return {
                              label: '<span class="img"></span><span>' + q.nome + '</span>',
                              value: q.nome,
                              url: q.canonical_path
                          }
                      }
                  }))
              }
          })
      },
      open: function(n, o) {
          $(this).autocomplete("widget").css("z-index", 100000);
          $(this).autocomplete("widget").width($(this).parent().width())
      },
      select: function(n, o) {
          console.log(o);
          window.location = o.item.url
      }
  });
  $("#theme_search input").each(function() {
      $(this).data("ui-autocomplete")._renderItem = function(n, o) {
          return $("<li></li>").data("item.autocomplete", o).append("<a>" + o.label + "</a>").appendTo(n)
      }
  });
};

theme.functions.searchAutoComplete = function(){
  $(`#auto-complete`).autocomplete(`destroy`);
  $(`#auto-complete`).after(`<button type="button" class="clear_list"></button>`);
  $(`#theme_search`).append(`<div class="lcf_results"> <div class="row"> <div class="w-100 results-products"> <div class="row justify-content-between align-items-center count"></div><div class="row-flex list"></div></div></div></div>`);
    
  $('body').on('keyup','#theme_search form input', function(){
      let results = $(`#theme_search`).find('.results-products > .list');
      let count = $(`#theme_search`).find('.results-products > .count');
      let clearBtn = $(`#theme_search`).find('.clear_list');
      let q = $(this).val().toLowerCase();
      if(q.length > 3){
          clearBtn.show();
          $.ajax({
              url: 'https://api.awsli.com.br/v3/products' + "/autocomplete",
              headers: {
                  "x-store-id": window.LOJA_ID
              },
              dataType: "json",
              data: {
                  q: q,
                  page: {
                      size: 6
                  }
              },
          }).done(function(response){
              if(results.length > 0){
                  results.empty();
                  count.empty()
                  response.meta.total.resources > 0 ? count.append('<div class="col-auto">' + response.meta.total.resources + ' <span>produtos</span></div>') : false;
                  response.meta.total.resources > 0 ? count.append('<div class="col-auto"><a href="/buscar?q='+ q +'">ver tudo</a></div>') : false;
                  
                  $.each(response.data, function(k_, i_){
                      let box = $('<div class="span2"></div>');
                      let item = $('<div class="item"></div>');

                     // item.append('<button type="button" class="add-wishlist"><img src="'+ CDN_PATH + 'wishlist.svg' + '"/></button>');
                      item.append('<a href="'+ i_.url +'"><div class="image"><img src="'+ (i_.images && i_.images[0] ? window.MEDIA_URL + i_.images[0].url.slice(1,i_.images[0].url.length) : 'https://via.placeholder.com/200x200') +'"/></div></a>');
                      item.append('<a href="'+ i_.url +'"><div class="name">'+ i_.name +'</div></a>');
                      box.append(item);
                      
                      results.append(box);

                  });
              }
              console.log(response.data)
          })
      }else{
          clearBtn.hide();
      }
      console.log()
  });
  $('body').on('click', '.clear_list', function(){
    $(`#theme_search`).find('.list, .count').empty();
    $(`#theme_search`).find('input').val('');
    $(`#theme_search`).find('input').keyup();
  });
  console.log(`searchAutoComplete`)
};

$(window).load(function(){
  theme.functions.searchAutoComplete()
})
