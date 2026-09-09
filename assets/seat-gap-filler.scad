// DOGS Print Shop — parametric car seat gap filler wedge
// Units: millimeters.
// Conservative OpenSCAD only: polygon, linear_extrude, cylinder, difference.
// No experimental features; should render in any recent OpenSCAD.
//
// COMPILE CHECK: PENDING (no openscad binary on build machine, 2026-09-09).
// Print strategy: the full 410 mm wedge does NOT fit a standard 220 mm bed,
// so print part="front" and part="back", then join with the alignment pins
// (part="pins") and glue. PETG or ASA recommended — PLA softens in a hot car.

/* [Dimensions] */
wedge_length = 410;   // total length along the seat
top_width    = 60;    // width at the top (widest, sits proud of the gap)
bottom_width = 22;    // width at the bottom (taper that wedges into the gap)
wedge_height = 35;    // vertical height

/* [Print strategy] */
part      = "full";   // [full, front, back, pins]
pin_dia   = 6;       // alignment pin diameter
pin_depth = 12;      // how deep each pin seats into a half

half_len = wedge_length / 2;

module profile() {
    polygon(points = [
        [-bottom_width/2, 0],
        [ bottom_width/2, 0],
        [  top_width/2, wedge_height],
        [ -top_width/2, wedge_height]
    ]);
}

module wedge_solid(len) {
    linear_extrude(height = len) profile();
}

// One half of the split wedge, with two pin sockets on its cut face.
// cut_at_top=true  -> cut face at z = half_len (front half)
// cut_at_top=false -> cut face at z = 0       (back half)
module half_wedge(cut_at_top) {
    cut_z = cut_at_top ? half_len : 0;
    difference() {
        wedge_solid(half_len);
        for (sx = [-1, 1])
            translate([sx * top_width/4, wedge_height/2, cut_z])
                cylinder(d = pin_dia, h = pin_depth*2 + 2, center = true);
    }
}

// Alignment pin: print 4, glue two into each half's sockets.
module pin() {
    cylinder(d = pin_dia - 0.3, h = pin_depth * 2);
}

if (part == "full") {
    wedge_solid(wedge_length);
} else if (part == "front") {
    half_wedge(true);
} else if (part == "back") {
    half_wedge(false);
} else if (part == "pins") {
    for (i = [0:3])
        translate([i * (pin_dia + 4), 0, 0]) pin();
} else {
    echo("Unknown part. Use: full, front, back, pins.");
}
