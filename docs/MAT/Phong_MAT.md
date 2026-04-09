# Phong MAT

**Family:** MAT (Material Operator)

## Summary

The Phong MAT creates a material using the Phong Shading model. It has support for textures, reflections, bumps, cone lights, rim lights, alpha maps and more. You can output its GLSL shader into two DATs for further adaptation in a GLSL MAT by using the Output Shader parameter.

Phong Shading models three types of reflected light:

Phong Shading produces very nice specular highlights, although it is still an approximation and not physically accurate. Contrasting with the Gouraud shading model that calculates the lighting at each vertex and interpolates the value across the polygon, Phong calculates the lighting at each pixel.

To see how all of the different parts are summed together by looking at the Phong Lighting Equation article.

> **Note:** Simply applying alpha to an object does not make it transparent. For more information refer to the Transparency article.

## Parameters

### RGB Page

#### Ambient uses Diffuse `ambdiff`

Uses the Diffuse parameter for Ambient when checked.

#### Diffuse `diff`

The color of the diffuse light reflected from the material.

- **Red** `diffr`
- **Green** `diffg`
- **Blue** `diffb`

#### Ambient `amb`

The color of the ambient light reflected from the material.

- **Red** `ambr`
- **Green** `ambg`
- **Blue** `ambb`

#### Specular `spec`

The color of the specular light reflected from the material. This changes the color of the highlights on shiney objects.

- **Red** `specr`
- **Green** `specg`
- **Blue** `specb`

#### Emit `emit`

This is the color that the material will emit even if there is no light.

- **Red** `emitr`
- **Green** `emitg`
- **Blue** `emitb`

#### Constant `constant`

Adds to the final color. Where there are point colors, finalcolor += Point Color * Constant Color. This behaves like there is ambient illumination of 1 1 1. It is not affected by textures or transparency.

- **Red** `constantr`
- **Green** `constantg`
- **Blue** `constantb`

#### Shininess `shininess`

Controls the specular highlights (glossyness) of an object. Higher settings are more glossy, like plastic or shiny metal. Lower settings give more of a matte finish.

#### Color Map `colormap`

Specifies a TOP texture that is multiplied by the results of all of the lighting calculations. The alpha of this map is used as a part of calculating the objects alpha. Clicking on the arrows to the right of the map field will open the Texture Sampling Parameters for Color Map. The other Map parameters below will have their own Texture Sampling Parameters as well.

- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Nearest** `nearest`
- **Linear** `linear`
- **Mipmap Linear** `mipmaplinear`
- **Off** `off`
- **2x** `2x`
- **4x** `4x`
- **8x** `8x`
- **16x** `16x`
- **Regular** `regular` - Regular Texture Coordinates used for the sampling
- **Screen Space Coordinates** `screenspace` - Screen Space Coordinates used for the sampling
- **Triplanar Mapping** `triplanar` - Triplanar mapping done via the triplanar texture coordinates. Works for POPs only. Triplanar Coordinates can be generated via the Texture Map POP.
- **Texture Layer 0 (uv[0-2])** `uv0`
- **Texture Layer 1 (uv[3-5])** `uv1`
- **Texture Layer 2 (uv[6-8])** `uv2`
- **Texture Layer 3 (uv[9-11])** `uv3`
- **Texture Layer 4 (uv[12-14])** `uv4`
- **Texture Layer 5 (uv[15-17])** `uv5`
- **Texture Layer 6 (uv[18-20])** `uv6`
- **Texture Layer 7 (uv[21-23])** `uv7`
- **Perspective Correct** `perspectivecorrect`
- **Linear (noperspective)** `linear`

#### Normal Map (Bump) `normalmap`

Uses a Normal Map from TOPs to create a 'bump map' effect. Bump-mapping simulates bumps or wrinkles in a surface to give it a 3D depth effect. Your geometry must have tangent attributes created for this feature to work (T[4]). Create these using the Attribute Create SOP.

- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Nearest** `nearest`
- **Linear** `linear`
- **Mipmap Linear** `mipmaplinear`
- **Off** `off`
- **2x** `2x`
- **4x** `4x`
- **8x** `8x`
- **16x** `16x`
- **Regular** `regular` - Regular Texture Coordinates used for the sampling
- **Screen Space Coordinates** `screenspace` - Screen Space Coordinates used for the sampling
- **Triplanar Mapping** `triplanar` - Triplanar mapping done via the triplanar texture coordinates. Works for POPs only. Triplanar Coordinates can be generated via the Texture Map POP.
- **Texture Layer 0 (uv[0-2])** `uv0`
- **Texture Layer 1 (uv[3-5])** `uv1`
- **Texture Layer 2 (uv[6-8])** `uv2`
- **Texture Layer 3 (uv[9-11])** `uv3`
- **Texture Layer 4 (uv[12-14])** `uv4`
- **Texture Layer 5 (uv[15-17])** `uv5`
- **Texture Layer 6 (uv[18-20])** `uv6`
- **Texture Layer 7 (uv[21-23])** `uv7`
- **Perspective Correct** `perspectivecorrect`
- **Linear (noperspective)** `linear`

#### Bump Scale `bumpscale`

A multiplier for the 'bump effect' created by the Normal Map parameter.

#### Enable Height Map `heightmapenable`

Enables height mapping.

#### Height Map `heightmap`

Specifies a height texture map. The height map is used in conjunction with the normal map to perform parallax mapping.

- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Nearest** `nearest`
- **Linear** `linear`
- **Mipmap Linear** `mipmaplinear`
- **Off** `off`
- **2x** `2x`
- **4x** `4x`
- **8x** `8x`
- **16x** `16x`
- **Regular** `regular` - Regular Texture Coordinates used for the sampling
- **Screen Space Coordinates** `screenspace` - Screen Space Coordinates used for the sampling
- **Triplanar Mapping** `triplanar` - Triplanar mapping done via the triplanar texture coordinates. Works for POPs only. Triplanar Coordinates can be generated via the Texture Map POP.
- **Texture Layer 0 (uv[0-2])** `uv0`
- **Texture Layer 1 (uv[3-5])** `uv1`
- **Texture Layer 2 (uv[6-8])** `uv2`
- **Texture Layer 3 (uv[9-11])** `uv3`
- **Texture Layer 4 (uv[12-14])** `uv4`
- **Texture Layer 5 (uv[15-17])** `uv5`
- **Texture Layer 6 (uv[18-20])** `uv6`
- **Texture Layer 7 (uv[21-23])** `uv7`
- **Perspective Correct** `perspectivecorrect`
- **Linear (noperspective)** `linear`
- **Luminance** `luminance`
- **Red** `red`
- **Green** `green`
- **Blue** `blue`
- **Alpha** `alpha`
- **RGB Average** `rgbaverage`
- **RGBA Average** `average`

#### Parallax Scale `parallaxscale`

Scale value applied to the height map. Can be used to increase or exaggerate the effect.

#### Parallax Occlusion `parallaxocclusion`

Enables parallax occlusion, an enhancement of the parallax mapping technique used with the height map. Parallax occlusion improves the quality of the texture offsetting in parallax mapping so that the higher parts of the height map appear to occlude the lower parts, giving a better illusion of height.

#### Displace Vertices `displaceverts`

When Enable Height Map above is On, setting Displace Vertices to On will enable true displacement mapping where the vertices of the geometry are displaced based on the Height Map texture and the parameters below.

#### Displace Scale `displacescale`

A multiplier for the displacement amount.

#### Displace Midpoint `displacemid`

Sets the middle point of displacement map as the start position for the displacement effect.

#### Diffuse Map `diffusemap`

Specifies a TOP that multiples the Diffuse Color. The object must have texture coordinates. The alpha of this map is ignored.

- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Nearest** `nearest`
- **Linear** `linear`
- **Mipmap Linear** `mipmaplinear`
- **Off** `off`
- **2x** `2x`
- **4x** `4x`
- **8x** `8x`
- **16x** `16x`
- **Regular** `regular` - Regular Texture Coordinates used for the sampling
- **Screen Space Coordinates** `screenspace` - Screen Space Coordinates used for the sampling
- **Triplanar Mapping** `triplanar` - Triplanar mapping done via the triplanar texture coordinates. Works for POPs only. Triplanar Coordinates can be generated via the Texture Map POP.
- **Texture Layer 0 (uv[0-2])** `uv0`
- **Texture Layer 1 (uv[3-5])** `uv1`
- **Texture Layer 2 (uv[6-8])** `uv2`
- **Texture Layer 3 (uv[9-11])** `uv3`
- **Texture Layer 4 (uv[12-14])** `uv4`
- **Texture Layer 5 (uv[15-17])** `uv5`
- **Texture Layer 6 (uv[18-20])** `uv6`
- **Texture Layer 7 (uv[21-23])** `uv7`
- **Perspective Correct** `perspectivecorrect`
- **Linear (noperspective)** `linear`

