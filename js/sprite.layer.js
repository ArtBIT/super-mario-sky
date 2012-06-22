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
			speed: 20,
            sprite_class: 'cloud',
            opacity: 1
		}
		op = jQuery.extend(options, params);
        op.num_sprites  = Math.max(MIN_SPRITES, Math.min(MAX_SPRITES, op.num_sprites));
        op.opacity      = Math.max(0, Math.min(1, op.opacity));
        op.speed        = Math.min(MAX_SPEED, Math.max(MIN_SPEED, op.speed));

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
            if (t > 290) console.log(height, h, t, $sprite);
            $sprite.css({top: t, left: l, opacity: op.opacity});
            $sprite_layer.append($sprite);

            // We basically have two layers one next to each other.
            // We scroll them both, and once the first layer leaves 
            // the screen, we move them back to the starting position,
            // which makes it look like the layer animation loops forever.
            // That's why we need to copy the sprite, onto the secondary
            // layer, which is shifted to the right, for the width of the layer.
            var direction = op.speed > 0 ? 1 : -1;
            $sprite = $sprite.clone();
            $sprite.css({top: t, left: l+(-1*direction*width)});
            $sprite_layer.append($sprite);
        }
        var position = $sprite_layer.position().left;
        var last_time = (new Date()).getTime();
        var dx = op.speed / 1000; // pixels per 1s (100ms)
        function animate_sprite_layer(time) {
            window.requestAnimationFrame(animate_sprite_layer);
            time = time || last_time;
            var dt = time - last_time;
            //console.log(dx,dt);
            position += dx * dt;
            if (Math.abs(position) > width) {
                position = 0;
            }
            $sprite_layer.css({left: Math.floor(position)});
            last_time = time;
        }
        animate_sprite_layer(0);

        $self.append($sprite_layer);

   });

};

