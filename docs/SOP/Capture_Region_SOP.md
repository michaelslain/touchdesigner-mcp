# Capture Region SOP

**Family:** SOP (Surface Operator)

## Summary

The Capture Region SOP defines capture region (cregion), which is a type of primitive which can be thought of as a modified tube primitive (a tube with half a sphere on either end). The hemispheres on the ends of the tubes are called "caps". Like any other primitive, each Capture Region has a primitive number and can be assigned primitive attributes. A Capture Region is simply a volume which is used to define the point capture weighting for a geometry. It is then animated to deform the geometry.

Capture Regions are always shown in wireframe (even in shaded mode) so that you can focus on the geometry for which the region will act on.

## Parameters

### Region Page

#### Orientation `orient`

Defines the direction axis of the region. Use Z axis when the region is inside a bone object.

- **X Axis** `x`
- **Y Axis** `y`
- **Z Axis** `z`

#### Center `t`

Position of the center of the region.

- **X** `tx`
- **Y** `ty`
- **Z** `tz`

#### Top Height `theight`

Height of the region from the centre to the top cap.

#### Top Cap `tcap`

The X, Y, Z radii of the top/bottom hemisphere.

- **X** `tcapx`
- **Y** `tcapy`
- **Z** `tcapz`

#### Bottom Height `bheight`

Height of the region from the centre to the top cap.

#### Bottom Cap `bcap`

The X, Y, Z radii of the top/bottom hemisphere.

- **X** `bcapx`
- **Y** `bcapy`
- **Z** `bcapz`

#### Max/Min Weight `weight`

Defines the weight of a point exactly on the centre line and edge of the region respectively. Point weights in-between are blended.

- **weight1** `weight1`
- **weight2** `weight2`

### Display Page

#### Display Color `color`

The Capture Region SOP<uses region colors for helpful feedback. By default the region inherits the color of its containing object (via an expression).

- **Red** `colorr`
- **Green** `colorg`
- **Blue** `colorb`

## Info CHOP Channels

Extra Information for the Capture Region SOP can be accessed via an Info CHOP.

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