#### Specular Map `specmap`

Specifies a TOP texture that is multiplied with the Specular color parameter of the material. The object must have texture coordinates. The alpha of this map is ignored.

- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Nearest** `nearest`
- **Linear** `linear`
- **Mipmap Linear** `mipmaplinear`
- **Off** `off`
- **2x** `2x`
- **4x** `4x`
- **8x** `8x`
- **16x** `16x`
- **Regular** `regular` - Regular Texture Coordinates used for the sampling
- **Screen Space Coordinates** `screenspace` - Screen Space Coordinates used for the sampling
- **Triplanar Mapping** `triplanar` - Triplanar mapping done via the triplanar texture coordinates. Works for POPs only. Triplanar Coordinates can be generated via the Texture Map POP.
- **Texture Layer 0 (uv[0-2])** `uv0`
- **Texture Layer 1 (uv[3-5])** `uv1`
- **Texture Layer 2 (uv[6-8])** `uv2`
- **Texture Layer 3 (uv[9-11])** `uv3`
- **Texture Layer 4 (uv[12-14])** `uv4`
- **Texture Layer 5 (uv[15-17])** `uv5`
- **Texture Layer 6 (uv[18-20])** `uv6`
- **Texture Layer 7 (uv[21-23])** `uv7`
- **Perspective Correct** `perspectivecorrect`
- **Linear (noperspective)** `linear`

#### Emit Map `emitmap`

Specifies a TOP texture that is multiplied with the Emit color parameter of the material. The object must have texture coordinates. The alpha of this map is ignored.

- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Nearest** `nearest`
- **Linear** `linear`
- **Mipmap Linear** `mipmaplinear`
- **Off** `off`
- **2x** `2x`
- **4x** `4x`
- **8x** `8x`
- **16x** `16x`
- **Regular** `regular` - Regular Texture Coordinates used for the sampling
- **Screen Space Coordinates** `screenspace` - Screen Space Coordinates used for the sampling
- **Triplanar Mapping** `triplanar` - Triplanar mapping done via the triplanar texture coordinates. Works for POPs only. Triplanar Coordinates can be generated via the Texture Map POP.
- **Texture Layer 0 (uv[0-2])** `uv0`
- **Texture Layer 1 (uv[3-5])** `uv1`
- **Texture Layer 2 (uv[6-8])** `uv2`
- **Texture Layer 3 (uv[9-11])** `uv3`
- **Texture Layer 4 (uv[12-14])** `uv4`
- **Texture Layer 5 (uv[15-17])** `uv5`
- **Texture Layer 6 (uv[18-20])** `uv6`
- **Texture Layer 7 (uv[21-23])** `uv7`
- **Perspective Correct** `perspectivecorrect`
- **Linear (noperspective)** `linear`

#### Environment Map `envmap`

Uses a TOP texture to define an environment map for the material. Environment mapping simulates an object reflecting its surroundings. The TOP defined in this parameter is the texture that will be reflected. The Env Map is added to whatever the normal lighting will be, so to make an object purely reflective turn the Diffuse and Specular parameters to 0. This input expects a sphere map. An example of a sphere map can be found here. This input will also accept a cube map, created with the Cube Map TOP or the Render TOP's Render Cube Map parameter.

- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Nearest** `nearest`
- **Linear** `linear`
- **Mipmap Linear** `mipmaplinear`
- **Off** `off`
- **2x** `2x`
- **4x** `4x`
- **8x** `8x`
- **16x** `16x`

#### Environment Map Color `envmapcolor`

This color is multiplied with the texture specified by the Environment Map parameter above.

- **Red** `envmapcolorr`
- **Green** `envmapcolorg`
- **Blue** `envmapcolorb`

#### Environment Map Rotate `envmaprotate`

Rotate the texture specified by the Environment Map parameter above.

- **X** `envmaprotatex`
- **Y** `envmaprotatey`
- **Z** `envmaprotatez`

#### Environment Map 2D Type `envmaptype2d`

Select between using a sphere map or an equirectangular map as the Environment Map type.

- **Sphere Map** `spheremap`
- **Equirectangular** `equirect`

#### Polygon Front Faces `frontfacelit`

Controls how the polygon's normal is used to light the front face of the polygon. For more information refer to the Two-Sided Lighting article.

- **Use Per-Light(s) Parameter** `uselight`
- **Front Lit** `frontlit`
- **Back Lit** `backlit`

#### Polygon Back Faces `backfacelit`

Controls how the polygon's normal is used to light the back face of the polygon. For more information refer to the Two-Sided Lighting article.

- **Use Per-Light(s) Parameter** `uselight`
- **Front Lit** `frontlit`
- **Back Lit** `backlit`

#### Output Shader... `outputshader`

This button will bring up a dialog that will create a GLSL MAT and Text DATs with shader code that matches whatever effect this Phong MAT is currently creating. Since shaders are dependent on the number and type of lights, it will list some possible different shader choices, based on what lighting configurations have been used in the current system. If no shaders are listed in the dialog, it means no shader has been rendered in the current session of TouchDesigner. Turn on the viewer for the Phong MAT, or setup a render in a Render TOP. That will create/compile some shaders and will cause the list to be populated. For example if you want to see a shader that does shadow mapping, setup a render that does shadow mapping and you will see that come up in the list.

### Alpha Page

#### Alpha Map `alphamap`

This map multiplies the alpha of the object. It uses the red channel of the map, other channels are ignored.

- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Nearest** `nearest`
- **Linear** `linear`
- **Mipmap Linear** `mipmaplinear`
- **Off** `off`
- **2x** `2x`
- **4x** `4x`
- **8x** `8x`
- **16x** `16x`
- **Regular** `regular` - Regular Texture Coordinates used for the sampling
- **Screen Space Coordinates** `screenspace` - Screen Space Coordinates used for the sampling
- **Triplanar Mapping** `triplanar` - Triplanar mapping done via the triplanar texture coordinates. Works for POPs only. Triplanar Coordinates can be generated via the Texture Map POP.
- **Texture Layer 0 (uv[0-2])** `uv0`
- **Texture Layer 1 (uv[3-5])** `uv1`
- **Texture Layer 2 (uv[6-8])** `uv2`
- **Texture Layer 3 (uv[9-11])** `uv3`
- **Texture Layer 4 (uv[12-14])** `uv4`
- **Texture Layer 5 (uv[15-17])** `uv5`
- **Texture Layer 6 (uv[18-20])** `uv6`
- **Texture Layer 7 (uv[21-23])** `uv7`
- **Perspective Correct** `perspectivecorrect`
- **Linear (noperspective)** `linear`

#### Uniform Alpha `alphamode`

Turning this off will make the alpha change depending on orientation of each polygon's normal compared to the camera. Normals that are pointing at the camera will results in the polygon having an alpha of Alpha Front. Normals that are perpendicular to the camera (facing sideways/up/down) will have Alpha Side for their alpha.

#### Alpha Front `alphafront`

The opacity of the material. This parameter is multiplied by point alpha of the object (as will as any other alpha source).

#### Alpha Side `alphaside`

This is used for non-uniform alpha. It is the alpha value polygons that are facing away from the camera will get.

#### Alpha Rolloff `rolloff`

Controls how the alpha changes from Alpha Front to Alpha Side.

#### Post-Mult Color by Alpha `postmultalpha`

At the end of all of the calculations, the color (RGB) is multiplied by the calculated alpha. You can stop this from happening by turning off this toggle.

#### Mult Alpha by Light Luminance `alphamultlight`

When this is enabled, the luminance of the lighting will be multiplied by the alpha, to decrease/increase it.

### Multi-Texturing Page

#### Multi-Texturing (Disables Color Map) `multitexturing`

Enables multi-texturing. This disables the Color Map parameter.

#### Texture 1 `texture1`

You can specify up to 4 textures for multi-texturing.

- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Nearest** `nearest`
- **Linear** `linear`
- **Mipmap Linear** `mipmaplinear`
- **Off** `off`
- **2x** `2x`
- **4x** `4x`
- **8x** `8x`
- **16x** `16x`
- **Perspective Correct** `perspectivecorrect`
- **Linear (noperspective)** `linear`
- **Regular** `regular` - Regular Texture Coordinates used for the sampling
- **Screen Space Coordinates** `screenspace` - Screen Space Coordinates used for the sampling
- **Triplanar Mapping** `triplanar` - Triplanar mapping done via the triplanar texture coordinates. Works for POPs only. Triplanar Coordinates can be generated via the Texture Map POP.
- **Texture Layer 0 (uv[0-2])** `uv0`
- **Texture Layer 1 (uv[3-5])** `uv1`
- **Texture Layer 2 (uv[6-8])** `uv2`
- **Texture Layer 3 (uv[9-11])** `uv3`
- **Texture Layer 4 (uv[12-14])** `uv4`
- **Texture Layer 5 (uv[15-17])** `uv5`
- **Texture Layer 6 (uv[18-20])** `uv6`
- **Texture Layer 7 (uv[21-23])** `uv7`

