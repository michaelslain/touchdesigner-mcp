# OAK Select CHOP

**Family:** CHOP (Channel Operator)

## Summary

The OAK Select CHOP is like a Script CHOP combined with a Select CHOP, and any of the other hardware-specific CHOPs. The basic operation involves providing an OAK Device CHOP and a stream name. In the simplest case, the stream's data will show up as well-named channels. For example, ImgDetections messages indicating the 2D coordinates and labels of detected objects will show up as CHOP channels without any manual coding. In more complex cases such as hand landmark tracking, the stream may be of NNData or Buffer type, requiring the user to implement a callback and parse the data.

## Parameters

### OAK Page

#### Active `active`

Toggle whether the OAK Select CHOP cooks.

#### OAK Device CHOP `chop`

An OAK Device CHOP running a depthai pipeline.

#### Stream `stream`

The name of the stream to be received.

#### Queue Size `queuesize`

For memory efficiency, this parameter controls the number of messages TouchDesigner reuses when receiving messages from OAK. See "Queue Size" below.

#### Max Items `maxitems`

This parameter helps the OAK Select CHOP output a consistent number of channels. When running an image detection pipeline, the number of detected items will vary from frame to frame, but we want TouchDesigner to output a consistent number of channels.

#### Output Format `outputformat`

The default option "Items As Separate Channels" enables time-slicing while "Items as Separate Samples" does not. If the stream is one which automatically fills in the CHOP, then "Items as Separate Samples" is a useful way to make the CHOP output Max Items samples consistently.

- **Items As Separate Channels** `itemsaschannels`
- **Items As Separate Samples** `itemsassamples`

#### Use First Sample Only `firstsample`

Only use the most recently received message with the OAK Select CHOP. For example, for an IMU stream which is sending very high-frame rate data, toggling this parameter will only show the latest sample.

#### Sample Rate `rate`

The sample rate of the CHOP. The default sample rate is me.time.rate.

#### Callbacks DAT `callbacks`

Specifies the DAT which holds the callbacks.

#### Setup Parameters `setuppars`

Clicking the button runs the setupParameters() callback function.

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

Extra Information for the oakselect CHOP can be accessed via an Info CHOP.

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

### Script CHOP Functionality
The OAK Select CHOP mimics the Script CHOP in several ways. There's a callback for onSetupParameters, where custom parameters can be added. Also, in the other callbacks such as onReceiveNNData, onReceiveBuffer, and onReceiveSystemInformation it's possible to append channels and write data. When implementing a custom callback like below, if you want to disable time-slicing or set the number of output samples, the Output Format parameter should be "Items as Separate Samples".

### Queue Size
The Queue Size parameter helps TouchDesigner avoid holding onto too many messages while also re-using memory for a minimum number of messages. For example, picking 2 is a good choice because TouchDesigner can show 1 message to the user while 1 remaining message can asynchronously be written to with new data. However, if the stream is meant to be high frame-rate, such as IMU data, then the queue size should be at least double the number of messages you expect to receive in a single TouchDesigner frame. If TouchDesigner were to drop a video frame, then the next cook would want to use two times the number of messages that would have normally be shown, requiring the queue size to be at least twice as large.

### Max Items
Some messages can be described as items. For example, ImgDetections can be grouped into item0's channels, item1's channels, item2's channels and so on. For these kinds of streams, it can be helpful to have a constant number of channels in the OAK Select CHOP, regardless of whether an item exists in the most recent message.

### Output Format
The default Output Format is "Items as Separate Channels". For example, when receiving ImgDetections from MobileNet, each detection would require 6 channels ("confidence", "label", "xmin", "xmax", "ymin", "ymax"). The total number of channels would be 6 times the Max Items built-in parameter. In this situation, time-slicing is enabled, so the number of samples will vary according to time-slicing.
If you're willing to sacrifice time-slicing, you can set the output format to "Items as Separate Samples". This will shuffle the latest messages into 6 channels by Max Items samples. In other words, each ImgDetection item will correspond to a CHOP sample. Another reason to use "Items as Separate Samples" is if you're implementing a callback such as onReceiveNNData and need to set the number of samples (oakSelectOp.numSamples = 1).

### Use First Sample Only
Like the Shuffle CHOP, the Use First Sample Only parameter makes it easy to only use the most recently received message with the OAK Select CHOP. For example, an IMU stream might be sending very high-frame rate data, and toggling this parameter on would be like using a Trim CHOP in "Absolute" value mode to only show the latest sample.

### Info CHOP
When an OAK Select CHOP is connected to an Info CHOP, in addition to the regular cook-related channels, there will be a few OAK-specific ones:
- sequence_num: (see "sequenceNum" in the depthai documentation)
- messages_received: the total number of messages received with stream name set on the OAK Select CHOP
- fps: The effective frames-per-second of this stream, i.e., how quickly TouchDesigner is receiving messages. This is not the target FPS of the stream.

### See Also
- OAK-D
- OAK Device CHOP
- OAK Select TOP
