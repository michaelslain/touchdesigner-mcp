# Subdivide SOP

**Family:** SOP (Surface Operator)

## Summary

The Subdivide SOP takes an input polygon surface (which can be piped into one or both inputs), and divides each face to create a smoothed polygon surface using a Catmull-Clark subdivision algorithm. Especially useful for avoiding the angular appearance often associated with polygonal models - without adding lots of extra geometry to the entire object. For best results, polygons should be convex and relatively uniform in distribution.

Subdivision surfaces also allows you to create the smoothed surface based on a polygon control shape. As the control shape changes, so does the smooth shape within.

> **Tip:** The default is to have the Override Crease Weight Attribute enabled. So you can simply set a value which applies to all the creases. You can, however, set a crease attribute using the Vertex or Primitive SOPs which allows for more control.

## Parameters

###  Page

#### Group `subdivide`

Subset of input to use as a polygonal mesh to subdivide. Accepts patterns, as described in Pattern Matching.

#### Creases `creases`

This field allows you to specify a subset of the second input to use as creases. The elements of the second input specified by the Creases field are used as creases. Each edge in a crease polygon corresponds to the edge in the polygon mesh which has the same point numbers. Point position is irrelevant. For polygon edges to be classified as the same edge, they must share the same points. Merely being physically close is not sufficient.

#### Depth `iterations`

How many iterations to subdivide. Higher numbers give a smoother surface.

#### Override Crease Weight Attribute `overridecrease`

Determine if the crease sharpness should be determined by the primitive or vertex creaseweight attribute or by overridden by this SOP.

#### Crease Weight `creaseweight`

If the crease weight is overriden, this is the weight used.

#### Generate Resulting Creases `outputcrease`

If any creases are sharper than the Depth, they will be left over in the resulting geometry. With this parameter enabled, these left over creases are created with the appropriate primitive attribute values, and placed in the specified group.

#### New Group `outcreasegroup`

Name of the group to place the generated creases into.

#### Close Cracks `closeholes`

Choose how gaps are handled in the output geometry.

- **Do Not Close** `noclose` - Don't close cracks.
- **Pull Cracks Closed** `pull` - Move points on boundary of subdivided area in order to close cracks formed during the subdivision.
- **Stitch Cracks Together** `stitch` - Add polygons (triangles) to close the cracks caused by subdividing.

#### Surrounding Faces `surroundpoly`

Choose how to handle the polygons on either side of a crack when pulling or stitching it closed.

- **No Edge Division** `nodiv` - When No Edge Division is chosen, many triangles are created, each having one vertex on one point of the non-subdivided edge.
- **Divide Edges** `edges` - Divides edges surrounding the subdivided area when pulling or stitching cracks by inserting new polygons (triangles) to close up the cracks.
- **Triangulate** `triangulate` - Does exactly the same thing as Divide Edges, except it also triangulates the non-subdivided polygon. This is desirable because pulling the non-subdivided boundary towards the curved subdivided boundary will likely generate a non-planar polygon, so Triangulate will divide this polygon into smaller (planar) ones. Pulling cracks with a Bias of 1 and triangulating usually produces the nicest results.

#### Bias `bias`

Determines which points are moved when pulling crack closed. 0 means move points on subdivided area to meet boundary. 1 means move points on boundary to meet subdivided area.

## Operator Inputs

- Input 0: -
- Input 1: -

## Info CHOP Channels

Extra Information for the Subdivide SOP can be accessed via an Info CHOP.

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
