# Script SOP

**Family:** SOP (Surface Operator)

## Summary

The Script SOP runs a python script each time the Script SOP cooks. It can create, delete and modify points, primitives and their vertices. It can create custom attributes or built-in attributes like Cd (color), uv and N (normals). It can add polygons, bezier curves and meshes among others. It can combine multiple inputs. By default, the Script SOP is created with a docked DAT that contains three Python methods: cook(), onPulse(), and setupParameters(). The cook() method is run each time the Script SOP cooks. The setupParameters() method is run whenever the Setup Parameter button on the Script page is pressed. The onPulse() method is run whenever a custom pulse parameter is pushed.

Refer to Help -> Python Examples, and Help -> Operator Snippets.

See also: Geometry Detail, Point, Point List, Point Class, Primitive, Prims Class, Polygon, Vertex, SOP, SOP Class, SOP to DAT, Point SOP, Point Groups, Primitive Groups, Attributes.

See also: Script CHOP, Script DAT, Script TOP.

> **Note:** Because the Script SOP can get data from anywhere, it's difficult to determine what it procedurally depends on. So every time that a Script OP runs it will make a list of operators, parameters, nodes etc that it depends upon, and when they change, the Script OP will re-cook.

## Parameters

### Script Page

#### Callbacks DAT `callbacks`

Specifies the DAT which holds the callbacks. See scriptSOP_Class for usage.

#### Setup Parameters `setuppars`

Clicking the button runs the setupParameters() callback function.

## Operator Inputs

- Input 0: -

## Info CHOP Channels

Extra Information for the Script SOP can be accessed via an Info CHOP.

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
