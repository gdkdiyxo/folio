(function()
{
    'use strict';

    APP.COMPONENTS.WORLD.PLANET.Planet = APP.CORE.Event_Emitter.extend(
    {
        options :
        {
            ice_scale  : 0.50,
            atmosphere :
            {
                Kr            : 0.0005,
                Km            : 0.001,
                ESun          : 30.0,
                g             : - 0.950,
                innerRadius   : 100,
                outerRadius   : 103,
                scaleDepth    : 0.41,
                wavelength    :
                {
                    r : 0.95,
                    g : 0.54,
                    b : 0.36
                }
            }
        },

        /**
         * INIT
         */
        init : function( options )
        {
            var that = this;

            this._super( options );

            this.scene     = this.options.scene;
            this.sun_light = this.options.sun_light;
            this.renderer  = this.options.renderer;
            this.camera    = this.options.camera;

            // Add Generate Uniforms function to options (will be passed to sky and ground)
            this.options.generate_uniforms = function( tDiffuse )
            {
                var uniforms =
                {
                    v3LightPosition :
                    {
                        type: 'v3',
                        // value: new THREE.Vector3(1e8, 0, 1e8).normalize()
                        value: new THREE.Vector3().copy( this.sun_light.position ).normalize()
                    },
                    v3LightPosition2 :
                    {
                        type: 'v3',
                        // value: new THREE.Vector3(1e8, 0, 1e8).normalize()
                        value: new THREE.Vector3().copy( this.sun_light.position )
                    },
                    v3InvWavelength :
                    {
                        type: 'v3',
                        value: new THREE.Vector3( 1 / Math.pow( this.options.atmosphere.wavelength.r, 4 ), 1 / Math.pow( this.options.atmosphere.wavelength.g, 4 ), 1 / Math.pow( this.options.atmosphere.wavelength.b, 4 ) )
                    },
                    fCameraHeight :
                    {
                        type: 'f',
                        value: 0
                    },
                    fCameraHeight2 :
                    {
                        type: 'f',
                        value: 0
                    },
                    fInnerRadius :
                    {
                        type: 'f',
                        value: this.options.atmosphere.innerRadius
                    },
                    fInnerRadius2 :
                    {
                        type: 'f',
                        value: this.options.atmosphere.innerRadius * this.options.atmosphere.innerRadius
                    },
                    fOuterRadius :
                    {
                        type: 'f',
                        value: this.options.atmosphere.outerRadius
                    },
                    fOuterRadius2 :
                    {
                        type: 'f',
                        value: this.options.atmosphere.outerRadius * this.options.atmosphere.outerRadius
                    },
                    fKrESun :
                    {
                        type: 'f',
                        value: this.options.atmosphere.Kr * this.options.atmosphere.ESun
                    },
                    fKmESun :
                    {
                        type: 'f',
                        value: this.options.atmosphere.Km * this.options.atmosphere.ESun
                    },
                    fKr4PI :
                    {
                        type: 'f',
                        value: this.options.atmosphere.Kr * 4.0 * Math.PI
                    },
                    fKm4PI :
                    {
                        type: 'f',
                        value: this.options.atmosphere.Km * 4.0 * Math.PI
                    },
                    fScale :
                    {
                        type: 'f',
                        value: 1 / (this.options.atmosphere.outerRadius - this.options.atmosphere.innerRadius)
                    },
                    fScaleDepth :
                    {
                        type: 'f',
                        value: this.options.atmosphere.scaleDepth
                    },
                    fScaleOverScaleDepth :
                    {
                        type: 'f',
                        value: 1 / ( this.options.atmosphere.outerRadius - this.options.atmosphere.innerRadius ) / this.options.atmosphere.scaleDepth
                    },
                    g :
                    {
                        type: 'f',
                        value: this.options.atmosphere.g
                    },
                    g2 :
                    {
                        type: 'f',
                        value: this.options.atmosphere.g * this.options.atmosphere.g
                    },
                    nSamples :
                    {
                        type: 'i',
                        value: 3
                    },
                    fSamples :
                    {
                        type: 'f',
                        value: 3.0
                    },
                    tDiffuse: {
                      type: 't',
                      value: tDiffuse
                    },
                    // tDiffuseNight :
                    // {
                    //     type: 't',
                    //     value: diffuseNight
                    // },
                    // tDisplacement :
                    // {
                    //     type: 't',
                    //     value: 0
                    // },
                    // tSkyboxDiffuse :
                    // {
                    //     type: 't',
                    //     value: 0
                    // },
                    fNightScale :
                    {
                        type: 'f',
                        value: 1
                    },
                    fIceScale :
                    {
                        type: 'f',
                        value: this.options.ice_scale
                    },
                    time :
                    {
                        type: 'f',
                        value: 0.0
                    }
                };

                if( typeof this.uniforms === 'undefined' )
                    this.uniforms = [];

                this.uniforms.push( uniforms );

                return uniforms;
            };

            // Sky
            this.sky = new APP.COMPONENTS.WORLD.PLANET.Sky( this.options );

            // Ground
            this.ground = new APP.COMPONENTS.WORLD.PLANET.Ground( this.options );

            // Debug
            this.init_debug();
        },

        /**
         * INIT DEBUG
         */
        init_debug: function()
        {
            var that = this;

            this.debug = {};
            this.debug.instance = new APP.COMPONENTS.Debug();

            // Atmosphere
            this.debug.instance.gui.atmosphere = this.debug.instance.gui.instance.addFolder( 'Planet | Atmosphere' );

            this.debug.Kr            = this.debug.instance.gui.atmosphere.add( this.options.atmosphere, 'Kr', 0, 0.01 ).step( 0.0001 ).name( 'Kr' );
            this.debug.Km            = this.debug.instance.gui.atmosphere.add( this.options.atmosphere, 'Km', 0, 0.01 ).step( 0.0001 ).name( 'Km' );
            this.debug.ESun          = this.debug.instance.gui.atmosphere.add( this.options.atmosphere, 'ESun', 1, 200 ).step( 1 ).name( 'ESun' );
            this.debug.g             = this.debug.instance.gui.atmosphere.add( this.options.atmosphere, 'g', -1, 0 ).step( 0.001 ).name( 'g' );
            this.debug.wavelength_r  = this.debug.instance.gui.atmosphere.add( this.options.atmosphere.wavelength, 'r', 0, 1 ).step( 0.001 ).name( 'wavelength r' );
            this.debug.wavelength_g  = this.debug.instance.gui.atmosphere.add( this.options.atmosphere.wavelength, 'g', 0, 1 ).step( 0.001 ).name( 'wavelength g' );
            this.debug.wavelength_b  = this.debug.instance.gui.atmosphere.add( this.options.atmosphere.wavelength, 'b', 0, 1 ).step( 0.001 ).name( 'wavelength b' );
            this.debug.scaleDepth    = this.debug.instance.gui.atmosphere.add( this.options.atmosphere, 'scaleDepth', 0, 1 ).step( 0.001 ).name( 'scaleDepth' );

            function update_uniforms( uniforms )
            {
                uniforms.v3InvWavelength.value = new THREE.Vector3( 1 / Math.pow( that.options.atmosphere.wavelength.r, 4 ), 1 / Math.pow( that.options.atmosphere.wavelength.g, 4 ), 1 / Math.pow( that.options.atmosphere.wavelength.b, 4 ) );
                uniforms.fKrESun.value         = that.options.atmosphere.Kr * that.options.atmosphere.ESun;
                uniforms.fKr4PI.value          = that.options.atmosphere.Kr * 4.0 * Math.PI;
                uniforms.fKmESun.value         = that.options.atmosphere.Km * that.options.atmosphere.ESun;
                uniforms.fKm4PI.value          = that.options.atmosphere.Km * 4.0 * Math.PI;
                uniforms.fKrESun.value         = that.options.atmosphere.Kr * that.options.atmosphere.ESun;
                uniforms.fKmESun.value         = that.options.atmosphere.Km * that.options.atmosphere.ESun;
                uniforms.g.value               = that.options.atmosphere.g;
                uniforms.g2.value              = that.options.atmosphere.g * that.options.atmosphere.g;
                uniforms.fScaleDepth.value     = that.options.atmosphere.scaleDepth;
                uniforms.fIceScale.value       = that.options.ice_scale;
            }

            function update()
            {
                var i = 0;

                for( i = 0; i < that.sky.uniforms.length; i++ )
                    update_uniforms( that.sky.uniforms[ i ] );

                for( i = 0; i < that.ground.uniforms.length; i++ )
                    update_uniforms( that.ground.uniforms[ i ] );

                that.sky.material.needsUpdate = true;
            }

            this.debug.Kr.onChange( update );
            this.debug.Km.onChange( update );
            this.debug.ESun.onChange( update );
            this.debug.g.onChange( update );
            this.debug.wavelength_r.onChange( update );
            this.debug.wavelength_g.onChange( update );
            this.debug.wavelength_b.onChange( update );
            this.debug.scaleDepth.onChange( update );

            // General
            this.debug.instance.gui.planet = this.debug.instance.gui.instance.addFolder( 'Planet' );
            this.debug.instance.gui.planet.open();

            this.debug.ice_scale = this.debug.instance.gui.planet.add( this.options, 'ice_scale', 0, 1 ).step( 0.001 ).name( 'Ice Scale' );

            this.debug.ice_scale.onChange( update );
        },

        /**
         * FRAME
         */
        frame : function()
        {
            // Set variables
            var camera_length  = this.camera.position.length(),
                light_position = new THREE.Vector3().copy( this.sun_light.position ).normalize(),
                i              = null,
                uniforms       = null;

            // Update uniform
            function update_uniforms( uniforms )
            {
                uniforms.v3LightPosition.value = light_position;
                uniforms.fCameraHeight.value   = camera_length;
                uniforms.fCameraHeight2.value  = camera_length * camera_length;
            }

            // Each sky uniforms
            for( i = 0; i < this.sky.uniforms.length; i++ )
                update_uniforms( this.sky.uniforms[ i ] );

            // Each ground uniforms
            for( i = 0; i < this.ground.uniforms.length; i++ )
                update_uniforms( this.ground.uniforms[ i ] );

            // // Rotate ground
            // this.ground.mesh.rotation.y += 0.01;
        }
    });
})();












