# Bridge SOP

**Family:** SOP (Surface Operator)

## Summary

The Bridge SOP is useful for skinning trimmed surfaces, holes, creating highly controllable joins between arms and body, branches or tube intersections.

The Bridge SOP is similar to the Skin SOP but with much greater control over the resulting surface. Given a set of profiles (i.e. curves on surface) and/or spatial faces, the Bridge SOP builds a NURBS skin with specified tangent and curvature characteristics. The precision of the resulting surface is highly dependent on the number of required cross-sections and on the quality of the profile extraction. High precisions will generate a very dense surface with, potentially, many multiple knots.

In general, the higher the order of the curve, the better the fit the Bridge SOP will be able to provide. However, it is generally better to stick to cubics (order 4) curves, as the software is optimized for cubics.

Because the Bridge SOP can join both a set of spatial curves and trim curves, it can be used much like the Skin SOP and/or the Fillet SOP. However, bridging trimmed surfaces is more expensive than bridging carved surfaces.

You will usually need a Trim, Bridge, or Profile SOP after a Project SOP.

> **Note:** To texture-map the resulting skin, use an Orthographic projection rather than a Spline-based projection. This results in better continuity across the surfaces.

> **Note:** Always specify the curves on surface if you want the Bridge SOP bridge curves on surfaces; otherwise it will attempt to bridge free-floating curves.

> **Note:** If the resulting skin bulges too greatly, you can achieve a smooth resulting transition between surfaces by disabling the Preserve Tangent & Preserve Curvature Magnitude parameters, and manually tweaking the Tangent Scales and the Curvature Scales. In general, avoid tweaking the Rotations of the Tangents unless you wish to deform the resulting surface.

## Parameters

###  Page

#### Group `group`

The Group edit field allows you to enter profile groups for profiles and/or faces to bridge. This is optional if you have regular geometric curves or surfaces, however, you must enter something here in order for Bridge to work with profile curves. For example *.0 will Bridge the 0th (first) profiles of all incoming primitives.

#### Bridge `bridge`

Allows bridging of subgroups of N primitives or patterns of primitives.

- **All Primitives** `all`
- **Groups of N Primitives** `group`
- **Skip Every Nth Primitive** `skip`

#### N `inc`

Determines the pattern of primitives to bridge using this SOP.

#### Order `order`

Sets the spline order for both profile extraction and skinning operations.

### Surface Properties Page

#### Min X-Sections `isodivs`

The minimum number of cross-sections in the resulting skin. If you create a high-density surface, TouchDesigner's level of detail may display the surface less smoothly than it actually is. You can increase the level of detail by adjusting the viewdisplay options (e.g. viewdisplay -l 1.5 SOPmain.persp1 ) for the Viewport.

#### Use `frenet`

Specifies the type of normal to use for computing direction:

- **The Frenet Frame of the Face** `frenet` - The Frenet Frame of the face. This option uses a local coordinate system on the curve to compute the direction.
- **The Normal of the Face** `normal` - The Normal of the face.

#### Circular Arc Fillet `circular`

Tells TouchDesigner to try to generate a round fillet rather than a free-form fillet. Only the sign (positive or negative) of the tangent scales is used; the scale magnitude is ignored when building a circular fillet.

#### Rotate Tangents `rotatet`

The scaling and rotation parameters contain three fields. The rotation fields (degrees) apply further rotation to the tangents, while the scale parameter further scales the tangents.

- **rotatet1** `rotatet1` - Applies to the first face in the input.
- **rotatet2** `rotatet2` - Applies to all intermediate faces.
- **rotatet3** `rotatet3` - Applies to the last face in the input.

#### Scale Tangents `scalet`

The scaling and rotation parameters contain three fields. The rotation fields (degrees) apply further rotation to the tangents, while the scale parameter further scales the tangents.

- **scalet1** `scalet1` - Applies to the first face in the input.
- **scalet2** `scalet2` - Applies to all intermediate faces.
- **scalet3** `scalet3` - Applies to the last face in the input.

#### Use Curvature `curvature`

Takes curvature into consideration as well.

#### Scale Curvatures `scalec`

Further scaling of the curvature. Note: If the resulting skin bulges too greatly, you can achieve a smooth resulting transition between surfaces by disabling the Preserve Tangent & Preserve Curvature Magnitude parameters, and manually tweaking the Tangent Scales and the Curvature Scales. In general, avoid tweaking the Rotations of the Tangents unless you wish to deform the resulting surface. If the bridge bulges on one side but not the other, try increasing the Min. Number of Cross sections in the bridge.

- **scalec1** `scalec1`
- **scalec2** `scalec2`
- **scalec3** `scalec3`

### Profile Extraction Page

#### Divisions per Span `sdivs`

Number of 2-D points evaluated in each span.

#### Tolerance `tolerance`

Precision of 2-D fitting algorithm.

#### Preserve Sharp Corners `csharp`

Enables or disables fitting of sharp turns. If cracks appear in the resulting skin, Preserve Sharp Corners is usually a good solution; however, it may add additional knots which can create undesirable "ripples" in some cases.

## Operator Inputs

- Input 0: -

## Info CHOP Channels

Extra Information for the Bridge SOP can be accessed via an Info CHOP.

### Common SOP Info Channels
- num_points - Number of points in this SOP.
- num_prims - Number of primitives in this SOP.
- num_particles - Number of particles in this SOP.
- last_vbo_update_time - Time spent in another thread updating geometry data on the GPU from the SOP's CPU data. As it is part of another thread, this time is not part of the usual frame time.
- last_meta_vbo_update_time - Time spent in another thread updating meta surface geometry data (such as metaballs or nurbs) on the GPU from the SOP's CPU data. As it is part of another thread, this time is not part of the usual frame time.

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
