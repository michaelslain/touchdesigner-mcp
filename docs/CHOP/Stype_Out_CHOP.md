# Stype Out CHOP

**Family:** CHOP (Channel Operator)

## Summary

The Stype Out CHOP sends camera tracking information, including position, orientation and lens information, to an external device or program over the network using the Stype HF protocol. This can be used to emulate a physical Stype camera or to send data to another program/device that can process Stype tracking data. Data packets are sent out once per frame based on the current data in the CHOP channels. If one of the expected channels is not found in the input, then a default value will be sent.

The channels used by the Stype Out CHOP are:

## Parameters

### Stype Out Page

#### Active `active`

Turn this parameter off to stop sending out data packets.

#### Protocol `protocol`

Selects the network protocol to use. Refer to the Network Protocols article for more information.

- **Messaging (UDP)** `msging`
- **Multi-Cast Messaging (UDP)** `multicastmsging`

#### Network Address `netaddress`

The network address of the computer to send the Stype data to. The address can be a domain name, an IP address (e.g. 100.123.45.78), or "localhost" to target the packets at another program on the same machine.

#### Network Port `port`

The port to send the data packets to.

#### Local Address `localaddress`

Specify an IP address to send from. This is useful when the system has multiple NICs (Network Interface Card) and you want to select which one to use.

#### Timecode Object/CHOP/DAT `timecodeop`

Set the time with a reference to a timecode. A reference to either a CHOP with channels 'hour', 'second', 'minute', 'frame', a DAT with a timecode string in its first cell, or a Timecode Class object. When a timecode is not reference, the Stype CHOP will instead use 'hour', 'second', 'minute', 'frame' channels from the input CHOP.

#### Packet Number Source `packetnumber`

Determine how the packet number field is generated. The packet number generally increments by 1 each frame and loops from 255 to 0.

- **Auto-Generate** `generate` - The packet number is automatically incremented by 1 each frame.
- **From Channel input** `input` - The packet number is taken from the input CHOP.

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
