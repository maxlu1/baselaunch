declare var $: any;
declare var jQuery: any;
export function homeModule() {
  'use strict';
  $(document).ready(function () {
    var endPointTest = 'http://localhost:5000/photos/';
    //
    var xhr = new XMLHttpRequest();
    xhr.open('GET', endPointTest);
    xhr.onload = function () {
      if (xhr.status === 200) {
        var data = $.parseJSON(xhr.responseText);
        renderPhotosAlbum(data.sort(function (a, b) { return 0.5 - Math.random() }));
      }
    }
    xhr.onerror = function () {
      console.log('Error');
    }
    xhr.send();
    // EDIT METHODS:
    /*
    $.ajax({
        method: "POST",
        url: endPointTest,
        data: { idData: 'idData', token: 'tokenData' }
    }).done(function (msg, status, jqXHR) {
        console.log(msg)
    }).fail(function (msg, status, jqXHR) {
        console.warn(msg);
    });
    */

    function renderPhotosAlbum(data) {
      jQuery.each(data, function (i, val) {
        $("#myCardModel").clone().prop('id', `cardItem_${i}`).appendTo("#photosAlbum");
        $(`#cardItem_${i}`).find('img').prop('src', 'https://www.lu1.com.br/phototag/images/catalogo/' + val.arquivo + '.jpg');
        // Loop inside photo tags:
        var j = 0;
        var tagsToUse = val.tags.sort(function (a, b) { return 0.5 - Math.random() })
        for (j = 0; j < tagsToUse.length; j++) {
          $(`#cardItem_${i}`).find('.tagsList').append(`<span class="badge badge-dark">${tagsToUse[j]}</span>`);
        }
        var link = `https://www.lu1.com.br/phototag/foto/?${val.arquivo}`;
        $(`#cardItem_${i}`).find('.photoSiteLink').html(`<a target="_blank" href="${link}" class="alert-link">${link}</a>`);

      });
    }



  });

}
