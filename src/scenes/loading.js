//the loading screen - that will be display while assets loaded
Crafty.scene("loading", function() {
  version = gameContainer.version();

  var assets = [
    'web/images/switches.png?v='+version+''
    ,'web/images/lights.png?v='+version+''
    ,'web/images/pushbutton_large.png?v='+version+''
    ,'web/images/dial_medium.png?v='+version+''
  ];
  // Monitor browser resize events, like mobile orientation changes.
  $(window).resize( _.debounce( SCREEN.resize_callback, 500 ) );

  var loadingText = Crafty.e("2D, DOM, Text")
      .attr({w: 500, h: 20, x: SCREEN.center_in_x(500), y: SCREEN.h_pct(0.25), z: Layer.HUD_FG})
      .text('Loading...')
      .textColor('#000')
      .textFont({ size: '24px', family: 'Russo One, Arial', weight: 'bold'})
      .textAlign('center');

  // load takes an array of assets and a callback when complete
  Crafty.load(assets,
    function() {
      initSprites();
      //when everything is loaded, run the main scene
      loadingText.text('Would you like to play a game?')
        .addComponent( 'Mouse, MouseHover' )
        .bind( 'MouseDown', function(){
          if (gameContainer.sceneName != undefined) {
            Crafty.scene(gameContainer.sceneName);
          }
        });
    },
    function(e) {
      loadingText.text('Loading ('+(e.percent.toFixed(0))+'%)');
    }
  );
});

function initSprites() {
  var version = gameContainer.version();
  Crafty.sprite(75, 'web/images/switches.png?v='+version+'', {
    switch_small_toggle: [0, 0]
  });
  Crafty.sprite(20, 'web/images/lights.png?v='+version+'', {
    lamp_red: [0, 0]
    ,lamp_green: [1, 0]
  });
  Crafty.sprite(100, 'web/images/pushbutton_large.png?v='+version+'', {
    pushbutton_large: [0, 0]
  });
  Crafty.sprite(75, 'web/images/dial_medium.png?v='+version+'', {
    dial_medium: [0, 0]
  });
}
