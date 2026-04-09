# Blend SOP

**Family:** SOP (Surface Operator)

## Summary

The Blend SOP provides 3D metamorphosis between shapes with the same topology. It can blend between sixteen input SOPs using the average weight of each input's respective channel. It will also interpolate point colors and/or texture co-ordinates between shapes.

For best results, there should be the same number of points / CVs (and faces) in the geometry of each SOP. The points should have a similar order; if point 17 in one source is on the left side, and point 17 in another Source is on the right side, it will move across the object during the blend, which may create distorted and twisted shapes. To ensure that this doesn't happen, you can make all the pieces to be blended by editing point positions of one common base shape. Each of the pieces to be morphed must be in different SOPs.

For example, when editing the shapes in the Model Editor, each particular geometry can be saved and then read in, or input the Model SOP directly into the Blend SOP. You would then have the base model geometry entering the Blend SOP in the first Blend, then up to 15 Model SOPs feeding from the SOP containing the base model geometry, which in turn would feed into the Blend SOP. Remember that Model SOPs cannot be unlocked and, therefore, are a safe way to store data without using a File In SOP.

The Blend SOP now only cooks non-zero-weighted inputs.

See also Sequence Blend SOP.

## Parameters

### Blend Page

#### Group `group`

Specifies a point or primitive group in the first input. If, for example, a group is specified containing the first and third points, then the first and third point of every input will be blended whereas the second, fourth, fifth, etc. points will be set to match the first input source. Accepts patterns, as described in: Pattern Matching.

#### Differencing `diff`

Generates exaggerated blends between objects where values above 1 or less than 0 will result in over-scaled blends.

#### Blend Position `dopos`

When checked, the point positions of the inputs will be blended based on the weights of the blend channels. If not checked, the input geometry will not change, only allowing Blending of Colors, Normals and Textures if selected.

#### Blend Colors `doclr`

When checked, the point colors of the geometry inputs will be blended based on the weights of the blend channels.

#### Blend Normals `donml`

When checked, the point normals of the geometry inputs will be blended based on the weights of the blend channels.

#### Blend Texture `douvw`

When checked, the point texture co-ordinates of the geometry inputs will be blended based on the weights of the blend channels.

#### Blend Up `doup`

When checked, the Up Vector of the geometry inputs will be blended based on the weights of the blend channels.

### Weights Page

#### Input `input`

Sequence of input weights Weight input0weight - The weight or contribution of this input. 0 has no contribution, 1 is full contribution.

## Operator Inputs

- Input 0: -

## Info CHOP Channels

Extra Information for the Blend SOP can be accessed via an Info CHOP.

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
