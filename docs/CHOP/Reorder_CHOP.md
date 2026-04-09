# Reorder CHOP

**Family:** CHOP (Channel Operator)

## Summary

The Reorder CHOP re-orders the first input CHOP's channels by numeric or alphabetic patterns. Either a channel pattern specifies the new order, or a number sequence specifies the new order.

If the second input, the Order Reference is present, the Numeric Pattern and Character Pattern are ignored, and the first input CHOP's channels are reordered to match as well as possible the reference CHOP's. In this case, Method is not used.

Channel values are never affected.

## Parameters

### Reorder Page

#### Method `method`

There are three different reordering methods. You can enter a Numeric Pattern, a Character Pattern, or use an optional second input CHOP as an order reference.

- **Numeric Pattern** `numeric` - This reorders the channels by channel number.
- **Character Pattern** `character` - This reorders the channels by channel name.
- **Base Name Sort** `basename` - This reorders the channels by their base name discounting the numeric suffix. For example will be reordered to
- **Numeric Suffix Sort** `numsuffix` - This reorders the channels by their numeric suffix discounting the base name. For example will be reordered to
- **Channel Value Up** `chanvalueup` - This reorders the channels by the channel's value, lowest first.
- **Channel Value Down** `chanvaluedown` - This reorders the channels by the channel's value, highest first.
- **Reverse** `reverse` - This reverses the input CHOP's channel order.
- **Random** `random` - This reorders the channels randomly.
- **Merge N Groups** `group` - This reorders the channels in groups the size of N, specified through the parameter. This can be useful if you have a sequence of channels and your desired order is
- **Every Nth Channel** `split` - This reorders the channels by selecting every Nth channel, specified through the parameter.

#### Order Reference `orderref`

Only enabled if a second input is present. Specifies the format of that input.

- **By Name** `byname` - The input consists of a list of channels, whose names specify the order.
- **By Index** `byindex` - The input consists of a single channel, whose sample values specify the order.

#### Numeric Pattern `numpattern`

This reorders the channels by channel number. Normally the index order is 0,1,2,3... etc.. The first channel is at index 0. Standard numeric patterns are allowed such as "0-6:1,2" or "!*:1,3".

#### Character Pattern `charpattern`

This reorders the channels by channel name. Standard character patterns are allowed such as "ch[XYZ]" or "chan[1-15:2,5]" or "chan? ch*". See Scope and Channel Name Matching Options p. 102 in the section, Standard Options of CHOPs.

#### Seed `seed`

Only available if Channel Reorder Method is set to "Random", specify any number, integer or non-integer, which starts the random number generator. Each number gives completely different patterns, but with similar characteristics.

#### N Value `nvalue`

Only available if Channel Reorder Method is set to "Merge N Groups" or "Every Nth Channel".

#### Remaining Position `rempos`

Channels that do not match are called "remaining" and can also be ordered: they can be placed at the At Beginning or At Ending (in reference to the position of the matched channels).

- **At Beginning** `begin`
- **At Ending** `end`

#### Remaining Order `remorder`

The channels that did not match can have the Same as Input order, or can be sorted AlphaNumerically.

- **Same as Input** `input`
- **AlphaNumeric** `alpha`

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

Extra Information for the Reorder CHOP can be accessed via an Info CHOP.

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
