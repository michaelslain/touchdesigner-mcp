# Trim CHOP

**Family:** CHOP (Channel Operator)

## Summary

The Trim CHOP shortens or lengthens the input's channels. A part of the interval can be preserved or removed. If the channels are being lengthened, the extend conditions of the channel will be used to get the new values.

The Trim CHOP is sometimes used to get a 1-sample value at the current frame, where the inputs are channels at frame 0 or channels at some other frame range.

The handles on the Trim CHOP in the graph can interactively adjust its length.

See also Splice CHOP, Delete CHOP, Select CHOP

## Parameters

### Trim Page

#### Unit Values `relative`

Determines whether the Start/End parameters are expressed as absolute numbers (relative to time 0) or numbers that are relative to the start and end of the input channels.

- **Absolute** `abs` - The Start and End are the actual numbers defining the new interval.
- **Relative to Start/End** `rel` - The Start and End are relative to the start and end of the input CHOP.
- **Relative to Current Frame** `cur` - Only one sample is output, containing the channel values at the current frame.
- **Current Time Slice** `slice` - Channel value is based on the current time slice.

#### Start `start`

The start of the range to trim. The numbers are expressed in seconds, frames or samples, depending on units menu for each parameter.

#### Start Unit `startunit`

#### End `end`

The end of the range to trim. The numbers are expressed in seconds, frames or samples, depending on units menu for each parameter.

#### End Unit `endunit`

#### Discard `discard`

Which part of the channel to discard:

- **Exterior** `exterior` - Discard those parts of the channel outside the trim range.
- **Interior** `interior` - Discard the interior of the trim range. If two intervals remain, sequence them together.

### Common Page

#### Time Slice `timeslice`

Turning this on forces the channels to be "Time Sliced". A Time Slice is the time between the last cook frame and the current cook frame.

#### Scope `scope`

To determine which channels get affected, some CHOPs use a Scope string on the Common page. See Pattern Matching.

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

#### Rename from `commonrenamefrom`

The channel pattern to rename. See Pattern Matching.

#### Rename to `commonrenameto`

The replacement pattern for the names. The default parameters do not rename the channels. See Pattern Replacement. Example: Channel Names: c[1-10:2] ambient Rename From: c* ambient Rename To: b[1-5] ambThis example fetches channels c1 c3 c5 c7 c9 and ambient. They are then renamed to to b1 b2 b3 b4 b5 and amb.

## Operator Inputs

- Input 0: -
- Input 1: -

## Info CHOP Channels

Extra Information for the Trim CHOP can be accessed via an Info CHOP.

### Common CHOP Info Channels
- start - Start of the CHOP interval in samples.
- length - Number of samples in the CHOP.
- sample_rate - The samplerate of the channels in frames per second.
- num_channels - Number of channels in the CHOP.
- time_slice - 1 if CHOP is Time Slice enabled, 0 otherwise.
- export_sernum - A count of how often the export connections have been updated.

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
