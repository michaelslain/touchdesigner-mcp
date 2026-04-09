# Skin SOP

**Family:** SOP (Surface Operator)

## Summary

The Skin SOP takes any number of faces and builds a skin surface over them. If given two or more surfaces, however, the SOP builds four skins, one for each set of boundary curves.

All face and surface types are valid as long as the input(s) contain only faces or only surfaces. Different face types can be skinned together into one surface. For example, it is possible to skin a cubic open NURBS curve with a polygon and a quintic closed Bzier curve even if the three faces have a different number of control vertices. Similarly, this SOP can skin the boundary curves of surfaces of different types, number of rows, columns, etc.

When face types are input, the number of input SOPs and the number of faces in each input establish the skinning method. If only one input exists, a "linear-skinning" operation is performed by running a skin across the cross-sections. The result is the classic ruled or skinned surface. If a second input exists, a "bi-linear skinning" is performed which computes a cross-skin between the faces in the first input (U cross-sections) and the faces in the second input (V cross-sections). The result is a surface whose name derives from the number of cross-sections in each direction: triangular, square, or multiple boundary surface, as well as a special case of swept surfaces and N-rails. When possible, cross-sections are interpolated as isoparms.

If you need more control over tangency in the skin, try using the Bridge SOP.

> **Tip:** If you have problems with the results being skinned in the wrong order, try inserting a Sort SOP ahead of the Skin SOP, and Sort by Normals.

## Parameters

###  Page

#### U Cross Sections `uprims`

Empty by default, this field provides a way to specify a subset of the first input's faces and surfaces. Do so by selecting one or more primitive groups from this field's pop-up menu.

#### V Cross Sections `vprims`

Empty by default, this field provides a way to specify a subset of V faces. If a second input exists, the primitive groups available for selection are taken from the second input. If only the first input is present, the groups listed in the pop-up menu belong to the first input. This means that two inputs are not always needed for a bilinear skin as long as the first input has both U and V groups in it.

#### Connectivity `surftype`

(Results only viewable for polygons and meshes).

- **Rows** `rows` - Creates horizontal lines.
- **Columns** `cols` - Creates vertical lines.
- **Rows and Columns** `rowcol` - Both Rows and Columns. Looks like Quads in wire frame display, but all polygons are open (if the primitive type is polygon). Compare them in the Model Editor.
- **Triangles** `triangles` - Build the grid with Triangles.
- **Quadrilaterals** `quads` - Generates sides composed of quadrilaterals (default).
- **Alternating Triangles** `alttriangles` - Generates triangles that are opposed; similar to the Triangles option.

#### Preserve Shape `keepshape`

This parameter determines the precision of a linear skin (case c in the diagram). If enabled, it ensures that the generated surface goes through each cross-section. Here, a cross-section can be a face or a surface boundary, depending on the types being skinned. If disabled, Preserve Shape produces a surface whose CVs coincide with the CVs of the cross-sections (after they have being converted to a common type and an identical number of CVs). The skinning algorithm is faster with shape preservation OFF, but it lacks precision. Skinning with shape preservation ON may produce unintuitive shapes when the cross-sections have many coincident CVs or are very close to each other. In this case try to jitter the CVs, vary the V Order (see below), or simply disable shape preservation.

#### V Wrap `closev`

This menu (menu: Off, On, If primitive does) setting determines whether the surface should be wrapped in the V parametric direction. The options are to open (Off), close (On), or inherit the closure type from the cross-sections. V Wrap is ignored when doing bilinear skinning.

- **Off** `nonewv`
- **On** `wv`
- **If Primitive does** `ifprimwv`

#### Use V Order `force`

Enables or disables the use of the V Order parameter. If the flag is OFF, the skinned surface is built as a cubic (order 4) in V, unless fewer than four cross-sections for an open V or 3 cross-section for a closed V are given. For example, if the input consists of two faces and the V Wrap flag is OFF, the surface will be linear in V (order 2). The status of the V Order flag is irrelevant when the faces or surfaces are all polygons or meshes respectively, and when doing a bilinear skin.

#### V Order `orderv`

Specifies the order of the skinned surface when the V Order flag is enabled. A NURB surface of order "n" can be constructed with at least n or n-1 cross-sections, depending on whether the surface is open or closed in V respectively. A Bzier surface of the same order can be constructed with at least M*(n-1) + 1 cross-sections if open, or M*(n-1) cross-sections if closed. M is a non-negative, integer multiplier. The V order is ignored when the faces or surfaces are all polygons or meshes respectively, and when building a bilinear skin.

#### Skin `skinops`

Can optionally skin subgroups of n primitives or every nth primitive in a cyclical manner. For example; assume there are six primitives numbered for 0 - 5, and N = 2. Then, Groups will generate 0-1 2-3 4-5 Skipping will generate 0-2-6 and 1-3-5.

- **All Primitives** `all`
- **Groups of N Primitives** `group`
- **Skip Every Nth Primitive** `skip`

#### N `inc`

Determines the number of primitives to be either grouped or skipped. N2.

#### Keep Primitives `prim`

Determines whether the input primitives will be preserved (On) or deleted from the output (Off).

#### Output Polygons `polys`

If set, this flag instructs the program to convert the skinned surface(s) to polygons if the surface type is Mesh.

## Operator Inputs

- Input 0: -
- Input 1: -

## Info CHOP Channels

Extra Information for the Skin SOP can be accessed via an Info CHOP.

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
