# LSystem SOP

**Family:** SOP (Surface Operator)

## Summary

The Lsystem SOP implements L-systems (Lindenmayer-systems, named after Aristid Lindenmayer (1925-1989)), allow definition of complex shapes through the use of iteration. They use a mathematical language in which an initial string of characters is evaluated repeatedly, and the results are used to generate geometry. The result of each evaluation becomes the basis for the next iteration of geometry, giving the illusion of growth.

You begin building an L-system by defining a sequence of rules which are evaluated to produce a new string of characters. Each character of the new string represents one command which affects an imaginary stylus, or "turtle". Repeating this process will grow your geometry.

You can use L-systems to create things such as:

The file can be read in from disk or from the web. Use http:// when specifying a URL.

The descriptions located here should be enough to get you started in writing your own L-system rules, however, if you have any serious interests in creating L-systems, you should obtain the book:

which is the definitive reference on the subject. It contains a multitude of L-systems examples complete with descriptions of the ideas and theories behind modelling realistic plant growth.

## Parameters

### Geometry Page

#### Type `type`

Provides two options for output geometry:

- **Skeleton** `skel` - Creates wire frame geometry. This option is ideal for geometry that is stiff and jagged like lightning or snowflakes. It is also useful to reduce SOP cooking time.
- **Tube** `tube` - Creates tube geometry. This option can be used with solid geometry that would need smooth curves, like trees or shrubs. Parameters on the Tube Page are only enabled when this Type is selected.

#### Generations `generations`

Determines the number of times to apply the rules to the initial string. This value controls the growth of the L-system. Place a time-based function here to animate the L-system growth.

#### Random Scale `randscale`

Random Scale as a percentage. This will apply a random scale to the changing geometry's lengths, angles and thickness.

#### Random Seed `randseed`

Random Seed for the SOP. This value can be used to select different sequences of random values.

#### Continuous Angles `contangl`

Calculates the incremental angles of branches, if a non-integer generational value is used. If the Generations field is animating, this should be set to ensure smooth growth.

#### Continuous Length `contlength`

Calculates the incremental lengths of the geometry points if a non-integer generational value is used. As with Continuous Angles, if the Generations field is animating, this should be set to ensure smooth, continuous growth. The Continuous Width field applies to tube thickness.

#### Continuous Width `contwidth`

Calculates the incremental lengths of the geometry points if a non-integer generational value is used. As with Continuous Angles, if the Generations field is animating, this should be set to ensure smooth, continuous growth. The Continuous Width field applies to tube thickness.

#### Apply Color `docolor`

Use a TOP to apply color to the L-system as it grows.

#### Image File `colormap`

Defines a TOP to use when the Apply Color button is selected. Also see the ` and # turtle operators.

#### UV Increment `inc`

Defines the default color U, V index increments when the turtle symbols ` or # are used.

- **incu** `incu`
- **incv** `incv`

#### Point Width Attribute `pointwidth`

Adds a point width attribute to each point in the geometry. This width is effected by the Thickness and Thickness Scale parameters on the Tube Page.

### Tube Page

#### Rows `rows`

The first option sets the number of tube sides and the second sets the number of divisions per step length if tube geometry is selected.

#### Columns `cols`

The first option sets the number of tube sides and the second sets the number of divisions per step length if tube geometry is selected.

#### Tension `tension`

Tension defines the smoothness of branching corners.

#### Branch Blend `smooth`

Enabling this option allows a child branch to be continuously joined to its parent branch.

#### Thickness `thickinit`

This number defines the default tube thickness.

#### Thickness Scale `thickscale`

This number is the scale factor used with the ! or ? operator.

#### Apply Tube Texture Coordinates `dotexture`

When enabled, UV texture coordinates are applied to the tube segments, such that the texture wraps smoothly and continuously over branches.

#### Vertical Increment `vertinc`

Defines the vertical spacing of texture coordinates over tube geometry when tube texture is applied.

### Values Page

#### Step Size `stepinit`

Step Size allows you to define the default length of the edges when new geometry is generated.

#### Step Size Scale `stepscale`

Step Size Scale defines the scale by which the geometry will be modified by the " or _ (double quote, or underscore) turtle operators.

#### Angle `angleinit`

Angle defines the default turning angle for turns, rolls and pitches.

#### Angle Scale `anglescale`

Angle Scale allows you to enter the scaling factor to be employed when the ; or @ operators are used.

#### Variable b `varb`

Substitutes user-defined b, c and d variables in rules or premise. These variables are expanded and so may include system variables such as $F and $T.

#### Variable c `varc`

Substitutes user-defined b, c and d variables in rules or premise. These variables are expanded and so may include system variables such as $F and $T.

#### Variable d `vard`

Substitutes user-defined b, c and d variables in rules or premise. These variables are expanded and so may include system variables such as $F and $T.

#### Gravity `gravity`

This parameter determines the amount of gravity applied to the geometry via the T (tropism vector) turtle operator. Tropism is when a plant bends or curves in response to an external stimulus. L-systems employ a tropism vector to simulate this behaviour. The bending is characterised by the fact that the thicker or shorter parts bend less than the longer or thinner parts.

### Funcs Page

#### Pic Image TOP `pictop`

This is the TOP which the pic() function uses. See #Expressions L-system Specific Expression Functions below.

#### Group Prefix `grpprefix`

If the production g(n) is encountered, all subsequent geometry is included in a primitive group prefixed with this label and ending with the ascii value of n. See #CreateGroup Creating Groups within L-systems below for an example.

#### Channel Prefix `chanprefix`

If the expression chan(n) is encountered, it is replaced with the local channel prefixed with this label and ending with the ascii value of n.

#### Leaf Param A `stampa`

You can determine which parameters are used by leaves. See #CreateGroup Creating Groups within L-systems below for an example.

#### Leaf Param B `stampb`

You can determine which parameters are used by leaves. See #CreateGroup Creating Groups within L-systems below for an example.

#### Leaf Param C `stampc`

You can determine which parameters are used by leaves. See #CreateGroup Creating Groups within L-systems below for an example.

#### Rules DAT `rules`

Path to the DAT defining the rules for the LSystem. Context Ignore context_ignore: - Defining this in the Rules DAT specifies all characters which are to be skipped when testing context sensitivity in the rules below. Premise premise: - Define an initial string of characters to which the substitution rules are applied. Rules - This is where the turtle substitution rules are defined.

## Operator Inputs

- Input 0: -
- Input 1: -
- Input 2: -
- Input 3: -

## Info CHOP Channels

Extra Information for the LSystem SOP can be accessed via an Info CHOP.

### Common SOP Info Channels
- num_points - Number of points in this SOP.
- num_prims - Number of primitives in this SOP.
- num_particles - Number of particles in this SOP.
- last_vbo_update_time - Time spent in another thread updating geometry data on the GPU from the SOP's CPU data. As it is part of another thread, this time is not part of the usual frame time.
- last_meta_vbo_update_time - Time spent in another thread updating meta surface geometry data (such as metaballs or nurbs) on the GPU from the SOP's CPU data. As it is part of another thread, this time is not part of the usual frame time.

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
