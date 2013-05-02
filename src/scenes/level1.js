Crafty.scene("level1", function() {
  Crafty.background('#CCC');

  SCREEN.fadeFromBlack(500, function() {
    var scene = Crafty.e( 'Scene' ).callbacks( level1CreateUI, level1ResizeUI );
    scene._show_victory = level1ShowVictory;
  })
});

// Create UI elements, add behaviors
function level1CreateUI() {
  var self = this;
  _(this).extend({
    toggle:         null
    ,lamp:          null
    ,launch_button: null
    ,readout:       null
    ,toggle_width:  100
    ,lamp_width:   30
    ,button_width:  150
    ,readout_width: 54
  });

  // Create UI elements
  this.status = Crafty.e( 'DotMatrix' )
    .setup({ fontSize: 20 });

  this.readout = Crafty.e( 'SevenSegment, Offscreen' )
    .setup({ digits: 2, val: '--', fontSize: 36 });

  this.lamp = Crafty.e( '2D, Canvas, lamp_red' );

  this.toggle = Crafty.e( 'ToggleSwitch' )
    .switchType( 'small_toggle' )
    .bind( 'Toggle', function(is_on) {
      self.readout.val(is_on ? 'OK' : '--');
      self.readout.setGoodValue(is_on);
      self.lamp.sprite(is_on ? 1 : 0, 0);
      self.launch_button.setLock( !is_on );
    });

  this.launch_button = Crafty.e( 'PushButton' )
    .setup({ label: 'LAUNCH', fontSize: 24, sprite: 'large', latch: true })
    .bind( 'ButtonDown', function() { self._show_victory() } );
}

// Draw UI elements; called when window is resized.
function level1ResizeUI() {
  var toggle_width  = this.toggle_width;
  var lamp_width   = this.lamp_width;
  var readout_width = this.readout_width;
  var button_width  = this.button_width;
  var status_height = this.status._h * 3;

  var width   = Math.round( toggle_width * 3 + button_width );
  var height  = status_height + Math.round( toggle_width * 1.25 ) + lamp_width * 2 + readout_width;
  var left    = SCREEN.center_in_x(width);
  var top     = SCREEN.center_in_y(height);

  // Arrange UI elements
  this.status.attr({ x: left, y: top });
  this.status.width(width);
  top += status_height;
  height -= status_height;

  this.toggle.attr({ x: SCREEN.center_in_x(toggle_width, left + toggle_width * 1.5),
                     y: top + lamp_width * 2, w: toggle_width, h: toggle_width });

  this.lamp.attr({ x: SCREEN.center_in_x(lamp_width, left + toggle_width * 1.5),
                   y: top, w: lamp_width, h: lamp_width })

  this.readout.attr({ x: SCREEN.center_in_x(readout_width, left + toggle_width * 1.5),
                      y: top + lamp_width * 2 + toggle_width * 1.25})

  this.launch_button
    .attr({ x: left + width - button_width, y: SCREEN.center_in_y(button_width, top + height / 2),
            w: button_width, h: button_width });

  this.status.write('SEQUENCE INITIATED');
}

function level1ShowVictory() {
  this.launch_button.freeze();

  this.status
    .write( 'Sequence Complete.' )
    .bind( 'MidFinish', function(){
      SCREEN.fadeToBlack(1000, function() { Crafty.scene( 'level2' ) });
    });
}
