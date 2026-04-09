# Trail SOP

**Family:** SOP (Surface Operator)

## Summary

The Trail SOP takes an input SOP and makes a trail of each point of the input SOP over the past several frames, and connects the trails in different ways. It will generate trails of any input geometry, whether it is a cube translating, a deforming surface, or particles. This is useful for multi-frame ghosting effects and temporal modelling.

When using a Particle SOP or Spring SOP as input, it is important to keep the trail increment to integer values. Otherwise, the trail will not work well.

## Parameters

###  Page

#### Result Type `result`

How to construct the trail geometry.

- **Preserve Original** `preserve` - Preserves the original geometry.
- **Connect as Mesh** `mesh` - Connects the resulting points as a mesh.
- **Connect as Polygons** `poly` - Connects the resulting points as polygons.
- **Compute velocity** `velocity` - As the points move faster, corresponding velocity attributes are computed.

#### Trail Length `length`

This sets the length of the trail by establishing the maximum number of frames for the Trail SOP to use, i.e. a Trail Length of 25will connect the geometry from the previous twenty-five frames.

#### Trail Increment `inc`

This will skip the given number of frames to build a trail with fewer points in it, but the same length. This will lower the resolution of the trail by reducing the number of points in the trail. This is better for ghosting when using Preserve Original. If you set the Increment to 2 or more, you will see the same length trail, but fewer copies of the geometry.

#### Cache Size `cache`

The number of frames to keep cached in available memory.

#### Evaluate Within Frame Range `evalframe`

This option specifies that the Trail SOP will only evaluate, or cook, within the current frame range ($FSTART, $FEND). If this option is not enabled, the SOP can evaluate prior to the start frame.

#### Connectivity `surftype`

This option is used to select the type of surface, when using a Mesh Primitive Type.

- **Rows** `rows` - Creates horizontal lines.
- **Columns** `cols` - Creates vertical lines.
- **Rows and Columns** `rowcol` - Both Rows and Columns. Looks like Quads in wire frame display, but all polygons are open (if the primitive type is polygon).
- **Triangles** `triangles` - Build the grid with Triangles.
- **Quadrilaterals** `quads` - Generates sides composed of quadrilaterals (default).
- **Alternating Triangles** `alttriangles` - Generates triangles that are opposed; similar to the Triangles option.

#### Close Rows `close`

When selected, closes the rows in the output selection.

#### Velocity Scale `velscale`

Scales the velocity by a specific value when Compute Velocity is selected.

#### Reset `reset`

While on, clears any cached geometries, resetting the trail to mirror the input.

#### Reset Pulse `resetpulse`

Reset the geometry for a single frame.

## Operator Inputs

- Input 0: -

## Info CHOP Channels

Extra Information for the Trail SOP can be accessed via an Info CHOP.

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
