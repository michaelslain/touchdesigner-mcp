# Filter CHOP

**Family:** CHOP (Channel Operator)

## Summary

The Filter CHOP smooths or sharpens the input channels. It filters by combining each sample and a range of its neighbor samples to set the new value of that sample. Each filter type uses its own weighting factors for the neighboring samples. The Filter Width determines the number of neighbors to use.

The default Gaussian filter nicely smooths out data, typically with a Filter Width around .3 seconds. The Box Filter is interesting when your inputs are step changes to new values: the values linearly interpolate to the new value.

It is useful to follow the Filter CHOP with a Trail CHOP and connect the filtered and pre-filtered signal to its inputs.

If you want to pass one or more channels in, each with multi-samples, and you want to filter each sample as if each sample was its own filter, turn on the Filter per Sample parameter.

For a similar, more-abrupt effect, see the Lag CHOP.

The Filter CHOP can filter both motion and sound, but other CHOPs are more appropriate for filtering sound (see the Audio Filter CHOP, Band EQ CHOP, and Parametric EQ CHOP).

## Parameters

### Filter Page

#### Type `type`

There are seven types of filters:

- **Gaussian** `gauss` - This filter has a Gaussian (normal or "bell" curve) shape that smooths the channel. It acts as a low pass filter. The wider the filter, the lower the cutoff frequency, resulting in smoother data.
- **Left Half Gaussian** `halfgauss` - This produces a lag on the channel. If the input channels represent values over time, this filter is seen as only using samples back in time from the current sample. For time-data, this is more realistic as you can't look ahead in time. (Maybe some day.) It has a half-bell shape.
- **Box** `box` - This filter is box-shaped, meaning that each neighbor sample it uses has the same weighting factor. It can produce unwanted steps in the output channel because the effect of the samples at the extremes of the filter don't fade out as the window slides over the samples. It low-pass filters data, similar to the Gaussian filter.
- **Left Half Box** `halfbox` - This filter produces a lag on the data, uses only samples back in time, and otherwise acts like a box filter.
- **Edge Detect** `edge` - This filter detects "edges", sharp changes in the input channels. It acts as a high pass filter. As the filter width is increased, more low frequencies are added.
- **Sharpen** `sharpen` - This filter sharpens all high frequencies. It is the sum of the edge detect result and the original data.
- **De-spike** `despike` - This filter removes "spikes" (samples more than `Spike Tolerance' above or below the expected sample value). The filter width allows you to eliminate spikes that are several samples long. Wide filters will remove wide spikes (spikes of several samples) and small filters will only remove narrow spikes (one or two samples in length).
- **Ramp Preserve** `ramp` - This filter attempts to output an increasing ramp that increases at the 'Ramp Rate' parameter rate. The input channel to the Filter CHOP should be increasing at this rate, with possibly some errors/noise in it. The Ramp Preserve will ignore the input channel unless the difference between the input value and the current ramp value is larger than 'Ramp Tolerance' parameter. When the difference becomes greater than the tolerance, the ramp will reset to start at the current input value.
- **One Euro** `oneeuro` - This filter is good for filtering noisy signals while maintaining high precision and resposiveness.

#### Effect `effect`

The extent to which the filter affects the channel (0 - not at all, 1 - maximum effect).

#### Filter Width `width`

The amount of surrounding samples used in the calculation of the current sample. It is expressed in the Units.

#### Filter Width Unit `widthunit`

Choose between using Samples, Frames, or Seconds as the units for this parameter.

#### Spike Tolerance `spike`

For the De-spike filter type, this is the amount that a sample can differ from its neighbours without being considered a spike.

#### Ramp Tolerance `ramptolerance`

When using a Ramp Preserve filter, if the input value deviates from the current output ramp value by this much, then the ramp will reset to the new input value. Otherwise the Ramp Preserve will continue climbing at the specified 'Ramp Rate'.

#### Ramp Rate `ramprate`

When using a Ramp Preserve filter, this is the rate that the CHOP's output channel will increase. Only if the input channel value deviates from the desired output value by 'Ramp Tolerance' amount will the CHOP instead output the input channel value.

#### Number of Passes `passes`

The number of times the filter is applied to the channel.

#### Cutoff Frequency (Hz) `cutoff`

Decrease it if slow speed jitter is a problem.

#### Speed Coefficient `speedcoeff`

Increase if high speed lag is a problem.

#### Slope Cutoff Frequency (Hz) `slopecutoff`

Avoids high derivative bursts caused by jitter.

#### Slope Down Reset `slopedownreset`

When On resets (bypasses) the filter effect when the downward slope exceeds the Slope Down Max value to the right.

#### Slope Down Max `slopedownmax`

Set the maximum value of the slope downwards beyond which the filter resets when the toggle to the left is On.

#### Slope Up Reset `slopeupreset`

When On resets (bypasses) the filter effect when the upward slope exceeds the Slope Up Max value to the right.

#### Slope Up Max `slopeupmax`

Set the maximum value of the slope upwards beyond which the filter resets when the toggle to the left is On.

#### Reset `reset`

When On resets (bypasses) the filter effect.

#### Reset Pulse `resetpulse`

Instantly resets the filter effect.

#### Filter per Sample `filterpersample`

Applies the filter to each sample of the channel instead of across the whole channel. Useful for working with multi-sample channels.

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

Extra Information for the Filter CHOP can be accessed via an Info CHOP.

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
