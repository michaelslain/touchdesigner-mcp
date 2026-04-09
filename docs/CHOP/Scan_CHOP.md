# Scan CHOP

**Family:** CHOP (Channel Operator)

## Summary

DEPRECATED: use the Laser CHOP instead.

The Scan CHOP converts a SOP or TOP to oscilloscope or laser friendly control waves. The output is usually in the audible range and can be heard directly via an Audio Device Out CHOP, or used to drive the X and Y deflector inputs of an oscilloscope, or a laser projector recreating the imagery. The output can also be visualized through use of a Limit SOP.

A sample component found at: Op to Audio CHOP example

A sample video can be found at: Total Internal Reflection

See also: EtherDream CHOP, EtherDream DAT

## Parameters

### Scan Page

#### Source OP `source`

Choose the source node family.

- **TOP** `top` - A raster image is converted to control signals by converting each pixel's location to X and Y amplitude values.
- **SOP** `sop` - A geometry is converted to control signals by converting each point's position to X and Y amplitude values.
- **CHOP** `chop` - A waveform is converted to control signals by converting each graph into corresponding horizontal and vertical offsets.

#### Sample Rate `rate`

Samples per second, the output sample rate.

#### Swap Output `swap`

Reverse the X and Y channel outputs.

#### X Scale `xscale`

Scale the x amplitude.

#### Y Scale `yscale`

Scale the y amplitude.

#### Rotate `rotate`

Specified in degrees, rotates the output x,y values.

#### Randomize Samples `randomize`

Output all samples in a random order. Creates a fuzzy chaotic image on an oscilloscope.

#### Output Color `color`

If on, r,g,b channels are created.If on, r,g,b channels are created.

#### Red Scale `redscale`

Scale the output r channel.

#### Green Scale `greenscale`

Scale the output g channel.

#### Blue Scale `bluescale`

Scale the output b channel.

#### Blanking Count `blankingcount`

In the case of SOP input, the number of black/off positions to insert between geometry primitives. In the case of TOP input, the number of black/off positions to insert between full raster scans. Color output must be enabled.In the case of SOP input, the number of black/off positions to insert between geometry primitives. In the case of TOP input, the number of black/off positions to insert between full raster scans. Color output must be enabled.

### TOP Page

#### TOP `top`

Path to the TOP node.

#### Width `width`

The number of columns to resample the image at.

#### Height `height`

The number of rows to resample the image at.

#### Level `level`

The number of brightness levels each pixel can have.

#### Auto Reduce `limit`

Automatically reduce the number of rows and columns dynamically to keep the output frame rate

#### Layered `layered`

Output the pixels in order of brightness, else they are output left to right for each row.

#### Interleave `interleave`

Controls the order in which rows are output to minimize flicker.

- **Sweep** `sweep` - The rows are output in order, from top to bottom.
- **Even Odd** `evenodd` - The rows are output in two passes, first even, then odd.
- **Max** `max` - The rows are output in fully interleaved fashion.

### SOP Page

#### SOP `sop`

Path to the SOP node.

#### Vertex Order `vertexorder`

Output the points in the same order as the vertices of each polygon, instead of the order in which the points are defined in the geometry.

#### Limit Step Size `limitstep`

Breakup long x,y jumps into several smaller incremental jumps.

#### Step Size `stepsize`

The distance each x,y can change when above option enabled.

#### Vertex Repeat `vertexrepeat`

Repeat each vertex of the each primitive multiple times.

#### Camera `camera`

Project the geometry onto a 2D plane from this camera, otherwise, only the original x,y components of the geometry are used.

### CHOP Page

#### CHOP `chop`

Path to the CHOP node.

#### Trigger `trigger`

The output graph will begin where its value exceeds this value. This allows for steady 'frozen' waveforms, analagous to an oscilloscope triggered sweep.

#### Trigger Value `triggerval`

The value to begin the trigger.

#### Trim `trim`

Limit the length of the CHOP to be scanned.

#### Trim Value `trimval`

The length of the CHOP to be scanned.

#### Trim Units `trimunits`

Select the units to use for this parameter, Samples, Frames, or Seconds.

### Common Page

#### Time Slice `timeslice`

Turning this on forces the channels to be "Time Sliced". A Time Slice is the time between the last cook frame and the current cook frame.

#### Scope `scope`

To determine which channels get affected, some CHOPs use a Scope string on the Common page.

#### Sample Rate Match `srselect`

Handle cases where multiple input CHOPs' sample rates are different. When Resampling occurs, the curves are interpolated according to the Interpolation Method Option, or "Linear" if the Interpolate Options are not available.

- **Resample At First Input's Rate** `first` - Use rate of first input to resample others.
- **Resample At Maximum Rate** `max` - Resample to the highest sample rate.
- **Resample At Minimum Rate** `min` - Resample to the lowest sample rate.
- **Error If Rates Differ** `err` - Doesn't accept conflicting sample rates.

#### Export Method `exportmethod`

This will determine how to connect the CHOP channel to the parameter. Refer to the Export article for more information.

- **DAT Table by Index** `datindex` - Uses the docked DAT table and references the channel via the index of the channel in the CHOP.
- **DAT Table by Name** `datname` - Uses the docked DAT table and references the channel via the name of the channel in the CHOP.
- **Channel Name is Path:Parameter** `autoname` - The channel is the full destination of where to export to, such has .

#### Export Root `autoexportroot`

This path points to the root node where all of the paths that exporting by Channel Name is Path:Parameter are relative to.

#### Export Table `exporttable`

The DAT used to hold the export information when using the DAT Table Export Methods (See above).
