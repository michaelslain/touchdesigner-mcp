# Audio Movie CHOP

**Family:** CHOP (Channel Operator)

## Summary

The Audio Movie CHOP plays the audio of a movie file that is played back with a Movie File In TOP. Use the Movie File In TOP parameter to specify which Movie File In TOP to get the audio signal from.

## Parameters

### Movie Audio Page

#### Play `play`

Audio playback is enabled when this is set to On. No audio output when Off.

#### Movie File In TOP `moviefileintop`

Put the path of a Movie File In TOP in this parameter. The file named in the Movie File In TOP will be the source for the audio.

#### Pre-Read Length `prereadlength`

Use to read-ahead the audio into cache. You can specify in samples, frames and in seconds using the Units menu.

#### Pre-Read Length Unit `prereadlengthunit`

Specify which units to use for the Pre-Read Length parameter.

#### Open Timeout `opentimeout`

The amount of time TouchDesigner will wait for the audio samples to be read from the movie file. On file opening, if this timeout period is reached and the read-ahead has not finished, the audio will be output as zeros until all the pre-read samples have been read from the file.

#### Audio Sync Offset `syncoffset`

Offsets the audio playback of the movie. This can be used to get better sync between the audio and images in the movie when there is audio latency in the system (For example, audio latency from the Audio Device Out CHOP queue). A negative value plays audio that amount of time sooner, to counteract delay introduced by buffering such as in Audio Device Out CHOP.

#### Audio Sync Offset Unit `syncoffsetunit`

Specify which units to use for the Audio Sync Offset parameter.

#### Index Channel `index`

Turn this parameter On to output an additional channel which reports the current position in the movie ie. 0 = start, 1 = end.

#### Audio Track Index `audiotrack`

When the movie has multiple audio tracks available this parameter can select between them.

#### Volume `volume`

Set the level the signal retrieved from the movie. A setting of 1 is full signal while 0 is muted.

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

Extra Information for the Audio Movie CHOP can be accessed via an Info CHOP.

### Specific Audio Movie CHOP Info Channels
- mv_has_audio -
- mv_au_playback_rate -
- mv_au_eval_index -
- mv_au_eval_index_loop -

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
