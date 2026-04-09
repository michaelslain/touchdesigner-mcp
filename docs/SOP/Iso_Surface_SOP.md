# Iso Surface SOP

**Family:** SOP (Surface Operator)

## Summary

The Iso Surface SOP uses implicit functions to create 3D visualizations of isometric surfaces found in Grade 12 Functions and Relations textbooks.

An implicit function is defined so that it = 0. For example with:

the implicit function is:

## Parameters

###  Page

#### Implicit Function `func`

Enter the function for implicit surface building here. Example 1: (me.curPos.x**2) / (4*4) - (me.curPos.y**2) / (3*3) + me.curPos.z This formula creates a hyperbolic paraboloid, or saddle shape. Example 2: (me.curPos.x**2) / 0.1 + (me.curPos.y**2) / 2 + (me.curPos.z**2) / 6 - 1

#### Minimum Bound `min`

Determines the minimum clipping plane boundary for display of iso surface.

- **X** `minx`
- **Y** `miny`
- **Z** `minz`

#### Maximum Bound `max`

Determines maximum clipping plane boundary for display of iso surfaces.

- **X** `maxx`
- **Y** `maxy`
- **Z** `maxz`

#### Divisions `divs`

The density, or resolution of the iso surface polygons in X, Y and Z.

- **X** `divsx`
- **Y** `divsy`
- **Z** `divsz`

#### Compute Normals `normals`

Adds normals to the surface.

## Info CHOP Channels

Extra Information for the Iso Surface SOP can be accessed via an Info CHOP.

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
