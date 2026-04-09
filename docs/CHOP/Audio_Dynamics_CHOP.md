# Audio Dynamics CHOP

**Family:** CHOP (Channel Operator)

## Summary

The Audio Dynamics CHOP is designed to control the dynamic range of an audio signal. Dynamic range refers to how loud and quiet the audio is over some period of time. The Operator contains two types of dynamic control: compression and limiting. It is recommended that you link this CHOP to an Info CHOP, so that you can have some visual feedback: The amount of compression or limiting which is being applied will be displayed in the Info CHOP.

Compressor The goal of a compressor is to reduce the amplitude of a signal when it crosses a certain threshold, while introducing little to no harmonic distortion. The desired threshold is set by the user, and the amount of compression to be applied is determined by the compression ratio. The attack and release parameters determine how quickly the compression will be applied and released, as incoming signal goes above and below the threshold.

Limiter The purpose of a limiter is to ensure a signal is within a certain dynamic range, while introducing as little harmonic distortion as possible. Unlike the compressor, the goal is not to apply a smooth or musical form of dynamic control, but instead to keep the signal within a 'safe' range that is compatible with any CHOPS that are downstream (for example, an Audio Device Out). This means that the Limiter has a much more abrupt (instant) attack value, which cannot be adjusted by the user.

Input 2: Side Chain Channels - Other audio channels coming in can be used to determine the gains that are applied to the audio channels of the first input.

NOTE: This is a useful article for procedurally mixing audio for games.

See Audio Filter CHOP, Audio Para EQ CHOP, Audio Band EQ CHOP, Audio Spectrum CHOP See also: Envelope CHOP.

## Parameters

### Pre Page

#### Input Gain (dB) `inputgain`

This parameter controls the volume of the channel before it reaches the compressor. If the signal to be compressed is not in a useful dynamic range, this parameter can be used to repair it.

### Compressor Page

#### Enable Compressor `enablecompressor`

Turns the compressor on or off.

#### Compression Type `compressiontype`

Determines which compression method to use.

- **Automatic Gain Control** `compagc` - This type of compression is suitable for passages of audio which are varying in amplitude over an extended period of time. To apply this type of compression, set the threshold to a value which is near the maximum volume that you want to hear. Apply a large compression ratio (around 1.0), and set the attack and release to high values. As the passage of audio crosses the threshold value, compression will slowly be applied, and if set properly, the signal will be compressed to a constant range. Setting the attack and release too low will cause the output volume to waver too quickly, while high values may cause the compression to be applied too slowly.
- **Musical Dynamics** `compmus` - If a passage of vocals or a musical instrument is varying in amplitude and needs to be brought into a uniform dynamic range, try applying this type of compression. Unless a heavy compression sound is desired, it is best to use this effect lightly. Set the threshold into the volume range that you want to compress and apply a low compression ratio. Try different values of attack and release until you achieve a good dynamic balance.

#### Channel Linking `chanlinkingcomp`

As various channels come into the CHOP, they can either be compressed by an equal amount, or individually. If they are compressed equally, all of the channels will be evaluated for the highest peak value, and this value will be used to determine the compression amount. If they are compressed separately, each channel will be evaluated and compressed by different amounts.

- **Compress Equally** `compequally`
- **Compress Individually** `compindividually`

#### Threshold (dB) `thresholdcompressor`

This parameter sets the threshold value which a signal must cross before compression is applied. It uses a decibel scale, where '0 decibels' would be considered the loudest possible signal*, and '-60 decibels' would be nearly inaudible. This is assuming that input signals are normalized to a "-1 to +1" range.

#### Ratio `ratiocompressor`

The ratio is the amount of compression that will be applied to the signal, with respect to how far the signal has gone past the threshold value. A ratio of '0' will apply no compression. A value of '1' will cause a signals amplitude to be held down to the threshold value. With values over '1', the signal will become quieter as it passes the threshold.

#### Knee `kneecompressor`

The knee defines how the CHOP will transition into compression as signals approach or cross the threshold. With a knee of '0' (a hard knee), think of the compressor as applying a flat compression response, where: compression_gain(db) = amount_that_signal_has_crossed_threshold(dB) * compression_ratio This type of compression is not always desirable, as it can have a strong effect upon the dynamics of a sound. Increasing the knee parameter will cause there to be a smoothed transition into the compression. See the Knee diagram below.

#### Attack (msec=10**val) `attackcompressor`

The attack will control how quickly the compressor responds when a signal crosses the threshold. Increasing the attack parameter will cause the compressor to apply compression at a slower and smoother rate. Increasing the parameter too much, will cause compression to be applied too slowly.

#### Release (msec=10**val) `releasecompressor`

The release will control how quickly the compressor responds when a signal drops to a lower level, or goes below the threshold altogether. Just like the attack, higher value will slow down the response, but too high of a value will be too slow.

#### Output Gain (dB) `gaincompressor`

After applying compression, the signal can be reduced with Gain to a lower volume level. To make up the lost volume, this parameter can be increased.

### Limiter Page

#### Enable Limiter `enablelimiter`

Turns the limiter on or off.

#### Channel Linking `chanlinkinglim`

Same as compressor.

- **Limit Equally** `compequally`
- **Limit Individually** `compindividually`

#### Threshold (dB) `thresholdlimiter`

This is the threshold value which a signal must cross before limiting is applied. Usually, this value should be left at '0' decibels. Just like the compressor, a value of '0' decibels is considered to be the loudest possible signal.

#### Release (msec=10**val) `releaselimiter`

Although the attack of a limiter is always quick, the release can still be set by the user. This will determine how long the limiter takes to transition out of a limiting situation. Increasing the release will help smooth out the effect of the limiter. Too high of a value may cause the limiter to release too slowly. For example, after an excessively loud tone burst, the limiter's gain may have been pushed up to an extreme value. This extreme value will take a long time to be fully released.

#### Knee `kneelimiter`

Similar to the compressor, this parameter controls how the CHOP will transition into limiting, when a signal becomes louder. A larger knee will mean a smoother transition. See the Knee diagram above.

### Post Page

#### Dry / Wet Mix `drywet`

As this parameter is reduced from 1 (Wet) toward 0 (Dry), it removes the effect of the filter.

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

## Operator Inputs

- Input 0: -
- Input 1: -

## Info CHOP Channels

- compressor_multiplier - the amount that the compressor reduced the loudness. 1 means no-change. expressed not in dB – linear
- limiter_multiplier - the amount that the limiter reduced the loudness. not db – linear
- compressor_db - same as above but expressed in decibels
- limiter_db
- compressor_attack_msec - this is in milliseconds, computed from the parameter which is 1 msec at value 1 and 100,000 msec at value 5 (10**val)
- compressor_release_msec
- limiter_release_msec
