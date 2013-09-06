Super-Mario-Sky
===============
![Super Mario Sky](http://github.com/ArtBIT/super-mario-sky/raw/master/images/super_mario_sky.png)

Super Mario Sky is a simple jQuery plugin that allows you to easily create simple parallax scrolling clouds from old Super Mario Brothers games. 

# Demo
[Click Here](http://artbit.github.io/super-mario-sky/) to see a live demo.

# Example Usage
Create a simple html block with set width and height:

    <div class="screen" style="width: 300px; height: 300px; overflow: hidden">
    </div>

And populate it with several layers of Mario clouds:

    <script type='text/javascript'>
        jQuery(function(){
    jQuery('.screen')
	    .sprite_layer({num_sprites: 5, xspeed: -10})
	    .sprite_layer({num_sprites: 5, xspeed: -20})
	    .sprite_layer({num_sprites: 2, xspeed: -30})
	});
    </script>

See the [index.html](http://github.com/ArtBIT/super-mario-sky/blob/master/index.html) file for an example with multiple sprite classes.

# Options
```sprite_layer``` method accepts the following options:
* **num_sprites** - the number of sprites to generate on the layer
* **xspeed** - horizontal speed of the layer (in pixels per second)
* **yspeed** - vertical speed of the layer (in pixels per second)
* **sprite_class** - css class to apply to the sprite html element
* **opacity** - layer opacity