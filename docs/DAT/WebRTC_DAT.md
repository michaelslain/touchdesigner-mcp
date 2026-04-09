# WebRTC DAT

**Family:** DAT (Data Operator)

## Summary

A WebRTC DAT represents a peer on one end of any number of WebRTC peer-to-peer connections.

Each connection is represented in TouchDesigner by a generated UUID. The UUID must be passed to WebrtcDAT Class connection-level python methods.

The WebRTC DAT output is a table formatted with a row per connection, with columns: id (ie. UUID), connection_state, signaling_state, ice_connection_state, and ice_gathering_state.

The columns altogether describe the state of a connection and can also be useful for debugging. For example, if ice_connection_state failed then that means there's an issue pairing local and remote ICE candidates for streaming over the network. It could be that NAT traversal failed, and if using a STUN server that might indicate a need for a TURN server (see https://en.wikipedia.org/wiki/STUN#Limitations).

WebRTC video and audio input/output is done via the Video Stream In TOP, Video Stream Out TOP, Audio Stream In CHOP, and Audio Stream Out CHOP.

See also WebRTC.

## Parameters

### Connection Page

#### Active `active`

When active, can connect to peers and send media/data. When deactivated, all existing connections will be closed.

#### Reset `reset`

Resets the peer associated with the DAT. Equivalent to deactivating then reactivating the active parameter.

#### Custom Bit Rate Limits `bitratelimits`

When enabled, custom min/max bit rates can be specified. These max bit rate limits are expressed in kbps and apply to all tracks associated with the WebRTC DAT.

#### Minimum Bit Rate (kbps) `minbitrate`

Minimum bit rate for all tracks associated with the WebRTC DAT.

#### Maximum Bit Rate (kbps) `maxbitrate`

Maximum bit rate for all tracks associated with the WebRTC DAT.

#### Callbacks DAT `callbacks`

Reference to a DAT containing WebRTC callbacks.

### ICE Page

#### STUN Server URL `stun`

URL of the STUN server. See WebRTC#ICE for more details regarding STUN.

#### TURN Username `username`

Username for access to the specified TURN servers.

#### TURN Password `password`

Password for access to the specified TURN servers.

#### TURN Server `turn`

Sequence of TURN server urls. TURN Server URL 0 turn0server - URL of the TURN server. See WebRTC#ICE for more details regarding TURN.

### Common Page

#### Language `language`

Select how the DAT decides which script language to operate on.

- **Input** `input` - The DAT uses the inputs script language.
- **Node** `node` - The DAT uses it's own script language.

#### Edit/View Extension `extension`

Select the file extension this DAT should expose to external editors.

- **dat** `dat` - various common file extensions.
- **frag** `frag`
- **glsl** `glsl`
- **html** `html`
- **md** `md`
- **py** `py`
- **rtf** `rtf`
- **tsv** `tsv`
- **txt** `txt`
- **vert** `vert`
- **xml** `xml`
- **From Language** `languageext` - pick extension from DATs script language.
- **Custom Extension** `customext` - Specify a custom extension.

#### Custom Extension `customext`

Specifiy the custom extension.

#### Word Wrap `wordwrap`

Enable Word Wrap for Node Display.

- **Input** `input` - The DAT uses the inputs setting.
- **On** `on` - Turn on Word Wrap.
- **Off** `off` - Turn off Word Wrap.
