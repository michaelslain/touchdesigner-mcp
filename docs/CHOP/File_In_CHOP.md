# File In CHOP

**Family:** CHOP (Channel Operator)

## Summary

The File In CHOP reads in channel and audio files for use by CHOPs. The file can be read in from disk or from the web. Use http:// when specifying a URL.

For a complete listing of all valid formats for CHOPs, see the File Types section. The types of files that can be read into CHOPs include:

The same files can be output from the RMB menu on the CHOP by selecting Save Data Channels.

For MIDI files (.mid or .midi), see the MIDI In CHOP.

## Parameters

### File In Page

#### Channel File `file`

The name of the file to load. Use http:// when specifying a URL.

#### Name Options `nameoption`

Use this menu to control the names of the loaded channels.

- **Use Names In File** `infile` - Use the channel names stored in the file.
- **Use New Names** `new` - Use the name specified in the Name parameter.
- **Use Filename** `filename` - Use the filename as the name for the loaded channels.

#### Name `name`

Used to name the channels when the Name Options parameter is set to Use New Names.

#### Rate Options `rateoption`

Use this menu to adjust the sample rate of the loaded channels.

- **No Change** `nochange` - The sample rate is taken from the file.
- **Override** `override` - The sample rate is set to the number in the Sample Rate parameter, but the channels in the file are not resampled.
- **Resample** `resample` - Resamples at the specified Sample Rate. Takes the channels and the sample rate found in the file, and resamples it to the desired sample rate. This prevents very large arrays from being used in memory unnecessarily.

#### Sample Rate `rate`

Samples per second, as utilized by the Rate Options parameter.

#### Extend Left `left`

The left extend conditions (before/after range).

- **No Change** `asis` - Leave the channel as is.
- **Hold** `hold` - Hold the current value of the channel.
- **Slope** `slope` - Continue the slope before the start of the channel.
- **Cycle** `cycle` - Cycle the channel repeatedly.
- **Mirror** `mirror` - Cycle the channel repeatedly, mirroring every other cycle.
- **Default Value** `default` - Use the constant value specified in the Default Value parameter

#### Extend Right `right`

The right extend conditions (before/after range).

- **No Change** `asis` - Leave the channel as is.
- **Hold** `hold` - Hold the current value of the channel.
- **Slope** `slope` - Continue the slope after the end of the channel.
- **Cycle** `cycle` - Cycle the channel repeatedly.
- **Mirror** `mirror` - Cycle the channel repeatedly, mirroring every other cycle.
- **Default Value** `default` - Use the constant value specified in the Default Value parameter

#### Default Value `defval`

The value used for the Default Value extend condition.

#### Rename from `renamefrom`

The channel pattern to rename. See Pattern Matching.

#### Rename to `renameto`

The replacement pattern for the names. The default parameters do not rename the channels. See Pattern Replacement.

#### Value Override Pattern `overridpattern`

Scopes channels to apply the Override Value to.

#### Override Value `overridevalue`

The value given to channels scope by the Value Override Pattern parameter above.

#### Refresh `refresh`

Reload the file when this parameter is set to On.

#### Refresh Pulse `refreshpulse`

Instantly reload the file from disk.

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

## Info CHOP Channels

Extra Information for the File In CHOP can be accessed via an Info CHOP.

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