#### Texture 2 `texture2`

You can specify up to 4 textures for multi-texturing.

- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Nearest** `nearest`
- **Linear** `linear`
- **Mipmap Linear** `mipmaplinear`
- **Off** `off`
- **2x** `2x`
- **4x** `4x`
- **8x** `8x`
- **16x** `16x`
- **Perspective Correct** `perspectivecorrect`
- **Linear (noperspective)** `linear`
- **Regular** `regular` - Regular Texture Coordinates used for the sampling
- **Screen Space Coordinates** `screenspace` - Screen Space Coordinates used for the sampling
- **Triplanar Mapping** `triplanar` - Triplanar mapping done via the triplanar texture coordinates. Works for POPs only. Triplanar Coordinates can be generated via the Texture Map POP.
- **Texture Layer 0 (uv[0-2])** `uv0`
- **Texture Layer 1 (uv[3-5])** `uv1`
- **Texture Layer 2 (uv[6-8])** `uv2`
- **Texture Layer 3 (uv[9-11])** `uv3`
- **Texture Layer 4 (uv[12-14])** `uv4`
- **Texture Layer 5 (uv[15-17])** `uv5`
- **Texture Layer 6 (uv[18-20])** `uv6`
- **Texture Layer 7 (uv[21-23])** `uv7`

#### Texture 3 `texture3`

You can specify up to 4 textures for multi-texturing.

- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Nearest** `nearest`
- **Linear** `linear`
- **Mipmap Linear** `mipmaplinear`
- **Off** `off`
- **2x** `2x`
- **4x** `4x`
- **8x** `8x`
- **16x** `16x`
- **Perspective Correct** `perspectivecorrect`
- **Linear (noperspective)** `linear`
- **Regular** `regular` - Regular Texture Coordinates used for the sampling
- **Screen Space Coordinates** `screenspace` - Screen Space Coordinates used for the sampling
- **Triplanar Mapping** `triplanar` - Triplanar mapping done via the triplanar texture coordinates. Works for POPs only. Triplanar Coordinates can be generated via the Texture Map POP.
- **Texture Layer 0 (uv[0-2])** `uv0`
- **Texture Layer 1 (uv[3-5])** `uv1`
- **Texture Layer 2 (uv[6-8])** `uv2`
- **Texture Layer 3 (uv[9-11])** `uv3`
- **Texture Layer 4 (uv[12-14])** `uv4`
- **Texture Layer 5 (uv[15-17])** `uv5`
- **Texture Layer 6 (uv[18-20])** `uv6`
- **Texture Layer 7 (uv[21-23])** `uv7`

#### Texture 4 `texture4`

You can specify up to 4 textures for multi-texturing.

- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Nearest** `nearest`
- **Linear** `linear`
- **Mipmap Linear** `mipmaplinear`
- **Off** `off`
- **2x** `2x`
- **4x** `4x`
- **8x** `8x`
- **16x** `16x`
- **Perspective Correct** `perspectivecorrect`
- **Linear (noperspective)** `linear`
- **Regular** `regular` - Regular Texture Coordinates used for the sampling
- **Screen Space Coordinates** `screenspace` - Screen Space Coordinates used for the sampling
- **Triplanar Mapping** `triplanar` - Triplanar mapping done via the triplanar texture coordinates. Works for POPs only. Triplanar Coordinates can be generated via the Texture Map POP.
- **Texture Layer 0 (uv[0-2])** `uv0`
- **Texture Layer 1 (uv[3-5])** `uv1`
- **Texture Layer 2 (uv[6-8])** `uv2`
- **Texture Layer 3 (uv[9-11])** `uv3`
- **Texture Layer 4 (uv[12-14])** `uv4`
- **Texture Layer 5 (uv[15-17])** `uv5`
- **Texture Layer 6 (uv[18-20])** `uv6`
- **Texture Layer 7 (uv[21-23])** `uv7`

#### GLSL Expression `multitexexpr`

GLSL code that combines the texture images (look to the start of this section for more details). This parameter can be left blank (which means the maps will just be multiplied together).

### Rim Page

#### Rim Light `rimlight`

Sequence of rim light info Enable rimlight0enable - Enables this rim light. Color Map rimlight0map - ⊞ - This map will multiple the calculated rim light color. Color rimlight0color - ⊞ - The color of the rim light. Center rimlight0center - The center of the rim lights location, situated somewhere on a 360 degree circle. Width rimlight0width - How far from the center the rim light extends. Strength rimlight0strength - Controls the brightness of the rim light. Strength Ramp rimlight0strengthramp - You can specify a horizontal ramp (it will sample the texture at v = 0.5), which controls the the rim lights strength.

- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Nearest** `nearest`
- **Linear** `linear`
- **Mipmap Linear** `mipmaplinear`
- **Off** `off`
- **2x** `2x`
- **4x** `4x`
- **8x** `8x`
- **16x** `16x`
- **Regular** `regular` - Regular Texture Coordinates used for the sampling
- **Screen Space Coordinates** `screenspace` - Screen Space Coordinates used for the sampling
- **Triplanar Mapping** `triplanar` - Triplanar mapping done via the triplanar texture coordinates. Works for POPs only. Triplanar Coordinates can be generated via the Texture Map POP.
- **Texture Layer 0 (uv[0-2])** `uv0`
- **Texture Layer 1 (uv[3-5])** `uv1`
- **Texture Layer 2 (uv[6-8])** `uv2`
- **Texture Layer 3 (uv[9-11])** `uv3`
- **Texture Layer 4 (uv[12-14])** `uv4`
- **Texture Layer 5 (uv[15-17])** `uv5`
- **Texture Layer 6 (uv[18-20])** `uv6`
- **Texture Layer 7 (uv[21-23])** `uv7`
- **Perspective Correct** `perspectivecorrect`
- **Linear (noperspective)** `linear`
- **Red** `rimlight0colorr`
- **Green** `rimlight0colorg`
- **Blue** `rimlight0colorb`

### Advanced Page

#### Shadow Strength `shadowstrength`

This parameter will control how much being in a shadow will change the color of the lighting. At 1 the object will take on the Shadow Color parameter, at 0 it will behave as if it's not in a shadow, even if it is.

#### Shadow Color `shadowcolor`

The color that will be used in shadowed areas.

- **Red** `shadowcolorr`
- **Green** `shadowcolorg`
- **Blue** `shadowcolorb`

#### Darkness Emit `darknessemit`

The Phong MAT calculates the current brightness of color of the objects, after taking into account lights, rim lights, emission etc. It then uses this brightness (between 0-1) and fades in the Darkness Emit Color. The darker the area, the more of the darkness emit color that will be applied.

#### Darkness Emit Color `darknessemitcolor`

The color that is used for areas that are in darkness.

- **Red** `darknessemitcolorr`
- **Green** `darknessemitcolorg`
- **Blue** `darknessemitcolorb`

#### Darkness Emit Map `darknessemitmap`

This map multiplies the Darkness Emit Color. This maps alpha is not used.

- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Hold** `hold`
- **Zero** `zero`
- **Repeat** `repeat`
- **Mirror** `mirror`
- **Nearest** `nearest`
- **Linear** `linear`
- **Mipmap Linear** `mipmaplinear`
- **Off** `off`
- **2x** `2x`
- **4x** `4x`
- **8x** `8x`
- **16x** `16x`
- **Regular** `regular` - Regular Texture Coordinates used for the sampling
- **Screen Space Coordinates** `screenspace` - Screen Space Coordinates used for the sampling
- **Triplanar Mapping** `triplanar` - Triplanar mapping done via the triplanar texture coordinates. Works for POPs only. Triplanar Coordinates can be generated via the Texture Map POP.
- **Texture Layer 0 (uv[0-2])** `uv0`
- **Texture Layer 1 (uv[3-5])** `uv1`
- **Texture Layer 2 (uv[6-8])** `uv2`
- **Texture Layer 3 (uv[9-11])** `uv3`
- **Texture Layer 4 (uv[12-14])** `uv4`
- **Texture Layer 5 (uv[15-17])** `uv5`
- **Texture Layer 6 (uv[18-20])** `uv6`
- **Texture Layer 7 (uv[21-23])** `uv7`
- **Perspective Correct** `perspectivecorrect`
- **Linear (noperspective)** `linear`

#### Secondary Specular `spec2`

Adds a secondary specular highlight color.

- **Red** `spec2r`
- **Green** `spec2g`
- **Blue** `spec2b`

#### Secondary Shininess `shininess2`

Controls the secondary specular highlights (glossyness) of an object. Higher settings are more glossy, like plastic or shiny metal. Lower settings give more of a matte finish.

