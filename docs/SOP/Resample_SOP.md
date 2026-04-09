# Resample SOP

**Family:** SOP (Surface Operator)

## Summary

The Resample SOP will resample one or more primitives into even length segments. It only applies to polygons so when presented with a NURBS or Bzier curve input, it first converts it to polygons using the Level of Detail parameter.

## Parameters

###  Page

#### Group `group`

Allows you to specify which primitives or group of primitives to resample. Accepts patterns, as described in Pattern Matching.

#### Level of Detail `lod`

If the geometry you are performing this operation on is made up of something other than polygons (e.g. a NURBS circle), this parameter determines how detailed the conversion to polygons will be. The higher the level of detail, the more precise the resampling process.

#### Resample by Polygon Edge `edge`

This toggle allows the resampling to be done on a per-edge basis of the polygon rather than on the polygon as a whole. This means that corners will be preserved in the resampling. When this parameter is enabled, the Measure Method will be disabled. If the Segment Length is specified, only edges which are longer than the specified length will be subdivided. Each edge will be evenly subdivided so that the maximum length of each subdivision is less than or equal to the length specified.

#### Method `method`

Specifies how the geometry is segmented.

- **Even Length Segments** `dist` - Even-length measures are made along the original input
- **Even X Segments** `x` - * Even X spaced Segments
- **Even Y Segments** `y` - Similar to X, but along Y axis.
- **Even Z Segments** `z` - Similar to X, but along Z axis.

#### Measure `measure`

Specifies how to measure along curved spline sections.

- **Along Arc** `arc` - This method of measurement divides the curve itself into even length segments.
- **Along Chord** `chord` - This method creates straight even-length segments between the evaluated points on the primitive. This is faster but not as accurate.

#### Maximum Segment Length `dolength`

When this option is enabled, it overrides the value of the Arc/Chord length and allows you to specify your own values for the length of the segments in the resampled geometry. Smaller values produce smoother interpolation.

#### Length `length`

This parameter lets you specify the Arc/Chord length for the resampled geometry.

#### Maximum Segments `dosegs`

When enabled, allows you to override the maximum number of segments used in the resampled geometry.

#### Segments `segs`

Lets you specify the number of segments used when measuring along arc. When both Maximum Segment Length and Maximum Segments are selected, the resultant polygon is constrained to a fixed length which may be shorter than the original input curve. When only Maximum Segments is selected, the segments span the full distance of the original input curve.

#### Maintain Last Vertex `last`

If selected, the primitive's final CV is included in the resampled polygon, even if the final resulting edge is shorter then the given segment length.

## Operator Inputs

- Input 0: -

## Info CHOP Channels

Extra Information for the Resample SOP can be accessed via an Info CHOP.

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
