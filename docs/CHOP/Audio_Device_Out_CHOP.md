# Audio Device Out CHOP

**Family:** CHOP (Channel Operator)

## Summary

The Audio Device Out CHOP sends audio to any of the attached audio output devices using DirectSound/CoreAudio or ASIO. The second input on the Audio Device Out CHOP can be used for volume control.

> **Tip:** If you get audio popping or audio dropouts, it may be caused by your actual frame rate of your main timeline - some frames may take too long to compute/render. See Time Slicing. There are four possible remedies:

## Parameters

### Audio Device Out Page

#### Active `active`

Turns the audio output on or off.

#### Driver `driver`

Select between default DirectSound/CoreAudio or ASIO drivers.

- **DirectSound** `default` - The default Windows audio driver (a.k.a. WDM) or macOS CoreAudio driver, depending on your OS.
- **ASIO** `asio` - Low-latency drivers which usually come from the hardware's manufacturer.

#### Device `device`

A menu of available audio devices to output to. Selecting default sets the audio device to that which is selected in Windows Control Panel>Sounds and Audio Devices>Audio>Sound Playback.

#### Error if Missing `errormissing`

The CHOP will error if the specified device is not found.

#### Outputs `outputs`

When Driver is set to ASIO on Windows or CoreAudio on macOS, this parameter lets you pick which output channels to use.

#### Buffer Length `bufferlength`

The length of the audio buffer in seconds. Audio output is delayed by this amount. For example, if the Buffer Length is 0.25 then the sound will occur 250ms = 0.25 seconds later than this CHOP received it (to keep the buffer full). If you hear crackling or popping in the audio output, try increasing this value.

#### Adjust Speed `adjustspeed`

This value controls how forcefully the output queue is modified when it grows too long or too short. A larger value recovers the queue size more quickly, but results in audible pitch changes.

#### Volume `volume`

0 = mute, 1 = full volume.

#### Pan `pan`

0 = left, 0.5 = centered, 1 = right.

#### Clamp Output `clampoutput`

Clamps the output between -1 and 1 to avoid clipping and overdriving of the audio system.

#### Cycle Channels in Output

When True the audio channels are sent to each audio output such that no outputs are left silent. For example this allows a single channel to be output on two stereo outputs. (ASIO only).

#### Cook Every Frame `cookalways`

Forces the CHOP to cook every frame. This should be checked on at all times when outputing audio. It can be turned off when the CHOP is not in use.

### Output 1 Page

#### Stereo Mode `stereo`

Set to simple stereo left/right output mode.

#### Front Left `frontleft`

Enable this output if available.

#### Front Right `frontright`

Enable this output if available.

#### Front Center `frontcenter`

Enable this output if available.

#### Low Frequency `lowfrequency`

Enable this output if available.

#### Back Left `backleft`

Enable this output if available.

#### Back Right `backright`

Enable this output if available.

#### Front Left of Center `frontleftcenter`

Enable this output if available.

#### Front Right of Center `frontrightcenter`

Enable this output if available.

#### Back Center `backcenter`

Enable this output if available.

### Output 2 Page

#### Side Left `sideleft`

Enable this output if available.

#### Side Right `sideright`

Enable this output if available.

#### Top Center `topcenter`

Enable this output if available.

#### Top Front Left `topfrontleft`

Enable this output if available.

#### Top Front Center `topfrontcenter`

Enable this output if available.

#### Top Front Right `topfrontright`

Enable this output if available.

#### Top Back Left `topbackleft`

Enable this output if available.

#### Top Back Center `topbackcenter`

Enable this output if available.

#### Top Back Right `topbackright`

Enable this output if available.

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

Extra Information for the Audio Device Out CHOP can be accessed via an Info CHOP.

### Specific Audio Device Out CHOP Info Channels
- queue_speed - The speed at which the output buffer is being played. Ideally it should not stray far from 1.0 (normal speed).
- queue_read_pos - The current read position of the queue buffer. When playing back normally it should be ramping between start and end.
- queue_write_pos - The current write position of the queue buffer. When playing back normally it should be ramping between start and end.
- queue_length - The total length of the audio output buffer, in seconds.
- queue_added - This value reflects the size of the audio segment last added to the output buffer.

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