#### Write Camera Space Depth to Alpha `writecameradepthtoalpha`

This causes the camera space depth of the pixel to be written to the alpha channel of the output TOP. This value can be useful for post-processing effects, but ofcourse you will not have the result of all the alpha calculations if you turn this on (although they'll get used to multiply the output color, assuming Post-Mult Color by Alpha is enabled.

#### Apply Point Color `applypointcolor`

Normally the color attribute (Cd[4]) coming from the SOP is used in the lighting calculation, you can turn off using the color attribute by un-checking this parameter.

#### Instance Texture `instancetexture`

When provider per-instance textures in the Geometry COMP, this parameter selects which map the instance texture will be applied as.

- **Color Map** `colormap`
- **Normal Map** `normalmap`
- **Diffuse Map** `diffusemap`
- **Specular Map** `specmap`
- **Emit Map** `emitmap`
- **Alpha Map** `alphamap`
- **Darkness Emit Map** `darknessemitmap`
- **Color Map** `rimlight0map`

#### Color Buffer `color`

Sequence of color buffers RGB color0output - ⊞ - Allows sending things like normals or diffuse color to different Render TOP color buffers in a single pass.

- **Zero** `zero`
- **One** `one`
- **World Space Position** `worldspaceposition`
- **World Space Normal** `worldspacenormal`
- **Camera Space Position** `cameraspaceposition`
- **Camera Space Normal** `cameraspacenormal`
- **Point Color** `pointcolor`
- **Texture Coord 0** `texturecoord0`
- **Diffuse Map** `diffusemap`
- **Normal Map** `normalmap`
- **Spec Map** `specmap`
- **Emit Map** `emitmap`
- **Emit Color** `emitcolor`
- **Diffuse Color** `diffcolor`
- **Diffuse Lighting** `difflighting`
- **Final Diffuse Color** `finaldiffcolor`
- **Specular Color** `speccolor`
- **Specular 2 Color** `spec2color`
- **Specular Lighting** `speclighting`
- **Specular 2 Lighting** `spec2lighting`
- **Final Specular Color** `finalspeccolor`
- **Shadow Strength** `shadowstrength`
- **Normalized Shadow Strength** `normalizedshadowstrength`

### Deform Page

#### Deform `dodeform`

Enables deforms on this material.

#### Get Bone Data: `deformdata`

Specifies where the deform bone data will be obtained.

- **From a SOP** `sop`
- **From another MAT** `mat`
- **From a DeformIn MAT** `deformin`

#### SOP with Capture Data `targetsop`

Specifies the SOP that contains the deform capture attributes.

#### pCaptPath Attrib `pcaptpath`

Specifies the name of the pCaptPath attribute to use. When your geometry has been put through a Bone Group SOP, the attributes will be split into names like pCaptPath0, pCaptPath1. You can only render 1 bone group at a time, so this should match the group you are rendering with this material.

#### pCaptData Attrib `pcaptdata`

Much like pCaptPath Attrib.

#### Skeleton Root Path `skelrootpath`

Specifies the path to the COMP where the root of the skeleton is located.

#### MAT `mat`

When obtaining deform data from a MAT or a Deform In MAT, this is where that MAT is specified.

### Common Page

#### Blending (Transparency) `blending`

This toggle enables and disables blending. However see the wiki article Transparency.

#### Blend Operation `blendop`

- **Add** `add`
- **Subtract** `subtract`
- **Reverse Subtract** `revsubtract`
- **Minimum** `minimum`
- **Maximum** `maximum`

#### Source Color * `srcblend`

This value is multiplied by the color value of the pixel that is being written to the Color-Buffer (also know as the Source Color).

- **Zero** `zero`
- **Dest Color** `dcol`
- **One Minus Dest Color** `omdcol`
- **Source Alpha** `sa`
- **One Minus Source Alpha** `omsa`
- **Dest Alpha** `da`
- **One Minus Dest Alpha** `omda`
- **Source Alpha Saturate** `sas`
- **One** `one`
- **Constant Color** `constantcol`
- **One Minus Constant Color** `omconstantcol`
- **Constant Alpha** `constanta`
- **One Minus Constant Alpha** `omconstanta`

#### Destination Color * `destblend`

This value is multiplied by the color value of the pixel currently in the Color-Buffer (also known as the Destination Color).

- **One** `one`
- **Src Color** `scol`
- **One Minus Src Color** `omscol`
- **Source Alpha** `sa`
- **One Minus Source Alpha** `omsa`
- **Dest Alpha** `da`
- **One Minus Dest Alpha** `omda`
- **Zero** `zero`
- **Dest Color** `dcol`
- **One Minus Dest Color** `omdcol`
- **Source Alpha Saturate** `sas`
- **Constant Color** `constantcol`
- **One Minus Constant Color** `omconstantcol`
- **Constant Alpha** `constanta`
- **One Minus Constant Alpha** `omconstanta`

#### Separate Alpha Function `separatealphafunc`

This toggle enables and disables separate blending options for the alpha values.

#### Alpha Blend Operation `blendopa`

- **Add** `add`
- **Subtract** `subtract`
- **Reverse Subtract** `revsubtract`
- **Minimum** `minimum`
- **Maximum** `maximum`

#### Source Alpha * `srcblenda`

This value is multiplied by the alpha value of the pixel that is being written to the Color-Buffer (also know as the Source Alpha).

- **Zero** `zero`
- **Dest Color** `dcol`
- **One Minus Dest Color** `omdcol`
- **Source Alpha** `sa`
- **One Minus Source Alpha** `omsa`
- **Dest Alpha** `da`
- **One Minus Dest Alpha** `omda`
- **Source Alpha Saturate** `sas`
- **One** `one`
- **Constant Color** `constantcol`
- **One Minus Constant Color** `omconstantcol`
- **Constant Alpha** `constanta`
- **One Minus Constant Alpha** `omconstanta`

#### Destination Alpha * `destblenda`

This value is multiplied by the alpha value of the pixel currently in the Color-Buffer (also known as the Destination Alpha).

- **One** `one`
- **Src Color** `scol`
- **One Minus Src Color** `omscol`
- **Source Alpha** `sa`
- **One Minus Source Alpha** `omsa`
- **Dest Alpha** `da`
- **One Minus Dest Alpha** `omda`
- **Zero** `zero`
- **Dest Color** `dcol`
- **One Minus Dest Color** `omdcol`
- **Source Alpha Saturate** `sas`
- **Constant Color** `constantcol`
- **One Minus Constant Color** `omconstantcol`
- **Constant Alpha** `constanta`
- **One Minus Constant Alpha** `omconstanta`

#### Blend Constant Color `blendconstant`

- **Blend Constant Color** `blendconstantr`
- **Blend Constant Color** `blendconstantg`
- **Blend Constant Color** `blendconstantb`

#### Blend Constant Alpha `blendconstanta`

#### Legacy Alpha Behavior `legacyalphabehavior`

#### Post-Mult Color by Alpha `postmultalpha`

Multiplies the color by alpha after all other operations have taken place.

#### Point Color Pre-Multiply `pointcolorpremult`

- **Already Pre-Multiplied By Alpha** `alreadypremult`
- **Pre-Multiply By Alpha in Shader** `premultinshader`

#### Depth Test `depthtest`

Enables and disables the Depth-Test. If the depth-test is disabled, depths values aren't written to the Depth-Buffer.

#### Depth Test Function `depthfunc`

The depth value of the pixel being drawn is compared to the depth value currently in the depth-buffer using this function. If the test passes then the pixel is drawn to the Frame-Buffer. If the test fails the pixel is discarded and no changes are made to the Frame-Buffer.

- **Less Than** `less`
- **Less Than or Equal** `lessorequal`
- **Equal** `equal`
- **Greater Than** `greater`
- **Greater Than or Equal** `greaterorequal`
- **Not Equal** `notequal`
- **Always** `always`

#### Write Depth Values `depthwriting`

If Write Depth Values is on, pixels that pass the depth-test will write their depth value to the Depth-Buffer. If this isn't on then no changes will be made to the Depth-Buffer, regardless of if the pixels drawn pass or fail the depth-test.

#### Discard Pixels Based on Alpha `alphatest`

This enables or disables the pixel alpha test.

#### Keep Pixels with Alpha `alphafunc`

This menu works in conjunction with the Alpha Threshold parameter below in determining which pixels to keep based on their alpha value.

- **Less Than** `less`
- **Less Than or Equal** `lessorequal`
- **Greater Than** `greater`
- **Greater Than or Equal** `greaterorequal`

#### Alpha Threshold `alphathreshold`

This value is what the pixel's alpha is compared to to determine if the pixel should be drawn. Pixels with alpha greater than the Alpha Threshold will be drawn. Pixels with alpha less than or equal to the Alpha Threshold will not be drawn.

#### Wire Frame `wireframe`

Enables and disables wire-frame rendering with the option of OpenGL Tesselated or Topology based wireframes.

- **Off** `off`
- **OpenGL Tesselated Wire Frame** `tesselated`
- **Topology Wire Frame** `topology`

#### Line Width `wirewidth`

This value is the width that the wires will be. This value is in pixels.

#### Cull Face `cullface`

Selects which faces to render.

- **Use Render Setting** `userender` - Use the render settings found in the Render or Render Pass TOP.
- **Neither** `neither` - Do not cull any faces, render everything.
- **Back Faces** `backfaces` - Cull back faces, render front faces.
- **Front Faces** `frontfaces` - Cull front faces, render back faces.
- **Both Faces** `bothfaces` - Cull both faces, render nothing.

#### Polygon Depth Offset `polygonoffset`

Turns on the polygon offset feature.

#### Offset Factor `polygonoffsetfactor`

#### Offset Units `polygonoffsetunits`

#### Parameter Color Space `parmcolorspace`

Controls how all color parameters on this node are interpreted. The color values as treated as being in the selected color space, and are converted to the Working Color Space before they are used as part of the node's operation. Note that this does not change the color space of the node itself, as that is always in the Working Color Space.

- **sRGB** `srgb` - sRGB color space, with sRGB transfer function. Considered an SDR color space with respect to Reference White.
- **sRGB - Linear** `srgblinear` - sRGB color space, with linear transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.601 (NTSC)** `rec601ntsc` - Rec.601 with NTSC primaries color space, with Rec.601 transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.709** `rec709` - Rec.709 color space, with Rec.709 (same as Rec.2020) transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.2020** `rec2020` - Rec.2020 color space, with Rec.2020 (same as Rec.709) transfer function. Considered an HDR color space with respect to Reference White.
- **DCI-P3** `dcip3` - DCI-P3 color space, with D65 white point and 2.6 gamma transfer function. Considered an HDR color space with respect to Reference White.
- **DCI-P3 (D60)** `dcip3d60` - DCI-P3 "D60 sim" color space, with D60 white point, and 2.6 gamma transfer function. Considered an HDR color space with respect to Reference White.
- **Display-P3 (D65)** `displayp3d65` - Display-P3 color space, with D65 white point, and sRGB gamma transfer function. Considered an HDR color space with respect to Reference White.
- **ACES2065-1** `aces2065-1` - ACES 2065-1 (also known as ACES AP0) color space, with a linear gamma transfer function. Considered an HDR color space with respect to Reference White.
- **ACEScg** `acescg` - ACEScg (also known as ACES AP1) color space, with a linear gamma transfer function. Considered an HDR color space with respect to Reference White.
- **Passthrough** `passthrough` - When selected, the color values will be used as-is in the operation, without any modification or attempt to convert them into the Working Color Space.

#### Parameter Reference White `parmreferencewhite`

When converting a parameter color value to the Working Color Space, this controls how it should be treated with respect to Reference White. If the Working Color Space is the same Reference White, then no adjustment is done. If they are different, then the Reference White level (brightness) of this color will be adjusted to the range expected by the Working Color Space. For example if the project is set to have a SDR Reference White of 120 nits, and the HDR Reference White is 80 nits, then a color of (1, 1, 1), which is 120 nits in the SDR color space, will be converted to be (1.5, 1.5, 1.5), which is 120 nits still in the HDR Working Color Space.

- **Default For Color Space** `default` - Will use either the SDR or the HDR Reference White, based on the color space selected.
- **Use Parent Panel** `useparent` - Will use the Reference White that the parent panel has selected. If the top-level panel also has 'Use Parent' selected, then 'UI Reference White' will be used.
- **Standard (SDR)** `sdr` - Will treat the Parameter Color Space as SDR for it's reference white value.
- **High (HDR)** `hdr` - Will treat the Parameter Color Space as HDR for it's reference white value.
- **UI** `ui` - Will treat the Parameter Color Space as UI for it's reference white value. This uses the 'UI Reference White Nits' value for it's brightness.

#### Parameter Color Space `parmcolorspace`

Controls how all color parameters on this node are interpreted. The color values as treated as being in the selected color space, and are converted to the Working Color Space before they are used as part of the node's operation. Note that this does not change the color space of the node itself, as that is always in the Working Color Space.

- **sRGB** `srgb` - sRGB color space, with sRGB transfer function. Considered an SDR color space with respect to Reference White.
- **sRGB - Linear** `srgblinear` - sRGB color space, with linear transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.601 (NTSC)** `rec601ntsc` - Rec.601 with NTSC primaries color space, with Rec.601 transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.709** `rec709` - Rec.709 color space, with Rec.709 (same as Rec.2020) transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.2020** `rec2020` - Rec.2020 color space, with Rec.2020 (same as Rec.709) transfer function. Considered an HDR color space with respect to Reference White.
- **DCI-P3** `dcip3` - DCI-P3 color space, with D65 white point and 2.6 gamma transfer function. Considered an HDR color space with respect to Reference White.
- **DCI-P3 (D60)** `dcip3d60` - DCI-P3 "D60 sim" color space, with D60 white point, and 2.6 gamma transfer function. Considered an HDR color space with respect to Reference White.
- **Display-P3 (D65)** `displayp3d65` - Display-P3 color space, with D65 white point, and sRGB gamma transfer function. Considered an HDR color space with respect to Reference White.
- **ACES2065-1** `aces2065-1` - ACES 2065-1 (also known as ACES AP0) color space, with a linear gamma transfer function. Considered an HDR color space with respect to Reference White.
- **ACEScg** `acescg` - ACEScg (also known as ACES AP1) color space, with a linear gamma transfer function. Considered an HDR color space with respect to Reference White.
- **Passthrough** `passthrough` - When selected, the color values will be used as-is in the operation, without any modification or attempt to convert them into the Working Color Space.

#### Parameter Reference White `parmreferencewhite`

When converting a parameter color value to the Working Color Space, this controls how it should be treated with respect to Reference White. If the Working Color Space is the same Reference White, then no adjustment is done. If they are different, then the Reference White level (brightness) of this color will be adjusted to the range expected by the Working Color Space. For example if the project is set to have a SDR Reference White of 120 nits, and the HDR Reference White is 80 nits, then a color of (1, 1, 1), which is 120 nits in the SDR color space, will be converted to be (1.5, 1.5, 1.5), which is 120 nits still in the HDR Working Color Space.

- **Default For Color Space** `default` - Will use either the SDR or the HDR Reference White, based on the color space selected.
- **Use Parent Panel** `useparent` - Will use the Reference White that the parent panel has selected. If the top-level panel also has 'Use Parent' selected, then 'UI Reference White' will be used.
- **Standard (SDR)** `sdr` - Will treat the Parameter Color Space as SDR for it's reference white value.
- **High (HDR)** `hdr` - Will treat the Parameter Color Space as HDR for it's reference white value.
- **UI** `ui` - Will treat the Parameter Color Space as UI for it's reference white value. This uses the 'UI Reference White Nits' value for it's brightness.

#### Parameter Color Space `parmcolorspace`

Controls how all color parameters on this node are interpreted. The color values as treated as being in the selected color space, and are converted to the Working Color Space before they are used as part of the node's operation. Note that this does not change the color space of the node itself, as that is always in the Working Color Space.

- **sRGB** `srgb` - sRGB color space, with sRGB transfer function. Considered an SDR color space with respect to Reference White.
- **sRGB - Linear** `srgblinear` - sRGB color space, with linear transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.601 (NTSC)** `rec601ntsc` - Rec.601 with NTSC primaries color space, with Rec.601 transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.709** `rec709` - Rec.709 color space, with Rec.709 (same as Rec.2020) transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.2020** `rec2020` - Rec.2020 color space, with Rec.2020 (same as Rec.709) transfer function. Considered an HDR color space with respect to Reference White.
- **DCI-P3** `dcip3` - DCI-P3 color space, with D65 white point and 2.6 gamma transfer function. Considered an HDR color space with respect to Reference White.
- **DCI-P3 (D60)** `dcip3d60` - DCI-P3 "D60 sim" color space, with D60 white point, and 2.6 gamma transfer function. Considered an HDR color space with respect to Reference White.
- **Display-P3 (D65)** `displayp3d65` - Display-P3 color space, with D65 white point, and sRGB gamma transfer function. Considered an HDR color space with respect to Reference White.
- **ACES2065-1** `aces2065-1` - ACES 2065-1 (also known as ACES AP0) color space, with a linear gamma transfer function. Considered an HDR color space with respect to Reference White.
- **ACEScg** `acescg` - ACEScg (also known as ACES AP1) color space, with a linear gamma transfer function. Considered an HDR color space with respect to Reference White.
- **Passthrough** `passthrough` - When selected, the color values will be used as-is in the operation, without any modification or attempt to convert them into the Working Color Space.

#### Parameter Reference White `parmreferencewhite`

When converting a parameter color value to the Working Color Space, this controls how it should be treated with respect to Reference White. If the Working Color Space is the same Reference White, then no adjustment is done. If they are different, then the Reference White level (brightness) of this color will be adjusted to the range expected by the Working Color Space. For example if the project is set to have a SDR Reference White of 120 nits, and the HDR Reference White is 80 nits, then a color of (1, 1, 1), which is 120 nits in the SDR color space, will be converted to be (1.5, 1.5, 1.5), which is 120 nits still in the HDR Working Color Space.

- **Default For Color Space** `default` - Will use either the SDR or the HDR Reference White, based on the color space selected.
- **Use Parent Panel** `useparent` - Will use the Reference White that the parent panel has selected. If the top-level panel also has 'Use Parent' selected, then 'UI Reference White' will be used.
- **Standard (SDR)** `sdr` - Will treat the Parameter Color Space as SDR for it's reference white value.
- **High (HDR)** `hdr` - Will treat the Parameter Color Space as HDR for it's reference white value.
- **UI** `ui` - Will treat the Parameter Color Space as UI for it's reference white value. This uses the 'UI Reference White Nits' value for it's brightness.

#### Parameter Color Space `parmcolorspace`

Controls how all color parameters on this node are interpreted. The color values as treated as being in the selected color space, and are converted to the Working Color Space before they are used as part of the node's operation. Note that this does not change the color space of the node itself, as that is always in the Working Color Space.

- **sRGB** `srgb` - sRGB color space, with sRGB transfer function. Considered an SDR color space with respect to Reference White.
- **sRGB - Linear** `srgblinear` - sRGB color space, with linear transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.601 (NTSC)** `rec601ntsc` - Rec.601 with NTSC primaries color space, with Rec.601 transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.709** `rec709` - Rec.709 color space, with Rec.709 (same as Rec.2020) transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.2020** `rec2020` - Rec.2020 color space, with Rec.2020 (same as Rec.709) transfer function. Considered an HDR color space with respect to Reference White.
- **DCI-P3** `dcip3` - DCI-P3 color space, with D65 white point and 2.6 gamma transfer function. Considered an HDR color space with respect to Reference White.
- **DCI-P3 (D60)** `dcip3d60` - DCI-P3 "D60 sim" color space, with D60 white point, and 2.6 gamma transfer function. Considered an HDR color space with respect to Reference White.
- **Display-P3 (D65)** `displayp3d65` - Display-P3 color space, with D65 white point, and sRGB gamma transfer function. Considered an HDR color space with respect to Reference White.
- **ACES2065-1** `aces2065-1` - ACES 2065-1 (also known as ACES AP0) color space, with a linear gamma transfer function. Considered an HDR color space with respect to Reference White.
- **ACEScg** `acescg` - ACEScg (also known as ACES AP1) color space, with a linear gamma transfer function. Considered an HDR color space with respect to Reference White.
- **Passthrough** `passthrough` - When selected, the color values will be used as-is in the operation, without any modification or attempt to convert them into the Working Color Space.

#### Parameter Reference White `parmreferencewhite`

When converting a parameter color value to the Working Color Space, this controls how it should be treated with respect to Reference White. If the Working Color Space is the same Reference White, then no adjustment is done. If they are different, then the Reference White level (brightness) of this color will be adjusted to the range expected by the Working Color Space. For example if the project is set to have a SDR Reference White of 120 nits, and the HDR Reference White is 80 nits, then a color of (1, 1, 1), which is 120 nits in the SDR color space, will be converted to be (1.5, 1.5, 1.5), which is 120 nits still in the HDR Working Color Space.

- **Default For Color Space** `default` - Will use either the SDR or the HDR Reference White, based on the color space selected.
- **Use Parent Panel** `useparent` - Will use the Reference White that the parent panel has selected. If the top-level panel also has 'Use Parent' selected, then 'UI Reference White' will be used.
- **Standard (SDR)** `sdr` - Will treat the Parameter Color Space as SDR for it's reference white value.
- **High (HDR)** `hdr` - Will treat the Parameter Color Space as HDR for it's reference white value.
- **UI** `ui` - Will treat the Parameter Color Space as UI for it's reference white value. This uses the 'UI Reference White Nits' value for it's brightness.

#### Parameter Color Space `parmcolorspace`

Controls how all color parameters on this node are interpreted. The color values as treated as being in the selected color space, and are converted to the Working Color Space before they are used as part of the node's operation. Note that this does not change the color space of the node itself, as that is always in the Working Color Space.

- **sRGB** `srgb` - sRGB color space, with sRGB transfer function. Considered an SDR color space with respect to Reference White.
- **sRGB - Linear** `srgblinear` - sRGB color space, with linear transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.601 (NTSC)** `rec601ntsc` - Rec.601 with NTSC primaries color space, with Rec.601 transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.709** `rec709` - Rec.709 color space, with Rec.709 (same as Rec.2020) transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.2020** `rec2020` - Rec.2020 color space, with Rec.2020 (same as Rec.709) transfer function. Considered an HDR color space with respect to Reference White.
- **DCI-P3** `dcip3` - DCI-P3 color space, with D65 white point and 2.6 gamma transfer function. Considered an HDR color space with respect to Reference White.
- **DCI-P3 (D60)** `dcip3d60` - DCI-P3 "D60 sim" color space, with D60 white point, and 2.6 gamma transfer function. Considered an HDR color space with respect to Reference White.
- **Display-P3 (D65)** `displayp3d65` - Display-P3 color space, with D65 white point, and sRGB gamma transfer function. Considered an HDR color space with respect to Reference White.
- **ACES2065-1** `aces2065-1` - ACES 2065-1 (also known as ACES AP0) color space, with a linear gamma transfer function. Considered an HDR color space with respect to Reference White.
- **ACEScg** `acescg` - ACEScg (also known as ACES AP1) color space, with a linear gamma transfer function. Considered an HDR color space with respect to Reference White.
- **Passthrough** `passthrough` - When selected, the color values will be used as-is in the operation, without any modification or attempt to convert them into the Working Color Space.

#### Parameter Reference White `parmreferencewhite`

When converting a parameter color value to the Working Color Space, this controls how it should be treated with respect to Reference White. If the Working Color Space is the same Reference White, then no adjustment is done. If they are different, then the Reference White level (brightness) of this color will be adjusted to the range expected by the Working Color Space. For example if the project is set to have a SDR Reference White of 120 nits, and the HDR Reference White is 80 nits, then a color of (1, 1, 1), which is 120 nits in the SDR color space, will be converted to be (1.5, 1.5, 1.5), which is 120 nits still in the HDR Working Color Space.

- **Default For Color Space** `default` - Will use either the SDR or the HDR Reference White, based on the color space selected.
- **Use Parent Panel** `useparent` - Will use the Reference White that the parent panel has selected. If the top-level panel also has 'Use Parent' selected, then 'UI Reference White' will be used.
- **Standard (SDR)** `sdr` - Will treat the Parameter Color Space as SDR for it's reference white value.
- **High (HDR)** `hdr` - Will treat the Parameter Color Space as HDR for it's reference white value.
- **UI** `ui` - Will treat the Parameter Color Space as UI for it's reference white value. This uses the 'UI Reference White Nits' value for it's brightness.

#### Parameter Color Space `parmcolorspace`

Controls how all color parameters on this node are interpreted. The color values as treated as being in the selected color space, and are converted to the Working Color Space before they are used as part of the node's operation. Note that this does not change the color space of the node itself, as that is always in the Working Color Space.

- **sRGB** `srgb` - sRGB color space, with sRGB transfer function. Considered an SDR color space with respect to Reference White.
- **sRGB - Linear** `srgblinear` - sRGB color space, with linear transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.601 (NTSC)** `rec601ntsc` - Rec.601 with NTSC primaries color space, with Rec.601 transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.709** `rec709` - Rec.709 color space, with Rec.709 (same as Rec.2020) transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.2020** `rec2020` - Rec.2020 color space, with Rec.2020 (same as Rec.709) transfer function. Considered an HDR color space with respect to Reference White.
- **DCI-P3** `dcip3` - DCI-P3 color space, with D65 white point and 2.6 gamma transfer function. Considered an HDR color space with respect to Reference White.
- **DCI-P3 (D60)** `dcip3d60` - DCI-P3 "D60 sim" color space, with D60 white point, and 2.6 gamma transfer function. Considered an HDR color space with respect to Reference White.
- **Display-P3 (D65)** `displayp3d65` - Display-P3 color space, with D65 white point, and sRGB gamma transfer function. Considered an HDR color space with respect to Reference White.
- **ACES2065-1** `aces2065-1` - ACES 2065-1 (also known as ACES AP0) color space, with a linear gamma transfer function. Considered an HDR color space with respect to Reference White.
- **ACEScg** `acescg` - ACEScg (also known as ACES AP1) color space, with a linear gamma transfer function. Considered an HDR color space with respect to Reference White.
- **Passthrough** `passthrough` - When selected, the color values will be used as-is in the operation, without any modification or attempt to convert them into the Working Color Space.

#### Parameter Reference White `parmreferencewhite`

When converting a parameter color value to the Working Color Space, this controls how it should be treated with respect to Reference White. If the Working Color Space is the same Reference White, then no adjustment is done. If they are different, then the Reference White level (brightness) of this color will be adjusted to the range expected by the Working Color Space. For example if the project is set to have a SDR Reference White of 120 nits, and the HDR Reference White is 80 nits, then a color of (1, 1, 1), which is 120 nits in the SDR color space, will be converted to be (1.5, 1.5, 1.5), which is 120 nits still in the HDR Working Color Space.

- **Default For Color Space** `default` - Will use either the SDR or the HDR Reference White, based on the color space selected.
- **Use Parent Panel** `useparent` - Will use the Reference White that the parent panel has selected. If the top-level panel also has 'Use Parent' selected, then 'UI Reference White' will be used.
- **Standard (SDR)** `sdr` - Will treat the Parameter Color Space as SDR for it's reference white value.
- **High (HDR)** `hdr` - Will treat the Parameter Color Space as HDR for it's reference white value.
- **UI** `ui` - Will treat the Parameter Color Space as UI for it's reference white value. This uses the 'UI Reference White Nits' value for it's brightness.

#### Parameter Color Space `parmcolorspace`

Controls how all color parameters on this node are interpreted. The color values as treated as being in the selected color space, and are converted to the Working Color Space before they are used as part of the node's operation. Note that this does not change the color space of the node itself, as that is always in the Working Color Space.

- **sRGB** `srgb` - sRGB color space, with sRGB transfer function. Considered an SDR color space with respect to Reference White.
- **sRGB - Linear** `srgblinear` - sRGB color space, with linear transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.601 (NTSC)** `rec601ntsc` - Rec.601 with NTSC primaries color space, with Rec.601 transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.709** `rec709` - Rec.709 color space, with Rec.709 (same as Rec.2020) transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.2020** `rec2020` - Rec.2020 color space, with Rec.2020 (same as Rec.709) transfer function. Considered an HDR color space with respect to Reference White.
- **DCI-P3** `dcip3` - DCI-P3 color space, with D65 white point and 2.6 gamma transfer function. Considered an HDR color space with respect to Reference White.
- **DCI-P3 (D60)** `dcip3d60` - DCI-P3 "D60 sim" color space, with D60 white point, and 2.6 gamma transfer function. Considered an HDR color space with respect to Reference White.
- **Display-P3 (D65)** `displayp3d65` - Display-P3 color space, with D65 white point, and sRGB gamma transfer function. Considered an HDR color space with respect to Reference White.
- **ACES2065-1** `aces2065-1` - ACES 2065-1 (also known as ACES AP0) color space, with a linear gamma transfer function. Considered an HDR color space with respect to Reference White.
- **ACEScg** `acescg` - ACEScg (also known as ACES AP1) color space, with a linear gamma transfer function. Considered an HDR color space with respect to Reference White.
- **Passthrough** `passthrough` - When selected, the color values will be used as-is in the operation, without any modification or attempt to convert them into the Working Color Space.

#### Parameter Reference White `parmreferencewhite`

When converting a parameter color value to the Working Color Space, this controls how it should be treated with respect to Reference White. If the Working Color Space is the same Reference White, then no adjustment is done. If they are different, then the Reference White level (brightness) of this color will be adjusted to the range expected by the Working Color Space. For example if the project is set to have a SDR Reference White of 120 nits, and the HDR Reference White is 80 nits, then a color of (1, 1, 1), which is 120 nits in the SDR color space, will be converted to be (1.5, 1.5, 1.5), which is 120 nits still in the HDR Working Color Space.

- **Default For Color Space** `default` - Will use either the SDR or the HDR Reference White, based on the color space selected.
- **Use Parent Panel** `useparent` - Will use the Reference White that the parent panel has selected. If the top-level panel also has 'Use Parent' selected, then 'UI Reference White' will be used.
- **Standard (SDR)** `sdr` - Will treat the Parameter Color Space as SDR for it's reference white value.
- **High (HDR)** `hdr` - Will treat the Parameter Color Space as HDR for it's reference white value.
- **UI** `ui` - Will treat the Parameter Color Space as UI for it's reference white value. This uses the 'UI Reference White Nits' value for it's brightness.

#### Parameter Color Space `parmcolorspace`

Controls how all color parameters on this node are interpreted. The color values as treated as being in the selected color space, and are converted to the Working Color Space before they are used as part of the node's operation. Note that this does not change the color space of the node itself, as that is always in the Working Color Space.

- **sRGB** `srgb` - sRGB color space, with sRGB transfer function. Considered an SDR color space with respect to Reference White.
- **sRGB - Linear** `srgblinear` - sRGB color space, with linear transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.601 (NTSC)** `rec601ntsc` - Rec.601 with NTSC primaries color space, with Rec.601 transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.709** `rec709` - Rec.709 color space, with Rec.709 (same as Rec.2020) transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.2020** `rec2020` - Rec.2020 color space, with Rec.2020 (same as Rec.709) transfer function. Considered an HDR color space with respect to Reference White.
- **DCI-P3** `dcip3` - DCI-P3 color space, with D65 white point and 2.6 gamma transfer function. Considered an HDR color space with respect to Reference White.
- **DCI-P3 (D60)** `dcip3d60` - DCI-P3 "D60 sim" color space, with D60 white point, and 2.6 gamma transfer function. Considered an HDR color space with respect to Reference White.
- **Display-P3 (D65)** `displayp3d65` - Display-P3 color space, with D65 white point, and sRGB gamma transfer function. Considered an HDR color space with respect to Reference White.
- **ACES2065-1** `aces2065-1` - ACES 2065-1 (also known as ACES AP0) color space, with a linear gamma transfer function. Considered an HDR color space with respect to Reference White.
- **ACEScg** `acescg` - ACEScg (also known as ACES AP1) color space, with a linear gamma transfer function. Considered an HDR color space with respect to Reference White.
- **Passthrough** `passthrough` - When selected, the color values will be used as-is in the operation, without any modification or attempt to convert them into the Working Color Space.

#### Parameter Reference White `parmreferencewhite`

When converting a parameter color value to the Working Color Space, this controls how it should be treated with respect to Reference White. If the Working Color Space is the same Reference White, then no adjustment is done. If they are different, then the Reference White level (brightness) of this color will be adjusted to the range expected by the Working Color Space. For example if the project is set to have a SDR Reference White of 120 nits, and the HDR Reference White is 80 nits, then a color of (1, 1, 1), which is 120 nits in the SDR color space, will be converted to be (1.5, 1.5, 1.5), which is 120 nits still in the HDR Working Color Space.

- **Default For Color Space** `default` - Will use either the SDR or the HDR Reference White, based on the color space selected.
- **Use Parent Panel** `useparent` - Will use the Reference White that the parent panel has selected. If the top-level panel also has 'Use Parent' selected, then 'UI Reference White' will be used.
- **Standard (SDR)** `sdr` - Will treat the Parameter Color Space as SDR for it's reference white value.
- **High (HDR)** `hdr` - Will treat the Parameter Color Space as HDR for it's reference white value.
- **UI** `ui` - Will treat the Parameter Color Space as UI for it's reference white value. This uses the 'UI Reference White Nits' value for it's brightness.

#### Parameter Color Space `parmcolorspace`

Controls how all color parameters on this node are interpreted. The color values as treated as being in the selected color space, and are converted to the Working Color Space before they are used as part of the node's operation. Note that this does not change the color space of the node itself, as that is always in the Working Color Space.

- **sRGB** `srgb` - sRGB color space, with sRGB transfer function. Considered an SDR color space with respect to Reference White.
- **sRGB - Linear** `srgblinear` - sRGB color space, with linear transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.601 (NTSC)** `rec601ntsc` - Rec.601 with NTSC primaries color space, with Rec.601 transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.709** `rec709` - Rec.709 color space, with Rec.709 (same as Rec.2020) transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.2020** `rec2020` - Rec.2020 color space, with Rec.2020 (same as Rec.709) transfer function. Considered an HDR color space with respect to Reference White.
- **DCI-P3** `dcip3` - DCI-P3 color space, with D65 white point and 2.6 gamma transfer function. Considered an HDR color space with respect to Reference White.
- **DCI-P3 (D60)** `dcip3d60` - DCI-P3 "D60 sim" color space, with D60 white point, and 2.6 gamma transfer function. Considered an HDR color space with respect to Reference White.
- **Display-P3 (D65)** `displayp3d65` - Display-P3 color space, with D65 white point, and sRGB gamma transfer function. Considered an HDR color space with respect to Reference White.
- **ACES2065-1** `aces2065-1` - ACES 2065-1 (also known as ACES AP0) color space, with a linear gamma transfer function. Considered an HDR color space with respect to Reference White.
- **ACEScg** `acescg` - ACEScg (also known as ACES AP1) color space, with a linear gamma transfer function. Considered an HDR color space with respect to Reference White.
- **Passthrough** `passthrough` - When selected, the color values will be used as-is in the operation, without any modification or attempt to convert them into the Working Color Space.

#### Parameter Reference White `parmreferencewhite`

When converting a parameter color value to the Working Color Space, this controls how it should be treated with respect to Reference White. If the Working Color Space is the same Reference White, then no adjustment is done. If they are different, then the Reference White level (brightness) of this color will be adjusted to the range expected by the Working Color Space. For example if the project is set to have a SDR Reference White of 120 nits, and the HDR Reference White is 80 nits, then a color of (1, 1, 1), which is 120 nits in the SDR color space, will be converted to be (1.5, 1.5, 1.5), which is 120 nits still in the HDR Working Color Space.

- **Default For Color Space** `default` - Will use either the SDR or the HDR Reference White, based on the color space selected.
- **Use Parent Panel** `useparent` - Will use the Reference White that the parent panel has selected. If the top-level panel also has 'Use Parent' selected, then 'UI Reference White' will be used.
- **Standard (SDR)** `sdr` - Will treat the Parameter Color Space as SDR for it's reference white value.
- **High (HDR)** `hdr` - Will treat the Parameter Color Space as HDR for it's reference white value.
- **UI** `ui` - Will treat the Parameter Color Space as UI for it's reference white value. This uses the 'UI Reference White Nits' value for it's brightness.

#### Parameter Color Space `parmcolorspace`

Controls how all color parameters on this node are interpreted. The color values as treated as being in the selected color space, and are converted to the Working Color Space before they are used as part of the node's operation. Note that this does not change the color space of the node itself, as that is always in the Working Color Space.

- **sRGB** `srgb` - sRGB color space, with sRGB transfer function. Considered an SDR color space with respect to Reference White.
- **sRGB - Linear** `srgblinear` - sRGB color space, with linear transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.601 (NTSC)** `rec601ntsc` - Rec.601 with NTSC primaries color space, with Rec.601 transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.709** `rec709` - Rec.709 color space, with Rec.709 (same as Rec.2020) transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.2020** `rec2020` - Rec.2020 color space, with Rec.2020 (same as Rec.709) transfer function. Considered an HDR color space with respect to Reference White.
- **DCI-P3** `dcip3` - DCI-P3 color space, with D65 white point and 2.6 gamma transfer function. Considered an HDR color space with respect to Reference White.
- **DCI-P3 (D60)** `dcip3d60` - DCI-P3 "D60 sim" color space, with D60 white point, and 2.6 gamma transfer function. Considered an HDR color space with respect to Reference White.
- **Display-P3 (D65)** `displayp3d65` - Display-P3 color space, with D65 white point, and sRGB gamma transfer function. Considered an HDR color space with respect to Reference White.
- **ACES2065-1** `aces2065-1` - ACES 2065-1 (also known as ACES AP0) color space, with a linear gamma transfer function. Considered an HDR color space with respect to Reference White.
- **ACEScg** `acescg` - ACEScg (also known as ACES AP1) color space, with a linear gamma transfer function. Considered an HDR color space with respect to Reference White.
- **Passthrough** `passthrough` - When selected, the color values will be used as-is in the operation, without any modification or attempt to convert them into the Working Color Space.

#### Parameter Reference White `parmreferencewhite`

When converting a parameter color value to the Working Color Space, this controls how it should be treated with respect to Reference White. If the Working Color Space is the same Reference White, then no adjustment is done. If they are different, then the Reference White level (brightness) of this color will be adjusted to the range expected by the Working Color Space. For example if the project is set to have a SDR Reference White of 120 nits, and the HDR Reference White is 80 nits, then a color of (1, 1, 1), which is 120 nits in the SDR color space, will be converted to be (1.5, 1.5, 1.5), which is 120 nits still in the HDR Working Color Space.

- **Default For Color Space** `default` - Will use either the SDR or the HDR Reference White, based on the color space selected.
- **Use Parent Panel** `useparent` - Will use the Reference White that the parent panel has selected. If the top-level panel also has 'Use Parent' selected, then 'UI Reference White' will be used.
- **Standard (SDR)** `sdr` - Will treat the Parameter Color Space as SDR for it's reference white value.
- **High (HDR)** `hdr` - Will treat the Parameter Color Space as HDR for it's reference white value.
- **UI** `ui` - Will treat the Parameter Color Space as UI for it's reference white value. This uses the 'UI Reference White Nits' value for it's brightness.

#### Parameter Color Space `parmcolorspace`

Controls how all color parameters on this node are interpreted. The color values as treated as being in the selected color space, and are converted to the Working Color Space before they are used as part of the node's operation. Note that this does not change the color space of the node itself, as that is always in the Working Color Space.

- **sRGB** `srgb` - sRGB color space, with sRGB transfer function. Considered an SDR color space with respect to Reference White.
- **sRGB - Linear** `srgblinear` - sRGB color space, with linear transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.601 (NTSC)** `rec601ntsc` - Rec.601 with NTSC primaries color space, with Rec.601 transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.709** `rec709` - Rec.709 color space, with Rec.709 (same as Rec.2020) transfer function. Considered an SDR color space with respect to Reference White.
- **Rec.2020** `rec2020` - Rec.2020 color space, with Rec.2020 (same as Rec.709) transfer function. Considered an HDR color space with respect to Reference White.
- **DCI-P3** `dcip3` - DCI-P3 color space, with D65 white point and 2.6 gamma transfer function. Considered an HDR color space with respect to Reference White.
- **DCI-P3 (D60)** `dcip3d60` - DCI-P3 "D60 sim" color space, with D60 white point, and 2.6 gamma transfer function. Considered an HDR color space with respect to Reference White.
- **Display-P3 (D65)** `displayp3d65` - Display-P3 color space, with D65 white point, and sRGB gamma transfer function. Considered an HDR color space with respect to Reference White.
- **ACES2065-1** `aces2065-1` - ACES 2065-1 (also known as ACES AP0) color space, with a linear gamma transfer function. Considered an HDR color space with respect to Reference White.
- **ACEScg** `acescg` - ACEScg (also known as ACES AP1) color space, with a linear gamma transfer function. Considered an HDR color space with respect to Reference White.
- **Passthrough** `passthrough` - When selected, the color values will be used as-is in the operation, without any modification or attempt to convert them into the Working Color Space.

#### Parameter Reference White `parmreferencewhite`

When converting a parameter color value to the Working Color Space, this controls how it should be treated with respect to Reference White. If the Working Color Space is the same Reference White, then no adjustment is done. If they are different, then the Reference White level (brightness) of this color will be adjusted to the range expected by the Working Color Space. For example if the project is set to have a SDR Reference White of 120 nits, and the HDR Reference White is 80 nits, then a color of (1, 1, 1), which is 120 nits in the SDR color space, will be converted to be (1.5, 1.5, 1.5), which is 120 nits still in the HDR Working Color Space.

- **Default For Color Space** `default` - Will use either the SDR or the HDR Reference White, based on the color space selected.
- **Use Parent Panel** `useparent` - Will use the Reference White that the parent panel has selected. If the top-level panel also has 'Use Parent' selected, then 'UI Reference White' will be used.
- **Standard (SDR)** `sdr` - Will treat the Parameter Color Space as SDR for it's reference white value.
- **High (HDR)** `hdr` - Will treat the Parameter Color Space as HDR for it's reference white value.
- **UI** `ui` - Will treat the Parameter Color Space as UI for it's reference white value. This uses the 'UI Reference White Nits' value for it's brightness.

## Info CHOP Channels

Extra Information for the Phong MAT can be accessed via an Info CHOP.

### Common MAT Info Channels

### Common Operator Info Channels
- total_cooks - Number of times the operator has cooked since the process started.
- cook_time - Duration of the last cook in milliseconds.
- cook_frame - Frame number when this operator was last cooked relative to the component timeline.
- cook_abs_frame - Frame number when this operator was last cooked relative to the absolute time.
- cook_start_time - Time in milliseconds at which the operator started cooking in the frame it was cooked.
- cook_end_time - Time in milliseconds at which the operator finished cooking in the frame it was cooked.
- cooked_this_frame - 1 if operator was cooked this frame.
- warnings - Number of warnings in this operator if any.
- errors - Number of errors in this operator if any.
