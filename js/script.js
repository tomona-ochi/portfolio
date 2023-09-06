//////////////////////////////　header PC menu　////////////////////////////////////
//ドロップダウンの設定を関数でまとめる
function mediaQueriesWin(){
    var width = $(window).width();
    if(width <= 768) {//横幅が768px以下の場合
      $(".has-child>a").off('click'); //has-childクラスがついたaタグのonイベントを複数登録を避ける為offにして一旦初期状態へ
      $(".has-child>a").on('click', function() {//has-childクラスがついたaタグをクリックしたら
        var parentElem =  $(this).parent();// aタグから見た親要素の<li>を取得し
        $(parentElem).toggleClass('active');//矢印方向を変えるためのクラス名を付与して
        $(parentElem).children('ul').stop().slideToggle(500);//liの子要素のスライドを開閉させる※数字が大きくなるほどゆっくり開く
        return false;//リンクの無効化
      });
    }else{//横幅が768px以上の場合
      $(".has-child>a").off('click');//has-childクラスがついたaタグのonイベントをoff(無効)にし
      $(".has-child>a").removeClass('active');//activeクラスを削除
      $('.has-child').children('ul').css("display","");//スライドトグルで動作したdisplayも無効化にする
    }
  }
  
  // ページがリサイズされたら動かしたい場合の記述
  $(window).resize(function() {
    mediaQueriesWin();/* ドロップダウンの関数を呼ぶ*/
  });
  
  // ページが読み込まれたらすぐに動かしたい場合の記述
  $(window).on('load',function(){
    mediaQueriesWin();/* ドロップダウンの関数を呼ぶ*/
  });

  
//////////////////////////////////// SP menu　////////////////////////////////////

$(".header__MenuBtn").click(function () {//ボタンがクリックされたら
    $(this).toggleClass('active');//ボタン自身に activeクラスを付与し
      $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
  });
  
  $("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
      $(".header__MenuBtn").removeClass('active');//ボタンの activeクラスを除去し
      $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
  });  

////////////////////////////////////　btn　////////////////////////////////////
$(".openbtn").click(function () {//ボタンがクリックされたら
	$(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $(".gnav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
});

$(".gnav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
    $(".gnav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
});


////////////////////////////////////　to top　////////////////////////////////////
//スクロールした際の動きを関数でまとめる
function PageTopAnime() {

  var scroll = $(window).scrollTop(); //スクロール値を取得
  if (scroll >= 200){//200pxスクロールしたら
    $('.footer__toTop').removeClass('DownMove');   // DownMoveというクラス名を除去して
    $('.footer__toTop').addClass('UpMove');      // UpMoveというクラス名を追加して出現
  }else{//それ以外は
    if($('.footer__toTop').hasClass('UpMove')){//UpMoveというクラス名が既に付与されていたら
      $('.footer__toTop').removeClass('UpMove'); //  UpMoveというクラス名を除去し
      $('.footer__toTop').addClass('DownMove');  // DownMoveというクラス名を追加して非表示
    }
  }
  
  var wH = window.innerHeight; //画面の高さを取得
  var footerPos =  $('#footer').offset().top; //footerの位置を取得
  if(scroll+wH >= (footerPos+100)) {
    var pos = (scroll+wH) - footerPos+100 //スクロールの値＋画面の高さからfooterの位置＋35pxを引いた場所を取得し
    $('.footer__toTop').css('bottom',pos); //.footer__toTopに上記の値をCSSのbottomに直接指定してフッター手前で止まるようにする
  }else{//それ以外は
    if($('.footer__toTop').hasClass('UpMove')){//UpMoveというクラス名がついていたら
      $('.footer__toTop').css('bottom','100px');// 下から35pxの位置にページリンクを指定
    }
  }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// .footer__toTopをクリックした際の設定
$('.footer__toTop').click(function () {
  $('body,html').animate({
      scrollTop: 0//ページトップまでスクロール
  }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
  return false;//リンク自体の無効化
});


//////////////////////////////////// copy email address ////////////////////////////////////

$(document).ready(function() {
	
	// Add class to mailto link
	// Needed to separate the disabling of the default action AND copy email to clipboard
	$('a[href^=mailto]').addClass('mailto-link');

	var mailto = $('.mailto-link');
	var messageCopy = '&#128238; Copy email address';
	var messageSuccess = '&#128238; Email address copied!';
	
	mailto.append('<span class="mailto-message"></span>');
	$('.mailto-message').append(messageCopy);
	
	// Disable opening your email client. yuk.
	$('a[href^=mailto]').click(function() {
		return false; 
	})
	
	// On click, get href and remove 'mailto:' from value
	// Store email address in a variable.
	mailto.click(function() {
		var href = $(this).attr('href');
		var email = href.replace('mailto:', '');
		copyToClipboard(email);
		$('.mailto-message').empty().append(messageSuccess);
		setTimeout(function() {
			$('.mailto-message').empty().append(messageCopy);}, 3000); 
	});
	
});

// Grabbed this from Stack Overflow.
// Copies the email variable to clipboard
function copyToClipboard(text) {
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute('value', text);
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
}