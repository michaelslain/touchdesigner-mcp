# Boolean SOP

**Family:** SOP (Surface Operator)

## Summary

The Boolean SOP takes two closed polygonal sets, A and B. Set these Sources to the SOPs with the 3D shapes that you wish to operate on. There are two important requirements for input geometry:

Other caveats for Boolean are the following:

This SOP is quite visual and intuitive; you can experiment with the different combinations on screen to see the effects.

> **Note:** The Boolean SOP handles polygonal geometry types. For boolean-type operations with nurbs and Bezier surfaces - see Surfsect SOP.

## Parameters

###  Page

#### Operation `booleanop`

Some of the operations below produce guide geometry to give you visual feedback on the results of the operation being performed. The appearance of the geometry is context sensitive - if you are performing an intersect operation, or either of the edge operations the guide will be both inputs; if you are doing A minus B then the guide will be B and if B minus A then the guide will be A. If you are doing union then there will be no guide geometry. If the guide geometry is too distracting, you can disable it by entering the Viewport options dialog and clicking on the Guide geometry button so that it no longer appears indented. This procedure is global and will disable the guide geometry of other SOPs as well. The Boolean SOP will automatically orient polygons so they face the same way. This may not be enough in some cases because Boolean results in some unshared edges where the intersection cut took place. If the shading is still not good enough, you are best to follow Boolean with a Facet SOP. In it, Consolidate Points, Orient Polygons and finally Cusp. If you have really strange shaped polygons, you can first triangulate one or both of the inputs with the Divide SOP.

- **Union** `union` - Geometry from the two inputs is combined, and interior polygons are removed. The result is a closed shape. This can be very useful for joining pipes or other shapes that the camera will travel inside, or where the intersecting shapes must be transparent. Points at the intersection of the shapes are not consolidated.
- **Intersect** `intersect` - The resulting geometry is a closed shape where the two input shapes overlap or intersect. Geometry outside the common area is discarded.
- **A minus B** `aminusb` - The result is a closed shape in which the geometry from B is cut away or subtracted from the geometry in A.
- **B minus A** `bminusa` - All operations same as previous three, but resulting shape is Part B with Part A cut away from it.
- **A Edge** `aedge` - Closed face(s) are produced, at the edges where the two parts meet. The face(s) can be twisted (not planar). The point order is unpredictable; append a Polygon SOP with the Order Points option enabled to sort them out if you want to make connections to the face.
- **B Edge** `bedge` - Closed face(s) are produced, at the edges where the two parts meet. The face(s) can be twisted (not planar). The point order is unpredictable; append a Polygon SOP with the Order Points option enabled to sort them out if you want to make connections to the face.

#### Accurate Attributes Interpolation `accattrib`

If selected, all inputs are convexed to triangles, otherwise they are convexed to quadrilaterals.

#### Create Groups `creategroup`

If selected, a group is created containing all faces pertaining to the first input, and a second group containing all faces of the second input.

#### Group A `groupa`

When Create Groups = On, specify a name for Group A.

#### Group B `groupb`

When Create Groups = On, specify a name for Group B.

## Operator Inputs

- Input 0: -
- Input 1: -

## Info CHOP Channels

Extra Information for the Boolean SOP can be accessed via an Info CHOP.

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
