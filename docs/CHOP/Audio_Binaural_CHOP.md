# Audio Binaural CHOP

**Family:** CHOP (Channel Operator)

## Summary

The Audio Binaural CHOP uses the Steam Audio API to convert from multi-channel speaker-based audio (eg. stereo, quadraphonic, 5.1, 7.1, etc.) to binaural using HRTF-based binaural rendering. The HRTF used is the default provided by Steam Audio.

The Audio Binaural CHOP is useful for converting audio from a variety of formats to a 2-channel binaural format that is VR-friendly.

The sample rate of the output is determined by the audio source, which must be either 44100 or 48000.

See also: Audio Render CHOP, OpenVR, Oculus Rift

## Parameters

### Setup Page

#### Active `active`

When enabled, will be actively performing binaural rendering. When disabled, the channels will be zeroed.

#### Input Format `inputformat`

Select the input format to convert from. The input CHOP is required to have the correct number of channels (eg. 6 for 5.1 Surround).

- **Stereo** `stereo` - 2 channels required in input.
- **Quadraphonic Surround** `quadraphonic` - 4 channels required in input.
- **5.1 Surround** `fiveone` - 6 channels required in input.
- **7.1 Surround** `sevenone` - 8 channels required in input.
- **Custom Setup** `custom` - Channel number is dependent on number of speakers in the mapping table.
- **Ambisonics** `ambisonics` - Channel number is dependent on the ambisonics order.

#### Ambisonics Order `ambisonicsorder`

Used in conjunction with ambisonics input format. Supports ambisonics order 1-3 Determines how many channels are required from the input. Ambisonics order 1, 2, 3 require 4, 9, 16 channels respectively.

#### Listener `listener`

Optionally specify a listener object when using an ambisonics input. The listener's orientation will be applied before binaural rendering.

#### Mapping Table `mappingtable`

A DAT Table that specifies the various speakers in the setup and their position. The Table must have 3 columns named x, y, z. Each row specifies an individual speaker, and the 3 columns specify its position. Used with the Custom Setup Input Format. The mapping table will require one channel per row from the input CHOP.

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

## Info CHOP Channels

Extra Information for the can be accessed via an Info CHOP. Info Channels Common Page

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
