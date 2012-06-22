/**
 * @author Djordje Ungar
 * @desc Populate the target element with Super Mario sprites and animate them
 * @version 1.0
 * @example
 * $("element").sprite_layer();
 * @license free
 *
 */
jQuery.fn.sprite_layer = function(params) {

        // some constants
        var MIN_SPRITES = 1;
        var MAX_SPRITES = 100;

        var MIN_SPEED   = -1000; // pixels per second
        var MAX_SPEED   =  1000; // pixels per second

        var SPRITE_HEIGHT = 32;
        var MAX_SPRITE_SIZE = 8;

        // default options
		var options = {
            num_sprites: 10,
			xspeed: 20,
			yspeed: 0,
            sprite_class: 'cloud',
            xbounce: false,
            ybounce: false,
            opacity: 1
		}
		var op = jQuery.extend(options, params);
        op.num_sprites = Math.max(MIN_SPRITES, Math.min(MAX_SPRITES, op.num_sprites));
        op.opacity     = Math.max(0, Math.min(1, op.opacity));
        op.xspeed      = Math.min(MAX_SPEED, Math.max(MIN_SPEED, op.xspeed));
        op.yspeed      = Math.min(MAX_SPEED, Math.max(MIN_SPEED, op.yspeed));
        op.xbounce     = !!op.xbounce;
        op.ybounce     = !!op.ybounce;
        op.xbounce = op.ybounce = false; // not yet supported

        function generate_sprite() {
            var size = 'x' + Math.floor(Math.random()*(MAX_SPRITE_SIZE-1) + 1);
            return jQuery('<div class="' + op.sprite_class + ' ' + size + '"></div>'); 
        }

   return this.each(function(){

		//initializing variables
		var $self  = jQuery(this);

		//get the dimensions of the container
		var width  = $self.width();
		var height = $self.height();
        
        var $sprite_layer = jQuery('<div class="layer"></div>');
        var num_sprites = op.num_sprites;
        while (num_sprites--) {
            var $sprite = generate_sprite();
            var w = $sprite.width();
            var t = Math.floor(Math.random()*(height - SPRITE_HEIGHT));
            var l = Math.floor(Math.random()*(width - w));
            $sprite.css({top: t, left: l, opacity: op.opacity});
            $sprite_layer.append($sprite);

            // We basically have four layers lined up in a 2x2 grid
            // We scroll them all, and once the first row (or column) of layers
            // leaves the screen, we move them back to its starting position,
            // which makes it look like the layer animation loops forever.
            // That's why we need to copy the sprite four times, and place it 
            // onto each of the layers
            var xdirection = op.xspeed > 0 ? 1 : op.xspeed ? -1 : 0;
            var ydirection = op.yspeed > 0 ? 1 : op.yspeed ? -1 : 0;
            if (xdirection != 0 ) {
                $sprite_layer.append($sprite.clone().css({top: t, left: l+(-1*xdirection*width)}));
                $sprite_layer.append($sprite.clone().css({top: t+(-1*ydirection*height), left: l+(-1*xdirection*width)}));
            }
            if (ydirection != 0) {
                $sprite_layer.append($sprite.clone().css({top: t+(-1*ydirection*height), left: l}));
            }
        }
        var xpos = $sprite_layer.position().left;
        var ypos = $sprite_layer.position().top;
        var last_time = (new Date()).getTime();
        var dx = op.xspeed / 1000; // pixels per 1s (100ms)
        var dy = op.yspeed / 1000; // pixels per 1s (100ms)

        function animate_sprite_layer(time) {
            window.requestAnimationFrame(animate_sprite_layer);
            time = time || last_time;
            var dt = time - last_time;
            //console.log(dx,dt);
            xpos += dx * dt;

            if (Math.abs(xpos) > width) {
                xpos = 0;
                if (op.xbounce) {
                    dx *= -1;
                }
            }
            ypos += dy * dt;
            if (Math.abs(ypos) > height) {
                ypos = 0;
                if (op.ybounce) {
                    dy *= -1;
                }
            }
            $sprite_layer.css({left: Math.floor(xpos), top:  Math.floor(ypos)});
            last_time = time;
        }
        animate_sprite_layer(0);

        $self.append($sprite_layer);

   });

};

