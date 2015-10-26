/*
 * Trees
 * @ibykow 2015
 */

var r, max_h = 0, prev_h = 0, max_w = 0, prev_w = 0, w = 600, h = w,
    count = 8, depth = 8, section = w / (count + 1);

function rnd_offst(range, offset)
{
    return range < 1 ? 10 : ((Math.floor(Math.random() * range) - (range >> 1)) + offset);
}

function draw_tree(r, x, y, dx, dy, depth)
{
    if (depth < 1)
        return { h:0, w: 0 };

    var new_x = x + dx, new_y = y - dy, p = "M" + x + " " + y + "L" + new_x + " " + new_y,
        height = Math.sqrt(dx * dx + dy * dy), half_dy = dy >> 1,
        o1 = rnd_offst(dy, half_dy), o2 = rnd_offst(dy, half_dy),
        o3 = rnd_offst(dy, half_dy), o4 = rnd_offst(dy, half_dy),
        new_h = 0, new_w = 0;

    r.path(p).attr({stroke: "#fff"});

    depth--;

    var ret = draw_tree(r, new_x, new_y, -o1, o2, depth);

    new_h = ret.h, new_w = ret.w;

    ret = draw_tree(r, new_x, new_y, o3, o4, depth);

    ret.h = Math.max(ret.h, new_h) + height;
    ret.w = Math.max(ret.w, new_w) + (dx << 1);

    return ret;
}

function run()
{
    var tree_h = 0, tree_w = 0, time = +new Date;
    r.clear();
    for (var i = 1; i <= count; i++) {
        var ret = draw_tree(r, section * i, w,
            (i % 10) * (i % 2 ? 1 : -1), w >> 3, depth);

        max_h = Math.max(max_h, ret.h);
        max_w = Math.max(max_w, ret.w);
    }

    if ((max_h != prev_h) || (max_w != prev_w)) {
        console.log(Math.floor(max_h) + "m height. " + Math.floor(max_w) + "m breadth. (" + (+new Date - time) + "ms)");
        prev_h = Math.max(max_h, prev_h);
        prev_w = Math.max(max_w, prev_w);
    }
}

window.onload = function () {
    r = new Snap('#holder');
    setInterval(run, 2000);
};
