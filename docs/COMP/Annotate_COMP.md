# Annotate COMP

**Family:** COMP (Component)

## Summary

Annotates are displayed in the Network Editor as colored rectangles containing user-authored text and graphics. It is based on the Annotate COMP and allows you to document your networks with useful information like comments and node grouping.

There are three built-in forms of the Annotate COMP: Comments, Network Boxes, and Annotates that can be easily created:

## Parameters

### Annotate Page

#### Operator Viewer `opviewer`

The operator whose view is displayed in the Annotate area. This defines what the entire Annotate looks like and is not to be confused with the OP parameter in the OP Viewer page, which is an integrated viewer _within_ the annotate.

#### Enable Interaction `enable`

When False, disables all interaction with the Annotate and passes any clicks through to the network below.

#### Enclose Operators `encloseops`

When True, other operators in the Annotate's area will move with it when it is moved.

#### Utility `utility`

Sets whether or not this is a Utility node. This controls whether or not the operator is findable in searches, etc.

#### Include in Order `includeinorder`

Include this Annotate in the Order of annotateCOMPs in this network.

#### Order `order`

Order number of this annotateCOMP

#### Layer Zone `layerzone`

Where this annotateCOMP is layered with regards to other items in the network.

- **Below Grid** `belowgrid` - Behind everything, including the grid.
- **Between Grid and Nodes** `betweengridnodes` - Behind nodes but in front of grid
- **Above Nodes** `abovenodes` - Above everything, including grid and nodes.

#### Depth Layer `layer`

Last ditch layering index. AnnotateCOMPs in the same zone will always attempt to display smaller annotateCOMPs they enclose on top.

### Extensions Page

#### Re-Init Extensions `reinitextensions`

Recompile all extension objects. Normally extension objects are compiled only when they are referenced and their definitions have changed.

#### Init Extensions On Start `initextonstart`

Perform a Re-Init automatically when TouchDEsigner Starts

#### Extension `ext`

Sequence of info for creating extensions on this component

#### Object `ext0object`

A number of class instances that can be attached to the component.

#### Name `ext0name`

Optional name to search by, instead of the instance class name.

#### Promote `ext0promote`

Controls whether or not the extensions are visible directly at the component level, or must be accessed through the .ext member. Example: n.Somefunction vs n.ext.Somefunction

### Common Page

#### Parent Shortcut `parentshortcut`

Specifies a name you can use anywhere inside the component as the path to that component. See Parent Shortcut.

#### Global OP Shortcut `opshortcut`

Specifies a name you can use anywhere at all as the path to that component. See Global OP Shortcut.

#### Internal OP `iop`

Sequence header for internal operators. Shortcut iop0shortcut - Specifies a name you can use anywhere inside the component as a path to "Internal OP" below. See Internal Operators. OP iop0op - The path to the Internal OP inside this component. See Internal Operators.

#### Operator Viewer `opviewer`

Select which operator's node viewer to use when the Node View parameter above is set to Operator Viewer.

#### Enable Cloning `enablecloning`

Control if the OP should be actively cloneing. Turning this off causes this node to stop cloning it's 'Clone Master'.

#### Enable Cloning Pulse `enablecloningpulse`

Instantaneously clone the contents.

#### Clone Master `clone`

Path to a component used as the Master Clone.

#### Load on Demand `loadondemand`

Loads the component into memory only when required. Good to use for components that are not always used in the project.

#### Enable External .tox `enableexternaltox`

When on (default), the external .tox file will be loaded when the .toe starts and the contents of the COMP will match that of the external .tox. This can be turned off to avoid loading from the referenced external .tox on startup if desired (the contents of the COMP are instead loaded from the .toe file). Useful if you wish to have a COMP reference an external .tox but not always load from it unless you specifically push the Re-Init Network parameter button.

#### Enable External .tox Pulse `enableexternaltoxpulse`

This button will re-load from the external .tox file (if present).

#### External .tox Path `externaltox`

Path to a .tox file on disk which will source the component's contents upon start of a .toe. This allows for components to contain networks that can be updated independently. If the .tox file can not be found, whatever the .toe file was saved with will be loaded.

#### Reload Custom Parameters `reloadcustom`

When this checkbox is enabled, the values of the component's Custom Parameters are reloaded when the .tox is reloaded. This only affects top-level parameters on the component, all parameters on nodes inside the component are always reloaded with the .tox.

#### Reload Built-In Parameters `reloadbuiltin`

When this checkbox is enabled, the values of the component's built-in parameters are reloaded when the .tox is reloaded. This only affects top-level parameters on the component, all parameters on nodes inside the component are always reloaded with the .tox.

#### Save Backup of External `savebackup`

When this checkbox is enabled, a backup copy of the component specified by the External .tox parameter is saved in the .toe file. This backup copy will be used if the External .tox can not be found. This may happen if the .tox was renamed, deleted, or the .toe file is running on another computer that is missing component media.

#### Sub-Component to Load `subcompname`

When loading from an External .tox file, this option allows you to reach into the .tox and pull out a COMP and make that the top-level COMP, ignoring everything else in the file (except for the contents of that COMP). For example if a .tox file named project1.tox contains project1/geo1, putting geo1 as the Sub-Component to Load, will result in geo1 being loaded in place of the current COMP. If this parameter is blank, it just loads the .tox file normally using the top level COMP in the file.

#### Relative File Path Behavior `relpath`

Set whether the child file paths within this COMP are relative to the .toe itself or the .tox, or inherit from parent.

- **Use Parent's Behavior** `inherit` - Inherit setting from parent.
- **Relative to Project File (.toe)** `project` - The path, when specified as a relative path, will be relative to the .toe file.
- **Relative to External COMP File (.tox)** `externaltox` - The path, when specified as a relative path, will be relative to the .tox file. When no external COMP file is specified, or when Enable External .tox is not toggled on, this doesn't have any impact.

## Info CHOP Channels

Extra Information for the Annotate COMP can be accessed via an Info CHOP.

### Common COMP Info Channels
- num_children - Number of children in this component.

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
