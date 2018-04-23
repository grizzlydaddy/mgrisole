import Autosize from 'autosize'
import $ from 'jquery'
import anime from 'animejs'
import Typograph from 'typograph'

window.$ = $;

$('.bottom .title-button').on( 'click', e => {
  // $('.container')
  //   .toggleClass('container_active_content')
  $( e.target )
    .parents('.block')
      .toggleClass('active')

  $( '.container' ).toggleClass('active')
});

$('.close-button').on( 'click', e => {
    $( '.container' ).toggleClass('active')
    $('.block').removeClass('active')
})

Autosize($('textarea'));

let typed = new Typograph({
  target: '.typeMe',
  speed: 100,
  fixePosition: true,
  cursor: '|',
  mistyping: true,
  keyboard: 'azerty',
  mistypingRate: 3
});