// /**
//  * HEIGHT TO NORMAL MAP
//  */
// height_to_normal_map : function( map, intensity )
// {
//     var width  = map.image.width,
//         height = map.image.height,
//         len    = width * height;

//     if( typeof intensity === 'undefined' )
//         intensity = 1.0;

//     var getHeight = function( x, y )
//     {
//         x = Math.min( x, width - 1 );
//         y = Math.min( y, height - 1 );

//         return - (
//             map.image.data[ ( y * width + x ) * 4     ] / 255 +
//             map.image.data[ ( y * width + x ) * 4 + 1 ] / 255 +
//             map.image.data[ ( y * width + x ) * 4 + 2 ] / 255
//         ) / 3 * intensity;
//     };

//     var normal_map = THREE.ImageUtils.generateDataTexture( width, height, new THREE.Color( 0x000000 ) );

//     for( var i = 0; i < len; i++ )
//     {
//         var x = i % width,
//             y = height - Math.floor( i / width );

//         var pixel00 = new THREE.Vector3( 0, 0, getHeight( x, y ) ),
//             pixel01 = new THREE.Vector3( 0, 1, getHeight( x, y + 1 ) ),
//             pixel10 = new THREE.Vector3( 1, 0, getHeight( x + 1, y ) ),
//             orto    = pixel10.sub( pixel00 ).cross( pixel01.sub( pixel00 ) ).normalize();

//         normal_map.image.data[ i * 3     ] = ( orto.x / 2 + 0.5 ) * 255;
//         normal_map.image.data[ i * 3 + 1 ] = ( orto.y / 2 + 0.5 ) * 255;
//         normal_map.image.data[ i * 3 + 2 ] = ( orto.z / 2 + 0.5 ) * 255;
//     }

//     return normal_map;
// },

