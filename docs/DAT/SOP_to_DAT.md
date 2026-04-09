# SOP to DAT

**Family:** DAT (Data Operator)

## Summary

The SOP to DAT allows you to extract point, vertex and primitive (e.g. polygon) data and attributes from a SOP.

Data is output in columns, with the first column being index. The index refers to the Point or Primitive number. Attributes are output with column name attrib if it is a single value attribute, or with multiple columns named attrib(0), attrib(1), attrib(2) etc. if it is a multiple value attribute.

See also: Geometry Detail, Point, Point List, Point Class, Primitive, Prims Class, Polygon, Vertex, SOP, SOP Class, Script SOP, Point Groups, Primitive Groups, Attributes.

Example File : File:SOPtoDATtoSOP.tox

## Parameters

### SOP To Page

#### SOP `sop`

Specify the SOP to pull data from.

#### Extract `extract`

Specify whether to pull point data or primitive data.

- **Points** `points` - Get point data.
- **Vertices** `vertices` - Get vertex data.
- **Primitives** `primitives` - Get primitive data.
- **Detail** `detail` - Get data for the entire geometry set.

#### Group `group`

Point or primitive group to extract. If none specify all data will be extracted.

#### Attributes `attrib`

Attributes to extract. Point specific attributes can include P and Pw for position and weight.

#### Copy Vertex UV to Points `uvforpts`

Copies the vertex UVs to point UVs.

### Common Page

#### Language `language`

Select how the DAT decides which script language to operate on.

- **Input** `input` - The DAT uses the inputs script language.
- **Node** `node` - The DAT uses it's own script language.

#### Edit/View Extension `extension`

Select the file extension this DAT should expose to external editors.

- **dat** `dat` - various common file extensions.
- **From Language** `language` - pick extension from DATs script language.
- **Custom Extension** `custom` - Specify a custom extension.

#### Custom Extension `customext`

Specifiy the custom extension.

#### Word Wrap `wordwrap`

Enable Word Wrap for Node Display.

- **Input** `input` - The DAT uses the inputs setting.
- **On** `on` - Turn on Word Wrap.
- **Off** `off` - Turn off Word Wrap.

## Info CHOP Channels

Extra Information for the SOP to DAT can be accessed via an Info CHOP.

### Common DAT Info Channels
- num_rows - Number of rows in this DAT.
- num_cols - Number of columns in this DAT.

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
