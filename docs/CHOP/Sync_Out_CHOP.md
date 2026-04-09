# Sync Out CHOP

**Family:** CHOP (Channel Operator)

## Summary

The Sync In CHOP and Sync Out CHOP are used to keep timelines in two or more TouchDesigner processes within a single frame of each other. One process will contain a Sync Out CHOP while one or more other processes contain Sync In CHOPs. The processes with Sync In CHOPs should have their Realtime flag checked off, as their frame rates will be determined by the Sync Out CHOP. Also note, all monitors (including all clients and server) should be set to the same rate. Note that unplugging or re-adding monitors may sometime change previously configured settings.

The CHOPs synchronize by pausing their own timeline until all Sync In/Out CHOPs have cooked. The Sync Out CHOP will be ahead of the Sync In CHOPs. If any CHOPs fail to communicate, the others will timeout, causing all processes to run slowly.

Client machines may come online at any point, or be switched off as desired, as the Sync Out CHOP will adjust accordingly, either timing out, temporarily or permanently banning individual clients as specified.

In addition any extra CHOP channels sent through the Sync Out CHOP is received by the Sync In CHOPs.

NOTE for Windows OS - If experiencing connection issues make sure Windows Firewall is disabled.

An Info DAT, pointing to the Sync Out CHOP, provides a detailed list of all clients:

The columns are:

Similarly, an Info CHOP will reveal further information: Info CHOP Channels

## Parameters

### Sync Out Page

#### Active `active`

Whether or not the CHOP is currently attempting to synchronize itself.

#### Multicast Address `multicastaddress`

An IP address to communicate on (224.0.0.1).

#### Network Port `port`

The network port associated with the address.

#### Local Address `localaddress`

Specify an IP address to send from, useful when the system has mulitple NICs (Network Interface Card) and you want to select which one to use.

#### Local Port Mode `localportmode`

Choose between automatically or manually selecting local port to use.

- **Automatic** `automatic`
- **Manual** `manual`

#### Local Port `localport`

When the above parameter is set to 'Manual', enter the port number to use here.

#### Timeout (msec) `timeout`

The maximum amount of time the CHOP will wait for synchronization signals from the other Sync CHOPs. This value is expressed in milliseconds.

#### Client Timeouts (Consecutive) `clienttimeouts`

The maximum number of consecutive timeouts a client must generate until it is ignored, causing no further timeouts. It will remain ignored until it replies on time again or this CHOP is reset.

#### Ban Clients `banclients`

Enables permanent banning of clients.

#### Total Timeouts `banclienttimeouts`

The maximum number of timeouts a client must generate until it is permanently ignored. Only a reset will allow it to be included again.

#### Clear Stats `clearstats`

Pressing this button will clear all banned lists, as well as totals reported in an Info CHOP.

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

Extra Information for the Sync Out CHOP can be accessed via an Info CHOP.

### Specific Sync Out CHOP Info Channels
- sync_incompletes - This number is constant when the system is in sync, and will climb up each time the number of clients responding does not match the expected number. When all is steady, the number does not change.
- sync_totaldelay - The total amount of time spent waiting for acknowledgement replies from the clients (milliseconds).
- sync_lastdelay - The amount of time waiting for acknowledgement replies from the clients for the last message (milliseconds).
- sync_internal - The number of clients within the same .toe file (process) that it is waiting on.
- sync_external - The number of clients from different .toe files (other processes) that it is waiting on.
- sync_serial - The last serial index sent to the clients. Increases each message sent.

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
